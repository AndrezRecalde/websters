
import { useDispatch, useSelector } from 'react-redux'
import websterApi from '../api/websterApi';
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
            console.log(error);
        }
    }

    const startLoadCantonesUrbanos = async() => {
        try {
            const { data } = await websterApi.get("cantones/urbanos");
            const { cantones } = data;
            dispatch(onLoadCantones(cantones));
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadCantonesRurales = async() => {
        try {
            const { data } = await websterApi.get("cantones/rurales");
            const { cantones } = data;
            dispatch(onLoadCantones(cantones));
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadParroquias = async(cod_canton) => {
        try {
            const { data } = await websterApi.post("parroquias", {cod_canton});
            const { parroquias } = data;
            dispatch(onLoadParroquias(parroquias));
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadRecintos = async(cod_parroquia) => {
        try {
            const { data } = await websterApi.post("recintos", {cod_parroquia});
            const { recintos } = data;
            dispatch(onLoadRecintos(recintos));
        } catch (error) {
            console.log(error);
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
    startLoadRecintos,

    startClearStates
  }
}

