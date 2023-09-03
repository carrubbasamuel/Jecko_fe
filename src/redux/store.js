import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import locationReducer from "./locationReducer";


const rootReducer = combineReducers({
    user: userReducer,
    location: locationReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;