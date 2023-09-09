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
    async (event, { getState, dispatch }) => {
        try {
            const response = await toast.promise(axios.post('http://localhost:3003/create', event, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getState().user.user_token,
                },
            }), {
                pending: 'Loading...',
                success: `You have created the event ${event.name}`,
                error: 'Error',
            });
            dispatch(fetchOnLoadEvent())
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
);


export const fetchEventByLocation = createAsyncThunk(
    'event/fetchEventByLocation',
    async (locationId, {getState}) => {
        const response = await axios.get(`http://localhost:3003/locationEvent/${locationId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().user.user_token,
            },
        });
        return response.data;
    }
);


export const fetchDelateEvent = createAsyncThunk(
    'event/fetchDelateEvent',
    async (eventId, {getState}) => {
        const response = await axios.delete(`http://localhost:3003/deleteEvent/${eventId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().user.user_token,
            },
        });
        return response.data;
    }
);

export const fetchJoinInEvent = createAsyncThunk(
    'event/fetchJoinInEvent',
    async (event, {getState, dispatch}) => {
        const response = await toast.promise(fetch (`http://localhost:3003/joinEvent/${event._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().user.user_token,
            },
        }), {
            pending: 'Loading...',
            success: `You have joined the event ${event.title}`,
            error: 'Error',
        });
        dispatch(fetchOnLoadEvent())
        return response.data;
    }
);


export const fetchOnLoadEvent = createAsyncThunk(
    'event/fetchOnLoadEvent',
    async (_, {getState, dispatch}) => {
        const response = await axios.get(`http://localhost:3003/onLoadEvent`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().user.user_token,
            },
        });
        const datas = response.data;
        datas.forEach(data => {
            dispatch(setJoinRoom(data.id_room))
        });
        return datas;
    }
);





export default eventSlice.reducer;


