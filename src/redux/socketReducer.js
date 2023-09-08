import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const initialState = {
    socket: io.connect("http://localhost:3003/chat"),
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setJoinRoom: (state, action) => {
            state.socket.emit('joinEventRoom', action.payload)
        },
        sendMessage: (state, action)=>{
            state.socket.emit('sendMessage', action.payload)
        }

    }
});



export const {  setJoinRoom, sendMessage } = socketSlice.actions;
export default socketSlice.reducer;
