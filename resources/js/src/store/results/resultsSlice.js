import { createSlice } from "@reduxjs/toolkit";


export const resultsSlice = createSlice({
    name: "results",
    initialState: {
        resultsConcejales: [],
        resultsJuntasParroquiales: [],
        resultsCandidatos: []
    },

    reducers: {
        onLoadResultsConcejales: (state, {payload}) => {
            state.resultsConcejales = payload;
        },
        onLoadResultsJuntasParroquiales: (state, {payload}) => {
            state.resultsJuntasParroquiales = payload;
        },
        onLoadResultsCandidatos: (state, {payload}) => {
            state.resultsCandidatos = payload;
        },
        onClearResults: (state) => {
            state.resultsConcejales = [];
            state.resultsJuntasParroquiales = [];
            state.resultsCandidatos = []

        }
    }
});

export const { onLoadResultsConcejales, onLoadResultsJuntasParroquiales, onLoadResultsCandidatos, onClearResults  } = resultsSlice.actions
