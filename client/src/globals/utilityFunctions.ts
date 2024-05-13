import axios from "axios";
import { NavigateFunction } from "react-router-dom";

import { createPostAPIPath, getPostsAPIPath, getUserAPIPath } from "./apiPaths";
import { setAuthenticated } from "../features/authenticated/authenticatedSlice";
import { setPosts } from "../features/posts/postsSlice";
import RefreshPage from "../types/RefreshPage";


interface FormData {
    post: string;
}

// Stop clicks from propagating and triggering other click events
const stopPropagation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
}

// If user isnt authenticated, set the global authenticated state to false and redirect
const removeAuthandRedirect = (
    errorContext: string, 
    err: Error, 
    navigate: NavigateFunction,
    dispatch: React.Dispatch<any>
) => {
    navigate("/login");
    dispatch( setAuthenticated(null) );
    console.error(errorContext, err);
}

interface BasicFormData {
    [key: string]: any;
}
// dynamically set the formData state as the user types into the input
const handleInputChange = <T extends BasicFormData>(e: React.ChangeEvent<any>, setFormData: React.Dispatch<React.SetStateAction<T>>) => {
    const { name, value } = e.target;
    setFormData(formData => ({
        ...formData,
        [name]: value
    }));
}

interface CreatePost {
    e: React.FormEvent<HTMLFormElement>;
    formData: FormData;
    formRef: React.RefObject<HTMLFormElement>;
    resetForm: () => void;
    navigate: NavigateFunction;
    dispatch: React.Dispatch<any>;
}

interface CreateComment extends CreatePost {
    postId: string;
}

interface CreateResource extends CreatePost {
    APIPath: string;
}
// Send a post request to create a resource (post or comment)
const createResource = async( { e, APIPath, formData, formRef, resetForm, navigate, dispatch }: CreateResource ) => {
    e.preventDefault();

    try {
        const response = await axios.post(APIPath, formData);
        if (formRef.current) {
            formRef.current.reset();
        }

        if (response.status === 201) {
            // Update the global redux posts state with the new post/comment
            getPosts({ navigate, dispatch });
            resetForm();
        }
    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect("Create Resource Error", err as Error, navigate, dispatch);
    }
};

// Send post request to server when form is submitted
const createPost = async ({ e, formData, formRef, resetForm, navigate, dispatch }: CreatePost) => {
    await createResource({ e, APIPath: createPostAPIPath, formData, formRef, resetForm, navigate, dispatch });
};

// Send a post request to create a comment
const createComment = async ({ e, postId, formData, formRef, resetForm, navigate, dispatch }: CreateComment) => {
    const createCommentAPIPath = getPostsAPIPath + `/${postId}/comment`;

    await createResource({ e, APIPath: createCommentAPIPath, formData, formRef, resetForm, navigate, dispatch } );
};

// Send get request to server to get all of the posts
const getPosts = async({ navigate, dispatch }: RefreshPage) => {
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
        removeAuthandRedirect("Error Retrieving Posts", err as Error, navigate, dispatch);
    }
} 

interface GetPost extends RefreshPage {
    postId: string;
    setPost: React.Dispatch<any>
}
// Retrieve a specific post
const getPost = async({ postId, setPost, navigate, dispatch }: GetPost) => {
    try {
        const response = await axios.get(getPostsAPIPath + `/${postId}`);

        if (response.status === 200) {
            setPost(response.data.post);
        } else {
            console.error("Unexpected status code:", response.status);
        }

    } catch(err) {
        // If user isnt authenticated
        removeAuthandRedirect(`Error Retrieving Post ${postId}`, err as Error, navigate, dispatch);
    }
}

interface LikeResource extends RefreshPage {
    resourceType: string;
    resourceId: string;
    subresourceId: string | null;
}
// Like a post or a comment
const likeResource = async({ resourceType, resourceId, subresourceId, navigate, dispatch }: LikeResource) => {
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
            getPosts({ navigate, dispatch });
        } else {
            console.error("Unexpected status code:", response.status);
        }

    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect(`Error Liking ${resourceType} ${resourceId}`, err as Error, navigate, dispatch);
    }
}

interface LikePost extends RefreshPage {
    postId: string
}
// Like a specific post
const likePost = async({ postId, navigate, dispatch }: LikePost) => {
    await likeResource({ resourceType: "post", resourceId: postId, subresourceId: null, navigate, dispatch });
}

interface LikeComment extends LikePost {
    commentId: string
}
// Like a specific comment
const likeComment = async({ postId, commentId, navigate, dispatch }: LikeComment) => {
    await likeResource({ resourceType: "comment", resourceId: postId, subresourceId: commentId, navigate, dispatch });
}


interface DeleteResource {
    resourceType: string;
    resourceId: string;
    subresourceId: string | null;
    navigate: NavigateFunction;
    dispatch: React.Dispatch<any>;
}
// Delete a post/comment 
const deleteResource = async({ resourceType, resourceId, subresourceId, navigate, dispatch }: DeleteResource) => {
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
            getPosts({ navigate, dispatch });
        } else {
            console.error("Unexpected status code:", response.status);
        }

    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect(`Error Deleting ${resourceType} ${resourceId}`, err as Error, navigate, dispatch);
    }
} 

