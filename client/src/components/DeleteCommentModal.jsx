import { stopPropagation } from "../globals/utilityFunctions";

const DeleteCommentModal = ({ toggleModal, deleteComment }) => {

    return (
        <div 
            className="modal"
            onClick={(e) => stopPropagation(e)}
        >
            <h3 className="text-lg font-bold">Confirm Delete</h3>
            <p className="text-neutral-500">Are you sure you want to permanently delete this comment?</p>
            <div className="flex gap-2 justify-end mt-4">
                <button 
                    className="py-1.5 px-3 font-semibold border border-neutral-400 rounded-md transition duration-200 lg:hover:bg-neutral-200" 
                    onClick={(e) => {
                        stopPropagation(e);
                        toggleModal();
                    }} 
                >
                    Cancel
                </button>
                <button 
                    className="py-1.5 px-3 text-neutral-200 font-semibold bg-slate-900 border border-neutral-400 rounded-md transition duration-200 lg:hover:bg-slate-700" 
                    onClick={(e) => {
                        stopPropagation(e);
                        deleteComment();
                        toggleModal();
                    }}
                >
                    Delete Comment
                </button>
            </div>
        </div>
    );
}

export default DeleteCommentModal;