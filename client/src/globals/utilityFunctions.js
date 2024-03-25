// dynamically set the formData state as the user types into the input
const handleInputChange = (e, formData, setFormData) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
}

export {
    handleInputChange
}