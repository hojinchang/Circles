import axios from "axios";
import { isAuthAPIPath } from "./globalVariables";

/*
    Send a get request to the server
    If the user is not authenticated, the server sends a redirect response
    If the user is authenticated, the server saves the user in the request
*/
const isAuth = async() => {
    let isAuthenticated = null;

    try {
        const response = await axios.get(isAuthAPIPath);
        isAuthenticated = true;
        
    } catch(err) {
        console.error("Error making API request:", err);
        isAuthenticated = false;
    }


    return isAuthenticated;
}

export default isAuth;