// This time lets use axios to create a get request
const isAuth = async(api, navigate) => {

    const response = await fetch(api);
    if (response.redirected) {
        const url = new URL(response.url);
        const pathname = url.pathname;

        console.log("REDIRECTING THE USER TO: ", pathname);
        navigate(pathname);
    }
}

export default isAuth;