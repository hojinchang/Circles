import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../features/authenticated/authenticatedSlice";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import PostPage from "../pages/PostPage";
import ProfilePage from "../pages/ProfilePage";
import UsersPage from "../pages/UsersPage";
import Loading from "../components/Loading";
import ProtectedRoute from "../components/ProtectedRoute";

import isAuth from "../globals/isAuth";

const AppRouter = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    // Check the authentication status on intial website load
    useEffect(() => {
        const checkAuthentication = async() => {
            const authUser = await isAuth();

            (authUser)
                ? dispatch( setAuthenticated(authUser) )
                : dispatch( setAuthenticated(null) );

            setLoading(false);
        };

        checkAuthentication();
    }, []);

    if (loading) {
        return (<Loading />);
    }
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute redirectToUnauth="/login"><HomePage /></ProtectedRoute>}></Route>
                <Route path="/login" element={<ProtectedRoute redirectToAuth="/"><LoginPage /></ProtectedRoute>}></Route>
                <Route path="/sign-up" element={<ProtectedRoute redirectToAuth="/"><SignUpPage /></ProtectedRoute>}></Route>
                <Route path="/post/:postId" element={<ProtectedRoute redirectToUnauth="/login"><PostPage /></ProtectedRoute>}></Route>
                <Route path="/user/:userId" element={<ProtectedRoute redirectToUnauth="/login"><ProfilePage /></ProtectedRoute>}></Route>
                <Route path="/users" element={<ProtectedRoute redirectToUnauth="/login"><UsersPage /></ProtectedRoute>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;