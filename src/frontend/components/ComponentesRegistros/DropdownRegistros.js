import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TipoExcluirPopup from "../CancelarAgendamentos/TipoCancelamentoPopup/TipoExcluirPopup";
import "../Agendamentos/Componentes-agendamento.css";
import {
  MdOutlineNotifications,
  MdOutlineEdit,
  MdOutlineFreeCancellation,
} from "react-icons/md";
import EditarRegistro from "./EditarRegistro";
import ExcluirRegistro from "./ExcluirRegistro";

function DropdownRegistros({ id_paciente, registro }) {
  const navigate = useNavigate();
  const [popupAberto, setPopupAberto] = useState(false);
  const [editarRegistro, setEditarRegistro] = useState(false);
  const [excluirRegistro, setExcluirRegistro] = useState(false);

  const abrirPopup = () => {
    setPopupAberto(true);
  };

  const fecharPopup = () => {
    setPopupAberto(false);
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
      <button
        className="buttonDropdown"
        onClick={() => setEditarRegistro(true)}
      >
        Editar registro
      </button>
      <div className="modal-editar-registro">
        {editarRegistro && (
          <EditarRegistro
            isOpen={true}
            onClose={() => setEditarRegistro(false)}
          />
        )}
      </div>
      <button
        className="buttonDropdown"
        onClick={() => setExcluirRegistro(true)}
      >
        Excluir registro
      </button>
      <div className="modal-excluir-registro">
        {excluirRegistro && (
          <ExcluirRegistro
            isOpen={true}
            onClose={() => setExcluirRegistro(false)}
          />
        )}
      </div>
      <TipoExcluirPopup
        aberto={popupAberto}
        onBotaoClick={fecharPopup}
        id_paciente={id_paciente}
        registro={registro}
      />
    </div>
  );
}

export default DropdownRegistros;
