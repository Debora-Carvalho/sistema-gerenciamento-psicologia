import React from 'react';
import { Button } from 'react-bootstrap';
import "../../components/ComponentsCalendario/Components-Calendario-css.css";
import PropTypes from 'prop-types';

const CustomTollbar = ({  label, onNavigate, onView, view, children }) => {
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
              <span className="rbc-btn-group" style={{ marginLeft: 'auto' }}>
        {children}
      </span>
      </div>
    </div>
  );
};

CustomTollbar.propTypes = {
  label: PropTypes.string,
  onNavigate: PropTypes.func,
  onView: PropTypes.func,
  view: PropTypes.string,
  children: PropTypes.node,
};

export default CustomTollbar;
