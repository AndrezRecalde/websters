import React from "react";
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useResultsStore } from "../../hooks/useResultsStore";
import { Container } from "@mantine/core";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const ResultadosGrafico = () => {
    const { resultsCandidatos } = useResultsStore();

    const labels = resultsCandidatos.map((candidato) => candidato.nombre);

    /*Gráfico de barra horizontal */
    const dataBar = {
        labels,
        datasets: [
            {
                label: "Total Votos: ",
                data: resultsCandidatos.map(
                    (candidato) => candidato.total_votos
                ),
                backgroundColor: resultsCandidatos.map(
                    (candidato) => candidato.color
                ),
                borderWidth: 2,
                borderRadius: 2,
                borderColor: "black",
            },
        ],
    };

    const options = {
        redraw: true,
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: "top",
            },
            title: {
                display: true,
                text: `Resultado de ${resultsCandidatos[0].nombre_dignidad}`,
                font: {
                    size: 20,
                    weight: "bold",
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: "grey",
                    borderColor: "grey",
                    tickColor: "grey",
                },
                ticks: {
                    color: "grey",
                },
            },
            y: {
                grid: {
                    color: "grey",
                    borderColor: "grey",
                    tickColor: "grey",
                },
                ticks: {
                    color: "grey",
                },
            },
        },
    };

    return (
        <Container>
            <Bar options={options} data={dataBar} />
        </Container>
    );
};
