import { stopPropagation } from "../../globals/utilityFunctions";

const ModalWrapper = ({ fadeOut, toggleModal, children }) => {

    return (
        <div className={`${fadeOut ? 'fade-out' : 'fade-in'} fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10`}
            onClick={(e) => {
                stopPropagation(e);
                toggleModal();
            }}
        >
            {children}
        </div>
    );
};

export default ModalWrapper;