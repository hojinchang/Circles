import { setAuthenticated } from "../features/authenticated/authenticatedSlice";
import { localLoginAPIPath, demoLoginAPIPath } from "./globalVariables";

const handleLogin = (e, loginType, setLoginError, dispatch, navigate) => {
    switch (loginType) {
        case "local":
            _loginSubmission(e, localLoginAPIPath, JSON.stringify(formData), setLoginError, dispatch, navigate);
            break;
        default:
            _loginSubmission(e, demoLoginAPIPath, JSON.stringify({}), setLoginError, dispatch, navigate);
            break;
    }
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
            dispatch(setAuthenticated(true));
            navigate("/");
        } else {
            dispatch(setAuthenticated(false));
            setLoginError(responseData.message);
        }
        
    } catch(err) {
        console.error("Login Error", err);
    }
}

export default handleLogin;