import { useState } from "react";

import Nav from "../components/Nav";
import { handleInputChange } from "../globals/utilityFunctions";

const HomePage = () => {

    const [postData, setPostData] = useState({ post: "" });
    const postMaxLength = 400;
    
    return (
        <main className="p-8 max-w-3xl mx-auto h-full xs:p-12">
            <header className="flex flex-col gap-4">
                <h1 className="text-4xl font-semibold">Home</h1>
                <div>
                    <p className="text-neutral-500 text-base mb-1">Welcome to your feed! Here you can connect with friends, share updates, and discover new content.</p>
                    <p className="text-neutral-500">Create a post by typing your thoughts in the input below and click the "Post" button.</p>
                </div>
                <form>
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

            <Nav />
        </main>
    )
};

export default HomePage;