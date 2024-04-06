import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Nav from "../components/Nav";
import Post from "../components/Post";
import { handleInputChange, getPost } from "../globals/utilityFunctions";
import { postMaxLength } from "../globals/globalVariables";

const PostPage = () => {
    const [post, setPost] = useState(null);
    const [postFormData, setPostFormData] = useState({ post: "" });
    const { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Reset the form after submission
    const resetForm = () => {
        setPostFormData({ post: "" });
    };

    useEffect(() => {
        getPost(id, setPost, navigate, dispatch);
    }, []);

    return (
        <main className="main">
            <Nav />
            {post && 
                <div className="p-8 pb-24 max-w-3xl mx-auto w-full h-full xs:p-12 xs:pb-28 lg:p-8">
                    <section className="flex flex-col gap-4">
                        <Post post={post} />

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
                                    placeholder="Reply to this post..."
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
                                    className={`px-6 py-2 font-medium text-sm rounded-md transition ease duration-200 ${
                                        postFormData.post.length === 0 ? 'bg-slate-200 text-neutral-400 cursor-not-allowed' : 'bg-slate-700 text-neutral-50 hover:bg-slate-500'
                                    }`}
                                    disabled={postFormData.post.length === 0}
                                >Post</button>
                            </div>
                        </form>
                    </section>
                    <hr className="my-8 border-neutral-400"/>
                </div>
            }
        </main>
    )
}

export default PostPage;