import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import websterApi from "../api/websterApi";
import { onClearDignidades, onLoadConcejales, onLoadJuntas, onLoadPrefectosAlcaldes } from "../store/dignidades/dignidadesSlice";


export const useDignidadesStore = () => {

    const { candidatos, concejales, juntas } = useSelector(state => state.dignidades);
    const dispatch = useDispatch();

    const startLoadConcejales = async() => {
        try {
            const { data } = await websterApi.get("dignidades/concejales");
            const { dignidades } = data;
            dispatch(onLoadConcejales(dignidades));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startLoadJuntas = async() => {
        try {
            const { data } = await websterApi.get("dignidades/juntas");
            const { dignidades } = data;
            dispatch(onLoadJuntas(dignidades));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startLoadPrefectosAlcaldes = async() => {
        try {
            const { data } = await websterApi.get("dignidades/candidatos");
            const { dignidades } = data;
            dispatch(onLoadPrefectosAlcaldes(dignidades));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startClearDignidades = () => {
        dispatch(onClearDignidades());
    }

  return {
    candidatos,
    concejales,
    juntas,
    startLoadPrefectosAlcaldes,
    startLoadConcejales,
    startLoadJuntas,
    startClearDignidades
  }
}

