
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const UserChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar','Apr',"May",'Jun','Jul',"Aug","Sept","Oct","Nov","Dec"],
    datasets: [
      {
        label: 'User Data',
        data: [65, 59, 80, 81, 56, 55, 40, 33, 50, 20, 90, 95],
        backgroundColor: [
          '#52ED97',
          '#FED077',
          '#FF996B',
        ],
        borderColor: [
          '#52ED97',
          '#FED077',
          '#FF996B',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options:ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'User Data Bar Chart' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div style={{ width: '100%', margin: '0 auto',height:'100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default UserChart;
