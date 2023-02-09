import { createSlice } from "@reduxjs/toolkit";


export const actasSlice = createSlice({
    name: "actas",
    initialState: {
        actas: [],
    },
    reducers: {
        onLoadActas: (state, {payload}) =>{
            state.actas = payload;
        },
        onClearActas: (state) => {
            state.actas = [];
        }
    },
});

export const { onLoadActas, onClearActas } = actasSlice.actions;
