import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    citySelected: null,
    field: [],
    fieldSelected: null,
    loading: false,
    error: null,
};


const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        setFieldSelected: (state, action) => {
            state.fieldSelected = action.payload;
        },
        setCitySelected: (state, action) => {
            state.citySelected = action.payload;
        }
    },
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
    async (city, { getState, dispatch }) => {
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
            dispatch(setCitySelected(city));
            const data = response.data;
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);


export const { setFieldSelected, setCitySelected } = mapSlice.actions;
export default mapSlice.reducer;