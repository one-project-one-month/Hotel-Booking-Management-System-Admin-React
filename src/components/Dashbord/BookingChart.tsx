import {Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  type ChartOptions,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title);

const BookingChart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Booking Data",
        data: [65, 59, 80, 81, 56, 55, 40, 33, 50, 20, 90, 95],
        fill: false,
        borderColor: '#59CBFF',
        tension: 0.1
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Booking Data Line Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", height: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default BookingChart;
