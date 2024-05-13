import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import escapeHtml from "escape-html";

import DeletePostModal from "./modals/DeletePostModal";
import EditPostModal from "./modals/EditPostModal";
import ModalWrapper from "./modals/ModalWrapper";
import { stopPropagation, handlePopups, deletePost, likePost } from "../globals/utilityFunctions";

import { PostInterface } from "../types/Post";
import { RootState } from "../store/store";

interface PostProps {
    post: PostInterface;
}
const Post: React.FC<PostProps> = ({ post }) => {
    const [modals, setModals] = useState({
        option: { open: false, fadeOut: false },
        update: { open: false, fadeOut: false },
        delete: { open: false, fadeOut: false }
    });

    const postRef = useRef<HTMLDivElement>(null);

    // Get the current user ID from Redux
    const currentUserId = useSelector(( state: RootState ) => state.authenticated.isAuth) as string;
    const hasLiked = post.likes.some(userId => userId === currentUserId);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Wrapper function to delete specific post given id
    const deletePostHandler = () => {
        deletePost({ postId: post.id, navigate, dispatch });
    }

    // Convert special characters to HTML tags and convert newline to <br>
    const formatContent = ( content: string ) => {
        return escapeHtml(content).replace(/\n/g, '<br>');
    };

    // Close options when clicked outside of the post article
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (postRef.current && !postRef.current.contains(e.target as Node)) {
                // If the modal is open, start the fade-out animation
                if (modals.option.open) {
                    setModals(prevState => ({
                        ...prevState,
                        option: { open: true, fadeOut: true }
                    }));
        
                    // After the animation has completed, close the modal
                    setTimeout(() => {
                        setModals(prevState => ({
                            ...prevState,
                            option: { open: false, fadeOut: false }
                        }));
                    }, 275);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [postRef]);

    return (
        <>
            {post.user && (
                <article ref={postRef} className="flex flex-col gap-3 p-4 border border-neutral-300 rounded-lg relative">
                    {(post.user.id === currentUserId) && (
                        <button 
                            className="absolute right-0 top-0 p-4 rounded-md hover:bg-neutral-300" 
                            onClick={(e) => {
                                stopPropagation(e);
                                handlePopups({ modalKey: "option", setModals });
                            }}
                        >
                            <svg className="w-4 h-4 text-neutral-700" fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.91 41.91" xmlSpace="preserve">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> <g> <g> 
                                    <path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585 C8.705,15.371,11.214,17.874,11.214,20.956z"></path> 
                                    <path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585 C24.056,15.371,26.564,17.874,26.564,20.956z"></path> 
                                    <path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585 C39.406,15.371,41.915,17.874,41.915,20.956z"></path> 
                                </g> </g> </g>
                            </svg>
                        </button>
                    )}
                    <div>
                        <button onClick={ (e) => {
                            stopPropagation(e);
                            navigate(`/user/${post.user.id}`);
                        } } className="z-50 flex gap-4 text-left">
                            <img 
                                src={ post.user.profilePicture } 
                                alt="Profile picture"
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <p className="hover:underline">{ post.user.fullName }</p>
                                <p className="text-neutral-500 hover:underline">{ post.user.email }</p>
                            </div>
                        </button>
                    </div>
                    {/* 
                        CLient side escaping.
                        Use dangerouslySetInnerHTML to convert special characters into their HTML entitites
                    */}
                    <p className="text-lg font-normal" dangerouslySetInnerHTML={{ __html: formatContent(post.post) }}></p>
                    <p className="text-neutral-500">{ post.timeStampFormatted }</p>
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <button 
                                className="z-500" 
                                onClick={ (e) => {
                                    stopPropagation(e);
                                    likePost({ postId: post.id, navigate, dispatch })
                                } }
                            >
                                <svg 
                                    className="w-5 h-5 text-neutral-700 transition duration-200 hover:text-neutral-400" 
                                    role="img" 
                                    fill={ hasLiked ? "currentColor" : "none" } 
                                    stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-1 -1 26 26" aria-label="Like button" 
                                >
                                    <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/>
                                </svg>
                            </button>
                            <span>{ post.likes.length }</span>
                        </div>
                        {post.comments &&
                            <div className="flex items-center gap-2">
                                <button>
                                    <svg className="w-5 h-5 text-neutral-700 transition duration-200 hover:text-neutral-400" role="img" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" stroke="currentColor" strokeWidth="0.8" viewBox="-1 -1 25 25" aria-label="Comment button">
                                        <path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007m0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007"/>
                                    </svg>
                                </button>
                                <span>{ post.comments.length }</span>
                            </div>
                        }
                    </div>

                    {modals["option"].open && (
                        <div className={`flex flex-col absolute right-0 top-12 z-10 g-2 border bg-neutral-50 border-neutral-300 rounded-md w-24 shadow-md ${modals["option"].fadeOut ? 'fade-out' : 'fade-in'}`}>
                            <button 
                                className="button py-1 text-sm hover:bg-neutral-300 w-full rounded-sm transition duration-200"
                                onClick={ (e) => {
                                    stopPropagation(e);
                                    handlePopups({ modalKey: "update", setModals });
                                    handlePopups({ modalKey: "option", setModals });
                                } }
                            >
                                Edit
                            </button>
                            <button 
                                className="button py-1 text-sm hover:bg-neutral-300 w-full rounded-sm transition duration-200" 
                                onClick={ (e) => {
                                    stopPropagation(e);
                                    handlePopups({ modalKey: "delete", setModals });
                                    handlePopups({ modalKey: "option", setModals });
                                } }
                            >
                                Delete
                            </button>
                        </div>
                    )}

                    {modals["update"].open && (
                        <ModalWrapper fadeOut={ modals["update"].fadeOut } toggleModal={ () => handlePopups({ modalKey: "update", setModals }) } >
                            <EditPostModal post={ post } toggleModal={ () => handlePopups({ modalKey: "update", setModals }) } />
                        </ModalWrapper>
                    )}

                    {modals["delete"].open && (
                        <ModalWrapper fadeOut={ modals["delete"].fadeOut } toggleModal={ () => handlePopups({ modalKey: "delete", setModals }) }>
                            <DeletePostModal toggleModal={ () => handlePopups({ modalKey: "delete", setModals }) } deletePost={ deletePostHandler } />
                        </ModalWrapper>
                    )}
                </article>
            )}
        </>
    )
}

export default Post;