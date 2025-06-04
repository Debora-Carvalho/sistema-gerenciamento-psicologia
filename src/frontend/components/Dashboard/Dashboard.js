import './Dashboard.css';
import { useState, useRef } from 'react';
import FiltroDropdownGrafico from '../FiltroDropdown/FiltroDropDownGrafico.js';
import { FiFilter } from 'react-icons/fi';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import useExportarPDF from '../../features/PaginaAnalise/useExportarPDFGrafico.js';
import GraficoGeneroPacientes from './GraficoGeneroPacientes.js';
import GraficoEstadoCivilPacientes from './GraficoEstadoCivilPacientes.js';
import GraficoAgendamentosMensal from './GraficoAgendamentosMensal.js';
import CardsIndicadores from '../CardsIndicadores/CardsIndicadores.js';

function Dashboard() {
    const hoje = new Date();

    const formatoBRmes = new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        year: 'numeric',
    });
    const formatoBRano = new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric'
    });

    const mesAnaliseDashboard = formatoBRmes.format(hoje);
    const anoAnaliseDashboard = formatoBRano.format(hoje);

    const btnFiltroRef = useRef(null);
    const graficoGeneroRef = useRef(null);
    const graficoEstadoRef = useRef(null);
    const graficoAgendRef = useRef(null);

    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
    const [filtrosGraficos, setFiltrosGraficos] = useState({
        genero: true,
        estadoCivil: true,
        agendamentos: true,
    });

    const { exportarGraficos } = useExportarPDF();

    const handleExportarPDF = () => {
        const refsParaExportar = [];
        if (filtrosGraficos.genero) refsParaExportar.push(graficoGeneroRef);
        if (filtrosGraficos.estadoCivil) refsParaExportar.push(graficoEstadoRef);
        if (filtrosGraficos.agendamentos) refsParaExportar.push(graficoAgendRef);

        exportarGraficos(refsParaExportar);
    };

    const handleAbrirFiltro = () => {
        const btn = btnFiltroRef.current;
        if (btn) {
            const rect = btn.getBoundingClientRect(); // metodo nativo que retorna o tamanho e tela 
            setDropdownPos({ top: rect.bottom + window.scrollY + 8, left: rect.left + window.scrollX }); // passa a posicao pro componente do filtro
        }
        setMostrarFiltros(prev => !prev);
        // isto é para o filtro sempre ficar abaixo do botão entretanto todavia nn está responsivo ;^;, o mais fácil é deixar o dropdown do filtro já na página mas tenho medo de quebrar o css 
    };

    return (
        <div className='container-dashboard'>
            <div className='dashboard-cabecalho'>
                <div className='dashboard-cabecalho__descricao'>
                    <h3>Pacientes</h3>
                    <p>{mesAnaliseDashboard}</p>
                </div>

                <div className='dashboard-cabecalho__botoes'>
                    {/* <button
                        className='btn-filtro-dashboard'
                        ref={btnFiltroRef} //passa a referencia de onde está o filtro
                        onClick={handleAbrirFiltro}
                    >
                        <FiFilter />
                        Filtros
                    </button> */}

                    <button 
                    className='btn-exportar-dashboard'
                    onClick={handleExportarPDF}>
                        <BsFileEarmarkPdf />
                        Exportar PDF
                    </button>
                </div>
            </div>

            {mostrarFiltros && (
                <FiltroDropdownGrafico
                    onClose={() => setMostrarFiltros(false)}
                    filtrosAtuais={filtrosGraficos}
                    onApply={(novosFiltros) => setFiltrosGraficos(novosFiltros)}
                    position={dropdownPos}
                />
            )}

            <div className='dashboard-cards-indicadores'>
                <CardsIndicadores />
            </div>

            <div className='container-dashboard__graficos'>
                {filtrosGraficos.genero && (
                    <div className='dashboard-grafico-barra' ref={graficoGeneroRef}>
                        <p>Gênero</p>
                        <GraficoGeneroPacientes />
                    </div>
                )}

                {filtrosGraficos.estadoCivil && (
                    <div className='dashboard-grafico-pizza' ref={graficoEstadoRef}>
                        <p>Estado civil</p>
                        <GraficoEstadoCivilPacientes />
                    </div>
                )}

                {filtrosGraficos.agendamentos && (
                    <div className='dashboard-grafico-linha'  ref={graficoAgendRef}>
                        <p>Agendamentos de {anoAnaliseDashboard}</p>
                        <GraficoAgendamentosMensal />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
