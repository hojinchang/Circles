import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";

interface ProtectedRouteProps {
    redirectToAuth?: string;
    redirectToUnauth?: string;
    children: React.ReactNode;
}
/*
    This component is a protected route.
*/
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectToAuth, redirectToUnauth, children }) => {
    const navigate = useNavigate();
    const currentUserId = useSelector(( state: RootState ) => state.authenticated.isAuth);

    useEffect(() => {
        // If the user is authenticated and tries to visit "/login" or "/sign-up", redirect to "/"
        if (currentUserId && redirectToAuth) {
            navigate(redirectToAuth);
        } 
        // If the user is not authenticated and tries to visit unauthorized paths, redirect to "/login"
        else if (!currentUserId && redirectToUnauth) {
            navigate(redirectToUnauth);
        }

    }, [currentUserId, navigate]);

    /*
        Return null if these redirect conditions are met.
        Without this code, the protected route children will render before that redirect navigate finishes running,
        thus, you will see a flash of the children component
    */
    if ((currentUserId && redirectToAuth) || (!currentUserId && redirectToUnauth)) return null;

    return children;
}

export default ProtectedRoute;