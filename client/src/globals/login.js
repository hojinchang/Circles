const handleLogin = (e, loginType, setLoginError, navigate) => {
    switch (loginType) {
        case "local":
            _loginSubmission(e, "login", JSON.stringify(formData), setLoginError, navigate);
            break;
        default:
            _loginSubmission(e, "login-demo", JSON.stringify({}), setLoginError, navigate);
            break;
    }
}

// Post request to server for user authentication
const _loginSubmission = async(e, apiEndpoint, body, setLoginError, navigate) => {

    e.preventDefault();
    try {
        const response = await fetch(`/api/user/${apiEndpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        });

        // // This is how you get the redirect status true/false and the redirect url
        // console.log(response.redirected)
        // console.log(response.url)

        // If sucessful, this will return a success object with the user object
        // If not successful, this will return an error message
        const responseData = await response.json();

        // Save the JWT token in a cookie
        if (response.ok) {              
            navigate("/");
        } else {
            setLoginError(responseData.message);
        }
        
    } catch(err) {
        console.error("Login Error", err);
    }
}

export default handleLogin;