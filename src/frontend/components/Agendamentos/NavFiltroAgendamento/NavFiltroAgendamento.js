import React, { useState } from 'react';
import '../../Agendamentos/NavFiltroAgendamento/NavFiltroAgendamento.css';
import { useNavigate } from 'react-router-dom';

function NavFiltroAgendamento () {
    const [active, setActive] = useState('hoje');
    const navigate = useNavigate();
    const handleClick = (section) => {
        setActive(section);
        if (section === 'hoje') {
            navigate("/"); 
        } else if (section === 'proximos') {
            navigate("/");
        } else if (section === 'concluidos') {             // substituir pelo link da page de Agend. concluídos
            navigate("/");                
        } else if (section === 'cancelados') {            // substituir pelo link da page de Agend. cancelados
            navigate("/");                
        };
    };

    return (
        <div className="container-nav-filtro-agendamento">
            <button className={`btn-nav-filtro-agendamento ${active === 'hoje' ? 'active' : ''}`}
                onClick={() => handleClick('hoje')}>
                Hoje
            </button>

           <button className={`btn-nav-filtro-agendamento ${active === 'proximos' ? 'active' : ''}`}
                onClick={() => handleClick('proximos')}>
                Próximos dias
            </button>

           <button className={`btn-nav-filtro-agendamento ${active === 'concluidos' ? 'active' : ''}`}
                onClick={() => handleClick('concluidos')}>
                Concluídos
            </button>

           <button className={`btn-nav-filtro-agendamento ${active === 'cancelados' ? 'active' : ''}`}
                onClick={() => handleClick('cancelados')}>
                Cancelados
            </button>
        </div>
    );
}

export default NavFiltroAgendamento;