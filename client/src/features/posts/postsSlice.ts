import { createSlice } from "@reduxjs/toolkit";
import { PostInterface } from "../../types/Post";

interface PostsState {
    posts: PostInterface[];
    loading: boolean;
}

const initialState: PostsState = {
    posts: [],
    loading: false,
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        }
    }
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;