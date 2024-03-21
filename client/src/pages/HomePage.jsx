import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    // Redirect user to login page if they are not logged in
    useEffect(() => {
        const isLoggedIn = false;

        if (!isLoggedIn) navigate("/login");

    }, [navigate]);

    return (
        <></>
    )
}

export default HomePage;