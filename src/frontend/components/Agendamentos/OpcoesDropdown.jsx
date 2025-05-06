import React from 'react';
import './Componentes-agendamento.css'; 

function OpcoesDropdown() {
  return (
    <div className="dropdown">
      <button>Ver paciente</button>
      <button>Enviar notificação</button>
      <button>Editar agendamento</button>
      <button>Cancelar agendamento</button>
    </div>
  );
}

export default OpcoesDropdown;
