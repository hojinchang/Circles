import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PageWrapper from "../components/wrappers/PageWrapper";
import Post from "../components/Post";
import DeleteAccountModal from "../components/modals/DeleteAccountModal";
import ModalWrapper from "../components/modals/ModalWrapper";
import { getSpecificUser, getUserPosts, handleInputChange, createPost, handlePopups, stopPropagation, deleteUser } from "../globals/utilityFunctions";
import { postMaxLength, demoUserId } from "../globals/globalVariables";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [postFormData, setPostFormData] = useState({ post: "" });
    const [modals, setModals] = useState({
        edit: { open: false, fadeOut: false },
        delete: { open: false, fadeOut: false }
    });

    const { userId } = useParams();
    const postsGlobal = useSelector(state => state.posts);

    // Get the current user ID from Redux
    const currentUserId = useSelector(state => state.authenticated.isAuth);

    const formRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Reset the form after submission
    const resetForm = () => {
        setPostFormData({ post: "" });
    };

    // Function to check if a user is the demo user
    const isDemoUser = (userId) => {
        return userId === demoUserId;
    };

    // Get the user
    useEffect(() => {
        getSpecificUser(userId, setUser, navigate, dispatch);
    }, [userId]);

    // Get posts from the user
    useEffect(() => {
        getUserPosts(userId, setPosts, navigate, dispatch);
    }, [postsGlobal]);

    return (
        <PageWrapper>
            {user && 
                <>
                    <section className="flex flex-col gap-5">
                        <div className="flex justify-center gap-8 sm:gap-20 lg:gap-32">
                            {(!isDemoUser(user.id)) 
                                ? (user.id === currentUserId)
                                    ? <>
                                        <button className="flex gap-2 items-center p-2 w-fit font-semibold text-green-600 rounded-md transition duration-200 lg:hover:bg-neutral-200">
                                            <svg fill="currentColor" width="20" height="20" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z" fillRule="nonzero"/>
                                            </svg>
                                            <p className="text-sm">Edit Account</p>
                                        </button>
                                        <button 
                                            className="flex gap-2 items-center p-2 w-fit font-semibold text-red-600 rounded-md transition duration-200 lg:hover:bg-neutral-200"
                                            onClick={(e) => {
                                                stopPropagation(e);
                                                handlePopups( "delete", setModals );
                                            }}
                                        >
                                            <svg fill="currentColor" width="20" height="20" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z" fillRule="nonzero"/>
                                            </svg>
                                            <p className="text-sm">Delete Account</p>
                                        </button>
                                    </>
                                    : <>
                                        <button className="flex gap-2 items-center p-2 w-fit font-semibold text-green-600 rounded-md transition duration-200 lg:hover:bg-neutral-200">
                                            <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" aria-hidden="true">
                                                <path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/>
                                            </svg>
                                            <p className="text-sm">Send a Message</p>
                                        </button>
                                        <button className="flex gap-2 items-center p-2 w-fit font-semibold text-green-600 rounded-md transition duration-200 lg:hover:bg-neutral-200">
                                            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                <path d="M.002 20h6.001c-.028-6.542 2.995-3.697 2.995-8.901 0-2.009-1.311-3.099-2.998-3.099-2.492 0-4.226 2.383-1.866 6.839.775 1.464-.825 1.812-2.545 2.209-1.49.344-1.589 1.072-1.589 2.333l.002.619zm20.498-7c-1.932 0-3.5 1.567-3.5 3.5s1.568 3.5 3.5 3.5 3.5-1.567 3.5-3.5-1.568-3.5-3.5-3.5zm1.5 4h-1v1h-1v-1h-1v-1h1v-1h1v1h1v1zm-4.814 3h-9.183l-.003-.829c0-1.679.133-2.649 2.118-3.107 2.243-.518 4.458-.981 3.394-2.945-3.156-5.82-.901-9.119 2.488-9.119 4.06 0 4.857 4.119 3.085 7.903-1.972.609-3.419 2.428-3.419 4.597 0 1.38.589 2.619 1.52 3.5z"/>
                                            </svg>
                                            <p className="text-sm">Add as Friend</p>
                                        </button>
                                    </>
                                : <p className="text-center">You are currently using the demo account. Login with a custom account to be able to change your credentials.</p>
                            }
                        </div>
                        <div>
                            <img 
                                src={user.profilePicture} 
                                alt="Profile picture"
                                className="w-28 h-28 rounded-full mx-auto mb-4"
                            />
                            <p className="font-medium text-center">{user.fullName}</p>
                            <p className="text-center text-neutral-500">{user.email}</p>
                            <p className="text-sm text-center text-neutral-500 mt-3">Member since {user.joinDateFormatted}</p>
                        </div>
                        {(user.id === currentUserId) && (
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
                        )}
                    </section>

                    <hr className="my-8 border-neutral-400"/>

                    <section className="flex flex-col gap-8">
                        <h2 className="text-2xl font-bold">{user.fullName ? user.fullName : user.email}'s Posts</h2>
                        {posts.length > 0  
                            ? posts.map((post) => (
                                <Link key={post.id} to={`/post/${post.id}`}>
                                    <Post post={post} />
                                </Link>
                            ))
                            : <p className="text-neutral-500 text-center">
                                {(userId === currentUserId) ? "You have no posts." : "This user has no posts."}
                            </p>
                        }
                    </section>

                    {modals["delete"].open && (
                        <ModalWrapper fadeOut={ modals["delete"].fadeOut } toggleModal={ () => handlePopups( "delete", setModals ) } >
                            <DeleteAccountModal toggleModal={ () => handlePopups( "delete", setModals ) } deleteAccount={ () => deleteUser(user.id, navigate, dispatch) } />
                        </ModalWrapper>
                    )}
                </>
            }
        </PageWrapper>
    );
}

export default ProfilePage;
