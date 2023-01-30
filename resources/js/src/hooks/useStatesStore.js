
import { useDispatch, useSelector } from 'react-redux'
import websterApi from '../api/websterApi';
import Swal from "sweetalert2";
import { onClearStates, onLoadCantones, onLoadParroquias, onLoadRecintos } from '../store/states/statesSlice';

export const useStatesStore = () => {

    const { cantones, parroquias, recintos } = useSelector(state => state.states);
    const dispatch = useDispatch();

    const startLoadCantones = async() => {
        try {
            const { data } = await websterApi.get("cantones");
            const { cantones } = data;
            dispatch(onLoadCantones(cantones));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startLoadCantonesUrbanos = async() => {
        try {
            const { data } = await websterApi.get("cantones/urbanos");
            const { cantones } = data;
            dispatch(onLoadCantones(cantones));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startLoadCantonesRurales = async() => {
        try {
            const { data } = await websterApi.get("cantones/rurales");
            const { cantones } = data;
            dispatch(onLoadCantones(cantones));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startLoadParroquias = async(cod_canton) => {
        try {
            const { data } = await websterApi.post("parroquias", {cod_canton});
            const { parroquias } = data;
            dispatch(onLoadParroquias(parroquias));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startLoadParroquiasRurales = async(cod_canton) => {
        try {
            const { data } = await websterApi.post("parroquias/rurales", {cod_canton});
            const { parroquias } = data;
            dispatch(onLoadParroquias(parroquias));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startLoadRecintos = async(cod_parroquia) => {
        try {
            const { data } = await websterApi.post("recintos", {cod_parroquia});
            const { recintos } = data;
            dispatch(onLoadRecintos(recintos));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startClearStates = () => {
        dispatch(onClearStates());
    }



  return {
    cantones,
    parroquias,
    recintos,

    startLoadCantones,
    startLoadCantonesUrbanos,
    startLoadCantonesRurales,
    startLoadParroquias,
    startLoadParroquiasRurales,
    startLoadRecintos,

    startClearStates
  }
}

