import React, { useState } from "react";
import "../PaginaAgendamentosConcluidos/PaginaAgendamentosConcluidos.css";
import TabsFiltro from "../../components/Agendamentos/TabsFiltro";
import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal.js";
import CardAgendamentosConcluidos from "../../components/AgendamentosConcluidos/CardAgendamentosConcluidos";
import useMapearAgendamentos from "../../features/PaginaAgendamentos/useMapearAgendamentos";
import ContainerFuncoesAgendamento from "../../components/Agendamentos/ContainerFuncoesAgendamento/ContainerFuncoesAgendamento.js";
import CabecalhoUsuarioLogado from "../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js";
import CabecalhoResponsivo from "../../components/CabecalhoResponsivo/CabecalhoResponsivo.js";
import { useLocation } from 'react-router-dom';
import useAgendamentosPorNome from "../../features/PaginaAgendamentos/useAgendamentoPorNome.js";

function AgendamentosCancelados() {
    const location = useLocation();
    const filtroInicial = location.state?.filtro || "";
    const [filtro, setFiltro] = useState(filtroInicial);
    const [limiteCards, setLimiteCards] = useState(3);
    const [nomePacienteBusca, setNomePacienteBusca] = useState('');
    const agendamentosFiltrados = useAgendamentosPorNome(nomePacienteBusca, filtro);
    console.log("Agendamentos filtrados (completos):", agendamentosFiltrados);

    return (
        <div className="container-visualizar-agendamentos">
            <div className="navbar">
                <MenuPrincipal />
            </div>

            <div className="container-conteudo-visualizar-agendamentos">
                <div className="visualizar-agendamentos-cabecalho">
                    <CabecalhoUsuarioLogado
                        nomePacienteBusca={nomePacienteBusca}
                        setNomePacienteBusca={setNomePacienteBusca} />
                </div>

                <div className="visualizar-agendamentos-cabecalho-responsivo">
                    <CabecalhoResponsivo />
                </div>

                <div className="conteudo-concluidos">
                    <div className="visualizar-agendamentos-componente-funcoes">
                        <ContainerFuncoesAgendamento
                            filtro={filtro}
                            setFiltro={setFiltro}
                        />
                    </div>
                </div>
                <div className="conteudo-info-agendamento">
                    <div className="lista-agendamentos">
                        <div className="data-agendamento">
                            {agendamentosFiltrados.length === 0 && (
                                <p>Nenhum agendamento encontrado.</p>
                            )}
                            {agendamentosFiltrados.slice(0, limiteCards).map((agendamento) => (
                                <CardAgendamentosConcluidos
                                    key={agendamento._id}
                                    id={agendamento._id}
                                    dataInicio={agendamento.dataInicio}
                                    dataFim={agendamento.dataFim}
                                    nomePaciente={agendamento.nomePaciente}
                                    linkSessao={agendamento.linkSessao}
                                    id_paciente={agendamento.id_paciente}
                                    agendamento={agendamento}
                                />
                            ))}

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
            </div>
        </div>
    );
}

export default AgendamentosCancelados;