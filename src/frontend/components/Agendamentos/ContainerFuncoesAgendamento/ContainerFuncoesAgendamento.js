import React, { useEffect, useState } from 'react';
import '../../Agendamentos/ContainerFuncoesAgendamento/ContainerFuncoesAgendamento.css';
import NavFiltroAgendamento from '../NavFiltroAgendamento/NavFiltroAgendamento.js';
import { useNavigate } from 'react-router-dom';

function ContainerFuncoesAgendamento({ filtro, setFiltro }) {
    const navigate = useNavigate();
    return (
        <div className='container-funcoes-visualizar-agendamento'>
            <h1 className='funcoes-visualizar-agendamento__titulo'>
                Agendamentos
            </h1>

            <div className='funcoes-visualizar-agendamento__filtro'>
                <NavFiltroAgendamento filtro={filtro} setFiltro={setFiltro} />
            </div>

            <div className='funcoes-visualizar-agendamento__botoes'>
                <button className='btn-criar-novo-agendamento' onClick={() => navigate("/agendar")}>
                    Novo agendamento
                </button>

                <button className='btn-bloquear-agenda'>
                    Bloquear agenda
                </button>
            </div>
        </div>
    );
}

export default ContainerFuncoesAgendamento;