import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";

import { postMaxLength } from "../../globals/globalVariables";
import { stopPropagation, handleInputChange, updatePost } from "../../globals/utilityFunctions";

const EditPostModal = ({ post, toggleModal }) => {
    const [formData, setFormData] = useState({ post: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Save the post content into the formData state
    useEffect(() => {
        if (post && post.post) {
            setFormData({ post: post.post });
        }
    }, [post]);

    return (
        <>
            {post &&
                <div 
                    className="modal z-20"
                    onClick={(e) => stopPropagation(e) }
                >
                    <button 
                        className="button leading-none absolute right-4 top-2 text-2xl text-neutral-500 transition duration-200 hover:text-neutral-950" 
                        onClick={(e) => {
                            stopPropagation(e);
                            toggleModal();
                        }}
                    >&times;
                </button>
                    <h3 className="text-lg font-bold">Edit Post</h3>
                    <p className="text-neutral-500">Edit your post.</p>
                    <form 
                        className="mt-1" 
                        onSubmit={async(e) => {
                            await updatePost(e, post.id, formData, navigate, dispatch);
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
                                maxLength="400"
                                placeholder="Share your thoughts..."
                                value={formData.post}
                                onChange={(e) => handleInputChange(e, setFormData)}
                                required
                            ></textarea>
                        </div>
                        <div className="flex justify-between w-full">
                            <p className="text-sm text-neutral-500">
                                {formData.post.length} / {postMaxLength} characters
                            </p>
                            <button
                                type="submit"
                                className={`button px-6 py-2 font-medium rounded-md transition ease duration-200 ${
                                    formData.post.length === 0 ? 'bg-slate-200 text-neutral-400 cursor-not-allowed' : 'bg-slate-700 text-neutral-50 hover:bg-slate-500'
                                }`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                Update Post
                            </button>
                        </div>
                    </form>
        
                </div>
            }
        </>
    );
}

export default EditPostModal;