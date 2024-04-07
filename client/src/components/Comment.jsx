import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import escapeHtml from 'escape-html';

import DeleteCommentModal from "./DeleteCommentModal";
import EditCommentModal from "./EditCommentModal";
import ModalWrapper from "./ModalWrapper";
import { stopPropagation, handlePopups, deleteComment, likeComment } from "../globals/utilityFunctions";

const Comment = ({ postId, comment }) => {
    const [optionOpen, setOptionOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [optionFadeOut, setOptionFadeOut] = useState(false);
    const [updateModalFadeOut, setUpdateModalFadeOut] = useState(false);
    const [deleteModalFadeOut, setDeleteModalFadeOut] = useState(false);
    const commentRef = useRef(null);

    // Get the current user ID from Redux
    const currentUserId = useSelector(state => state.authenticated.isAuth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Wrapper function to delete specific post given id
    const deleteCommentHandler = () => {
        deleteComment(postId, comment.id, navigate, dispatch);
    }

    // Convert special characters to HTML tags and convert newline to <br>
    const formatContent = (content) => {
        return escapeHtml(content).replace(/\n/g, '<br>');
    };

    // Close options when clicked outside of the post article
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (commentRef.current && !commentRef.current.contains(e.target)) {
                setOptionFadeOut(true);
                setTimeout(() => {
                    setOptionOpen(false);
                }, 275);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [commentRef]);

    return (
        <article ref={commentRef} className="flex flex-col gap-2 p-4 border border-neutral-300 rounded-lg relative">
            {(comment.user.id === currentUserId) && (
                <button 
                    className="absolute right-0 top-0 p-4 rounded-md hover:bg-neutral-300" 
                    onClick={ (e) => {
                        stopPropagation(e);
                        handlePopups( optionOpen, setOptionOpen, setOptionFadeOut );
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
                <p>{comment.user.fullName}</p>
                <p className="text-neutral-500">{comment.user.email}</p>
            </div>
            {/* 
                CLient side escaping.
                Use dangerouslySetInnerHTML to convert special characters into their HTML entitites
            */}
            <p className="text-lg font-normal" dangerouslySetInnerHTML={{ __html: formatContent(comment.post) }}></p>
            <p className="text-neutral-500">{comment.timeStampFormatted}</p>
            <div className="flex gap-6">
                <div className="flex items-center gap-2">
                    <button 
                        className="z-100" 
                        onClick={(e) => {
                            stopPropagation(e);
                            likeComment(postId, comment.id, navigate, dispatch);
                        }}
                    >
                        <svg 
                            className="w-5 h-5 text-neutral-700 transition duration-200 hover:text-neutral-400" 
                            role="img" 
                            fill={(comment.likes.includes(currentUserId)) ? "currentColor" : "none"} 
                            stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-1 -1 26 26" aria-label="Like button" 
                        >
                            <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/>
                        </svg>
                    </button>
                    <span>{comment.likes.length}</span>
                </div>
            </div>

            {optionOpen && (
                <div className={`flex flex-col absolute right-0 top-12 z-10 g-2 border bg-neutral-50 border-neutral-300 rounded-md w-24 shadow-md ${optionFadeOut ? 'fade-out' : 'fade-in'}`}>
                    <button 
                        className="py-1 text-sm hover:bg-neutral-300 w-full rounded-sm transition duration-200"
                        onClick={(e) => {
                            stopPropagation(e);
                            handlePopups( updateModalOpen, setUpdateModalOpen, setUpdateModalFadeOut );
                            handlePopups( optionOpen, setOptionOpen, setOptionFadeOut );
                        }}
                    >
                        Edit
                    </button>
                    <button 
                        className="py-1 text-sm hover:bg-neutral-300 w-full rounded-sm transition duration-200" 
                        onClick={(e) => {
                            stopPropagation(e);
                            handlePopups( deleteModalOpen, setDeleteModalOpen, setDeleteModalFadeOut );
                            handlePopups( optionOpen, setOptionOpen, setOptionFadeOut );
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}

            {updateModalOpen && (
                <ModalWrapper fadeOut={ updateModalFadeOut } toggleModal={ () => handlePopups( updateModalOpen, setUpdateModalOpen, setUpdateModalFadeOut ) } >
                    <EditCommentModal postId={postId} comment={comment} toggleModal={ () => handlePopups( updateModalOpen, setUpdateModalOpen, setUpdateModalFadeOut ) } />
                </ModalWrapper>
            )}

            {deleteModalOpen && (
                <ModalWrapper fadeOut={ deleteModalFadeOut } toggleModal={ () => handlePopups( deleteModalOpen, setDeleteModalOpen, setDeleteModalFadeOut ) }>
                    <DeleteCommentModal toggleModal={ () => handlePopups( deleteModalOpen, setDeleteModalOpen, setDeleteModalFadeOut ) } deleteComment={ deleteCommentHandler } />
                </ModalWrapper>
            )}
        </article>
    )
}

export default Comment;