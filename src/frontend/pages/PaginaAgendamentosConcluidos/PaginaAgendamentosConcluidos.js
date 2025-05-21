import React, { useState } from "react";
import "../PaginaAgendamentosConcluidos/PaginaAgendamentosConcluidos.css";
import TabsFiltro from "../../components/Agendamentos/TabsFiltro";
import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal.js";
import CardAgendamentosConcluidos from "../../components/AgendamentosConcluidos/CardAgendamentosConcluidos";
import useMapearAgendamentos from "../../features/PaginaAgendamentos/useMapearAgendamentos";
import ContainerFuncoesAgendamento from "../../components/Agendamentos/ContainerFuncoesAgendamento/ContainerFuncoesAgendamento.js";
import CabecalhoUsuarioLogado from "../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js";
import CabecalhoResponsivo from "../../components/CabecalhoResponsivo/CabecalhoResponsivo.js";

function AgendamentosConcluidos() {
  const [filtro, setFiltro] = useState("");
  const [limiteCards, setLimiteCards] = useState(5);  
  const [usuario, setUsuario] = useState({
    username: "Nome do Usuário",
    email: "usuario@email.com",
  });
  const agendamentos = useMapearAgendamentos();
  const agendamentosConcluidos = agendamentos.filter(
    (agendamento) => agendamento.statusAgendamento === "concluído"
  );

  // const agendamentosPorData = agendamentos.reduce((acc, agendamento) => {
  //   const { data } = agendamento;
  //   if (!acc[data]) acc[data] = [];
  //   acc[data].push(agendamento);
  //   return acc;
  // }, {});

  // const datasOrdenadas = Object.keys(agendamentosPorData).sort(
  //   (a, b) => new Date(b) - new Date(a)
  // );

  return (
    <div className="container-visualizar-agendamentos">
      <div className="navbar">
        <MenuPrincipal />
      </div>

      <div className="container-conteudo-visualizar-agendamentos">
        <div className="visualizar-agendamentos-cabecalho">
          <CabecalhoUsuarioLogado />
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
              {agendamentosConcluidos.map((agendamento) => (
                <CardAgendamentosConcluidos
                  key={agendamento._id}
                  id={agendamento._id}
                  dataInicio={agendamento.dataInicio}
                  dataFim={agendamento.dataFim}
                  nomePaciente={agendamento.nomePaciente}
                  linkSessao={agendamento.linkSessao}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {limiteCards < agendamentos.length && (
        <button
          className="btn-ver-mais"
          onClick={() => setLimiteCards(limiteCards + 5)}
        >
          Ver mais
        </button>
      )}
    </div>
  );
}

export default AgendamentosConcluidos;