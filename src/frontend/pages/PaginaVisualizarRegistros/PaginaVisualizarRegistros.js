import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import "./PaginaVisualizarRegistros.css";
import "../../pages/VisualizarAgendamentos/VisualizarAgendamentos.css";
import useDocumentTitle from "../../components/useDocumentTitle";
import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal.js";
import CabecalhoUsuarioLogado from "../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js";
import CabecalhoResponsivo from "../../components/CabecalhoResponsivo/CabecalhoResponsivo.js";
import FuncoesRegistros from "../../components/Registros/FuncoesRegistros.js";


function VisualizarRegistros() {
    useDocumentTitle("Registros | Seren"); // mudando o Title da pagina
    const [limiteCards, setLimiteCards] = useState(3); //esse é o limite de cards exibidos de inicio na tela
    const location = useLocation();
    const [nomePacienteBusca, setNomePacienteBusca] = useState('');
    const filtroInicial = location.state?.filtro || "hoje";
    const [filtro, setFiltro] = useState(filtroInicial);

    return (
        <div className="container-visualizar-agendamentos">
            <div className="navbar">
                <MenuPrincipal />
            </div>

            <div className="container-conteudo-visualizar-agendamentos">
                <div className="visualizar-agendamentos-cabecalho">
                    <CabecalhoUsuarioLogado
                        nomePacienteBusca={nomePacienteBusca}
                        setNomePacienteBusca={setNomePacienteBusca}
                        exibirPesquisa={false} />
                </div>

                <div className="visualizar-agendamentos-cabecalho-responsivo">
                    <CabecalhoResponsivo nomePacienteBusca={nomePacienteBusca}
                        setNomePacienteBusca={setNomePacienteBusca}
                        exibirPesquisa={false} />
                </div>

                <div className="funcoes-registros"> 
                <FuncoesRegistros filtro={filtro} setFiltro={setFiltro}/>
                </div>
                <button
                    className="btn-ver-mais"
                    onClick={() => setLimiteCards(limiteCards + 5)}
                >
                    Ver mais
                </button>
            </div>
        </div>
    );
}

export default VisualizarRegistros;