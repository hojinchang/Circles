import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import ModalWrapper from "./ModalWrapper";
import AddPostModal from "./modals/AddPostModal";
import { setAuthenticated } from "../features/authenticated/authenticatedSlice";
import { getUserAPIPath, logoutAPIPath } from "../globals/apiPaths";
import { handlePopups } from "../globals/utilityFunctions";


const Nav = () => {
    const [secondaryNavOpen, setSecondaryNavOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [postModalOpen, setPostModalOpen] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const dispatch = useDispatch();

    // Toggle show the secondary nav
    const toggleSecondaryNav = () => {
        setSecondaryNavOpen(!secondaryNavOpen);
    };

    // Close the secondary nav when on desktop displays
    const isDesktop = (e) => {
        if (e.matches) setSecondaryNavOpen(false);
    }

    // Clientside logout function.
    const logout = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.get(logoutAPIPath);

            // If the logout is successful, set the authenicated global redux state to null
            if (response.status === 200) dispatch( setAuthenticated(null) );
            
        } catch(err) {
            console.error("Error with server logout response", err);
        }
    }

    // Check the width of the display
    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        mediaQuery.addEventListener("change", isDesktop);

        return () => mediaQuery.removeEventListener("change", isDesktop);
    }, []);

    // Get the user
    useEffect(() => {
        const getUser = async() => {
            try {
                const response = await axios.get(getUserAPIPath);

                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    dispatch( setAuthenticated(false) );
                    console.error("Unexpected status code:", response.status);
                }
            } catch(err) {
                console.error("Error Getting User", err);
            }
        };

        getUser();
    }, []);


    return (
        <>
            <div className="lg:p-16 lg:w-96 lg:min-h-full lg:border-r-2 relative">
                <div className={`p-4 bg-neutral-50 fixed inset-0 transition-transform duration-500 transform ${secondaryNavOpen ? 'translate-y-0' : 'translate-y-full'} lg:static lg:translate-y-0 lg:p-0 z-10`}>
                    <nav className="flex flex-col gap-2 mx-auto max-w-sm h-full justify-center">
                        <div className="mb-4">
                            <p className="font-medium text-center">{user && user.fullName}</p>
                            <p className="text-center text-neutral-500">{user && user.email}</p>
                        </div>
                        <div>
                            <NavLink to="/" className={isActive => `secondary-nav-item-container ${isActive ? "nav-active" : ""}`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" aria-hidden="true">
                                    <path d="M12 0c-5.083 0-8.465 4.949-3.733 13.678 1.596 2.945-1.725 3.641-5.09 4.418-3.073.709-3.187 2.235-3.177 4.904l.004 1h23.99l.004-.969c.012-2.688-.093-4.223-3.177-4.935-3.438-.794-6.639-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.731-13.678m0 1c1.89 0 3.39.764 4.225 2.15 1.354 2.251.866 5.824-1.377 10.06-.577 1.092-.673 2.078-.283 2.932.937 2.049 4.758 2.632 6.032 2.928 2.303.534 2.412 1.313 2.401 3.93h-21.998c-.01-2.615.09-3.396 2.401-3.93 1.157-.266 5.138-.919 6.049-2.94.387-.858.284-1.843-.304-2.929-2.231-4.115-2.744-7.764-1.405-10.012.84-1.412 2.353-2.189 4.259-2.189"/>
                                </svg>
                                <p className="font-medium">Profile</p>
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to="/" className={isActive => `secondary-nav-item-container ${isActive ? "nav-active" : ""}`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" aria-hidden="true">
                                    <path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-4 13v1h-4v-1h4zm-6.002 1h-10.997l-.001-.914c-.004-1.05-.007-2.136 1.711-2.533.789-.182 1.753-.404 1.892-.709.048-.108-.04-.301-.098-.407-1.103-2.036-1.305-3.838-.567-5.078.514-.863 1.448-1.359 2.562-1.359 1.105 0 2.033.488 2.545 1.339.737 1.224.542 3.033-.548 5.095-.057.106-.144.301-.095.41.14.305 1.118.531 1.83.696 1.779.41 1.773 1.503 1.767 2.56l-.001.9zm-9.998-1h8.999c.003-1.014-.055-1.27-.936-1.473-1.171-.27-2.226-.514-2.57-1.267-.174-.381-.134-.816.119-1.294.921-1.739 1.125-3.199.576-4.111-.332-.551-.931-.855-1.688-.855-.764 0-1.369.31-1.703.871-.542.91-.328 2.401.587 4.09.259.476.303.912.13 1.295-.342.757-1.387.997-2.493 1.252-.966.222-1.022.478-1.021 1.492zm18-3v1h-6v-1h6zm0-3v1h-6v-1h6zm0-3v1h-6v-1h6z"/>
                                </svg>
                                <p className="font-medium">Users</p>
                            </NavLink>
                        </div>
                        <div>
                            <button className="secondary-nav-item-container w-full" onClick={ () => handlePopups(postModalOpen, setPostModalOpen, setFadeOut) }>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" aria-hidden="true">
                                    <path d="M8.071 21.586l-7.071 1.414 1.414-7.071 14.929-14.929 5.657 5.657-14.929 14.929zm-.493-.921l-4.243-4.243-1.06 5.303 5.303-1.06zm9.765-18.251l-13.3 13.301 4.242 4.242 13.301-13.3-4.243-4.243z"/>
                                </svg>
                                <p className="font-medium">Create Post</p>
                            </button>
                        </div>
                        <div className="mt-4">
                            <button className="secondary-nav-item-container w-full" onClick={ logout }>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M16 12.771h-3.091c-.542 0-.82-.188-1.055-.513l-1.244-1.674-2.029 2.199 1.008 1.562c.347.548.373.922.373 1.42v4.235h-1.962v-3.981c-.016-1.1-1.695-2.143-2.313-1.253l-1.176 1.659c-.261.372-.706.498-1.139.498h-3.372v-1.906l2.532-.001c.397 0 .741-.14.928-.586l1.126-2.75c.196-.41.46-.782.782-1.102l2.625-2.6-.741-.647c-.223-.195-.521-.277-.812-.227l-2.181.381-.342-1.599 2.992-.571c.561-.107 1.042.075 1.461.462l2.882 2.66c.456.414.924 1.136 1.654 2.215.135.199.323.477.766.477h2.328v1.642zm-2.982-5.042c1.02-.195 1.688-1.182 1.493-2.201-.172-.901-.96-1.528-1.845-1.528-1.186 0-2.07 1.078-1.85 2.234.196 1.021 1.181 1.69 2.202 1.495zm4.982-5.729v15l6 5v-20h-6z"/>
                                </svg>
                                <p className="font-medium">Logout</p>
                            </button>
                        </div>
                    </nav>
                </div>
                <nav className="flex justify-around items-center gap-2 fixed bottom-0 left-0 right-0 z-10 bg-neutral-100 border border-neutral-400 shadow-inner lg:static lg:bg-transparent lg:flex-col lg:items-start lg:border-none lg:shadow-none lg:mt-12">
                    <div className="lg:w-full">
                        <NavLink to="/" className={isActive => `nav-item-container ${isActive ? "nav-active" : ""}`}>
                            <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" aria-hidden="true">
                                <path d="M22 11.414v12.586h-20v-12.586l-1.293 1.293-.707-.707 12-12 12 12-.707.707-1.293-1.293zm-6 11.586h5v-12.586l-9-9-9 9v12.586h5v-9h8v9zm-1-7.889h-6v7.778h6v-7.778z"/>
                            </svg>
                            <p className="nav-text">Home</p>
                        </NavLink>
                    </div>
                    <div className="lg:w-full">
                        <NavLink to="/" className={isActive => `nav-item-container ${isActive ? "nav-active" : ""}`}>
                            <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" aria-hidden="true">
                                <path d="M13 24h-2c-.288 0-.563-.125-.753-.341l-.576-.659h4.658l-.576.659c-.19.216-.465.341-.753.341zm1.867-3c.287 0 .52.224.52.5s-.233.5-.52.5h-5.734c-.287 0-.52-.224-.52-.5s.233-.5.52-.5h5.734zm-2.871-17c2.983 0 6.004 1.97 6.004 5.734 0 1.937-.97 3.622-1.907 5.252-.907 1.574-1.843 3.201-1.844 5.014h1.001c0-3.286 3.75-6.103 3.75-10.266 0-4.34-3.502-6.734-7.004-6.734-3.498 0-6.996 2.391-6.996 6.734 0 4.163 3.75 6.98 3.75 10.266h.999c.001-1.813-.936-3.44-1.841-5.014-.938-1.63-1.908-3.315-1.908-5.252 0-3.764 3.017-5.734 5.996-5.734zm9.428 7.958c.251.114.362.411.248.662-.114.251-.41.363-.662.249l-.91-.414c-.252-.114-.363-.41-.249-.662.114-.251.411-.362.662-.248l.911.413zm-18.848 0c-.251.114-.362.411-.248.662.114.251.41.363.662.249l.91-.414c.252-.114.363-.41.249-.662-.114-.251-.411-.362-.662-.248l-.911.413zm18.924-2.958h-1c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h1c.276 0 .5.224.5.5s-.224.5-.5.5zm-18-1c.276 0 .5.224.5.5s-.224.5-.5.5h-1c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h1zm16.818-3.089c.227-.158.284-.469.126-.696-.157-.227-.469-.283-.696-.126l-.821.57c-.227.158-.283.469-.126.696.157.227.469.283.696.126l.821-.57zm-16.636 0c-.227-.158-.284-.469-.126-.696.157-.227.469-.283.696-.126l.821.57c.227.158.283.469.126.696-.157.227-.469.283-.696.126l-.821-.57zm13.333-3.033c.134-.241.048-.546-.193-.68-.241-.135-.546-.048-.68.192l-.488.873c-.135.241-.048.546.192.681.241.134.546.048.681-.193l.488-.873zm-10.03 0c-.134-.241-.048-.546.193-.68.241-.135.546-.048.68.192l.488.873c.135.241.048.546-.192.681-.241.134-.546.048-.681-.193l-.488-.873zm5.515-1.378c0-.276-.224-.5-.5-.5s-.5.224-.5.5v1c0 .276.224.5.5.5s.5-.224.5-.5v-1z"/>
                            </svg>
                            <p className="nav-text">Discover</p>
                        </NavLink>
                    </div>
                    <div className="lg:w-full">
                        <NavLink to="/" className={isActive => `nav-item-container ${isActive ? "nav-active" : ""}`}>
                            <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" aria-hidden="true">
                                <path d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"/>
                            </svg>
                            <p className="nav-text">Messages</p>
                        </NavLink>
                    </div>
                    <div className="lg:w-full">
                        <NavLink to="/" className={isActive => `nav-item-container ${isActive ? "nav-active" : ""}`}>
                            <svg className="nav-icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" aria-hidden="true">
                                <path d="M16.835 0c-1.656 0-3 1.344-3 2.999s1.344 2.999 3 2.999c1.655 0 3-1.344 3-2.999s-1.345-2.999-3-2.999m0 1c1.103 0 2 .896 2 1.999 0 1.103-.897 2-2 2s-2-.897-2-2 .897-1.999 2-1.999m-9.669-1c-1.656 0-3 1.344-3 2.999s1.344 2.999 3 2.999c1.655 0 3-1.344 3-2.999s-1.345-2.999-3-2.999m0 1c1.103 0 2 .896 2 1.999 0 1.103-.897 2-2 2s-2-.897-2-2 .897-1.999 2-1.999m9.648 14.828c.694 0 1.231.524 1.277 1.245.05.741.172 2.201.28 3.489l.156 1.896c.02.251.164.542.508.542.404 0 .455-.425.46-.556l.472-11.447c.022-.512.701-.655.937-.222l1.645 2.977c.118.215.451.125.451-.117l-1.6-5.675c-.093-.335-.402-.567-.749-.567h-17.303c-.346 0-.655.232-.749.566l-1.59 5.61c-.022.402.364.326.442.183l1.645-2.977c.244-.439.916-.283.937.222l.471 11.448c.011.256.146.555.49.555.329 0 .497-.271.518-.541l.16-1.94c.107-1.277.227-2.712.277-3.448.047-.719.584-1.243 1.277-1.243.584 0 1.218.465 1.27 1.244.049.734.169 2.169.276 3.446l.16 1.94c.019.251.161.542.499.542.382 0 .439-.389.446-.556.122-2.956.629-12.29.635-12.384.014-.266.233-.473.499-.473h1.963c.266 0 .485.208.499.474.006.094.494 9.427.617 12.384.012.276.174.555.509.555.344 0 .49-.291.508-.541l.165-1.982c.105-1.266.223-2.679.272-3.406.052-.778.687-1.243 1.27-1.243m2.222 8.172c-.807 0-1.44-.616-1.506-1.465-.035-.455-.092-1.143-.155-1.889-.108-1.294-.231-2.761-.282-3.507-.015-.231-.154-.311-.279-.311-.079 0-.256.078-.272.31-.049.731-.168 2.15-.274 3.422-.066.779-.126 1.502-.163 1.976-.065.848-.698 1.464-1.504 1.464-.826 0-1.474-.65-1.511-1.513-.106-2.567-.489-9.954-.591-11.9h-1.015c-.105 1.944-.502 9.333-.608 11.899-.038.892-.631 1.514-1.444 1.514-.803 0-1.432-.616-1.497-1.465l-.16-1.934c-.107-1.283-.228-2.724-.277-3.462-.016-.233-.194-.311-.272-.311-.125 0-.265.081-.279.309-.05.74-.171 2.182-.278 3.465l-.16 1.934c-.065.848-.702 1.464-1.513 1.464-.827 0-1.453-.637-1.491-1.513l-.398-9.665-.78 1.413c-.323.584-1.088.781-1.573.538-.46-.195-.754-.637-.754-1.138 0-.115.016-.229.047-.339l1.59-5.609c.215-.762.919-1.294 1.711-1.294h17.303c.793 0 1.497.533 1.712 1.294l1.59 5.61c.031.109.047.223.047.338 0 .503-.297.947-.759 1.14l-.037.017c-.566.218-1.238-.028-1.53-.558l-.781-1.412-.398 9.664c-.038.892-.638 1.514-1.459 1.514"/>
                            </svg>
                            <p className="nav-text">Friends</p>
                        </NavLink>
                    </div>
                    <div className="nav-item-container lg:hidden">
                        <button onClick={toggleSecondaryNav}>
                            <svg className="w-8 h-8 xs:w-10 xs:h-10" width="36" height="36" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="m11 16.745c0-.414.336-.75.75-.75h9.5c.414 0 .75.336.75.75s-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75zm-9-5c0-.414.336-.75.75-.75h18.5c.414 0 .75.336.75.75s-.336.75-.75.75h-18.5c-.414 0-.75-.336-.75-.75zm4-5c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75z" fillRule="nonzero"/>
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>

            {postModalOpen && (
                <ModalWrapper fadeOut={fadeOut} toggleModal={ () => handlePopups( postModalOpen, setPostModalOpen, setFadeOut ) }>
                    <AddPostModal toggleModal={ () => handlePopups( postModalOpen, setPostModalOpen, setFadeOut ) } />
                </ModalWrapper>

            )}
        </>
    )
}

export default Nav;