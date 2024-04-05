import axios from "axios";
import { isAuthAPIPath } from "./apiPaths";

/*
    Send a get request to the server
    If the user is not authenticated, the server sends a redirect response
    If the user is authenticated, the server saves the user in the request
*/
const isAuth = async() => {
    let authUser = null;

    try {
        const response = await axios.get(isAuthAPIPath);
        // If the response status is good
        if (response.status === 200) authUser = response.data.user;
            
    } catch(err) {
        console.error("Error Authenticating User", err);
    }

    return authUser;
}

export default isAuth;