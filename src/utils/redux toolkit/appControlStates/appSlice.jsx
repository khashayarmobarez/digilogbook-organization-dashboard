'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSideMenuOpen:false,
}


const appControlSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        updateSideMenu: (state, action) => {
            state.isSideMenuOpen = action.payload;
        },
    },
});

export const {updateSideMenu} = appControlSlice.actions;
export default appControlSlice.reducer;
export const selectAppControl = (store) =>store.appControl;