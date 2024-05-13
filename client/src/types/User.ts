interface UserInterface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: string;
    friends: string[];
    joinDate: string;
    fullName?: string;
    joinDateFormatted: string;
}

export default UserInterface;