import React, { useState } from 'react';
import OpcoesDropdown from './OpcoesDropdown';
import './Componentes-agendamento.css';

function CardAgendamento({ hora, nome, periodo }) {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  return (
    <div className="card-agendamento">
      <div className="hora">{hora}</div>
      <div className="conteudo-agendamento">
        <p className="periodo">{periodo}</p>
        <p className="nome">{nome}</p>
        <a className="link-atendimento" href="#">Iniciar atendimento</a>
      </div>
      <div className="dropdown-container">
        <button
          className="btn-opcoes"
          onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
        >
          Opções
        </button>
        {mostrarOpcoes && <OpcoesDropdown />}
      </div>
    </div>
  );
}

export default CardAgendamento;
