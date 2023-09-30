import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
    loading: false,
    error: null,
    success: false,
    successPin: false,
    currentEmail: null
}


const restoreSlice = createSlice({
    name: 'restore',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.error = null
            state.success = false
            state.successPin = false
            state.currentEmail = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(forgot.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(forgot.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.currentEmail = action.payload.email
        })
        builder.addCase(forgot.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(checkPin.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(checkPin.fulfilled, (state, action) => {
            state.loading = false
            state.successPin = true
        })
        builder.addCase(checkPin.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const forgot = createAsyncThunk(
    'restore/forgot',
    async (email, thunkAPI) => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACK_URL+'/forgotpass', { email }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.status);
        }
    }
);

export const checkPin = createAsyncThunk(
    'restore/checkPin',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACK_URL+'/checkpin', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.status);
        }
    }
);

export const changePass = createAsyncThunk(
    'restore/changePass',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACK_URL+'/changepass', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            return response.data
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);


export const { reset } = restoreSlice.actions
export default restoreSlice.reducer