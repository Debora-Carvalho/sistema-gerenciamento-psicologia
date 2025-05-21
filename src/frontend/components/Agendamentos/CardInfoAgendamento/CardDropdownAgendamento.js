import React, { useState } from 'react';
import '../../Agendamentos/CardInfoAgendamento/CardInfoAgendamento.css';
import { RiEmotionLine } from "react-icons/ri";
import { MdOutlineNotifications, MdOutlineEdit, MdOutlineFreeCancellation } from "react-icons/md";
import TipoCancelamentoPopup from '../../CancelarAgendamentos/TipoCancelamentoPopup/TipoCancelamentoPopup.js';

function CardDropdownAgendamento() {
    const [popupAberto, setPopupAberto] = useState(false);

    const abrirPopup = () => {
        setPopupAberto(true);
    };

    const fecharPopup = () => {
        setPopupAberto(false);
    };

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

            <button
                className='btn-dropdown-agendamento'
                onClick={abrirPopup}
            >
                <MdOutlineFreeCancellation className='btn-dropdown-agendamento__icon'/>
                Cancelar agendamento
            </button>

            <TipoCancelamentoPopup aberto={popupAberto} onBotaoClick={fecharPopup} />
        </div>
    );
}

export default CardDropdownAgendamento;
