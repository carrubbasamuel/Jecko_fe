import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { notReadMessage } from './chatReducer';
import { fetchLocation } from './locationReducer';
import { sendNewEvent, sendNewMessage, sendNewPlayerAddInYourEvent, setJoinRoom } from './socketReducer';


const initialState = {
    event: null,
    eventPlayer: [],
    showDetails: false,
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setShowDetails(state, action) {
            state.showDetails = action.payload;
        },
    },
    extraReducers: (builder) => {
        //Event By Location
        builder.addCase(fetchEventByLocation.pending, (state) => {
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
        builder.addCase(fetchOnLoadEvent.pending, (state) => {
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

//Crea un nuovo evento
export const fetchCreateEvent = createAsyncThunk(
    'event/fetchCreateEvent',
    async (event, { getState, dispatch }) => {
        try {
            const response = await toast.promise(axios.post(process.env.REACT_APP_BACK_URL + '/create', event, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getState().user.user_token,
                },
            }), {
                pending: 'Loading...',
                success: `You have created the event "${event.title}"`,
                error: 'Compila tutti i campi 😢',
            });
            if (response.status === 201) {
                dispatch(fetchLocation())
                dispatch(sendNewEvent(event))
                dispatch(fetchOnLoadEvent())
            }
            return response.data;
        } catch (error) {
            return error.response
        }
    }
);

//Restituisce tutti gli eventi di una specifica location
export const fetchEventByLocation = createAsyncThunk(
    'event/fetchEventByLocation',
    async (locationId, { getState }) => {
        const response = await axios.get(process.env.REACT_APP_BACK_URL + `/locationEvent/${locationId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().user.user_token,
            },
        });
        return response.data;
    }
);

//Elimina un evento
export const fetchDelateEvent = createAsyncThunk(
    'event/fetchDelateEvent',
    async (eventId, { getState }) => {
        const response = await axios.delete(process.env.REACT_APP_BACK_URL + `/deleteEvent/${eventId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().user.user_token,
            },
        });
        return response.data;
    }
);

//Aggiunge un giocatore ad un evento
export const fetchJoinInEvent = createAsyncThunk(
    'event/fetchJoinInEvent',
    async (event, { getState, dispatch }) => {
        try {
            const response = await toast.promise(fetch(process.env.REACT_APP_BACK_URL + `/joinEvent/${event._id}`, {
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

            dispatch(sendNewPlayerAddInYourEvent(event))
            dispatch(fetchLocation())
            dispatch(sendNewMessage())
            dispatch(fetchEventByLocation(event.locationId))
            return response.data;
        }
        catch (error) {
            toast.error(error.response.data.message)
        }
    }
);

//Verifica se a quale evento è iscritto l'utente e lo collega alle rispettive socket room verificando se ci sono nuovi messaggi
export const fetchOnLoadEvent = createAsyncThunk(
    'event/fetchOnLoadEvent',
    async (_, { getState, dispatch }) => {
        const response = await axios.get(process.env.REACT_APP_BACK_URL + `/onLoadEvent`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().user.user_token,
            },
        });
        const datas = response.data;
        datas.forEach(data => {
            dispatch(setJoinRoom(data.id_room))
        });
        dispatch(notReadMessage())
        return datas;
    }
);





export const { setShowDetails } = eventSlice.actions;
export default eventSlice.reducer;


