import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PageWrapper from "../components/wrappers/PageWrapper";
import Post from "../components/Post";
import { getSpecificUser, getUserPosts, handleInputChange, createPost } from "../globals/utilityFunctions";
import { postMaxLength } from "../globals/globalVariables";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [postFormData, setPostFormData] = useState({ post: "" });
    const { userId } = useParams();

    const postsGlobal = useSelector(state => state.posts);
    const formRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Reset the form after submission
    const resetForm = () => {
        setPostFormData({ post: "" });
    };

    // Get the user
    useEffect(() => {
        getSpecificUser(userId, setUser, navigate, dispatch);
    }, []);

    // Get posts from the user
    useEffect(() => {
        getUserPosts(userId, setPosts, navigate, dispatch);
    }, [postsGlobal]);

    return (
        <PageWrapper>
            {user && 
                <>
                    <section className="flex flex-col gap-5">
                        <div>
                            <img 
                                src={user.profilePicture} 
                                alt="Profile picture"
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />
                            <p className="font-medium text-center">{user.fullName}</p>
                            <p className="text-center text-neutral-500">{user.email}</p>
                            <p className="text-sm text-center text-neutral-500 mt-3">Member since {user.joinDateFormatted}</p>
                        </div>
                        <div>
                            <p className="text-neutral-500 mb-2">Create a post by typing your thoughts in the input below and click the "Post" button.</p>
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
                                        className={`button px-6 py-2 font-medium text-sm rounded-md transition ease duration-200 ${
                                            postFormData.post.length === 0 ? 'bg-slate-200 text-neutral-400 cursor-not-allowed' : 'bg-slate-700 text-neutral-50 hover:bg-slate-500'
                                        }`}
                                        disabled={postFormData.post.length === 0}
                                    >Post</button>
                                </div>
                            </form>
                        </div>
                    </section>

                    <hr className="my-8 border-neutral-400"/>

                    <section className="flex flex-col gap-8">
                        {posts.length > 0  
                            ? posts.map((post) => (
                                <Link key={post.id} to={`/post/${post.id}`}>
                                    <Post post={post} />
                                </Link>
                            ))
                            : <p className="text-neutral-500 text-center">This user has no posts.</p>
                        }
                    </section>
                </>
            }
        </PageWrapper>
    );
}

export default ProfilePage;
