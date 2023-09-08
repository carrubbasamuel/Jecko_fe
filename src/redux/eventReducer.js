import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setJoinRoom } from './socketReducer';


const initialState = {
    event: null,
    eventPlayer: [],
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
        //Event OnLoad
        builder.addCase(fetchOnLoadEvent.pending, (state, action) => {
            state.loading = true;
        }
        );
        builder.addCase(fetchOnLoadEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.eventPlayer = action.payload;
        })
        builder.addCase(fetchOnLoadEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export const fetchCreateEvent = createAsyncThunk(
    'event/fetchCreateEvent',
    async (event, { getState }) => {
        try {
            const response = await axios.post('http://localhost:3003/create', event, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getState().user.user_token,
                },
            });

            return response.data;
        } catch (error) {
            toast.error(error.response.data.message)
        }
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


export const fetchDelateEvent = createAsyncThunk(
    'event/fetchDelateEvent',
    async (eventId, {getState}) => {
        const response = await fetch(`http://localhost:3003/deleteEvent/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().user.user_token,
            },
        });
        const data = await response.json();
        
        return data;
    }
);

export const fetchJoinInEvent = createAsyncThunk(
    'event/fetchJoinInEvent',
    async (event, {getState}) => {
        const response = await fetch(`http://localhost:3003/joinEvent/${event._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().user.user_token,
            },
        });
        const data = await response.json();
        return data;
    }
);


export const fetchOnLoadEvent = createAsyncThunk(
    'event/fetchOnLoadEvent',
    async (_, {getState, dispatch}) => {
        const response = await fetch(`http://localhost:3003/onLoadEvent`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().user.user_token,
            },
        });
        const datas = await response.json();
        datas.forEach(data => {
            dispatch(setJoinRoom(data.id_room))
        });
        return datas;
    }
);





export default eventSlice.reducer;


