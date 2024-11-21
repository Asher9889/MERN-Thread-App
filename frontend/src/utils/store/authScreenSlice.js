import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     value: "loginState",
}

export const authScreenSlice = createSlice({
    name: "authScreen",
    initialState,
    reducers: {
        setAuthScreen: (state, action)=>{
            state.value = action.payload //== "loginState" ? "signupState" : "loginState"
        }
    }
})

export const { setAuthScreen }  = authScreenSlice.actions;

export default authScreenSlice.reducer;