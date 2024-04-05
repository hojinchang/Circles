import { configureStore } from "@reduxjs/toolkit";
import authenticatedReducer from "../features/authenticated/authenticatedSlice";
import postsReducer from "../features/posts/postsSlice";

export const store = configureStore({
    reducer: {
        authenticated: authenticatedReducer,
        posts: postsReducer
    }
});