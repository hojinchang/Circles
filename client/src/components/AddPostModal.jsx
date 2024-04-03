import { useState, useRef } from "react";

import { postMaxLength } from "../globals/globalVariables";
import { handleInputChange } from "../globals/utilityFunctions";

const AddPostModal = ({ handlePostFormSubmission }) => {
    const formRef = useRef(null);
    const [postData, setPostData] = useState({ post: "" });

    const resetForm = () => {
        setPostData({ post: "" });
    }

    return (
        <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">Create Post</h3>
            <p className="text-neutral-500">Create a post by typing your thoughts in the input below and click the "Post" button.</p>
            <form className="mt-1" ref={formRef} onSubmit={(e) => { handlePostFormSubmission(e, postData, formRef, resetForm) }}>
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
                    <button 
                        type="submit" 
                        className={`px-6 py-2 font-medium text-sm rounded-md transition ease duration-200 ${
                            postData.post.length === 0 ? 'bg-slate-200 text-neutral-400 cursor-not-allowed' : 'bg-slate-500 text-neutral-50 hover:bg-slate-700'
                        }`}
                        disabled={postData.post.length === 0}
                    >Post</button>
                </div>
            </form>
        </div>
    )
}

export default AddPostModal;