import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import websterApi from "../api/websterApi";
import {
    onClearResults,
    onLoadResultsCandidatos,
    onLoadResultsConcejales,
    onLoadResultsJuntasParroquiales,
} from "../store/results/resultsSlice";

export const useResultsStore = () => {
    const { resultsCandidatos, resultsConcejales, resultsJuntasParroquiales } = useSelector(
        (state) => state.results
    );

    const dispatch = useDispatch();

    const startLoadResultsConcejalesUrbanos = async ({ iddignidad, cod_canton }) => {
        try {
            const { data } = await websterApi.post("concejales/r/urbanos", {
                iddignidad,
                cod_canton,
            });
            const { concejales } = data;
            if (concejales.length > 0) {
                dispatch(onLoadResultsConcejales(concejales));
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: "Lo sentimos, aun no tenemos datos de esa zona!",
                    confirmButtonColor: "#0bb53b",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadResultsConcejalesRurales = async ({ iddignidad, cod_canton }) => {
        try {
            const { data } = await websterApi.post("concejales/r/rurales", {
                iddignidad,
                cod_canton,
            });
            const { concejales } = data;
            if (concejales.length > 0) {
                dispatch(onLoadResultsConcejales(concejales));
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: "Lo sentimos, aun no tenemos datos de esa zona!",
                    confirmButtonColor: "#0bb53b",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadResultsJuntas = async ({iddignidad, cod_parroquia}) => {
        try {
            const { data } = await websterApi.post("juntas", {
                iddignidad,
                cod_parroquia,
            });
            const { juntas } = data;
            if (juntas.length > 0) {
                dispatch(onLoadResultsJuntasParroquiales(juntas));
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: "Lo sentimos, aun no tenemos datos de esa zona!",
                    confirmButtonColor: "#0bb53b",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadResultsCandidatosProv = async ({iddignidad, cuadrada, legible}) => {
        try {
            const { data } = await websterApi.post("resultados/provinciales",{iddignidad, cuadrada, legible});
            const { candidatos } = data;

            if(candidatos.length > 0){
                dispatch(onLoadResultsCandidatos(candidatos));
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: "Lo sentimos, aun no tenemos datos de esa zona!",
                    confirmButtonColor: "#0bb53b",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startLoadResultsCandidatosCant = async ({iddignidad, cod_canton, cuadrada, legible}) => {
        try {
            const { data } = await websterApi.post("resultados/cantonales",{iddignidad, cod_canton, cuadrada, legible});
            const { candidatos } = data;

            if(candidatos.length > 0){
                dispatch(onLoadResultsCandidatos(candidatos));
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: "Lo sentimos, aun no tenemos datos de esa zona!",
                    confirmButtonColor: "#0bb53b",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startLoadResultsCandidatosParr = async ({iddignidad, cod_parroquia, cuadrada, legible}) => {
        try {
            const { data } = await websterApi.post("resultados/parroquial",{iddignidad, cod_parroquia, cuadrada, legible});
            const { candidatos } = data;

            if(candidatos.length > 0){
                dispatch(onLoadResultsCandidatos(candidatos));
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: "Lo sentimos, aun no tenemos datos de esa zona!",
                    confirmButtonColor: "#0bb53b",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startLoadResultsCandidatosRec = async ({iddignidad, cod_recinto, cuadrada, legible}) => {
        try {
            const { data } = await websterApi.post("resultados/recintos",{iddignidad, cod_recinto, cuadrada, legible});
            const { candidatos } = data;

            if(candidatos.length > 0){
                dispatch(onLoadResultsCandidatos(candidatos));
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: "Lo sentimos, aun no tenemos datos de esa zona!",
                    confirmButtonColor: "#0bb53b",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startClearResults = () => {
        dispatch(onClearResults());
    };

    return {
        resultsCandidatos,
        resultsConcejales,
        resultsJuntasParroquiales,

        startLoadResultsConcejalesUrbanos,
        startLoadResultsConcejalesRurales,
        startLoadResultsJuntas,
        startLoadResultsCandidatosProv,
        startLoadResultsCandidatosCant,
        startLoadResultsCandidatosParr,
        startLoadResultsCandidatosRec,


        startClearResults,
    };
};
