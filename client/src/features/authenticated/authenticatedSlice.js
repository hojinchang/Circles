import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
}

export const authenticatedSlice = createSlice({
    name: "authenticated",
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setAuthenticated } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;