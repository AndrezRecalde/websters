import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useActasStore } from '../../hooks/useActasStore';

ChartJS.register(ArcElement, Tooltip, Legend);



export const EscConcejales = () => {

    const { totalIngresadas, totalJuntas } = useActasStore();

    const data = {
        labels: ['Ingresadas', 'Restantes'],
        datasets: [
          {
            label: 'Total',
            data: [totalIngresadas[0]?.digitadas, totalJuntas[0]?.total - totalIngresadas[0]?.digitadas],
            backgroundColor: [
              'rgba(150, 255, 233)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(99, 255, 222)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

  return (
        <Pie data={data}/>
  )
}
