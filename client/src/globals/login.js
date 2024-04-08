import { setAuthenticated } from "../features/authenticated/authenticatedSlice";
import { localLoginAPIPath, demoLoginAPIPath } from "./apiPaths";

const handleLogin = (e, loginType, formData, setLoginError, dispatch, navigate) => {
    let apiPath;
    (loginType === "local")
        ? apiPath = localLoginAPIPath
        : apiPath = demoLoginAPIPath;

    _loginSubmission(e, apiPath, JSON.stringify(formData), setLoginError, dispatch, navigate);
}

// Post request to server for user authentication
const _loginSubmission = async(e, apiEndpoint, body, setLoginError, dispatch, navigate) => {
    e.preventDefault();
    
    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        });

        // If sucessful, this will return a success object with the user object
        // If not successful, this will return an error message
        const responseData = await response.json();

        // Save the JWT token in a cookie
        if (response.ok) {
            dispatch( setAuthenticated(responseData.user) );
            navigate("/");
        } else {
            dispatch(setAuthenticated(null));
            setLoginError(responseData.message);
        }
        
    } catch(err) {
        console.error("Login Error", err);
    }
}

export default handleLogin;