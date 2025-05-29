import './Dashboard.css';
import { FiFilter } from 'react-icons/fi';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import GraficoGeneroPacientes from './GraficoGeneroPacientes.js';
import GraficoEstadoCivilPacientes from './GraficoEstadoCivilPacientes.js';
import GraficoAgendamentosMensal from './GraficoAgendamentosMensal.js';
import CardsIndicadores from '../CardsIndicadores/CardsIndicadores.js';

function Dashboard () {
    const mesAnaliseDashboard = 'Maio de 2025';
    const anoAnaliseDashboard = '2025';

    return (
        <div className='container-dashboard'>
            <div className='dashboard-cabecalho'>
                <div className='dashboard-cabecalho__descricao'>
                    <h3>Pacientes</h3>
                    <p>{ mesAnaliseDashboard }</p> 
                </div>

                <div className='dashboard-cabecalho__botoes'>
                    <button className='btn-filtro-dashboard'>
                        <FiFilter />
                        Filtros
                    </button>

                    <button className='btn-exportar-dashboard'>
                        <BsFileEarmarkPdf />
                        Exportar PDF
                    </button>
                </div>
            </div>

            <div className='dashboard-cards-indicadores'>
                <CardsIndicadores />
            </div>

            <div className='container-dashboard__graficos'>
                <div className='dashboard-grafico-barra'>
                    <p>Gênero</p>
                    <GraficoGeneroPacientes />
                </div>

                <div className='dashboard-grafico-pizza'>
                    <p>Estado civil</p>
                    <GraficoEstadoCivilPacientes />
                </div>

                <div className='dashboard-grafico-linha'>
                    <p>Agendamentos de { anoAnaliseDashboard }</p>
                    <GraficoAgendamentosMensal />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;