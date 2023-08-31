import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


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
            state.error = action.error.message; // Messaggio di errore dal backend
        });
        builder.addCase(fetchSingup.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchSingup.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(fetchSingup.rejected, (state, action) => {
            state.loading = false;
            console.log(action.error)
            state.error = state.error + action.payload
        });
    }
});

export const fetchLogin = createAsyncThunk(
    "user/fetchLogin",
    async (data) => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACK_URL + "/login", data);
            return response.data;
        } catch (error) {
            if(error.response.status === 401 || error.response.status === 404){
                toast.error("Email or password incorrect");
                throw error;
            }
            error.response.data.errors.forEach((err) => {
                toast.error(err.msg);
                throw err;
            });
        }
    }
);


export const fetchSingup = createAsyncThunk(
    "user/fetchSignup",
    async (data) => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACK_URL + "/signup", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            switch (error.response.status) {
                case 400:
                    error.response.data.errors.forEach((err) => {
                        toast.error(err.msg);
                        throw err;
                    });
                    break;
                case 500:
                    toast.error("Server error");
                    break;
                case 409:
                    toast.error("Email already exists");
                    break;
                default:
                    toast.error("Server error");
                    break;
                }
            }
        }
);




export const { logout } = userSlice.actions;
export default userSlice.reducer;