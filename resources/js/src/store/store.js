import { configureStore } from "@reduxjs/toolkit";
import { dignidadesSlice } from "./dignidades/dignidadesSlice";
import { resultsSlice } from "./results/resultsSlice";
import { statesSlice } from "./states/statesSlice";
import { uiSlice } from "./ui/uiSlice";



export const store = configureStore({
    reducer: {
        states: statesSlice.reducer,
        dignidades: dignidadesSlice.reducer,
        results: resultsSlice.reducer,
        ui: uiSlice.reducer
    }
});
