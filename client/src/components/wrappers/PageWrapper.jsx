import Nav from "../Nav";

const PageWrapper = ({ children, containerMaxWidth = "max-w-3xl" }) => {

    return (
        <main className="main">
            <Nav />
            <div className="flex flex-col items-center w-full overflow-auto">
                <div className={`p-8 pb-24 ${containerMaxWidth} w-full xs:p-12 xs:pb-28 lg:p-8`}>
                    { children }
                </div>
            </div>
        </main>
    );
}

export default PageWrapper;
