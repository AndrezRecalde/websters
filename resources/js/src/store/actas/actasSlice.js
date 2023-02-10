import { createSlice } from "@reduxjs/toolkit";


export const actasSlice = createSlice({
    name: "actas",
    initialState: {
        actas: [],
        totalIngresadas: [],
        totalJuntas: [],
    },
    reducers: {
        onLoadActas: (state, {payload}) =>{
            state.actas = payload;
        },
        onLoadTotalIngresadas: (state, {payload}) => {
            state.totalIngresadas = payload;
        },
        onLoadTotalJuntas: (state, {payload}) => {
            state.totalJuntas = payload;
        },
        onClearActas: (state) => {
            state.actas = [];
            state.totalIngresadas = [];
            state.totalJuntas = [];
        }
    },
});

export const { onLoadActas, onLoadTotalIngresadas, onLoadTotalJuntas, onClearActas } = actasSlice.actions;
