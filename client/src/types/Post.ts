import UserInterface from "./User";

 export interface CommentInterface {
    id: string;
    user: UserInterface;
    post: string;
    timeStamp: string;
    likes: string[];
    timeStampFormatted: string;
}

export interface PostInterface {
    id: string;
    user: UserInterface;
    post: string;
    timeStamp: string;
    likes: string[];
    comments: CommentInterface[];
    timeStampFormatted: string;
}