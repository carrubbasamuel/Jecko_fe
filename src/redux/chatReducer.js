import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {toast } from 'react-toastify';
import axios from "axios";
import { sendMessage } from "./socketReducer";


const initialState = {
    chat: [],
    loading: false,
    error: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        //Chat
        builder.addCase(fetchChat.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchChat.fulfilled, (state, action) => {
            state.loading = false;
            state.chat = action.payload;
        });
        builder.addCase(fetchChat.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});


export const fetchChat = createAsyncThunk(
    'chat/fetchChat',
    async (room, { getState }) => {
        try {
            const response = await axios.get(`http://localhost:3003/message/${room}`, {
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

export const fetchMessage = createAsyncThunk(
    'chat/fetchMessage',
    async (message, { getState, dispatch }) => {
        try {
            const response = await axios.post('http://localhost:3003/message', message, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getState().user.user_token,
                },
            });
            console.log(response.data);
            dispatch(sendMessage(response.data.id_room))
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
);



export default chatSlice.reducer;