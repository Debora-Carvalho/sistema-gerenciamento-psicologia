import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function GraficoAgendamentosMensal() {
    const data = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
            label: 'Número de agendamentos',
            data: [12, 19, 10, 23, 30, 25, 20, 18, 22, 27, 33, 40],
            borderColor: '#42a5f5',
            backgroundColor: '#bbdefb',
            fill: true,
            tension: 0.3
        }]
    };

    const options = {
        responsive: true
    };

    return <Line data={data} options={options} />;
}

export default GraficoAgendamentosMensal;
