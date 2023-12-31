import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
import { fetchOnLoadEvent } from "./eventReducer";
import { sendMessage } from "./socketReducer";


const initialState = {
    chat: [],
    notReadMessage: [],
    loading: false,
    error: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChat: (state, action) => {
            state.chat = action.payload;
        }
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
        //Message non letti
        builder.addCase(notReadMessage.pending, (state, action) => {
            state.loading = true;
        }
        );
        builder.addCase(notReadMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.notReadMessage = action.payload;
        });
        builder.addCase(notReadMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});


export const fetchChat = createAsyncThunk(
    'chat/fetchChat',
    async (room, { getState }) => {
        try {
            const response = await axios.get(process.env.REACT_APP_BACK_URL + `/message/${room}`, {
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
            const response = await axios.post(process.env.REACT_APP_BACK_URL + '/message', message, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getState().user.user_token,
                },
            });
            dispatch(sendMessage(response.data.id_room))
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
);

export const notReadMessage = createAsyncThunk(
    'chat/notReadMessage',
    async (_, { getState }) => {
        try {
            const response = await axios.get(process.env.REACT_APP_BACK_URL + '/messageNotRead', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getState().user.user_token,
                },
            });
            return response.data;
        } catch (error) {
            return error
        }
    }
);


export const fetchReadMessage = createAsyncThunk(
    'chat/fetchReadMessage',
    async (id_room, { getState, dispatch }) => {
        try {
            const response = await axios.patch(process.env.REACT_APP_BACK_URL + `/messageRead/${id_room}`,{}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getState().user.user_token,
                },
            });
            dispatch(fetchOnLoadEvent())
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
);



export const { setChat } = chatSlice.actions;

export default chatSlice.reducer;