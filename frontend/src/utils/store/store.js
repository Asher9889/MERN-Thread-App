import { configureStore } from "@reduxjs/toolkit";
import authScreenReducer  from "./authScreenSlice";
import userReducer from "./userSlice"

export const store = configureStore({
    reducer: {
        authScreen: authScreenReducer,
        loggedUser: userReducer,
    }
})