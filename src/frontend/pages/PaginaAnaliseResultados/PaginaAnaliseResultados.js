import './PaginaAnaliseResultados.css';
import useDocumentTitle from '../../components/useDocumentTitle';
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal.js';
import CabecalhoUsuarioLogado from '../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js';
import CabecalhoResponsivo from '../../components/CabecalhoResponsivo/CabecalhoResponsivo.js';
import Dashboard from '../../components/Dashboard/Dashboard.js';

function PaginaAnaliseResultados() {
    useDocumentTitle("Análise de resultados | Seren"); // mudando o Title da pagina

    return (
        <div className='container-pagina-analise-resultados'>
            <div className='navbar'>
                <MenuPrincipal />
            </div>

            <div className='container-conteudo-analise-resultados'>
                <div className='analise-resultados-cabecalho'>
                    <CabecalhoUsuarioLogado
                        nomePacienteBusca={false}
                        setNomePacienteBusca={false}
                        exibirPesquisa={false} />
                </div>

                <div className='analise-resultados-cabecalho-responsivo'>
                    <CabecalhoResponsivo nomePacienteBusca={false}
                        setNomePacienteBusca={false}
                        exibirPesquisa={false} />
                </div>

                <div className='analise-resultados-container-titulo'>
                    <h1 className='analise-resultados__titulo'>
                        Análise de resultados
                    </h1>
                </div>

                <div className='container-conteudo-graficos-analise-resultados'>
                    <Dashboard />
                </div>
            </div>
        </div>
    );
}

export default PaginaAnaliseResultados;