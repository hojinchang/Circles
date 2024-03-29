import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import isAuth from "../globals/isAuth";

const HomePage = () => {
    const navigate = useNavigate();
   
    useEffect(() => {
        isAuth("/api/", navigate);
    }, []);

    return (
        <></>
    )
};

export default HomePage;