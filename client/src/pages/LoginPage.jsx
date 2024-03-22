import { Link } from "react-router-dom";

const LoginPage = () => {

    return(
        <main className="flex flex-col justify-center items-center px-8 py-32">
            <header className="mb-10">
                <div className="flex justify-center items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-neutral-800"></div>
                    <Link to="/" className="text-4xl font-semibold">Circles</Link>
                </div>
            </header>
            
            <section className="mb-6 w-full">
                <h1 className="text-3xl font-semibold text-center mb-2">Sign in</h1>
                <p className="text-neutral-600  text-center text-sm">Enter your credentials below to sign in.</p>
            </section>

            <section className="w-full">
                <form className="max-w-96 mx-auto">
                    <div className="flex flex-col gap-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="email" className="text-sm font-medium text-right">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                minLength="1"
                                placeholder="name@example.com"
                                required
                                className="input col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="password" className="text-sm font-medium text-right">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                minLength="1"
                                placeholder="********"
                                required
                                className="input col-span-3"
                            />
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="bg-slate-500 w-full px-6 py-2 text-neutral-50 font-medium rounded-md hover:bg-slate-700 transition ease duration-200">Sign In</button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    )
};

export default LoginPage;