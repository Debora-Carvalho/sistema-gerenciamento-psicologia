import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function GraficoGeneroPacientes () {
  const data = {
    labels: ['Feminino', 'Masculino'],
    datasets: [{
      label: 'Número de Pacientes',
      data: [60, 40],
      backgroundColor: ['#f06292', '#42a5f5']
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  };

  return <Bar data={data} options={options} />;
}

export default GraficoGeneroPacientes;
