import axios from "axios";

import { createPostAPIPath, getPostsAPIPath } from "./apiPaths";
import { setAuthenticated } from "../features/authenticated/authenticatedSlice";
import { setPosts } from "../features/posts/postsSlice";


// Stop clicks from propagating and triggering other click events
const stopPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
}

// If user isnt authenticated, set the global authenticated state to false and redirect
const removeAuthandRedirect = (errorContext, err, navigate, dispatch) => {
    navigate("/login");
    dispatch( setAuthenticated(null) );
    console.error(errorContext, err);
}

// dynamically set the formData state as the user types into the input
const handleInputChange = (e, setFormData) => {
    const { name, value } = e.target;
    setFormData(formData => ({
        ...formData,
        [name]: value
    }));
}

// Send a post request to create a resource (post or comment)
const createResource = async(e, path, data, formRef, resetForm, navigate, dispatch) => {
    e.preventDefault();

    try {
        const response = await axios.post(path, data);
        formRef.current.reset();

        if (response.status === 201) {
            // Update the global redux posts state with the new post/comment
            getPosts(navigate, dispatch);
            resetForm();
        }
    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect("Create Resource Error", err, navigate, dispatch);
    }
};

// Send post request to server when form is submitted
const createPost = async (e, postData, formRef, resetForm, navigate, dispatch) => {
    await createResource(e, createPostAPIPath, postData, formRef, resetForm, navigate, dispatch);
};

// Send a post request to create a comment
const createComment = async (e, postId, postData, formRef, resetForm, navigate, dispatch) => {
    await createResource(e, getPostsAPIPath + `/${postId}/comment`, postData, formRef, resetForm, navigate, dispatch);
};


// Send get request to server to get all of the posts
const getPosts = async(navigate, dispatch) => {
    try {
        const response = await axios.get(getPostsAPIPath);

        if (response.status === 200) {
            // Save the posts into the posts global redux state
            dispatch( setPosts(response.data) );
        } else {
            console.error("Unexpected status code:", response.status);
        }
    } catch(err) {
        // If user isnt authenticated
        removeAuthandRedirect("Error Retrieving Posts", err, navigate, dispatch);
    }
} 

// Retrieve a specific post
const getPost = async(postId, setPost, navigate, dispatch) => {
    try {
        const response = await axios.get(getPostsAPIPath + `/${postId}`);

        if (response.status === 200) {
            setPost(response.data.post);
        } else {
            console.error("Unexpected status code:", response.status);
        }

    } catch(err) {
        // If user isnt authenticated
        removeAuthandRedirect(`Error Retrieving Post ${postId}`, err, navigate, dispatch);
    }
}

// Like a post or a comment
const likeResource = async(resourceType, resourceId, subresourceId, navigate, dispatch) => {
    try {
        let apiPath = "";
        if (resourceType === "post") {
            apiPath = getPostsAPIPath + `/${resourceId}/like`;
        } else if (resourceType === "comment") {
            apiPath = getPostsAPIPath + `/${resourceId}/comment/${subresourceId}/like`;
        }

        const response = await axios.put(apiPath);

        if (response.status === 200) {
            getPosts(navigate, dispatch);
        } else {
            console.error("Unexpected status code:", response.status);
        }

    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect(`Error Liking ${resourceType} ${resourceId}`, err, navigate, dispatch);
    }
}

// Like a specific post
const likePost = async(postId, navigate, dispatch) => {
    await likeResource("post", postId, null, navigate, dispatch);
}

// Like a specific comment
const likeComment = async(postId, commentId, navigate, dispatch) => {
    await likeResource("comment", postId, commentId, navigate, dispatch);
}

// Send a delete request to server for a specific post id
const deletePost = async(postId, navigate, dispatch) => {
    try {
        const response = await axios.delete(getPostsAPIPath + `/${postId}`);
        
        if (response.status === 200) {
            getPosts(navigate, dispatch);
        } else {
            console.error("Unexpected status code:", response.status);
        }

    } catch(err) {
        // If user isnt authenticated
        removeAuthandRedirect("Error Deleting Post", err, navigate, dispatch);
    }
}

// Send a put request to server to update a specific post
const updatePost = async(e, postId, postData, navigate, dispatch) => {
    e.preventDefault();

    try {
        const response = await axios.put(getPostsAPIPath + `/${postId}`, postData);
        // If the response is good, save the posts into the posts state
        if (response.status === 200) {
            // Update the global redux posts state with the new post
            getPosts(navigate, dispatch);
        }

    } catch(err) {
        // If user isnt authenpostIdticated
        removeAuthandRedirect("Create Post Error", err, navigate, dispatch);
    }
}

// This function handles the fade in/out of the popup modals
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
    stopPropagation,
    handleInputChange,
    createPost,
    createComment,
    getPosts,
    getPost,
    updatePost,
    likePost,
    likeComment,
    deletePost,
    handlePopups
}