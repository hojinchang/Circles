import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

import isAuth from "../globals/isAuth";

const AppRouter = () => {

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async() => {
            const isAuthenticated = await isAuth();
            setAuthenticated(isAuthenticated);
        };

        checkAuthentication();

    }, []);
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<HomePage />}></Route>
                <Route path="/login" exact element={<LoginPage />}></Route>
                <Route path="/sign-up" exact element={<SignUpPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;