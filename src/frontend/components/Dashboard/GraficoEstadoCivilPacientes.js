import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import usePacientes from '../../hooks/pacientes/usePacientesListar';

ChartJS.register(ArcElement, Tooltip, Legend);

function GraficoEstadoCivilPacientes() {
    const { pacientes, carregando, erro } = usePacientes();

    const labels = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'];
    const cores = ['#ffcd56', '#36a2eb', '#ff6384', '#4bc0c0', '#9966ff'];

    const contarEstadosCivis = (pacientes) => {
        const contagem = {
            'Solteiro': 0,
            'Casado': 0,
            'Divorciado': 0,
            'Viúvo': 0,
            'Não Informado': 0
        };

        pacientes.forEach(p => {
            let estado = (p.estadoCivil || 'Não Informado').toLowerCase();

            if (estado.includes('solteiro')) estado = 'Solteiro';
            else if (estado.includes('casado')) estado = 'Casado';
            else if (estado.includes('divorciado')) estado = 'Divorciado';
            else if (estado.includes('viúvo')) estado = 'Viúvo';
            else estado = 'Não Informado';

            contagem[estado]++;
        });

        return Object.values(contagem);
    };


    const data = {
        labels,
        datasets: [{
            data: contarEstadosCivis(pacientes),
            backgroundColor: cores
        }]
    };

    if (carregando) return <p>Carregando gráfico...</p>;
    if (erro) return <p>Erro: {erro}</p>;
    if (pacientes.length === 0) return <p>Sem dados de pacientes.</p>;

    return <Pie data={data} />;
}

export default GraficoEstadoCivilPacientes;
