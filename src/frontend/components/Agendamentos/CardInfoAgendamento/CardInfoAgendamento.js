import React, { useEffect, useState } from "react";
import "../../Agendamentos/CardInfoAgendamento/CardInfoAgendamento.css";
import CardDropdownAgendamento from "../../Agendamentos/CardInfoAgendamento/CardDropdownAgendamento.js";
import useAgendamentoStatus from '../../../features/PaginaAgendamentos/useAgendamentoStatus.js';
import { FaRegClock } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";

function CardInfoAgendamento({id, dataInicio, dataFim, nomePaciente, linkSessao, statusAgendamento  }) {
    const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
    const userID = localStorage.getItem("userID");
    const dataI = new Date(dataInicio)
    const dataF = new Date(dataFim)
    const horaFim = dataF.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const horaInicio = dataI.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }); 
    const [encerrarPersistido, setEncerrarPersistido] = useState(false);
    const { ativaAtendimento, alternarAtendimento } = useAgendamentoStatus(userID, id);
  
  
    useEffect(() => {
      const salvo = localStorage.getItem(`atendimento-${id}`);
      if (salvo === 'true') {
        setEncerrarPersistido(true);
      }
    }, [id]);
  
    useEffect(() => {
      localStorage.setItem(`atendimento-${id}`, ativaAtendimento);
      setEncerrarPersistido(ativaAtendimento);
    }, [ativaAtendimento, id]);
  
    const handleAlternarAtendimento = (e) => {
      if (userID && id) {
        alternarAtendimento()
      }
      if (ativaAtendimento) {
        e.preventDefault(); 
      }
    };

  return (
    <div className="card-info-agendamento">
      <div className="container-conteudo-card-info-agendamento">
        <div className="info-agendamento__hora">{horaInicio}</div>

        <div className="card-info-agendamento__periodo-link">
          <p className="info-agendamento__periodo">
            <FaRegClock className="info-agendamento__periodo__icon" />
           {horaInicio}-{horaFim}
          </p>
         
            <p className="info-agendamento__link-atendimento" href="#">
            <GrLocation className="info-agendamento__link-atendimento__icon" />
              <a
              className="link-sessao"
              href={linkSessao}
              target="_blank"
              rel="noopener noreferrer"
              >
              link da sessão
            </a>
            </p>
        </div>

        <div className="card-info-agendamento__nome-iniciar">
          <p className="info-agendamento__nome">{nomePaciente}</p>
          {statusAgendamento !== "Concluído" && (
            <a
              className="info-agendamento__iniciar-atendimento"
              href={ativaAtendimento ? linkSessao : "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleAlternarAtendimento}
              style={{ cursor: "pointer" }}
            >
              {ativaAtendimento
                ? "Encerrar Atendimento"
                : "Iniciar Atendimento"}
            </a>
          )}
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