import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    field: [],
    loading: false,
    error: null,
};


const mapSlice = createSlice({
    name: "map",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchLocationByCity.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchLocationByCity.fulfilled, (state, action) => {
            state.loading = false;
            state.field = action.payload;
        });
        builder.addCase(fetchLocationByCity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const fetchLocationByCity = createAsyncThunk(
    "map/fetchLocationByCity",
    async (city, { getState }) => {
        try {
            const userToken = getState().user.user_token; 
            const response = await axios.get(
                process.env.REACT_APP_BACK_URL + "/location",
                {
                    params: { city },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: userToken,
                    },
                }
            );
            const data = response.data;
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export default mapSlice.reducer;