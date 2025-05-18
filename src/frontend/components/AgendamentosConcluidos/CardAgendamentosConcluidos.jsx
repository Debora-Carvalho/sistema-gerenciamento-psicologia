import React, { useState } from "react";
import "../Agendamentos/Componentes-agendamento.css";
import OpcoesDropdownConcluidos from "./OpcoesDropdownConcluidos";
import { IoLocationOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";

function CardAgendamentosConcluidos({ id, dataInicio, dataFim, nomePaciente, linkSessao }) {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const userID = localStorage.getItem("userID");
  const dataI = new Date(dataInicio)
  const dataF = new Date(dataFim)
  const horaFim = dataF.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const horaInicio = dataI.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  // const periodo = data.toLocaleDateString('pt-BR');

  return (
    <div className="card-agendamento-concluido">
      <div className="hora">{horaInicio}</div>
      <div className="conteudo-agendamento">
        <div className="info-agendamento">
          <p className="periodo">
            <MdAccessTime className="icon-time" />
            <a>{horaInicio}-{horaFim}</a>
          </p>
          <p className="link">
            <IoLocationOutline className="icon-location" />
            <a>{linkSessao}</a>
          </p>
        </div>
        <p className="nome">{nomePaciente}</p>
      </div>
      <div className="dropdown-container">
        <button
          className="btn-opcoes"
          onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
        >
          Opções
        </button>
        {mostrarOpcoes && <OpcoesDropdownConcluidos />}
      </div>
    </div>
  );
}

export default CardAgendamentosConcluidos;
