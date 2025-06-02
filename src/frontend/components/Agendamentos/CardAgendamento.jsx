import React, { useState, useEffect } from 'react';
import OpcoesDropdown from './OpcoesDropdown';
import './Componentes-agendamento.css';
import useAgendamentoStatus from '../../features/PaginaAgendamentos/useAgendamentoStatus.js';

function CardAgendamento({ id, dataInicio, dataFim, nomePaciente, linkSessao, statusAgendamento }) {
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
        <div className="card-agendamento">
            <div className="hora">{horaInicio}</div>
            <div className="conteudo-agendamento">
                <p className="periodo">{horaInicio}-{horaFim}</p>
                <p className="nome">{nomePaciente}</p>
                {statusAgendamento != "Concluído" ? (
                    <a
                        className="link-atendimento"
                        href={ativaAtendimento ? linkSessao : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleAlternarAtendimento}
                        style={{ cursor: "pointer" }}

                    >
                        {ativaAtendimento ? 'Encerrar Atendimento' : 'Iniciar Atendimento'}
                    </a>
                ) : ("")}
            </div>

            <div className="dropdown-container">
                <button
                    className="btn-opcoes"
                    onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
                >
                    Opções
                </button>
                {mostrarOpcoes && <OpcoesDropdown />}
            </div>
        </div>
    );
}

export default CardAgendamento;
