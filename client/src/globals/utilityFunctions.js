import axios from "axios";

import { createPostAPIPath, getPostAPIPath } from "./apiPaths";
import { setAuthenticated } from "../features/authenticated/authenticatedSlice";


// dynamically set the formData state as the user types into the input
const handleInputChange = (e, setFormData) => {
    const { name, value } = e.target;
    setFormData(formData => ({
        ...formData,
        [name]: value
    }));
}

// Send post request to server when form is submitted
const handlePostFormSubmission = async(
    e, 
    postData, 
    formRef, 
    resetForm, 
    setPosts, 
    navigate, 
    dispatch
) => {
    e.preventDefault();
    try {
        // When using axios, you dont need to JSON.stringify(data) your request body
        const response = await axios.post(createPostAPIPath, postData);
        formRef.current.reset();

        // If the response is good, save the posts into the posts state
        if (response.status === 201) {
            getPosts(setPosts);
            // Reset the post data state
            resetForm();
        }
    } catch(err) {
        // If user isnt authenticated
        navigate("/login");
        dispatch(setAuthenticated(false));
        console.error("Create Post Error", err);
    }
}

// Send get request to server to get all of the posts
const getPosts = async(setPosts, navigate, dispatch) => {
    try {
        const response = await axios.get(getPostAPIPath);

        if (response.status === 200) {
            setPosts(response.data);
        } else {
            console.error("Unexpected status code:", response.status);
        }

    } catch(err) {
        // If user isnt authenticated
        navigate("/login");
        dispatch(setAuthenticated(false));
        console.error("Error Getting Posts", err);
    }
}

const handlePopups = (isOpen, setIsOpen, setFadeOut) => {
    // If the option is open, set the fade out animation
    if (isOpen) {
        setFadeOut(true);
        setTimeout(() => {
            setIsOpen(false);
        }, 275);
    } else {
        // Else, just toggle it on
        setIsOpen(true);
        setFadeOut(false);
    }
}

export {
    handleInputChange,
    handlePostFormSubmission,
    getPosts,
    handlePopups
}