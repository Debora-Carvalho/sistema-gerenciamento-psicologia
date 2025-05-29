import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function GraficoEstadoCivilPacientes() {
    const data = {
        labels: ['Solteiro', 'União estável', 'Casado', 'Divorciado', 'Viúvo'],
        datasets: [{
            data: [30, 15, 25, 20, 10],
            backgroundColor: ['#ffcd56', '#36a2eb', '#ff6384', '#4bc0c0', '#9966ff']
        }]
    };

    return <Pie data={data} />;
}

export default GraficoEstadoCivilPacientes;
