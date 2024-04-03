import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import googleLogo from "../assets/images/Google__G__logo.svg";
import { handleInputChange } from "../globals/utilityFunctions";
import handleLogin from "../globals/login";
import { signUpAPIPath } from "../globals/apiPaths";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const [formErrors, setFormErrors] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Post request to server containing form data payload
    const emailSignUpSubmission = async(e) => {
        e.preventDefault();
        try {
            // Have to make requests to /api/.. as we are using a proxy
            const response = await fetch(signUpAPIPath, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();

            // Check if the response is good or not
            if (response.ok) {
                // If its good, redirect to login page
                navigate("/login");
            } else {
                // Set the form errors to be displayed
                setFormErrors(responseData.errors);
            }
        } catch (err) {
            console.error("Sign Up:", err);
        }

        setFormSubmitted(true);
    }

    useEffect(() => {
        if (formSubmitted && formErrors && formErrors.length > 0) {
            setFormData({...formData, password: "", passwordConfirm: ""});
            setFormSubmitted(false);
        }
    }, [formSubmitted, formErrors]);


    return(
        <main className="flex flex-col justify-center items-center px-8 py-10 lg:py-24">
            <header className="mb-10 lg:mb-16">
                <div className="flex justify-center items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-neutral-800"></div>
                    <Link to="/" className="text-4xl font-semibold">Circles</Link>
                </div>
            </header>
            
            <section className="mb-6 max-w-96">
                <h1 className="text-3xl font-semibold text-center mb-2">Sign Up</h1>
                <p className="text-neutral-500  text-center text-sm">Enter your credentials below to sign in.</p>
            </section>

            {formErrors && formErrors.length > 0 && (
                <section className="max-w-96 w-full mb-4">
                    <ul>
                        {formErrors.map((error, idx) => (
                            <li key={idx} className="list-disc mb-1"><p className="text-red-600">{error.msg}</p></li>
                        ))}
                    </ul>
                </section>
            )}

            <section className="max-w-96 w-full">
                <form className="w-full mx-auto" onSubmit={emailSignUpSubmission}>
                    <div className="flex flex-col gap-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="firstName" className="text-sm font-medium text-right">First Name *</label>
                            <input 
                                type="text" 
                                id="firstName" 
                                name="firstName" 
                                minLength="1"
                                placeholder="John"
                                onChange={(e) => handleInputChange(e, setFormData)}
                                value={formData.firstName}
                                required
                                className="input col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="lastName" className="text-sm font-medium text-right">Last Name *</label>
                            <input 
                                type="text" 
                                id="lastName" 
                                name="lastName" 
                                minLength="1"
                                placeholder="Doe"
                                onChange={(e) => handleInputChange(e, setFormData)}
                                value={formData.lastName}
                                required
                                className="input col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="email" className="text-sm font-medium text-right">Email *</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                minLength="1"
                                placeholder="name@example.com"
                                onChange={(e) => handleInputChange(e, setFormData)}
                                value={formData.email}
                                required
                                className="input col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="password" className="text-sm font-medium text-right">Password *</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                minLength="1"
                                placeholder="********"
                                onChange={(e) => handleInputChange(e, setFormData)}
                                value={formData.password}
                                required
                                className="input col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="passwordConfirm" className="text-sm font-medium text-right">Password Confirm *</label>
                            <input 
                                type="password" 
                                id="passwordConfirm" 
                                name="passwordConfirm" 
                                minLength="1"
                                placeholder="********"
                                onChange={(e) => handleInputChange(e, setFormData)}
                                value={formData.passwordConfirm}
                                required
                                className="input col-span-3"
                            />
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="bg-slate-500 w-full px-6 py-2 text-neutral-50 font-medium rounded-md hover:bg-slate-700 transition ease duration-200">Sign Up</button>
                        </div>
                    </div>
                </form>
            </section>
            <div className="flex items-center my-6 max-w-96 w-full">
                <div className="flex-grow bg-neutral-300 h-0.5"></div> {/* Left bar */}
                <p className="mx-2 text-sm font-medium text-neutral-500">OR CONTINUE WITH</p>
                <div className="flex-grow bg-neutral-300 h-0.5"></div> {/* Right bar */}
            </div>
            <section className="max-w-96 w-full flex flex-col gap-3 mb-4">
                <form className="w-full mx-auto" onSubmit={(e) => handleLogin(e, "demo", setFormErrors, navigate)}>
                    <div>
                        <button type="submit" className="bg-slate-400 w-full px-6 py-2 font-medium rounded-md hover:bg-slate-500 transition ease duration-200">Demo Account</button>
                    </div>
                </form>
                <form className="w-full mx-auto">
                    <div>
                        <button type="submit" className="flex justify-center items-center gap-3 bg-google-400 text-neutral-50 w-full px-6 py-2 font-medium rounded-md hover:bg-google-700 transition ease duration-200">
                            <div className="bg-white rounded-full p-0.5">
                                <img src={googleLogo} alt="Google logo" />
                            </div>
                            Sign up with Google
                        </button>
                    </div>
                </form>
            </section>
            <p className="font-medium text-sm text-neutral-500">Already have an acount? <Link to="/login" className="text-slate-800 hover:text-slate-500 hover:underline transition ease duration-200">Login.</Link></p>

        </main>
    )
};

export default SignUpPage;