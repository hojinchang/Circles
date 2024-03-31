import axios from "axios";

/*
    Send a get request to the server
    If the user is not authenticated, the server sends a redirect response
    If the user is authenticated, the server saves the user in the request
*/
const isAuth = async() => {
    try {
        const response = await axios.get("/api/isAuth");
        return true;
        
    } catch(err) {
        console.error("Error making API request:", err);
        return false;
    }

}

export default isAuth;