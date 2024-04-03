import axios from "axios";

import { createPostAPIPath } from "./apiPaths";

// dynamically set the formData state as the user types into the input
const handleInputChange = (e, setFormData) => {
    const { name, value } = e.target;
    setFormData(formData => ({
        ...formData,
        [name]: value
    }));
}

const handlePostFormSubmission = async(e, postData, formRef, resetForm) => {
    e.preventDefault();
    try {
        // When using axios, you dont need to JSON.stringify(data) your request body
        const response = await axios.post(createPostAPIPath, postData);
        formRef.current.reset();

        if (response.status === 201) {
            // Reset the post data state
            resetForm();
        }
    } catch(err) {
        console.error("Create Post Error", err);
    }
}

export {
    handleInputChange,
    handlePostFormSubmission
}