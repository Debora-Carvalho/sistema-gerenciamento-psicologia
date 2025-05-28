import './Dashboard.css';

function Dashboard () {
    const mesAnaliseDashboard = 'Maio de 2025';
    return (
        <div className='container-dashboard'>
            <div className='.graficos-analise-resultados__cabecalho'>
                <div>
                    <h3>Pacientes</h3>
                    <p>{ mesAnaliseDashboard }</p> 
                </div>

            </div>

            <div className='container-graficos-analise-resultados'>
                <p>graficos analises</p>
            </div>
        </div>
    );
}

export default Dashboard;