import { createSlice } from "@reduxjs/toolkit";

export const dignidadesSlice = createSlice({
    name: "dignidades",
    initialState: {
        candidatos: [],
        concejales: [],
        juntas: []
    },

    reducers: {
        onLoadPrefectosAlcaldes: (state, {payload}) => {   //Solo carga el nombre de dignidad ejem: Prefectos, Alcaldes, Concejales Urb
            state.candidatos = payload;
        },
        onLoadConcejales: (state, {payload}) => {
            state.concejales = payload;
        },
        onLoadJuntas: (state, {payload}) => {
            state.juntas = payload;
        },

        onClearDignidades: (state) => {
            state.candidatos = [];
            state.concejales = [];
            state.juntas = [];
        }
    }
});

export const { onLoadPrefectosAlcaldes, onLoadConcejales, onLoadJuntas, onClearDignidades } = dignidadesSlice.actions;
