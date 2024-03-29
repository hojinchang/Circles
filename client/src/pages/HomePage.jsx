import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import isAuth from "../globals/isAuth";

const HomePage = () => {
    const navigate = useNavigate();
    
    // On page load, determine if the user is authenticated
    useEffect(() => {
        isAuth("/api/", navigate);
    }, []);

    return (
        <></>
    )
};

export default HomePage;