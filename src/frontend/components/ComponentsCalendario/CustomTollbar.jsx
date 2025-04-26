import React from 'react';
import { Button } from 'react-bootstrap';
import "../../components/ComponentsCalendario/Components-Calendario-css.css";

const CustomTollbar = ({ label, onNavigate, onView }) => {
  return (
    <div className="custom-toolbar-container">
      <div className="custom-toolbar-header">
        <Button
          variant="outline-secondary"
          className="me-2"
          onClick={() => onNavigate('TODAY')}
        >
          Hoje
        </Button>
        <Button
          variant="outline-secondary"
          className="me-2"
          onClick={() => onNavigate('PREV')}
        >
          ‹
        </Button>
        
        {/* Aqui está o label já vindo formatado como "abril 2025" por exemplo */}
        <span className="custom-toolbar-label">{label}</span>
        
        <Button
          variant="outline-secondary"
          className="ms-2"
          onClick={() => onNavigate('NEXT')}
        >
          ›
        </Button>
      </div>

      <div className="custom-toolbar-views mt-2">
        <Button
          variant="outline-secondary"
          className="me-2"
          onClick={() => onView('month')}
        >
          Mês
        </Button>
        <Button
          variant="outline-secondary"
          className="me-2"
          onClick={() => onView('week')}
        >
          Semana
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => onView('agenda')}
        >
          Agenda
        </Button>
      </div>
    </div>
  );
};

export default CustomTollbar;
