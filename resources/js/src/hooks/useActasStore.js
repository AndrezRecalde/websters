import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import websterApi from "../api/websterApi";
import { onClearActas, onLoadActas } from "../store/actas/actasSlice";

export const useActasStore = () => {
    const { actas } = useSelector((state) => state.actas);
    const dispatch = useDispatch();

   const startLoadActas = async({iddignidad, cod_canton, cod_parroquia, tipo_acta}) => {
    try {
        const { data } = await websterApi.post("actas", {iddignidad, cod_canton, cod_parroquia, tipo_acta});
        const { actas } = data;
        if(actas.length > 0) {
            dispatch(onLoadActas(actas));
        } else {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Lo sentimos, aun no tenemos datos",
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

   const startLoadAllActas = async({iddignidad, cod_canton, cod_parroquia}) => {
    try {
        const { data } = await websterApi.post("actas/todas", {iddignidad, cod_canton, cod_parroquia});
        const { actas } = data;
        if(actas.length > 0) {
            dispatch(onLoadActas(actas));
        } else {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Lo sentimos, aun no tenemos datos",
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

    const startClearActas = () => {
        dispatch(onClearActas());
    };

    const startExportExcelActas = async(values = {}) => {
        try {
            const response = await websterApi.post("/actas/export/excel", values, {responseType:"blob"});
            const url = window.URL.createObjectURL(new Blob([response.data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'}));
            window.open(url, "_blank");

        } catch (error) {
            console.log(error);
        }
    }

    const startExportExcelActasAll = async(values = {}) => {
        try {
            const response = await websterApi.post("/actas/export/excel/todas", values, {responseType:"blob"});
            const url = window.URL.createObjectURL(new Blob([response.data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;'}));
            window.open(url, "_blank");

        } catch (error) {
            console.log(error);
        }
    }

    return {
        actas,

        startLoadActas,
        startClearActas,
        startExportExcelActas,
        startLoadAllActas,
        startExportExcelActasAll
    };
};
