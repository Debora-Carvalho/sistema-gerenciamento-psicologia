import React, { useEffect, useState } from 'react';
import '../Agendamentos/ContainerFuncoesAgendamento/ContainerFuncoesAgendamento.css';
import FiltroRegistro from '../Registros/FiltroRegistro.js'
import { useNavigate } from 'react-router-dom';

function FuncoesRegistros({ filtro, setFiltro }) {
    const navigate = useNavigate();
    return (

        <div className='container-funcoes-visualizar-agendamento'>
            <h1 className='funcoes-visualizar-agendamento__titulo'>
                Registros
            </h1>

            <div className='funcoes-visualizar-agendamento__filtro'>
                <FiltroRegistro filtro={filtro} setFiltro={setFiltro} />
            </div>

            <div className='funcoes-visualizar-agendamento__botoes'>
                <button className='btn-criar-novo-agendamento' onClick={() => navigate("/#")}>
                    Novo registro
                </button>
            </div>
        </div>

    );

};



export default FuncoesRegistros;