import React, { useState, useEffect } from 'react';
import '../../Agendamentos/CardInfoAgendamento/CardInfoAgendamento.css';
import { RiEmotionLine } from "react-icons/ri";
import { MdOutlineNotifications, MdOutlineEdit, MdOutlineFreeCancellation } from "react-icons/md";
import TipoCancelamentoPopup from '../../CancelarAgendamentos/TipoCancelamentoPopup/TipoCancelamentoPopup.js';
import { useNavigate } from 'react-router-dom';

function CardDropdownAgendamento({ id_paciente, agendamento }) {

    const [popupAberto, setPopupAberto] = useState(false);
    const navigate = useNavigate();

    const abrirPopup = () => {
        setPopupAberto(true);
    };

    const fecharPopup = () => {
        setPopupAberto(false);
    };
    const handleEditarAgendamento = () => {
        navigate(`/editar`, { state: { agendamento } });
    };

    const handleVerPaciente = () => {
        localStorage.setItem("pacienteID", id_paciente);
        navigate(`/pacientes-detalhes/${id_paciente}`);
    };

    return (
        <div className="container-dropdown-agendamento">
            <button className='btn-dropdown-agendamento' onClick={handleVerPaciente}>
                <RiEmotionLine className='btn-dropdown-agendamento__icon' />
                Ver paciente
            </button>

            <button className='btn-dropdown-agendamento'>
                <MdOutlineNotifications className='btn-dropdown-agendamento__icon' />
                Enviar notificação
            </button>

            <button className='btn-dropdown-agendamento' onClick={handleEditarAgendamento}>
                <MdOutlineEdit className='btn-dropdown-agendamento__icon' />
                Editar agendamento
            </button>

            <button
                className='btn-dropdown-agendamento'
                onClick={abrirPopup}
            >
                <MdOutlineFreeCancellation className='btn-dropdown-agendamento__icon' />
                Cancelar agendamento
            </button>

            <TipoCancelamentoPopup aberto={popupAberto} onBotaoClick={fecharPopup} />
        </div>
    );
}

export default CardDropdownAgendamento;
