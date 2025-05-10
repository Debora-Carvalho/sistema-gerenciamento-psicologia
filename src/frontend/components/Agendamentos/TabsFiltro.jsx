import React from 'react';
import './Componentes-agendamento.css';

function TabsFiltro() {
  return (
    <div className="tabs-filtro">
      <button className="ativo">Hoje</button>
      <button>Próximos dias</button>
      <button onClick={() => (window.location.href = "/agendamentos-concluidos")}>Concluídos</button>
      <button>Cancelados</button>
    </div>
  );
}

export default TabsFiltro;
