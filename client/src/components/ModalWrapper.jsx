const ModalWrapper = ({ show, children }) => {
    return (
        <div className={show ? "fade-in" : "fade-out"}>
            {children}
        </div>
    );
};

export default ModalWrapper;