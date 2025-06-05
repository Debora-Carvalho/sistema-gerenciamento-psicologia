import React, { useState } from 'react';
import '../Agendamentos/NavFiltroAgendamento/NavFiltroAgendamento.css';
import { useNavigate } from 'react-router-dom';

function FiltroRegistro ({ filtro, setFiltro }) {
    const [active, setActive] = useState('hoje');
    const navigate = useNavigate();
    const handleClick = (section) => {
        setActive(section);
        if(section === 'hoje' || section === 'semana' || section === 'mes'){
             navigate("/visualizar-registros", { state: { filtro: section } });                
        }     
        };
    return (
        <div className="container-nav-filtro-agendamento">
            <button className={`btn-nav-filtro-agendamento ${filtro === 'hoje' ? 'active' : ''}`} 
                onClick={() => {setFiltro('hoje'); handleClick('hoje')}}>
                Hoje
            </button>

            <button className={`btn-nav-filtro-agendamento ${filtro === 'semana' ? 'active' : ''}`} 
                onClick={() => {setFiltro('semana'); handleClick('semana')}}>
                Essa semana
            </button>

            <button className={`btn-nav-filtro-agendamento ${filtro === 'mes' ? 'active' : ''}`} 
                onClick={() => {setFiltro('mes'); handleClick('mes')}}>
                Esse mês
            </button>
        </div>
    );

  };

export default FiltroRegistro;