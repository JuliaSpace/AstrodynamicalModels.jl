"""
Provides astrodynamical models as `AstrodynamicalModels.ODESystems`.
Check out the `ModelingToolkit` docs to learn how to use these
systems for orbit propagation with `DifferentialEquations`, or
see `GeneralAstrodynamics` for some convenient orbit propagation
wrappers.

# Extended help

## License
$(LICENSE)

## Exports
$(EXPORTS)

## Imports
$(IMPORTS)
"""
module AstrodynamicalModels

# Export every model
export R2BSystem, CR3BSystem, NBSystem, PlanarEntrySystem, AttitudeSystem

# Export every `ODEFunction`
export R2BFunction, CR3BFunction, NBFunction, PlanarEntryFunction, AttitudeFunction

# Export every array type
export CartesianState, R2BState, KeplerianState, OrbitalElements, KeplerianParameters, R2BParameters, CR3BState, CR3BParameters, AttitudeState, AttitudeParameters, PlanarEntryState, PlanarEntryParameters

# Export every orbit type
export Orbit, R2BOrbit, CR3BOrbit, CartesianOrbit, KeplerianOrbit

# Export every method
export state, parameters, dynamics

using Symbolics
using SciMLBase
using Memoize
using LinearAlgebra
using ModelingToolkit
using StaticArrays

using DocStringExtensions
@template (FUNCTIONS, METHODS, MACROS) = """
                                         $(SIGNATURES)

                                         $(DOCSTRING)
                                         """

@template (TYPES, CONSTANTS) = """
                               $(TYPEDEF)

                               $(DOCSTRING)
                               """

"""
An abstract supertype for all astrodynamical state vectors.
"""
abstract type AstrodynamicalState{F,N} <: FieldVector{N,F} end

function Base.show(io::IO, ::MIME"text/plain", state::S) where {S<:AstrodynamicalState}
    name = nameof(S)
    println(io, "$name with eltype $(eltype(state))\n")
    for symbol in fieldnames(S)
        value = getproperty(state, symbol)
        println(io, "  $symbol: $value")
    end
end

Base.show(io::IO, state::AstrodynamicalState) = Base.show(io, MIME"text/plain"(), state)

"""
An abstract supertype for all astrodynamical parameter vectors.
"""
abstract type AstrodynamicalParameters{F,N} <: FieldVector{N,F} end

function Base.show(io::IO, ::MIME"text/plain", params::S) where {S<:AstrodynamicalParameters}
    name = nameof(S)
    println(io, "$name with eltype $(eltype(params))\n")
    for symbol in fieldnames(S)
        value = getproperty(params, symbol)
        println(io, "  $symbol: $value")
    end
end

Base.show(io::IO, state::AstrodynamicalParameters) = Base.show(io, MIME"text/plain"(), state)

# Resolves method ambiguity errors. TODO: should x be copied?
(::Type{T})(x::T) where {T<:Union{<:AstrodynamicalState,<:AstrodynamicalParameters}} = x

Base.similar(state::AstrodynamicalState) = typeof(state)(undef)
Base.similar(parameters::AstrodynamicalParameters) = typeof(parameters)(undef)

"""
A mutable vector, with labels, for 6DOF Cartesian states.
"""
Base.@kwdef mutable struct CartesianState{F} <: AstrodynamicalState{F,6}
    x::F = 0.0
    y::F = 0.0
    z::F = 0.0
    ẋ::F = 0.0
    ẏ::F = 0.0
    ż::F = 0.0

    CartesianState{F}(::UndefInitializer) where {F} = new{F}()
    CartesianState(::UndefInitializer) = CartesianState{Float64}(undef)

    CartesianState{F}(x, y, z, ẋ, ẏ, ż) where {F} = new{F}(x, y, z, ẋ, ẏ, ż)
    CartesianState(x, y, z, ẋ, ẏ, ż) = new{promote_type(typeof(x), typeof(y), typeof(z), typeof(ẋ), typeof(ẏ), typeof(ż))}(x, y, z, ẋ, ẏ, ż)
    CartesianState{F}(state::NamedTuple) where {F} =
        let
            (; x, y, z, ẋ, ẏ, ż) = merge((; x=zero(F), y=zero(F), z=zero(F), ẋ=zero(F), ẏ=zero(F), ż=zero(F)), state)
            CartesianState{F}(x, y, z, ẋ, ẏ, ż)
        end
    CartesianState(state::NamedTuple) = CartesianState{Float64}(state)
