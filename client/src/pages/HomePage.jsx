import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import isAuth from "../globals/isAuth";

const HomePage = () => {
   
    useEffect(() => {
        isAuth("/api/");
    }, []);

    return (
        <></>
    )
};

export default HomePage;