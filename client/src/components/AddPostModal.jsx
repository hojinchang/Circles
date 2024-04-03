import { useState, useRef } from "react";

import { postMaxLength } from "../globals/globalVariables";
import { handleInputChange } from "../globals/utilityFunctions";

const AddPostModal = ({ handlePostFormSubmission, onCreatePostClick }) => {
    const formRef = useRef(null);
    const [postData, setPostData] = useState({ post: "" });

    const resetForm = () => {
        setPostData({ post: "" });
    }

    return (
        <>
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-80" onClick={(e) => {
                        e.stopPropagation();
                        onCreatePostClick();
                    }}></div>
            <div className="flex flex-col gap-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-xl bg-neutral-50 w-full max-w-lg">
                <button 
                    className="absolute right-4 top-4 text-2xl text-neutral-500 transition duration-200 hover:text-neutral-950" 
                    onClick={(e) => {
                        e.stopPropagation();
                        onCreatePostClick();
                    }}
                    >&times;
                </button>
                <h3 className="text-lg font-bold">Create Post</h3>
                <p className="text-neutral-500">Click "Post" when you're done.</p>
                <form className="mt-1" ref={formRef} onSubmit={async(e) => {
                    await handlePostFormSubmission(e, postData, formRef, resetForm); 
                    onCreatePostClick(); 
                }}>
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
        </>
    )
}

export default AddPostModal;