import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";


import Nav from "../components/Nav";
import Post from "../components/Post";
import { handleInputChange, createPost, getPosts } from "../globals/utilityFunctions";
import { postMaxLength } from "../globals/globalVariables";

const HomePage = () => {
    const formRef = useRef(null);
    const [postFormData, setPostFormData] = useState({ post: "" });
    const posts = useSelector(state => state.posts.posts);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Reset the form after submission
    const resetForm = () => {
        setPostFormData({ post: "" });
    };

    // Get all of the posts on inital page load
    useEffect(() => {
        getPosts(navigate, dispatch);
    }, []);

    return (
        <main className="flex min-h-screen">
            <Nav />
            <div className="p-8 pb-24 max-w-3xl mx-auto h-full xs:p-12 xs:pb-28 lg:p-8">
                <header className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold">Home</h1>
                    <div>
                        <p className="text-neutral-500 text-base mb-1">Welcome to your feed! Here you can connect with friends, share updates, and discover new content.</p>
                        <p className="text-neutral-500">Create a post by typing your thoughts in the input below and click the "Post" button.</p>
                    </div>

                    <form ref={formRef} onSubmit={(e) => { createPost(e, postFormData, formRef, resetForm, navigate, dispatch) }}>
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
                </header>

                <section className="flex flex-col gap-8 mt-16">
                    {posts.length > 0 && posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </section>
            </div>
        </main>
    )
};

export default HomePage;