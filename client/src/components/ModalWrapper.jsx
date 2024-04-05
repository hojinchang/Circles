
const ModalWrapper = ({ fadeOut, toggleModal, children }) => {

    // console.log(fadeOut)

    return (
        <div className={`${fadeOut ? 'fade-out' : 'fade-in'} fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20`}
            onClick={(e) => {
                e.stopPropagation();
                toggleModal();
            }}
        >
            {children}
        </div>
    );
};

export default ModalWrapper;