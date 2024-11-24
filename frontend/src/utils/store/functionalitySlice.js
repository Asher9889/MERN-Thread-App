import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openNewPostCard: null
}

export const functionalitySlice = createSlice({
    name: "appFunctionality",
    initialState,
    reducers:{
        setNewPostCardFunction: (state,action)=>{
            state.openNewPostCard = action.payload;
        }
    }

})

export const { setNewPostCardFunction } = functionalitySlice.actions;
export default functionalitySlice.reducer;