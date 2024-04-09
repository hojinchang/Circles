import Nav from "../components/Nav";

const PageWrapper = ({ children }) => {

    return (
        <main className="main">
            <Nav />
            <div className="flex flex-col items-center w-full overflow-auto">
                <div className="p-8 pb-24 max-w-3xl w-full h-full xs:p-12 xs:pb-28 lg:p-8">
                    { children }
                </div>
            </div>
        </main>
    );
}

export default PageWrapper;
