import React, { useState } from "react";
import "../Agendamentos/ContainerFuncoesAgendamento/ContainerFuncoesAgendamento.css";
import FiltroRegistro from "./FiltroRegistro.js";
import { useNavigate } from "react-router-dom";
import NovoRegistro from "./NovoRegistro.js";

function FuncoesRegistro({ filtro, setFiltro, adicionarRegistro }) {
  const navigate = useNavigate();
  const [mostrarNovoRegistro, setMostrarNovoRegistro] = useState(false);
  return (
    <div className="container-funcoes-registros">
      <h1 className="titulo-registros">Registros</h1>

      <div className="funcoes-visualizar-agendamento__filtro">
        <FiltroRegistro filtro={filtro} setFiltro={setFiltro} />
      </div>

      <div className="funcoes-visualizar-agendamento__botoes">
        <button
          className="btn-criar-novo-agendamento"
          onClick={() => setMostrarNovoRegistro(true)}
        >
          Novo registro
        </button>
        {mostrarNovoRegistro && (
          <NovoRegistro
            isOpen={true}
            onClose={() => setMostrarNovoRegistro(false)}
            onSave={adicionarRegistro}
          />
        )}
      </div>
    </div>
  );
}

export default FuncoesRegistro;
