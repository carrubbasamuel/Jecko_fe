import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user_token: localStorage.getItem("user") || null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem("user");
            state.user_token = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem("user", action.payload);
            state.user_token = action.payload;
        });
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(fetchSingup.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchSingup.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(fetchSingup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const fetchLogin = createAsyncThunk(
    "user/fetchLogin",
    async (data) => {
        const response = await axios.post(process.env.REACT_APP_BACK_URL + "/login", data);
        return response.data;
    }
);

export const fetchSingup = createAsyncThunk(
    "user/fetchSingup",
    async (data) => {
        const response = await axios.post(process.env.REACT_APP_BACK_URL + "/signup", data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
);




export const { logout } = userSlice.actions;
export default userSlice.reducer;