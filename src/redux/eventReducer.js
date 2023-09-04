import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    event: null,
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    extraReducers: (builder) => {
        //Event By Location
        builder.addCase(fetchEventByLocation.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchEventByLocation.fulfilled, (state, action) => {
            state.loading = false;
            state.event = action.payload;
        });
        builder.addCase(fetchEventByLocation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const fetchCreateEvent = createAsyncThunk(
    'event/fetchCreateEvent',
    async (event, {getState}) => {
        const response = await fetch('http://localhost:3003/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().user.user_token,
                
            },
            body: JSON.stringify(event),
        });
        const data = await response.json();
        return data;
    }
);


export const fetchEventByLocation = createAsyncThunk(
    'event/fetchEventByLocation',
    async (locationId, {getState}) => {
        const response = await fetch(`http://localhost:3003/locationEvent/${locationId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().user.user_token,
            },
        });
        const data = await response.json();
        return data;
    }
);




export default eventSlice.reducer;


