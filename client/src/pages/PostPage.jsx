import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Nav from "../components/Nav";
import Post from "../components/Post";
import Comment from "../components/Comment";
import { handleInputChange, getPosts, createComment } from "../globals/utilityFunctions";
import { postMaxLength } from "../globals/globalVariables";

const PostPage = () => {
    const [postFormData, setPostFormData] = useState({ post: "" });
    const { postId } = useParams();
    
    const postGlobal = useSelector(state => state.posts.posts.find(post => post.id === postId));
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formRef = useRef(null);
    
    // Reset the form after submission
    const resetForm = () => {
        setPostFormData({ post: "" });
    };

    useEffect(() => {
        getPosts(navigate, dispatch);
    }, []);

    return (
        <main className="main">
            <Nav />
            {postGlobal ?
                <div className="p-8 pb-24 max-w-3xl mx-auto w-full h-full xs:p-12 xs:pb-28 lg:p-8">
                    <section className="flex flex-col gap-4">
                        <div className="flex gap-4 items-center">
                            <Link to="/">
                                <svg width="24" height="24" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fillRule="nonzero"/>
                                </svg>
                            </Link>
                            <p>Home</p>
                        </div>
                        <Post post={postGlobal} />
                        <form ref={formRef} onSubmit={(e) => { createComment(e, postId, postFormData, formRef, resetForm, navigate, dispatch) }}>
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
                    <section className="flex flex-col gap-4">
                        {postGlobal.comments.length > 0 
                            ? (postGlobal.comments.toReversed().map((comment) => {
                                return <Comment key={comment.id} postId={postId} comment={comment} />
                            }))
                            : <p className="text-neutral-500 text-center">This post has no comments.</p>
                        }
                    </section>
                </div>
                :
                <div className="max-w-3xl mx-auto w-full min-h-screen flex justify-center items-center">
                    <h1 className="font-bold text-xl">Post not found</h1>
                </div>
            }
        </main>
    )
}

export default PostPage;