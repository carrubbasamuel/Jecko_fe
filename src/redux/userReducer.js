import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    user_token: localStorage.getItem("user") || null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {}
});


export default userSlice.reducer;