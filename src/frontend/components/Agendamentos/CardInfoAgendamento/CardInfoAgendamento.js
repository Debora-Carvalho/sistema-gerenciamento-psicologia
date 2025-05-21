import React, { useEffect, useState } from 'react';
import '../../Agendamentos/CardInfoAgendamento/CardInfoAgendamento.css';
import CardDropdownAgendamento from '../../Agendamentos/CardInfoAgendamento/CardDropdownAgendamento.js';
import { FaRegClock } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";

function CardInfoAgendamento({ hora, nome, periodo }) {
    const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

    return (
        <div className="card-info-agendamento">
            <div className="container-conteudo-card-info-agendamento">
                <div className="info-agendamento__hora">
                    {hora}
                </div>

                <div className='card-info-agendamento__periodo-link'>
                    <p className="info-agendamento__periodo">
                        <FaRegClock className='info-agendamento__periodo__icon'/>
                        {periodo}
                    </p>

                    <a className="info-agendamento__link-atendimento" href="#">
                        <GrLocation className='info-agendamento__link-atendimento__icon' />
                        Link da sessão
                    </a>
                </div>

                <div className='card-info-agendamento__nome-iniciar'>
                    <p className="info-agendamento__nome">
                        {nome}
                    </p>

                    <a className="info-agendamento__iniciar-atendimento" href="#">
                        Iniciar atendimento
                    </a>
                </div>
            </div>

            <div className="container-dropdown-card-info-agendamento">
                <button
                    className="btn-card-info-agendamento-opcoes"
                    onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
                >
                    Opções
                </button>
                {mostrarOpcoes && <CardDropdownAgendamento />}
            </div>
        </div>
    );
}

export default CardInfoAgendamento;