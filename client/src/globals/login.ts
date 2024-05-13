import { setAuthenticated } from "../features/authenticated/authenticatedSlice";
import { localLoginAPIPath, demoLoginAPIPath } from "./apiPaths";
import RefreshPage from "../types/RefreshPage";


interface HandleLogin extends RefreshPage {
    e: React.FormEvent<HTMLFormElement>;
    loginType: "local" | "demo";
    formData: {
        username: string;
        password: string;
    } | {};
    setLoginError: React.Dispatch<any>;
}
const handleLogin = ({ e, loginType, formData, setLoginError, dispatch, navigate }: HandleLogin) => {
    let apiEndpoint;
    (loginType === "local")
        ? apiEndpoint = localLoginAPIPath
        : apiEndpoint = demoLoginAPIPath;

    const body = JSON.stringify(formData);
    _loginSubmission({ e, apiEndpoint, body, setLoginError, dispatch, navigate });
}

interface LoginSubmission extends RefreshPage {
    e: React.FormEvent<HTMLFormElement>;
    apiEndpoint: string;
    body: string;
    setLoginError: React.Dispatch<any>;
}
// Post request to server for user authentication
const _loginSubmission = async({ e, apiEndpoint, body, setLoginError, dispatch, navigate }: LoginSubmission) => {
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