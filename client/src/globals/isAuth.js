import axios from "axios";
import { isAuthAPIPath } from "./apiPaths";

/*
    Send a get request to the server
    If the user is not authenticated, the server sends a redirect response
    If the user is authenticated, the server saves the user in the request
*/
const isAuth = async() => {
    let isAuthenticated = null;

    try {
        const response = await axios.get(isAuthAPIPath);
        // If the response status is good
        (response.status === 200) 
            ? isAuthenticated = true
            : isAuthenticated = false;
            
    } catch(err) {
        console.error("Error making API request:", err);
        isAuthenticated = false;
    }

    return isAuthenticated;
}

export default isAuth;