var documenterSearchIndex = {"docs":
[{"location":"NBP/#N-body-Problem-Dynamics","page":"NBP","title":"N-body Problem Dynamics","text":"","category":"section"},{"location":"NBP/","page":"NBP","title":"NBP","text":"Also known as NBP dynamics!","category":"page"},{"location":"NBP/","page":"NBP","title":"NBP","text":"using AstrodynamicalModels\nusing ModelingToolkit\nusing Latexify\nLatexify.auto_display(true)","category":"page"},{"location":"NBP/#Overview","page":"NBP","title":"Overview","text":"","category":"section"},{"location":"NBP/","page":"NBP","title":"NBP","text":"In an astrodynamical context, the N-body problem assumes  N celestial bodies which move with respect to some common  origin. A body i moves due to the cumulative gravity of every other body in the system. This problem is notoriously difficult because it cannot be solved analytically for Ngeq3!","category":"page"},{"location":"NBP/#Examples","page":"NBP","title":"Examples","text":"","category":"section"},{"location":"NBP/","page":"NBP","title":"NBP","text":"All NBP calls require the number of bodies to be specified as  the first argument, like so. As always, use the stm and  structural_simplify arguments at your leisure. Beware, though! using stm=true for N-body systems with more than 5 bodies  may cause NBP to compute for a really, really long time! True story – v1.0.1 of this package had a version of these docs which tried to compute NBP(30; stm=true). That resulted  in GitHub and JuliaHub failing the job on a timeout after  several hours – at first I was surprised, until I realized that appending state transition matrix dynamics to a 30-body system results in a total of 32580 states!","category":"page"},{"location":"NBP/","page":"NBP","title":"NBP","text":"If you're curious, the number of states of an N-body system  with state transition matrix dynamics appended is equivalent to N*6 + (N*6)^2.","category":"page"},{"location":"NBP/","page":"NBP","title":"NBP","text":"model = NBP(2; stm=true, structural_simplify=false)","category":"page"},{"location":"NBP/","page":"NBP","title":"NBP","text":"Like other models, we can compute the Jacobian for these dynamics.","category":"page"},{"location":"NBP/","page":"NBP","title":"NBP","text":"using SparseArrays\nJ = sparse(calculate_jacobian(NBP(4)))","category":"page"},{"location":"NBP/","page":"NBP","title":"NBP","text":"Finally, let's construct a Julia function which implements these dynamics!","category":"page"},{"location":"NBP/","page":"NBP","title":"NBP","text":"f = NBPFunction(2)\nlet u = randn(12), m = randn(2), G = rand(), t = 0\n    f(u, [G, m...], t)\nend","category":"page"},{"location":"R2BP/#Restricted-Two-body-Dynamics","page":"R2BP","title":"Restricted Two-body Dynamics","text":"","category":"section"},{"location":"R2BP/","page":"R2BP","title":"R2BP","text":"Also known as R2BP dynamics!","category":"page"},{"location":"R2BP/","page":"R2BP","title":"R2BP","text":"using AstrodynamicalModels\nusing ModelingToolkit\nusing Latexify\nLatexify.auto_display(true)","category":"page"},{"location":"R2BP/#Overview","page":"R2BP","title":"Overview","text":"","category":"section"},{"location":"R2BP/","page":"R2BP","title":"R2BP","text":"The Restricted Two-body Problem (R2BP) assumes a massless spacecraft which moves due to the gravity of one celestial body: one star, or one planet,  or one moon, or one asteroid. The equations of motion for R2BP dynamics are shown below.","category":"page"},{"location":"R2BP/","page":"R2BP","title":"R2BP","text":"beginalign*\nfracdx(t)dt = ẋleft( t right) \nfracdy(t)dt = ẏleft( t right) \nfracdz(t)dt = żleft( t right) \nfracdẋ(t)dt = frac - mu xleft( t right)left( sqrtx^2left(tright) + y^2left(tright) + z^2left(tright) right)^3 \nfracdẏ(t)dt = frac - mu yleft( t right)left( sqrtx^2left(tright) + y^2left(tright) + z^2left(tright) right)^3 \nfracdż(t)dt = frac - mu zleft( t right)left( sqrtx^2left(tright) + y^2left(tright) + z^2left(tright) right)^3\nendalign*","category":"page"},{"location":"R2BP/#Examples","page":"R2BP","title":"Examples","text":"","category":"section"},{"location":"R2BP/","page":"R2BP","title":"R2BP","text":"By default, ModelingToolkit.structural_simplify is called on every model. This typically makes solving the equations more efficient! If you really want to, you can disable this by specifying structural_simplify=false.","category":"page"},{"location":"R2BP/","page":"R2BP","title":"R2BP","text":"model = R2BP(; structural_simplify=false)","category":"page"},{"location":"R2BP/","page":"R2BP","title":"R2BP","text":"Every model also offers optional state transition matrix dynamics. Use stm=true to append the state transition matrix dynamics to your  model's equations of motion. State transition dynamics can also  be thought of the model's local linearization.","category":"page"},{"location":"R2BP/","page":"R2BP","title":"R2BP","text":"note: Note\nThe state transition dynamics for R2BP systems are not  nearly as useful as the state transition dynamics within   CR3BP models. Within CR3BP dynamics,  a spacecraft's local linearization offers stability   characteristics for periodic orbits, and provides   stable and unstable directions (in state-space)  for invariant manifolds about periodic orbits and Lagrange   points.","category":"page"},{"location":"R2BP/","page":"R2BP","title":"R2BP","text":"model = R2BP(; stm=true)","category":"page"},{"location":"R2BP/","page":"R2BP","title":"R2BP","text":"Let's compute the Jacobian for these dynamics.","category":"page"},{"location":"R2BP/","page":"R2BP","title":"R2BP","text":"J = calculate_jacobian(R2BP())","category":"page"},{"location":"R2BP/","page":"R2BP","title":"R2BP","text":"Finally, let's construct a Julia function which implements these dynamics!","category":"page"},{"location":"R2BP/","page":"R2BP","title":"R2BP","text":"f = R2BPFunction()\nlet u = randn(6), p = [3e6], t = 0\n    f(u, p, t)\nend","category":"page"},{"location":"CR3BP/#Circular-Restricted-Three-body-Dynamics","page":"CR3BP","title":"Circular Restricted Three-body Dynamics","text":"","category":"section"},{"location":"CR3BP/","page":"CR3BP","title":"CR3BP","text":"Also known as CR3BP dynamics!","category":"page"},{"location":"CR3BP/","page":"CR3BP","title":"CR3BP","text":"using AstrodynamicalModels\nusing ModelingToolkit\nusing Latexify\nLatexify.auto_display(true)","category":"page"},{"location":"CR3BP/#Overview","page":"CR3BP","title":"Overview","text":"","category":"section"},{"location":"CR3BP/","page":"CR3BP","title":"CR3BP","text":"The Circular Restricted Three-body Problem (CR3BP) assumes a massless spacecraft which moves due to the gravity of two celestial bodies which orbit their common center of mass. This may seem like an arbitrary model, but it's actually a pretty decent approximation for how  a spacecraft moves nearby the Earth and the Sun, the Earth and the Moon, the Sun and  Jupiter, and other systems in our solar system! The equations of motion  are provided below.","category":"page"},{"location":"CR3BP/","page":"CR3BP","title":"CR3BP","text":"beginalign*\nfracdx(t)dt = ẋleft( t right) \nfracdy(t)dt = ẏleft( t right) \nfracdz(t)dt = żleft( t right) \nfracdẋ(t)dt = 2 ẏleft( t right) - left( frac1sqrtleft( mu + xleft( t right) right)^2 + left( yleft( t right) right)^2 + left( zleft( t right) right)^2 right)^3 left( 1 - mu right) left( mu + xleft( t right) right) - left( frac1sqrtleft( -1 + mu + xleft( t right) right)^2 + left( yleft( t right) right)^2 + left( zleft( t right) right)^2 right)^3 mu left( -1 + mu + xleft( t right) right) + xleft( t right) \nfracdẏ(t)dt =  - 2 ẋleft( t right) - left( left( frac1sqrtleft( mu + xleft( t right) right)^2 + left( yleft( t right) right)^2 + left( zleft( t right) right)^2 right)^3 left( 1 - mu right) + left( frac1sqrtleft( -1 + mu + xleft( t right) right)^2 + left( yleft( t right) right)^2 + left( zleft( t right) right)^2 right)^3 mu right) yleft( t right) + yleft( t right) \nfracdż(t)dt = left(  - left( frac1sqrtleft( mu + xleft( t right) right)^2 + left( yleft( t right) right)^2 + left( zleft( t right) right)^2 right)^3 left( 1 - mu right) - left( frac1sqrtleft( -1 + mu + xleft( t right) right)^2 + left( yleft( t right) right)^2 + left( zleft( t right) right)^2 right)^3 mu right) zleft( t right)\nendalign*","category":"page"},{"location":"CR3BP/#Examples","page":"CR3BP","title":"Examples","text":"","category":"section"},{"location":"CR3BP/","page":"CR3BP","title":"CR3BP","text":"State transition dynamics are particularly valuable for CR3BP models. Recall that the state transition matrix is simply the local linearization of a spacecraft within CR3BP dynamics. Let's look at the Jacobian (another word for \"local linearization\") below, evaluated at some random state.","category":"page"},{"location":"CR3BP/","page":"CR3BP","title":"CR3BP","text":"f = CR3BPFunction(; jac=true)\nlet x = randn(6), p = rand((0.0, 0.5)), t = 0\n    f(Val{:jac}, x, p, t)\nend","category":"page"},{"location":"CR3BP/","page":"CR3BP","title":"CR3BP","text":"The Jacobian will always have this form (zeros in the top-left, the identity matrix in the top-right, a dense matrix in the  bottom-left, and the same sparse \"-2, 2\" matrix in the bottom-right). We can include the state transition dynamics in our model with  stm=true, initialize the state transition matrix states to the  identity matrix, and propagate our spacecraft for one periodic orbit: the result is known as the Monodromy Matrix! The Monodromy Matrix provides stability characteristics for the entire periodic orbit.","category":"page"},{"location":"CR3BP/","page":"CR3BP","title":"CR3BP","text":"model = CR3BP(; stm=true)","category":"page"},{"location":"CR3BP/","page":"CR3BP","title":"CR3BP","text":"Note that periodic orbits are not easy to find within CR3BP dynamics. Various algorithms have been developed to analytically approximate,  and numerically refine, periodic CR3BP orbits. Some of those  algorithms have already been implemented in Julia! See  OrbitalTrajectories and GeneralAstrodynamics.","category":"page"},{"location":"#AstrodynamicalModels.jl","page":"Getting Started","title":"AstrodynamicalModels.jl","text":"","category":"section"},{"location":"","page":"Getting Started","title":"Getting Started","text":"Common models within astrodynamics!","category":"page"},{"location":"#Overview","page":"Getting Started","title":"Overview","text":"","category":"section"},{"location":"","page":"Getting Started","title":"Getting Started","text":"This package extends ModelingToolkit to represent common astrodynamical models. All available models are shown on the Docstrings page. Consult the Models pages for more detail about each model in this package!","category":"page"},{"location":"#Usage","page":"Getting Started","title":"Usage","text":"","category":"section"},{"location":"","page":"Getting Started","title":"Getting Started","text":"If you're familiar with ModelingToolkit.jl, then you'll be able to use this package! Some  AstrodynamicalModels-specific usage instructions are provided  here. Please don't be shy about making Discourse posts, or filing issues on GitHub!","category":"page"},{"location":"#Installation-and-Setup","page":"Getting Started","title":"Installation & Setup","text":"","category":"section"},{"location":"","page":"Getting Started","title":"Getting Started","text":"This package can be installed just like any other  registered Julia package.","category":"page"},{"location":"","page":"Getting Started","title":"Getting Started","text":"# To install wherever Julia code runs...\nimport Pkg\nPkg.add(\"AstrodynamicalModels\") # or ]add AstrodynamicalModels in Julia's REPL","category":"page"},{"location":"","page":"Getting Started","title":"Getting Started","text":"To load the package, simply enter using AstrodynamicalModels.","category":"page"},{"location":"","page":"Getting Started","title":"Getting Started","text":"using AstrodynamicalModels","category":"page"},{"location":"#Retrieving-a-Model","page":"Getting Started","title":"Retrieving a Model","text":"","category":"section"},{"location":"","page":"Getting Started","title":"Getting Started","text":"Each model within this package is implemented with a function – each function returns some AbstractSystem from ModelingToolkit.jl. Typically, this will be an ODESystem. If you're worried about overhead from calling each function every time you need a particular model, don't! Each function is implemented with  @memoize, so all  results are cached the first time you call a model's function  with a particular function signature. ","category":"page"},{"location":"","page":"Getting Started","title":"Getting Started","text":"R2BPModel = R2BP() # Restricted Two-body Problem dynamics\n\nCR3BPModel = CR3BP() # Circular Restricted Three-body Problem dynamics\n\nCR3BPModelWithSTM = CR3BP(; stm=true) # Optionally include state transition matrix dynamics","category":"page"},{"location":"#Using-a-Model","page":"Getting Started","title":"Using a Model","text":"","category":"section"},{"location":"","page":"Getting Started","title":"Getting Started","text":"To actually use each model, you probably also want to load  ModelingToolkit (and any other SciML  packages of your choice).","category":"page"},{"location":"","page":"Getting Started","title":"Getting Started","text":"using ModelingToolkit","category":"page"},{"location":"","page":"Getting Started","title":"Getting Started","text":"Now you can use any method defined for ModelingToolkit.AbstractSystem instances. Once again, the ModelingToolkit Documentation are the best place to learn how to interact with AbstractSystem instances! Some quick examples are shown below. ","category":"page"},{"location":"#Check-the-Equations-of-Motion","page":"Getting Started","title":"Check the Equations of Motion","text":"","category":"section"},{"location":"","page":"Getting Started","title":"Getting Started","text":"eqs = equations(R2BP())","category":"page"},{"location":"#List-the-States-and-Parameters","page":"Getting Started","title":"List the States and Parameters","text":"","category":"section"},{"location":"","page":"Getting Started","title":"Getting Started","text":"x = states(R2BP())\np = parameters(R2BP())","category":"page"},{"location":"#Calculate-the-Jacobian","page":"Getting Started","title":"Calculate the Jacobian","text":"","category":"section"},{"location":"","page":"Getting Started","title":"Getting Started","text":"J = calculate_jacobian(R2BP())","category":"page"},{"location":"#Generate-Code-to-Replicate-the-Model","page":"Getting Started","title":"Generate Code to Replicate the Model","text":"","category":"section"},{"location":"","page":"Getting Started","title":"Getting Started","text":"print(build_function(R2BP()))","category":"page"},{"location":"#Generate-Code-which-Implements-the-Dynamics","page":"Getting Started","title":"Generate Code which Implements the Dynamics","text":"","category":"section"},{"location":"","page":"Getting Started","title":"Getting Started","text":"print(R2BPFunction())","category":"page"},{"location":"#Generate-C/C-and-MATLAB-Code","page":"Getting Started","title":"Generate C/C++ and MATLAB Code","text":"","category":"section"},{"location":"","page":"Getting Started","title":"Getting Started","text":"print(build_function([eq.rhs for eq in equations(R2BP())], states(R2BP()), parameters(R2BP()); target=Symbolics.CTarget()))\nprint(build_function([eq.rhs for eq in equations(R2BP())], states(R2BP()), parameters(R2BP()); target=Symbolics.MATLABTarget()))","category":"page"},{"location":"","page":"Getting Started","title":"Getting Started","text":"If you're interested in learning a bit about each astrodynamical model, or you'd like more specific examples which show how to use each model, consult the Models  pages! ","category":"page"},{"location":"docstrings/#Documentation","page":"Docstrings","title":"Documentation","text":"","category":"section"},{"location":"docstrings/","page":"Docstrings","title":"Docstrings","text":"All docstrings!","category":"page"},{"location":"docstrings/","page":"Docstrings","title":"Docstrings","text":"Modules = [\n    AstrodynamicalModels\n]\nOrder = [:module, :type, :function]","category":"page"},{"location":"docstrings/#AstrodynamicalModels.AstrodynamicalModels","page":"Docstrings","title":"AstrodynamicalModels.AstrodynamicalModels","text":"Provides common astrodynamical models through ModelingToolkit,  physical attributes for solar system bodies through SPICE,  and ephemeris model downloading and interpolation through  HORIZONS and Interpolations!\n\ntip: Tip\nCheck out the ModelingToolkit docs to learn how to use these systems for orbit  propagation with DifferentialEquations, or see GeneralAstrodynamics for some  convenient orbit propagation wrappers.\n\nUsage\n\nPhysical Attributes\n\nnaifcode(\"earth\") == 399\nnaifname(\"mars\") == 499\n\nμₑ = massparameter(\"earth\")\nRₘ = meanradius(\"mars\")\n\nDynamics\n\nusing ModelingToolkit\n\nlength(states(R2BP())) == 6\nlength(states(NBP(2))) == 12\n\nEphemeris\n\nwarning: Warning\nBefore usage, see the warning about copyrighted tools in this project's README, or in  the Extended Help section of this docstring!\n\nusing HORIZONS\nephemeris(\"earth\") isa DataFrame\n\nusing Dates\nephemeris(\"earth\", (now()-Year(5), now()+Year(5)), Day(1)) isa DataFrame\n\nusing Interpolations: CubicHermite\nContinuousEphemeris(\"earth\") isa ContinuousEphemeris{<:Number, <:Number, <:CubicHermite, <:CubicHermite, <:CubicHermite}\n\nExtended help\n\nLicense\n\nwarning: Warning\nThe license in this docstring applies to all code in this package, but note  that the ephemeris data downloading functionality of this package (e.g. the ephemeris function) uses copyrighted tools with their  own usage and code sharing restrictions. These copyrighted tools are  owned by the Jet Propulsion Laboratory at the California Institute  of Technology. These copyrighted tools are, in part, located at  ftp://ssd.jpl.nasa.gov/pub/ssd/SCRIPTS/. Open source wrappers for these copyrighted tools exist, e.g.  HORIZONS.jl and AstroPy's astroquery. The ephemeris handling  functionality of this package uses HORIZONS.jl.It is the responsibility of the user to verify they meet the necessary requirements, as specifed by JPL in their scripts (e.g. vec_tbl),  before they share or use the copyrighted tools. This includes the  ephemeris handling functionality in this package (e.g. ephemeris).\n\nMIT License\n\nCopyright (c) 2021 Joe Carpinelli\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nExports\n\nAlways\n\nnaifcode\nnaifname\naxialradii\nmeanradius\nmassparameter\n\nRequires ModelingToolkit\n\nNBP\nR2BP\nCR3BP\nR2BPFunction\nCR3BPFunction\nNBPFunction\n\nRequires HORIZONS\n\nephemeris\n\nRequires Interpolations (and HORIZONS)\n\nContinuousEphemeris\n\nImports\n\nAlways\n\nRequires, SPICE, LinearAlgebra, DocStringExtensions\n\nRequires ModelingToolkit\n\nMemoize\n\nRequires HORIZONS\n\nCSV, DataFrames\n\n\n\n\n\n","category":"module"},{"location":"docstrings/#AstrodynamicalModels.AbstractEphemerisInterpolation","page":"Docstrings","title":"AstrodynamicalModels.AbstractEphemerisInterpolation","text":"abstract type AbstractEphemerisInterpolation\n\nAn abstract supertype for all possible interpolations for ephemeris data.\n\n\n\n\n\n","category":"type"},{"location":"docstrings/#AstrodynamicalModels.ContinuousEphemeris","page":"Docstrings","title":"AstrodynamicalModels.ContinuousEphemeris","text":"A callable structure which holds ephemeris data for a body's positions and velocities between the timepoints specified by T. Call the object with a Julian day input to interpolate the body's positions and velocities using Interpolations.CubicHermite.\n\n\n\n\n\n","category":"type"},{"location":"docstrings/#AstrodynamicalModels.ContinuousEphemeris-Tuple{DataFrames.DataFrame}","page":"Docstrings","title":"AstrodynamicalModels.ContinuousEphemeris","text":"Construct a ContinuousEphemeris instance from an appropriately formatted  DataFrame. This is mostly an internal package method. See ephemeris(args...; continuous = Val{true}, kwargs...) for a more user friendly constructor!\n\n\n\n\n\n","category":"method"},{"location":"docstrings/#AstrodynamicalModels.ContinuousEphemeris-Tuple{Number}","page":"Docstrings","title":"AstrodynamicalModels.ContinuousEphemeris","text":"Interpolate the body's position and velocity by a Julian day input.\n\n\n\n\n\n","category":"method"},{"location":"docstrings/#AstrodynamicalModels.CR3BP-Tuple{}","page":"Docstrings","title":"AstrodynamicalModels.CR3BP","text":"CR3BP(; stm, structural_simplify, name)\n\n\nA ModelingToolkit.ODESystem for the Circular Restricted Three-body Problem. \n\nThe order of the states follows: [x, y, z, ẋ, ẏ, ż].\n\nThe order of the parameters follows: [μ].\n\nExtended Help\n\nThe Circular Restricted Three-body Problem is a simplified dynamical model  describing one small body (spacecraft, etc.) and two celestial  bodies moving in a circle about their common center of mass.  This may seem like an arbitrary simplification, but this assumption holds reasonably well for the Earth-Moon, Sun-Earth, and many other  systems in our solar system.\n\nUsage\n\nmodel = CR3BP(; stm=true) \n\n\n\n\n\n","category":"method"},{"location":"docstrings/#AstrodynamicalModels.CR3BPFunction-Tuple{}","page":"Docstrings","title":"AstrodynamicalModels.CR3BPFunction","text":"CR3BPFunction(; stm, structural_simplify, name, kwargs...)\n\n\nReturns an ODEFunction for CR3BP dynamics.  Results are cached with Memoize.jl.\n\nThe order of the states follows: [x, y, z, ẋ, ẏ, ż].\n\nThe order of the parameters follows: [μ].\n\nExtended Help\n\nUsage\n\nThe stm, structural_simplify, and name keyword arguments  are passed to CR3BP. All other keyword arguments are passed directly to SciMLBase.ODEFunction.\n\nf = CR3BPFunction(; stm=false, jac=true)\nlet u = randn(6), p = randn(1), t = 0\n    f(u, p, t)\nend\n\n\n\n\n\n","category":"method"},{"location":"docstrings/#AstrodynamicalModels.NBP-Tuple{Int64}","page":"Docstrings","title":"AstrodynamicalModels.NBP","text":"NBP(N; stm, structural_simplify, name)\n\n\nA ModelingToolkit.ODESystem for the Newtonian N-body Problem. \n\nThe order of the states follows:  [x₁, y₁, z₁, ..., xₙ, yₙ, zₙ, ẋ₁, ẏ₁, ż₁, ..., ẋₙ, ẏₙ, żₙ].\n\nThe order of the parameters follows: [G, m₁, m₂, ..., mₙ].\n\nwarning: Warning\nBe careful about specifying stm=true for systems with  N ≥ 3! If state transition matrix dynamics are enabled, you can calculate the total number of system states with N*6 + (N*6)^2. Note that this increases exponentially as  N grows! For N == 6, unless you're using parallelization, your computer may run for several hours. \n\nExtended Help\n\nThe N-body problem is a model which describes how N bodies  will move with respect to a common origin. This problem  typically involves many bodies which act due to one force: electromagentism, gravity, etc. This model applies most  closely to many celestial bodies moving due to gravity. That's about right for a model in a package called AstrodynamicalModels!\n\nUsage\n\n# One model for ALL the planets in our solar system 😎\nmodel = NBP(9) \n\n\n\n\n\n","category":"method"},{"location":"docstrings/#AstrodynamicalModels.NBPFunction-Tuple{Int64}","page":"Docstrings","title":"AstrodynamicalModels.NBPFunction","text":"NBPFunction(N; stm, structural_simplify, name, kwargs...)\n\n\nReturns an ODEFunction for NBP dynamics.  Results are cached with Memoize.jl. The order of states and parameters in the  ODEFunction arguments are equivalent to the  order of states and parameters for the system produced with NBP(N). As a general rule,  the order of the states follows: [x₁, y₁, z₁,  ..., xₙ, yₙ, zₙ, ẋ₁, ẏ₁, ż₁, ..., ẋₙ, ẏₙ, żₙ].\n\nnote: Note\nUnlike R2BP and CR3BP, jac is set to  false by default. The number of states for NBP systems can be very large for relatively small  numbers of bodies (N). Enabling jac=true by default would cause unnecessarily long  waiting times for this function to return for  N ≥ 3 or so. If N=2 and stm=true,  setting jac=true could still result in several minutes of calculations, depending on the computer you're using.\n\nwarning: Warning\nBe careful about specifying stm=true for systems with  N ≥ 3! If state transition matrix dynamics are enabled, you can calculate the total number of system states with N*6 + (N*6)^2. Note that this increases exponentially as  N grows! For N == 6, unless you're using parallelization, your computer may run for several hours. \n\nExtended Help\n\nUsage\n\nThe stm, structural_simplify, and name keyword arguments  are passed to NBP. All other keyword arguments are passed directly to SciMLBase.ODEFunction.\n\nf = NBPFunction(3; stm=false, structural_simplify=true, name=:NBP, jac=false, sparse=false)\nlet u = randn(3*6), p = randn(1 + 3), t = 0\n    f(u, p, t)\nend\n\n\n\n\n\n","category":"method"},{"location":"docstrings/#AstrodynamicalModels.R2BP-Tuple{}","page":"Docstrings","title":"AstrodynamicalModels.R2BP","text":"R2BP(; stm, structural_simplify, name)\n\n\nA ModelingToolkit.ODESystem for the Restricted Two-body Problem. \n\nThe order of the states follows: [x, y, z, ẋ, ẏ, ż].\n\nThe order of the parameters follows: [μ].\n\nExtended Help\n\nThe Restricted Two-body Problem is a simplified dynamical model  describing one small body (spacecraft, etc.) and one celestial  body. The gravity of the celestial body exhibits a force on the  small body. This model is commonly used as a simplification to  descibe our solar systems' planets orbiting our sun, or a  spacecraft orbiting Earth. \n\nUsage\n\nmodel = R2BP() \n\n\n\n\n\n","category":"method"},{"location":"docstrings/#AstrodynamicalModels.R2BPFunction-Tuple{}","page":"Docstrings","title":"AstrodynamicalModels.R2BPFunction","text":"R2BPFunction(; stm, structural_simplify, name, kwargs...)\n\n\nReturns an ODEFunction for R2BP dynamics.  Results are cached with Memoize.jl.\n\nThe order of the states follows: [x, y, z, ẋ, ẏ, ż].\n\nThe order of the parameters follows: [μ].\n\nExtended Help\n\nUsage\n\nThe stm, structural_simplify, and name keyword arguments  are passed to R2BP. All other keyword arguments are passed directly to SciMLBase.ODEFunction.\n\nf = R2BPFunction(; stm=false, structural_simplify=true, name=:R2BP, jac=true)\nlet u = randn(6), p = randn(1), t = 0\n    f(u, p, t)\nend\n\n\n\n\n\n","category":"method"},{"location":"docstrings/#AstrodynamicalModels.ephemeris","page":"Docstrings","title":"AstrodynamicalModels.ephemeris","text":"ephemeris(body)\nephemeris(body, timespan)\nephemeris(body, timespan, intervol; continuous, type, email, wrt, epoch)\n\n\nGiven a celestial body's name, or the NAIF ID of the body, return a DataFrame of ephemeris data for the specified  timespan and intervol between time steps.\n\nwarning: Warning\nThe license file for this package applies to all code  in this package, but note  that the ephemeris data handling functionality of this package (e.g. the ephemeris function) uses copyrighted tools with their  own usage and code sharing restrictions. These copyrighted tools are  owned by the Jet Propulsion Laboratory at the California Institute  of Technology. These copyrighted tools are, in part, located at  ftp://ssd.jpl.nasa.gov/pub/ssd/SCRIPTS/. Open source wrappers for these copyrighted tools exist, e.g.  HORIZONS.jl and AstroPy's astroquery. The ephemeris handling  functionality of this package uses HORIZONS.jl.It is the responsibility of the user to verify they meet the necessary requirements, as specifed by JPL in their copyrighted tools (e.g. vec_tbl),  before they share or use those tools.\n\n\n\n\n\n","category":"function"},{"location":"docstrings/#AstrodynamicalModels.ephemeris-Tuple{Union{AbstractString, Integer}, Dates.AbstractDateTime}","page":"Docstrings","title":"AstrodynamicalModels.ephemeris","text":"ephemeris(body, time; kwargs...)\n\n\nReturns the Cartesian state vector of the requested body at the provided date and time! All kwargs are passed directly to the timespan method for ephemeris.\n\nwarning: Warning\nThe license file for this package applies to all code  in this package, but note  that the ephemeris data handling functionality of this package (e.g. the ephemeris function) uses copyrighted tools with their  own usage and code sharing restrictions. These copyrighted tools are  owned by the Jet Propulsion Laboratory at the California Institute  of Technology. These copyrighted tools are, in part, located at  ftp://ssd.jpl.nasa.gov/pub/ssd/SCRIPTS/. Open source wrappers for these copyrighted tools exist, e.g.  HORIZONS.jl and AstroPy's astroquery. The ephemeris handling  functionality of this package uses HORIZONS.jl.It is the responsibility of the user to verify they meet the necessary requirements, as specifed by JPL in their copyrighted tools (e.g. vec_tbl),  before they share or use those tools.\n\n\n\n\n\n","category":"method"},{"location":"docstrings/#AstrodynamicalModels.naifcode-Tuple{AbstractString}","page":"Docstrings","title":"AstrodynamicalModels.naifcode","text":"naifcode(name)\n\n\nReturn the NAIF ID for the provided celestial body name. If no ID for  the provided body is found, a KeyError exception is thrown.\n\nnote: Note\nThis is a simple wrapper around SPICE.bodn2c, which is itself  a wrapper around the CSPICE library's bod2nc function! This  integer code lookup is robust to different capitalizations.  For example, \"Earth\", \"earth\", and \"eArTH\" should all return  integer code 399.\n\n\n\n\n\n","category":"method"},{"location":"docstrings/#AstrodynamicalModels.naifname-Tuple{Int64}","page":"Docstrings","title":"AstrodynamicalModels.naifname","text":"naifname(code)\n\n\nReturn the celestial body name for the provided NANIF ID. If no name for  the provided ID is found, a KeyError exception is thrown.\n\nnote: Note\nThis is a simple wrapper around SPICE.bodc2n, which is itself  a wrapper around the CSPICE library's bodc2n function!\n\n\n\n\n\n","category":"method"}]
}
