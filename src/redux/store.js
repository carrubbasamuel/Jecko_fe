import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import locationReducer from "./locationReducer";
import eventReducer from "./eventReducer";


const rootReducer = combineReducers({
    user: userReducer,
    location: locationReducer,
    event: eventReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;