import './Dashboard.css';
import { FiFilter } from 'react-icons/fi';
import { BsFileEarmarkPdf } from 'react-icons/bs';

function Dashboard () {
    const mesAnaliseDashboard = 'Maio de 2025';

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

            <div className='container-dashboard__graficos'>
                <p>graficos analises</p>
            </div>
        </div>
    );
}

export default Dashboard;