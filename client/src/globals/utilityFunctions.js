import axios from "axios";

import { createPostAPIPath, getPostsAPIPath, getUserAPIPath } from "./apiPaths";
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
const createPost = async (e, formData, formRef, resetForm, navigate, dispatch) => {
    await createResource(e, createPostAPIPath, formData, formRef, resetForm, navigate, dispatch);
};

// Send a post request to create a comment
const createComment = async (e, postId, formData, formRef, resetForm, navigate, dispatch) => {
    await createResource(e, getPostsAPIPath + `/${postId}/comment`, formData, formRef, resetForm, navigate, dispatch);
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
        // Get the apiPath depending on if the resource is a post or a comment
        let apiPath = "";
        if (resourceType === "post") {
            apiPath = getPostsAPIPath + `/${resourceId}/like`;
        } else if (resourceType === "comment") {
            apiPath = getPostsAPIPath + `/${resourceId}/comment/${subresourceId}/like`;
        }

        // Send a put request to the api
        const response = await axios.put(apiPath);

        // If good, update the posts redux state
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

// Delete a post/comment 
const deleteResource = async(resourceType, resourceId, subresourceId, navigate, dispatch) => {
    try {
        let apiPath = "";
        if (resourceType === "post") {
            apiPath = getPostsAPIPath + `/${resourceId}`;
        } else if (resourceType === "comment") {
            apiPath = getPostsAPIPath + `/${resourceId}/comment/${subresourceId}`;
        }

        // Send a delete request to the api
        const response = await axios.delete(apiPath);

        // If good, update the posts redux state
        if (response.status === 200) {
            getPosts(navigate, dispatch);
        } else {
            console.error("Unexpected status code:", response.status);
        }

    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect(`Error Deleting ${resourceType} ${resourceId}`, err, navigate, dispatch);
    }
} 

// Send a delete request to server for a specific post id
const deletePost = async(postId, navigate, dispatch) => {
    await deleteResource("post", postId, null, navigate, dispatch);
}

// Send a delete request to server for a specific comment id
const deleteComment = async(postId, commentId, navigate, dispatch) => {
    await deleteResource("comment", postId, commentId, navigate, dispatch);
}

const updateResource = async(e, resourceType, resourceId, subresourceId, formData, navigate, dispatch) => {
    e.preventDefault();

    try {
        let apiPath = "";
        if (resourceType === "post") {
            apiPath = getPostsAPIPath + `/${resourceId}`;
        } else if (resourceType === "comment") {
            apiPath = getPostsAPIPath + `/${resourceId}/comment/${subresourceId}`
        }

        const response = await axios.put(apiPath, formData);

        // If good, update the posts redux state
        if (response.status === 200) {
            getPosts(navigate, dispatch);
        } else {
            console.error("Unexpected status code:", response.status);
        }

    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect("Create Resource Error", err, navigate, dispatch);
    }
}

// Send a put request to server to update a specific post
const updatePost = async(e, postId, formData, navigate, dispatch) => {
    await updateResource(e, "post", postId, null, formData, navigate, dispatch);
}

// Send a put request to server to update a specific comment
const updateComment = async(e, postId, commentId, formData, navigate, dispatch) => {
    await updateResource(e, "comment", postId, commentId, formData, navigate, dispatch);
}

// Get the current user
const getUser = async(setUser, navigate, dispatch) => {
    try {
        const response = await axios.get(getUserAPIPath);

        if (response.status === 200) {
            setUser(response.data);
        } else {
            console.error("Unexpected status code:", response.status)
        }

    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect("Error Getting User", err, navigate, dispatch);
    }
};

// Get all users
const getUsers = async(setUsers, navigate, dispatch) => {
    try {
        const response = await axios.get(getUserAPIPath + "/all");

        if (response.status === 200) {
            setUsers(response.data);
        } else {
            console.error("Unexpected status code:", response.status)
        }

    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect("Error Getting Users", err, navigate, dispatch);
    }
}

// Get specific user given their id
const getSpecificUser = async(userId, setUser, navigate, dispatch) => {
    try {
        const response = await axios.get(getUserAPIPath + `/${userId}`);
        
        if (response.status === 200) {
            setUser(response.data);
        } else {
            console.error("Unexpected status code:", response.status)
        }

    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect("Error Getting User", err, navigate, dispatch);
    }
}

// Get posts from specific user
const getUserPosts = async(userId, setPosts, navigate, dispatch) => {
    try {
        const response = await axios.get(getUserAPIPath + `/${userId}` + "/posts");
        if (response.status === 200) {
            setPosts(response.data);
        } else {
            console.error("Unexpected status code:", response.status)
        }

    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect("Error Getting Posts From User", err, navigate, dispatch);
    }
}

// This function handles the fade in/out of the popup modals
const handlePopups = (modalKey, setModals) => {
    setModals(prevState => {
        const newState = { ...prevState };

        // If the modal is being closed, set fadeOut to true
        if (newState[modalKey].open) {
            newState[modalKey] = {
                ...newState[modalKey],
                fadeOut: true
            };

            // After the animation has completed, close the modal
            setTimeout(() => {
                setModals(prevState => ({
                    ...prevState,
                    [modalKey]: {
                        ...prevState[modalKey],
                        open: false
                    }
                }));
            }, 275); // Adjust this to match the length of your fade-out animation
        } else {
            // If the modal is being opened, reset fadeOut state and open the modal
            newState[modalKey] = {
                ...newState[modalKey],
                open: true,
                fadeOut: false
            };
        }

        return newState;
    });
};


export {
    stopPropagation,
    handleInputChange,
    createPost,
    createComment,
    getPosts,
    getPost,
    likePost,
    likeComment,
    deletePost,
    deleteComment,
    updatePost,
    updateComment,
    getUser,
    getUsers,
    getSpecificUser,
    getUserPosts,
    handlePopups
}