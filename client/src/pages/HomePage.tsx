import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import PageWrapper from "../components/wrappers/PageWrapper";
import Post from "../components/Post";
import { handleInputChange, createPost, getPosts } from "../globals/utilityFunctions";
import { postMaxLength } from "../globals/globalVariables";

import { PostInterface } from "../types/Post";
import { RootState } from "../store/store";

const HomePage = () => {
    const [postFormData, setPostFormData] = useState({ post: "" });
    const posts = useSelector(( state: RootState ) => state.posts.posts);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formRef = useRef<HTMLFormElement>(null);

    // Reset the form after submission
    const resetForm = () => {
        setPostFormData({ post: "" });
    };

    // Get all of the posts on inital page load and whenever the posts Redux state updates
    useEffect(() => {
        getPosts({ navigate, dispatch });
    }, []);


    return (
        <PageWrapper>
            <section className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold">Home</h1>
                <div>
                    <p className="text-neutral-500 text-base mb-1">Welcome to your feed! Here you can connect with friends, share updates, and discover new content.</p>
                    <p className="text-neutral-500">Create a post by typing your thoughts in the input below and click the "Post" button.</p>
                </div>

                <form ref={ formRef } onSubmit={(e) => { createPost({ e, formData: postFormData, formRef, resetForm, navigate, dispatch }) }}>
                    <div>
                        <label htmlFor="post" className="sr-only">Post</label>
                        <textarea
                            id="post"
                            className="w-full p-2 bg-neutral-50 border border-neutral-300 rounded-md text-base focus:outline-neutral-400"
                            name="post"
                            cols={ 20 } 
                            rows={ 4 }
                            maxLength={ 400 }
                            placeholder="Share your thoughts..."
                            onChange={ (e) => handleInputChange(e, setPostFormData) }
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-between w-full">
                        <p className="text-sm text-neutral-500">
                            { postFormData.post.length } / { postMaxLength } characters
                        </p>
                        <button 
                            type="submit" 
                            className={ `button px-6 py-2 font-medium text-sm rounded-md transition ease duration-200 ${
                                postFormData.post.length === 0 ? 'bg-slate-200 text-neutral-400 cursor-not-allowed' : 'bg-slate-700 text-neutral-50 hover:bg-slate-500'
                            }` }
                            disabled={ postFormData.post.length === 0 }
                        >Post</button>
                    </div>
                </form>
            </section>

            <hr className="my-8 border-neutral-400"/>

            {/* If posts exist, create a new section and output the posts */}
            <section className="flex flex-col gap-8">
                <h2 className="text-2xl font-bold">All Posts</h2>
                {posts.length > 0 && posts.map(( post: PostInterface ) => (
                    <Link key={ post.id } to={ `/post/${ post.id }` }>
                        <Post post={ post } />
                    </Link>
                ))}
            </section>
        </PageWrapper>          
    )
};

export default HomePage;