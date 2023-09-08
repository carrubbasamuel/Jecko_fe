import { combineReducers, configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventReducer";
import locationReducer from "./locationReducer";
import socketReducer from "./socketReducer";
import userReducer from "./userReducer";
import chatReducer from "./chatReducer";
import thunk from "redux-thunk";



const rootReducer = combineReducers({
    user: userReducer,
    location: locationReducer,
    event: eventReducer,
    socket: socketReducer,
    chat: chatReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});


export default store;