// dynamically set the formData state as the user types into the input
const handleInputChange = (e, setFormData) => {
    const { name, value } = e.target;
    setFormData(formData => ({
        ...formData,
        [name]: value
    }));
}

export {
    handleInputChange
}