end

"""
A mutable matrix, with labels, for a 6DOF Cartesian state transition matrix.
"""
Base.@kwdef mutable struct CartesianSTM{F} <: FieldMatrix{6,6,F}
    xx::F = 1.0
    xy::F = 0.0
    xz::F = 0.0
    xẋ::F = 0.0
    xẏ::F = 0.0
    xż::F = 0.0
    yx::F = 0.0
    yy::F = 1.0
    yz::F = 0.0
    yẋ::F = 0.0
    yẏ::F = 0.0
    yż::F = 0.0
    zx::F = 0.0
    zy::F = 0.0
    zz::F = 1.0
    zẋ::F = 0.0
    zẏ::F = 0.0
    zż::F = 0.0
    ẋx::F = 0.0
    ẋy::F = 0.0
    ẋz::F = 0.0
    ẋẋ::F = 1.0
    ẋẏ::F = 0.0
    ẋż::F = 0.0
    ẏx::F = 0.0
    ẏy::F = 0.0
    ẏz::F = 0.0
    ẏẋ::F = 0.0
    ẏẏ::F = 1.0
    ẏż::F = 0.0
    żx::F = 0.0
    ży::F = 0.0
    żz::F = 0.0
    żẋ::F = 0.0
    żẏ::F = 0.0
    żż::F = 1.0

    CartesianSTM{F}(::UndefInitializer) where {F} = new{F}()
    CartesianSTM(::UndefInitializer) = CartesianSTM{Float64}(undef)
end

"""
An abstract supertype for all orbits. 

# Extended Help

To support the `AstrodynamicalOrbit` interface, you must implement the following methods.

1. `AstrodynamicalModels.states(orbit)`
2. `AstrodynamicalModels.parameters(orbit)`

"""
abstract type AstrodynamicalOrbit{U,P} end

"""
A full representation of an orbit, including a numerical state, and the parameters of the system.
"""
struct Orbit{U<:AbstractVector,P<:AbstractVector} <: AstrodynamicalOrbit{U,P}
    state::U
    parameters::P

    Orbit(state::AbstractVector, parameters::AbstractVector) = new{typeof(state),typeof(parameters)}(state, parameters)
    Orbit(; state, parameters) = Orbit(state, parameters)
    Orbit(orbit::Orbit; state=orbit.state, parameters=orbit.parameters) = Orbit(state, parameters)
end

function Base.show(io::IO, ::MIME"text/plain", orbit::Orbit)
    println(io, "Orbit in $(paradigm(orbit.parameters))\n")

    for line in eachline(IOBuffer(string(orbit.state)))
        println(io, "  ", line)
    end

    println(io)

    for line in eachline(IOBuffer(string(orbit.parameters)))
        println(io, "  ", line)
    end
end

"""
Return the state vector for an `Orbit`.
"""
state(orbit::Orbit) = orbit.state

"""
Return the parameter vector for an `Orbit`.
"""
parameters(orbit::Orbit) = orbit.parameters

Base.getindex(orbit::AstrodynamicalOrbit, args...) = Base.getindex(state(orbit), args...)
Base.setindex!(orbit::AstrodynamicalOrbit, args...) = Base.setindex!(state(orbit), args...)

"""
Return the underlying dynamics of the system.
"""
dynamics(orbit::AstrodynamicalOrbit, args...; kwargs...) = dynamics(parameters(orbit), args...; kwargs...)

"""
An `Orbit` which exists within R2BP dynamics.
"""
const CartesianOrbit = Orbit{<:CartesianState}

include("R2BP.jl")
include("Kepler.jl")
include("CR3BP.jl")
include("NBP.jl")
include("Entry.jl")
include("Attitude.jl")

ModelingToolkit.ODESystem(orbit::AstrodynamicalOrbit, args...; kwargs...) = dynamics(orbit, args...; kwargs...)

end # module
