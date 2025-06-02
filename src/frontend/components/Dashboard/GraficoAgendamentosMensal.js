import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import useMapearAgendamentos from '../../features/PaginaAgendamentos/useMapearAgendamentos';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function GraficoAgendamentosMensal() {
    const agendamentos = useMapearAgendamentos();
    const [dadosGrafico, setDadosGrafico] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const hoje = new Date();
        const anoAtual = hoje.getFullYear();
        const mesAtual = hoje.getMonth();

        const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
        const contagemPorDia = Array(diasNoMes).fill(0);

        agendamentos.forEach(({ dataInicio }) => {
            const dataAgendamento = new Date(dataInicio);
            if (
                dataAgendamento.getFullYear() === anoAtual &&
                dataAgendamento.getMonth() === mesAtual
            ) {
                const dia = dataAgendamento.getDate();
                contagemPorDia[dia - 1] += 1;
            }
        });

        const labels = Array.from({ length: diasNoMes }, (_, i) => `${i + 1}`);

        setDadosGrafico({
            labels,
            datasets: [{
                label: 'Agendamentos no mês atual',
                data: contagemPorDia,
                borderColor: '#42a5f5',
                backgroundColor: '#bbdefb',
                fill: true,
                tension: 0.3
            }]
        });

    }, [agendamentos]);

    const options = {
        responsive: true,
        scales: {
            // x: {
            //     ticks: {
            //         autoSkip: false,
            //         maxRotation: 0,
            //         minRotation: 0,
            //         padding: 10,
            //         font: {
            //             size: 10
            //         }
            //     }
            // },
            y: {
                ticks: {
                    stepSize: 1,
                    precision: 0,
                    beginAtZero: true
                }
            }
        }
    };

    return <Line data={dadosGrafico} options={options} />;
}

export default GraficoAgendamentosMensal;
