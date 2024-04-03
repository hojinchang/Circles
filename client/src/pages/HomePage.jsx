import { useState } from "react";
import axios from "axios";

import Nav from "../components/Nav";
import { handleInputChange } from "../globals/utilityFunctions";
import { createPostAPIPath } from "../globals/globalVariables";

const HomePage = () => {

    const [postData, setPostData] = useState({ post: "" });
    const [formErrors, setFormErrors] = useState(null);
    const postMaxLength = 400;

    const handleFormSubmission = async(e) => {
        e.preventDefault();
        try {
            // When using axios, you dont need to JSON.stringify(data) your request body
            const response = await axios.post(createPostAPIPath, postData);

            if (response.status !== 201) {
                setFormErrors(response.body.errors);
            }

        } catch(err) {
            console.error("Create Post Error", err);
        }
    }
    
    return (
        <main className="flex min-h-screen">
            <Nav />
            <div className="p-8 max-w-3xl mx-auto h-full xs:p-12">
                <header className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold">Home</h1>
                    <div>
                        <p className="text-neutral-500 text-base mb-1">Welcome to your feed! Here you can connect with friends, share updates, and discover new content.</p>
                        <p className="text-neutral-500">Create a post by typing your thoughts in the input below and click the "Post" button.</p>
                    </div>

                    {formErrors && formErrors.length > 0 && (
                        <section className="max-w-96 w-full mb-4">
                            <ul>
                                {formErrors.map((error, idx) => (
                                    <li key={idx} className="list-disc mb-1"><p className="text-red-600">{error.msg}</p></li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <form onSubmit={handleFormSubmission}>
                        <div>
                            <label htmlFor="post" className="sr-only">Post</label>
                            <textarea
                                id="post"
                                className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-md text-base focus:outline-neutral-400"
                                name="post"
                                cols="20" 
                                rows="4"
                                maxLength="400"
                                placeholder="Share your thoughts..."
                                onChange={(e) => handleInputChange(e, setPostData)}
                                required
                            ></textarea>
                        </div>
                        <div className="flex justify-between w-full">
                            <p className="text-sm text-neutral-500">
                                {postData.post.length} / {postMaxLength} characters
                            </p>
                            <button type="submit" className="bg-slate-500 text-neutral-50 px-6 py-2 font-medium text-sm rounded-md hover:bg-slate-700 transition ease duration-200">Post</button>
                        </div>
                    </form>
                </header>
            </div>
        </main>
    )
};

export default HomePage;