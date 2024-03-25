import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import googleLogo from "../assets/images/Google__G__logo.svg";
import { handleInputChange } from "../globals/utilityFunctions";

const LoginPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState(null);

    // Cookies
    const [cookies, setCookie] = useCookies(["jwt"]);
    
    // Post request to server for user authentication
    const emailLoginSubmission = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            // If sucessful, this will return a success object with the user object
            // If not successful, this will return an error message
            const responseData = await response.json();

            // Save the JWT token in a cookie
            if (response.ok) {              
                const expiryDate = new Date();
                // Set expiry date 1 day from now
                expiryDate.setDate(expiryDate.getDate() + 1);

                // Save the jwt token in a cookie
                // The cookies are automatically sent with every HTTP request to the server
                setCookie("jwt", responseData.token, {
                    expires: expiryDate,
                    path: "/",
                    httpOnly: true,   // This setting is a security feature to ensure that the cookie isnt accessible via JavaScript
                });

                navigate("/");
            } else {
                setLoginError(responseData.message);
            }
            
        } catch(err) {
            console.err("Login Error", err);
        }
    }

    return(
        <main className="flex flex-col justify-center items-center px-8 py-10 lg:py-24">
            <header className="mb-10 lg:mb-16">
                <div className="flex justify-center items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-neutral-800"></div>
                    <Link to="/" className="text-4xl font-semibold">Circles</Link>
                </div>
            </header>
            
            <section className="mb-6 max-w-96">
                <h1 className="text-3xl font-semibold text-center mb-2">Login</h1>
                <p className="text-neutral-500  text-center text-sm">Enter your credentials below to sign up.</p>
            </section>

            {loginError && (
                <section className="mb-4 self-start">
                    <ul>
                        <li className="list-disc mb-1"><p className="text-red-600">{loginError}</p></li>
                    </ul>
                </section>
            )}

            <section className="max-w-96 w-full">
                <form className="w-full mx-auto" onSubmit={emailLoginSubmission}>
                    <div className="flex flex-col gap-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="username" className="text-sm font-medium text-right">Email *</label>
                            <input 
                                type="email" 
                                id="username" 
                                name="username" 
                                minLength="1"
                                placeholder="name@example.com"
                                onChange={(e) => handleInputChange(e, formData, setFormData)}
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
                                onChange={(e) => handleInputChange(e, formData, setFormData)}
                                required
                                className="input col-span-3"
                            />
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="bg-slate-500 w-full px-6 py-2 text-neutral-50 font-medium rounded-md hover:bg-slate-700 transition ease duration-200">Login</button>
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
                <form className="w-full mx-auto">
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
                            Sign in with Google
                        </button>
                    </div>
                </form>
            </section>
            <p className="font-medium text-sm text-neutral-500">Don't have an account? <Link to="/sign-up" className="text-slate-800 hover:text-slate-500 hover:underline transition ease duration-200">Sign up.</Link></p>
        </main>
    )
};

export default LoginPage;