import { stopPropagation } from "../../globals/utilityFunctions";

interface ModalWrapperProps {
    fadeOut: boolean;
    toggleModal: () => void;
    children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ fadeOut, toggleModal, children }) => {

    return (
        <div className={ `${fadeOut ? 'fade-out' : 'fade-in'} fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10` }
            onClick={ (e) => {
                stopPropagation(e);
                toggleModal();
            } }
        >
            { children }
        </div>
    );
};

export default ModalWrapper;