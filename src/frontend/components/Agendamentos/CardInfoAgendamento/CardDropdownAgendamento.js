import React, { useEffect, useState } from 'react';
import '../../Agendamentos/CardInfoAgendamento/CardInfoAgendamento.css';
import { RiEmotionLine } from "react-icons/ri";
import { MdOutlineNotifications, MdOutlineEdit, MdOutlineFreeCancellation } from "react-icons/md";

function CardDropdownAgendamento() {
    return (
        <div className="container-dropdown-agendamento">
            <button className='btn-dropdown-agendamento'>
                <RiEmotionLine className='btn-dropdown-agendamento__icon'/>
                Ver paciente
            </button>

            <button className='btn-dropdown-agendamento'>
                <MdOutlineNotifications className='btn-dropdown-agendamento__icon'/>
                Enviar notificação
            </button>

            <button className='btn-dropdown-agendamento'>
                <MdOutlineEdit className='btn-dropdown-agendamento__icon'/>
                Editar agendamento
            </button>

            <button className='btn-dropdown-agendamento'>
                <MdOutlineFreeCancellation className='btn-dropdown-agendamento__icon'/>
                Cancelar agendamento
            </button>
        </div>
    );
}

export default CardDropdownAgendamento;