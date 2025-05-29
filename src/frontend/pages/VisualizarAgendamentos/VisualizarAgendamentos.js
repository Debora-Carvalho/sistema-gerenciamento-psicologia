import React, { useState } from "react";
import "../../pages/VisualizarAgendamentos/VisualizarAgendamentos.css";
import useDocumentTitle from "../../components/useDocumentTitle";
import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal.js";
import CabecalhoUsuarioLogado from "../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js";
import CabecalhoResponsivo from "../../components/CabecalhoResponsivo/CabecalhoResponsivo.js";
import ContainerFuncoesAgendamento from "../../components/Agendamentos/ContainerFuncoesAgendamento/ContainerFuncoesAgendamento.js";
import CardInfoAgendamento from "../../components/Agendamentos/CardInfoAgendamento/CardInfoAgendamento.js";
import useMapearAgendamentos from '../../features/PaginaAgendamentos/useMapearAgendamentos';
import { useLocation } from 'react-router-dom';
import useAgendamentosPorNome from "../../features/PaginaAgendamentos/useAgendamentoPorNome.js";

function VisualizarAgendamentos() {
    useDocumentTitle("Agendamentos | Seren"); // mudando o Title da pagina
    const location = useLocation();
    const filtroInicial = location.state?.filtro || "hoje";
    const [filtro, setFiltro] = useState(filtroInicial);
    const [limiteCards, setLimiteCards] = useState(3); //esse é o limite de cards exibidos de inicio na tela
    const [nomePacienteBusca, setNomePacienteBusca] = useState('');
    const agendamentosFiltrados = useAgendamentosPorNome(nomePacienteBusca, filtro);

    function formatarData(dataRecebida) {
        if (!dataRecebida) return '';
        const data = new Date(dataRecebida);
        return data.toLocaleDateString('pt-BR');
    }

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
                        exibirPesquisa={false}/>
                </div>

                <div className="visualizar-agendamentos-componente-funcoes">
                    <ContainerFuncoesAgendamento filtro={filtro} setFiltro={setFiltro} />
                </div>

                <div className="visualizar-agendamentos-componente-cards">

                    {agendamentosFiltrados.length === 0 && (
                        <p>Nenhum agendamento encontrado.</p>
                    )}

                    {agendamentosFiltrados.slice(0, limiteCards).map((agendamento) => (
                        <div>
                            {filtro === 'proximos' && (
                                <p className="componente-cards__proximos-data">{formatarData(agendamento.dataInicio)}</p>
                            )}

                            <CardInfoAgendamento
                                key={agendamento._id}
                                id={agendamento._id}
                                dataInicio={agendamento.dataInicio}
                                dataFim={agendamento.dataFim}
                                nomePaciente={agendamento.nomePaciente}
                                linkSessao={agendamento.linkSessao}
                                statusAgendamento={agendamento.statusAgendamento || ""}
                                id_paciente={agendamento.id_paciente}
                                agendamento={agendamento}
                            />
                        </div>
                    ))}

                    {/* o botao btn-ver-mais permite exibir mais cards na tela 
                    (acrescenta 5 por vez ate acabar a listagem e o botao sumir) */}
                    {limiteCards < agendamentosFiltrados.length && (
                        <button
                            className="btn-ver-mais"
                            onClick={() => setLimiteCards(limiteCards + 5)}
                        >
                            Ver mais
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VisualizarAgendamentos;