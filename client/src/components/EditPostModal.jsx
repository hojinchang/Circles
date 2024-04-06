import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";

import { postMaxLength } from "../globals/globalVariables";
import { handleInputChange, getPost, updatePost } from "../globals/utilityFunctions";

const EditPostModal = ({ postId, toggleModal }) => {
    const [post, setPost] = useState(null);
    const [postFormData, setPostFormData] = useState({ post: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get the associated post
    useEffect(() => {
        getPost(postId, setPost, navigate, dispatch);
    }, []);

    // Save the post content into the postFormData state
    useEffect(() => {
        if (post && post.post) {
            setPostFormData({ post: post.post });
        }
    }, [post]);
    

    return (
        <>
            {post &&
                <div 
                    className="modal"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        className="leading-none absolute right-4 top-2 text-2xl text-neutral-500 transition duration-200 hover:text-neutral-950" 
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >&times;
                </button>
                    <h3 className="text-lg font-bold">Edit Post</h3>
                    <p className="text-neutral-500">Update your post.</p>
                    <form 
                        className="mt-1" 
                        onSubmit={async(e) => {
                            await updatePost(e, post.id, postFormData, navigate, dispatch);
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
                                value={postFormData.post}
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
                                className={`px-6 py-2 font-medium rounded-md transition ease duration-200 ${
                                    postFormData.post.length === 0 ? 'bg-slate-200 text-neutral-400 cursor-not-allowed' : 'bg-slate-700 text-neutral-50 hover:bg-slate-500'
                                }`}
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