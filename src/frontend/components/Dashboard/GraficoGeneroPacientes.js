import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import usePacientes from '../../hooks/pacientes/usePacientesListar';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function GraficoGeneroPacientes() {
    const { pacientes, carregando, erro } = usePacientes();

    const contarGeneros = (pacientes) => {
        const contagem = { Feminino: 0, Masculino: 0 };

        pacientes.forEach(p => {
            const genero = (p.genero || '').toLowerCase();
            if (genero.includes('feminino')) contagem.Feminino++;
            else if (genero.includes('masculino')) contagem.Masculino++;
        });

        return [contagem.Feminino, contagem.Masculino];
    };

    const data = {
        labels: ['Feminino', 'Masculino'],
        datasets: [{
            label: 'Número de Pacientes',
            data: contarGeneros(pacientes),
            backgroundColor: ['#f06292', '#42a5f5']
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        y: {
            ticks: {
                stepSize: 1,
                precision: 0,
                beginAtZero: true
            }
        }
    };

    if (carregando) return <p>Carregando gráfico...</p>;
    if (erro) return <p>Erro: {erro}</p>;
    if (pacientes.length === 0) return <p>Sem dados de pacientes.</p>;

    return <Bar data={data} options={options} />;
}

export default GraficoGeneroPacientes;
