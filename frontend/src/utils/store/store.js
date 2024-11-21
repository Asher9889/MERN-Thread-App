import { configureStore } from "@reduxjs/toolkit";
import authScreenReducer  from "./authScreenSlice";


export const store = configureStore({
    reducer: {
        authScreen: authScreenReducer,
    }
})