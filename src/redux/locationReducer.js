import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
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
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLocation.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchLocation.fulfilled, (state, action) => {
            state.loading = false;
            state.field = action.payload;
        });
        builder.addCase(fetchLocation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const fetchLocation = createAsyncThunk(
    "map/fetchLocation",
    async (_, { getState, dispatch }) => {
        try {
            const userToken = getState().user.user_token; 
            const response = await axios.get(
                process.env.REACT_APP_BACK_URL + "/location",
                {
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


export const { setFieldSelected } = mapSlice.actions;
export default mapSlice.reducer;