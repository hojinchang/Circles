import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        }
    }
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;