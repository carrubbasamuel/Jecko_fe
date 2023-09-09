import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";



const initialState = {
    user_token: localStorage.getItem("user") || null,
    profile: null,
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
        //Login
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
        //Singup
        builder.addCase(fetchSingup.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchSingup.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(fetchSingup.rejected, (state, action) => {
            state.loading = false;

            state.error = state.error + action.payload
        });
        //Profile
        builder.addCase(fetchProfile.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profile = action.payload;
        })
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export const fetchLogin = createAsyncThunk(
    "user/fetchLogin",
    async (data) => {
        try {
            const response = await toast.promise(axios.post(process.env.REACT_APP_BACK_URL + "/login", data), {
                pending: "Loading...",
                success: "Login success",
                error: "Login failed",
            });
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
            const response = await toast.promise(axios.post(process.env.REACT_APP_BACK_URL + "/signup", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }), {
                pending: "Registering...",
                success: "Signup success",
                error: "Signup failed",
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


export const fetchProfile = createAsyncThunk(
    "user/fetchProfile",
    async (_, { getState, dispatch}) => {
        try {
            const { user_token } = getState().user;
            const response = await axios.get(process.env.REACT_APP_BACK_URL + "/profile", {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: user_token,
                },
            });
            return response.data;
        } catch (error) {
            if(error.response.status === 401){
                toast.error("Unauthorized");
                setTimeout(() => {
                  window.location.href = "/login";
                }, 1000);
                throw error;
            }
            error.response.data.errors.forEach((err) => {
                toast.error(err.msg);
                throw err;
            });
        }
    }
);




export const { logout } = userSlice.actions;
export default userSlice.reducer;