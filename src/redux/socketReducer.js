import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";


const initialState = {
    socket: io.connect(process.env.REACT_APP_BACK_URL + "/chat")
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setJoinRoom: (state, action) => {
            state.socket.emit('joinEventRoom', action.payload)
        },
        sendNewEvent: (state, action) => {
            state.socket.emit('newEvent', action.payload)
        },
        sendMessage: (state, action)=>{
            state.socket.emit('sendMessage', action.payload)
        },
        sendNewMessage: (state, action)=>{
            state.socket.emit('newMessage', action.payload)
        },
        sendNewPlayerAddInYourEvent: (state, action)=>{
            state.socket.emit('newPlayerAddInYourEvent', action.payload)
        }

    }
});


export const {  setJoinRoom, sendMessage, sendNewEvent, sendNewPlayerAddInYourEvent, sendNewMessage } = socketSlice.actions;
export default socketSlice.reducer;
