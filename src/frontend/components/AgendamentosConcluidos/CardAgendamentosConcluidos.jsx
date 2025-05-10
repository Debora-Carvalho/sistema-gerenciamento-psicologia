import React, { useState } from 'react';
import '../Agendamentos/Componentes-agendamento.css'; 
import OpcoesDropdownConcluidos from './OpcoesDropdownConcluidos';

function CardAgendamentosConcluidos({ data, hora, nome, periodo }) {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  return (
    < div className="card-agendamento-concluido">
        <div className="data">{data} </div>
      <div className="hora">{hora}</div>
      <div className="conteudo-agendamento">
        <p className="periodo">{periodo}</p>
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
