import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { postMaxLength } from "../../globals/globalVariables";
import { handleInputChange, createPost } from "../../globals/utilityFunctions";

const AddPostModal = ({ toggleModal }) => {
    const formRef = useRef(null);
    const [postFormData, setPostFormData] = useState({ post: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const resetForm = () => {
        setPostFormData({ post: "" });
    }

    return (
            <div className="modal"
                onClick={(e) => e.stopPropagation()}   // This prevents clicking of inside the modal to close the modal
            >
                <button 
                    className="button leading-none absolute right-4 top-2 text-2xl text-neutral-500 transition duration-200 hover:text-neutral-950" 
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleModal();
                    }}
                    >&times;
                </button>
                <h3 className="text-lg font-bold">Create Post</h3>
                <p className="text-neutral-500">Click "Post" when you're done.</p>
                <form 
                    className="mt-1" 
                    ref={formRef} 
                    onSubmit={async(e) => {
                        await createPost(e, postFormData, formRef, resetForm, navigate, dispatch);
                        toggleModal(); 
                    }}
                >
                    <div>
                        <label htmlFor="post" className="sr-only">Post</label>
                        <textarea
                            id="post"
                            className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-md text-base focus:outline-neutral-400"
                            name="post"
                            cols="20" 
                            rows="4"
                            maxLength={postMaxLength}
                            placeholder="Share your thoughts..."
                            onChange={(e) => handleInputChange(e, setPostFormData)}
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-between w-full">
                        <p className="text-sm text-neutral-500">
                            {postFormData.post.length} / {postMaxLength} characters
                        </p>
                        <button 
                            type="submit" 
                            className={`button px-6 py-2 font-medium text-sm rounded-md transition ease duration-200 ${
                                postFormData.post.length === 0 ? 'bg-slate-200 text-neutral-400 cursor-not-allowed' : 'bg-slate-700 text-neutral-50 hover:bg-slate-500'
                            }`}
                            disabled={postFormData.post.length === 0}
                        >Post</button>
                    </div>
                </form>
            </div>
    )
}

export default AddPostModal;