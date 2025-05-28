import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TipoExcluirPopup from '../CancelarAgendamentos/TipoCancelamentoPopup/TipoExcluirPopup';
import '../Agendamentos/Componentes-agendamento.css';
import { MdOutlineNotifications, MdOutlineEdit, MdOutlineFreeCancellation } from "react-icons/md";


function OpcoesDropdownConcluidos({ id_paciente, agendamento }) {
    const navigate = useNavigate();
    const [popupAberto, setPopupAberto] = useState(false);

    const abrirPopup = () => {
        setPopupAberto(true);
    };

    const fecharPopup = () => {
        setPopupAberto(false);
    };

    const handleReagendarAgendamento = () => {
        navigate(`/editar`, { state: { agendamento, modo: "reagendar"} });
    };

    const handleVerPaciente = () => {
        localStorage.setItem("pacienteID", id_paciente);
        navigate(`/pacientes-detalhes/${id_paciente}`);
    };
    console.log("id_paciente:", id_paciente);
    return (
        <div className="dropdown">
            <button className="buttonDropdown" onClick={handleVerPaciente}>
                Ver paciente
            </button>
            <button className="buttonDropdown" onClick={handleReagendarAgendamento}>
                Agendar novamente
            </button>
            <button className="buttonDropdown" onClick={abrirPopup}>
                Excluir agendamento
            </button>
            <TipoExcluirPopup aberto={popupAberto} onBotaoClick={fecharPopup} id_paciente={id_paciente} agendamento={agendamento} />

        </div>
    );
}

export default OpcoesDropdownConcluidos;
