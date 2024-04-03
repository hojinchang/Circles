import { useState, useRef } from "react";
import axios from "axios";

import Nav from "../components/Nav";
import AddPostModal from "../components/AddPostModal";
import { handleInputChange, handlePostFormSubmission } from "../globals/utilityFunctions";
import { createPostAPIPath } from "../globals/apiPaths";
import { postMaxLength } from "../globals/globalVariables";

const HomePage = () => {
    const formRef = useRef(null);
    const [postData, setPostData] = useState({ post: "" });

    const resetForm = () => {
        setPostData({ post: "" });
    }

    // const handleFormSubmission = async(e) => {
    //     e.preventDefault();
    //     try {
    //         // When using axios, you dont need to JSON.stringify(data) your request body
    //         const response = await axios.post(createPostAPIPath, postData);
    //         formRef.current.reset();

    //         if (response.status === 201) {
    //             // Reset the post data state
    //             resetForm();
    //         }
    //     } catch(err) {
    //         console.error("Create Post Error", err);
    //     }
    // }
    
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

                    <form ref={formRef} onSubmit={(e) => { handlePostFormSubmission(e, postData, formRef, resetForm) }}>
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

                <AddPostModal handlePostFormSubmission={handlePostFormSubmission} />
            </div>
        </main>
    )
};

export default HomePage;