import React, { useState } from 'react';
import '../../Agendamentos/NavFiltroAgendamento/NavFiltroAgendamento.css';

function NavFiltroAgendamento () {
    const [active, setActive] = useState('perfil');
    const handleClick = (section) => {
        setActive(section);
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