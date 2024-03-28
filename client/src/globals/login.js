const handleLogin = (e, loginType, setCookie, setLoginError, navigate) => {
    switch (loginType) {
        case "local":
            _loginSubmission(e, "login", JSON.stringify(formData), setCookie, setLoginError, navigate);
            break;
        default:
            _loginSubmission(e, "login-demo", JSON.stringify({}), setCookie, setLoginError, navigate);
            break;
    }
}

// Post request to server for user authentication
const _loginSubmission = async(e, apiEndpoint, body, setCookie, setLoginError, navigate) => {

    e.preventDefault();
    try {
        const response = await fetch(`/api/user/${apiEndpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        })

        // If sucessful, this will return a success object with the user object
        // If not successful, this will return an error message
        const responseData = await response.json();

        // Save the JWT token in a cookie
        if (response.ok) {              
            const expiryDate = new Date();
            // Set expiry date 1 day from now
            expiryDate.setDate(expiryDate.getDate() + 1);

            // Save the jwt token in a cookie
            // The cookies are automatically sent with every HTTP request to the server
            setCookie("jwt", responseData.token, {
                expires: expiryDate,
                path: "/",
            });

            navigate("/");
        } else {
            setLoginError(responseData.message);
        }
        
    } catch(err) {
        console.err("Login Error", err);
    }
}

export default handleLogin;