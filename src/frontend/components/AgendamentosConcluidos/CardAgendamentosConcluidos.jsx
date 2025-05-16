import React, { useState } from "react";
import "../Agendamentos/Componentes-agendamento.css";
import OpcoesDropdownConcluidos from "./OpcoesDropdownConcluidos";
import { IoLocationOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";

function CardAgendamentosConcluidos({ hora, nome, periodo, link }) {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  return (
    <div className="card-agendamento-concluido">
      <div className="hora">{hora}</div>
      <div className="conteudo-agendamento">
        <div className="info-agendamento"> 
        <p className="periodo">
          <MdAccessTime className="icon-time" />
          <a>{periodo}</a>
        </p>
        <p className="link">
         <IoLocationOutline className="icon-location" />
          <a>{link}</a>
        </p>
        </div>
        <p className="nome">{nome}</p>
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
