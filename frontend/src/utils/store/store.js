import { configureStore } from "@reduxjs/toolkit";
import authScreenReducer  from "./authScreenSlice";
import userReducer from "./userSlice"
import appFunctionalityReducer from "./functionalitySlice";


export const store = configureStore({
    reducer: {
        authScreen: authScreenReducer,
        loggedUser: userReducer,
        appFunctionality: appFunctionalityReducer,
    }
})