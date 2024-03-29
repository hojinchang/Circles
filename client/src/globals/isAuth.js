/*
    Send a get request to the server
    If the user is not authenticated, the server sends a redirect response
    If the user is authenticated, the server saves the user in the request
*/
const isAuth = async(api, navigate) => {

    const response = await fetch(api);
    if (response.redirected) {
        const url = new URL(response.url);
        const pathname = url.pathname;

        navigate(pathname);
    }
}

export default isAuth;