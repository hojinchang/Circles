import { configureStore } from "@reduxjs/toolkit";
import authenticatedReducer from "../features/authenticated/authenticatedSlice";

export const store = configureStore({
    reducer: {
        authenticated: authenticatedReducer
    }
});