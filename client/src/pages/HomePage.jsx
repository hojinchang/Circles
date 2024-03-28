import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";

const HomePage = () => {
    // Cookies
    const [cookies, setCookie] = useCookies(["jwt"]);

    // const navigate = useNavigate();

    // // Redirect user to login page if they are not logged in
    // useEffect(() => {
    //     const isLoggedIn = false;

    //     if (!isLoggedIn) navigate("/login");

    // }, [navigate]);

    useEffect(() => {
        console.log(cookies)
    }, []);

    return (
        <></>
    )
};

export default HomePage;