interface DeletePost extends RefreshPage {
    postId: string;
}
// Send a delete request to server for a specific post id
const deletePost = async({ postId, navigate, dispatch }: DeletePost) => {
    await deleteResource({ resourceType: "post", resourceId: postId, subresourceId: null, navigate, dispatch });
}

interface DeleteComment extends DeletePost {
    commentId: string;
}
// Send a delete request to server for a specific comment id
const deleteComment = async({ postId, commentId, navigate, dispatch }: DeleteComment) => {
    await deleteResource({ resourceType: "comment", resourceId: postId, subresourceId: commentId, navigate, dispatch });
}

interface UpdateResource extends RefreshPage {
    e: React.FormEvent<HTMLFormElement>;
    resourceType: string;
    resourceId: string;
    subresourceId: string | null;
    formData: FormData;
    navigate: NavigateFunction;
    dispatch: React.Dispatch<any>;
}
// Update a post / comment
const updateResource = async({ e, resourceType, resourceId, subresourceId, formData, navigate, dispatch }: UpdateResource) => {
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
            getPosts({ navigate, dispatch });
        } else {
            console.error("Unexpected status code:", response.status);
        }

    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect("Create Resource Error", err as Error, navigate, dispatch);
    }
}

interface UpdatePost {
    e: React.FormEvent<HTMLFormElement>;
    postId: string;
    formData: FormData;
    navigate: NavigateFunction;
    dispatch: React.Dispatch<any>;
}
// Send a put request to server to update a specific post
const updatePost = async({ e, postId, formData, navigate, dispatch }: UpdatePost) => {
    await updateResource({ e, resourceType: "post", resourceId: postId, subresourceId: null, formData, navigate, dispatch });
}

interface UpdateComment extends UpdatePost {
    commentId: string;
}
// Send a put request to server to update a specific comment
const updateComment = async({ e, postId, commentId, formData, navigate, dispatch }: UpdateComment) => {
    await updateResource({ e, resourceType: "comment", resourceId: postId, subresourceId: commentId, formData, navigate, dispatch });
}

interface GetUser extends RefreshPage {
    setUser: React.Dispatch<any>;
}
// Get the current user
const getUser = async({ setUser, navigate, dispatch }: GetUser) => {
    try {
        const response = await axios.get(getUserAPIPath);

        if (response.status === 200) {
            setUser(response.data);
        } else {
            console.error("Unexpected status code:", response.status)
        }

    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect("Error Getting User", err as Error, navigate, dispatch);
    }
};

interface GetUsers extends RefreshPage {
    setUsers: React.Dispatch<any>;
}
// Get all users
const getUsers = async({ setUsers, navigate, dispatch }: GetUsers) => {
    try {
        const response = await axios.get(getUserAPIPath + "/all");

        if (response.status === 200) {
            setUsers(response.data);
        } else {
            console.error("Unexpected status code:", response.status)
        }

    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect("Error Getting Users", err as Error, navigate, dispatch);
    }
}

interface GetSpecificUser extends GetUser {
    userId: string;
}
// Get specific user given their id
const getSpecificUser = async({ userId, setUser, navigate, dispatch }: GetSpecificUser) => {
    try {
        const response = await axios.get(getUserAPIPath + `/${userId}`);
        
        if (response.status === 200) {
            setUser(response.data);
        } else {
            console.error("Unexpected status code:", response.status)
        }

    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect("Error Getting User", err as Error, navigate, dispatch);
    }
}

interface GetUserPosts extends RefreshPage {
    userId: string;
    setPosts: React.Dispatch<any>;
}
// Get posts from specific user
const getUserPosts = async({ userId, setPosts, navigate, dispatch }: GetUserPosts) => {
    try {
        const response = await axios.get(getUserAPIPath + `/${userId}` + "/posts");
        if (response.status === 200) {
            setPosts(response.data);
        } else {
            console.error("Unexpected status code:", response.status)
        }

    } catch(err) {
        // If user isn't authenticated
        removeAuthandRedirect("Error Getting Posts From User", err as Error, navigate, dispatch);
    }
}

interface DeleteUser extends RefreshPage {
    userId: string;
}
const deleteUser = async({ userId, navigate, dispatch }: DeleteUser) => {
    try {
        const response = await axios.delete(getUserAPIPath + `/${userId}`);
        if (response.status === 200) {
            navigate("/login");
            dispatch( setAuthenticated(null) );
        } else {
            console.error("Unexpected status code:", response.status)
        }

    } catch (err) {
        // If user isn't authenticated
        removeAuthandRedirect("Error Getting Posts From User", err as Error, navigate, dispatch);
    }
}


interface handlePopups {
    modalKey: string;
    setModals: React.Dispatch<any>
}
interface ModalState {
    open: boolean;
    fadeOut: boolean;
}
interface ModalsState {
    [key: string]: ModalState;
}
// This function handles the fade in/out of the popup modals
const handlePopups = ({ modalKey, setModals }: handlePopups) => {
    setModals((prevState: ModalsState) => {
        const newState = { ...prevState };

        // If the modal is being closed, set fadeOut to true
        if (newState[modalKey].open) {
            newState[modalKey] = {
                ...newState[modalKey],
                fadeOut: true
            };

            // After the animation has completed, close the modal
            setTimeout(() => {
                setModals((prevState: ModalsState) => ({
                    ...prevState,
                    [modalKey]: {
                        ...prevState[modalKey],
                        open: false
                    }
                }));
            }, 275);
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
    deleteUser,
    handlePopups
}