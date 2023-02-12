import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useActasStore } from '../../hooks/useActasStore';

ChartJS.register(ArcElement, Tooltip, Legend);



export const TotalEscrutinioPage = () => {

    const { totalIngresadas, totalJuntas } = useActasStore();

    const data = {
        labels: ['Ingresadas', 'Restantes'],
        datasets: [
          {
            label: 'Total',
            data: [totalIngresadas[0]?.digitadas, totalJuntas[0]?.total - totalIngresadas[0]?.digitadas],
            backgroundColor: [
              'rgba(122, 249, 160)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(12, 202, 69)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };

  return (
        <Pie data={data} width={230}
        height={230}
        options={{maintainAspectRatio: false}}/>
  )
}
