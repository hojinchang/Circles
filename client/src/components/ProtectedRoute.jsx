import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


/*
    This component is a protected route.
*/
const ProtectedRoute = ({ redirectToAuth, redirectToUnauth, children }) => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.authenticated.isAuth);

    useEffect(() => {
        // If the user is authenticated and tries to visit "/login" or "/sign-up", redirect to "/"
        if (isAuthenticated && redirectToAuth) {
            navigate(redirectToAuth);
        } 
        // If the user is not authenticated and tries to visit unauthorized paths, redirect to "/login"
        else if (!isAuthenticated && redirectToUnauth) {
            navigate(redirectToUnauth);
        }

    }, [isAuthenticated, navigate]);

    /*
        Return null if these redirect conditions are met.
        Without this code, the protected route children will render before that redirect navigate finishes running,
        thus, you will see a flash of the children component
    */
    if ((isAuthenticated && redirectToAuth) || (!isAuthenticated && redirectToUnauth)) return null;

    return children;
}

export default ProtectedRoute;