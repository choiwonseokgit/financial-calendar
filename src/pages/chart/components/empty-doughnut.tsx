
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const options: ChartOptions<'doughnut'> = {
  plugins: {
    datalabels: {
      color: 'black',
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      display: true,
      position: 'top',
      onClick: () => {},
    },
  },
  layout: {
    padding: 20,
  },
  cutout: '30%',
};

const data = {
  labels: ['지출 내역이 없습니다.'],
  datasets: [
    {
      data: [1],
      backgroundColor: ['rgba(192, 192, 192, 0.2)'],
      borderColor: ['rgba(128, 128, 128, 1)'],
      borderWidth: 0,
    },
  ],
};

function EmptyDoughnut() {
  return <Doughnut options={options} data={data} />;
}

export default EmptyDoughnut;
