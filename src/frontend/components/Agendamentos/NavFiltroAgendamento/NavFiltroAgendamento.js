import React, { useState } from 'react';
import '../../Agendamentos/NavFiltroAgendamento/NavFiltroAgendamento.css';
import { useNavigate } from 'react-router-dom';

function NavFiltroAgendamento ({ filtro, setFiltro }) {
    const [active, setActive] = useState('hoje');
    const navigate = useNavigate();
    const handleClick = (section) => {
        setActive(section);
         if (section === 'concluidos') {             
            navigate("/agendamentos-concluidos");                
        } else if (section === 'cancelados') {
            navigate("/agendamentos-cancelados");                
        };
    };

    return (
        <div className="container-nav-filtro-agendamento">
            <button className={`btn-nav-filtro-agendamento ${filtro === 'hoje' ? 'active' : ''}`} 
                onClick={() => setFiltro('hoje')}>
                Hoje
            </button>

            <button className={`btn-nav-filtro-agendamento ${filtro === 'proximos' ? 'active' : ''}`} 
                onClick={() => setFiltro('proximos')}>
                Próximos dias
            </button>

           <button className={`btn-nav-filtro-agendamento ${filtro === 'concluidos' ? 'active' : ''}`}
                onClick={() => setFiltro('concluidos')}>
                Concluídos
            </button>

           <button className={`btn-nav-filtro-agendamento ${filtro === 'cancelados' ? 'active' : ''}`}
                onClick={() => setFiltro('cancelados')}>
                Cancelados
            </button>
        </div>
    );
}

export default NavFiltroAgendamento;