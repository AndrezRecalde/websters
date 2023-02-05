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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useResultsStore } from "../../hooks/useResultsStore";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export const ResultadosGrafico = () => {
    const { resultsCandidatos } = useResultsStore();

    const labels = resultsCandidatos.map((candidato) => candidato.nombre);

    /* Gráfico de barra horizontal */
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
                borderColor: resultsCandidatos.map(
                    (candidato) => candidato.color
                ),
                plugins: [ChartDataLabels],
                datalabels: {
                    color: "grey",
                    align: "bottom",
                    labels: {
                        title: {
                            font: {
                                weight: "bold",
                                size: 15
                            }
                        }
                    }
                }
            },
        ],
    };

    const options = {
        redraw: true,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                onClick: (event, legendItem, legend) => {
                    const index = legend.chart.data.labels.indexOf(legendItem.text);
                    legend.chart.toggleDataVisibility(index);
                    legend.chart.getDataVisibility(index);
                    legend.chart.update();
                },
                labels: {
                    generateLabels: (chart) => {
                        let visibility = [];
                        for(let i = 0; i < chart.data.labels.length; i++){
                            if(chart.getDataVisibility(i) === true){
                                visibility.push(false);
                            }else{
                                visibility.push(true);
                            }
                        }
                        return chart.data.labels.map(
                            (label, index) => ({
                                text: label,
                                fontColor: "white",
                                strokeStyle: chart.data.datasets[0].borderColor[index],
                                fillStyle: chart.data.datasets[0].backgroundColor[index],
                                hidden: visibility[index]
                            })
                        )
                    }
                }
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
            <Bar options={options} data={dataBar} width="100%"
            height="500px" />
    );
};
