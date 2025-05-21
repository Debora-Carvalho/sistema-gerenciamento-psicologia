import React, { useState } from 'react';
import '../../Agendamentos/NavFiltroAgendamento/NavFiltroAgendamento.css';
import { useNavigate } from 'react-router-dom';

function NavFiltroAgendamento ({ filtro, setFiltro }) {
    const [active, setActive] = useState('hoje');
    const navigate = useNavigate();
    const handleClick = (section) => {
        setActive(section);
        if(section === 'hoje' || section === 'proximos'){
             navigate("/visualizar-agendamentos", { state: { filtro: section } });                
        }
         else if (section === 'concluidos') {             
            navigate("/agendamentos-concluidos", { state: { filtro: 'concluidos' } });                
        } else if (section === 'cancelados') {
            navigate("/agendamentos-cancelados", { state: { filtro: 'cancelados' } });                
        };
    };

    return (
        <div className="container-nav-filtro-agendamento">
            <button className={`btn-nav-filtro-agendamento ${filtro === 'hoje' ? 'active' : ''}`} 
                onClick={() => {setFiltro('hoje'); handleClick('hoje')}}>
                Hoje
            </button>

            <button className={`btn-nav-filtro-agendamento ${filtro === 'proximos' ? 'active' : ''}`} 
                onClick={() => {setFiltro('proximos'); handleClick('proximos')}}>
                Próximos dias
            </button>

           <button className={`btn-nav-filtro-agendamento ${filtro === 'concluidos' ? 'active' : ''}`}
                onClick={() => { setFiltro('concluidos'); handleClick('concluidos'); }}>
                Concluídos
            </button>

           <button className={`btn-nav-filtro-agendamento ${filtro === 'cancelados' ? 'active' : ''}`}
                onClick={() => {setFiltro('cancelados'); handleClick('cancelados') }}>
                Cancelados
            </button>
        </div>
    );
}

export default NavFiltroAgendamento;