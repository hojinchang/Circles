import axios from "axios";

// This time lets use axios to create a get request
const isAuth = (api) => {
    
    axios.get(api)
        .then(response => {
            console.log(response);
        })
        .catch(err => console.error("Error:", err));
    
}

export default isAuth;