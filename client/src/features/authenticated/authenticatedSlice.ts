import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    isAuth: string | null;
}

const initialState: InitialState = {
    isAuth: null
}

export const authenticatedSlice = createSlice({
    name: "authenticated",
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            // Save the user authentication state into local storage to persist data on page reload
            state.isAuth = action.payload;
        }
    }
});

export const { setAuthenticated } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;