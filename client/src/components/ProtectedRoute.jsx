import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Loading from "../components/Loading";

/*
    This component is a protected route.
*/
const ProtectedRoute = ({ redirectToAuth, redirectToUnauth, children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

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

        setLoading(false);
    }, [isAuthenticated, navigate, redirectToAuth, redirectToUnauth]);

    return (loading ? <Loading /> : children);
}

export default ProtectedRoute;