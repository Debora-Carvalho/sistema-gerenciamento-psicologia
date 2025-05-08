import React from 'react';
import './Componentes-agendamento.css';

function TabsFiltro() {
  return (
    <div className="tabs-filtro">
      <button className="ativo">Hoje</button>
      <button>Próximos dias</button>
      <button>Concluídos</button>
      <button>Cancelados</button>
    </div>
  );
}

export default TabsFiltro;
