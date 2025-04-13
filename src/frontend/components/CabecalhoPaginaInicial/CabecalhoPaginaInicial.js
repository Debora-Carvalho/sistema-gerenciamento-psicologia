import React, { useState } from 'react';
import './CabecalhoPaginaInicial.css';

function CabecalhoPaginaInicial() {
    const nomeUsuario = 'Ianara';
    const totalAgendamentos = 15;

    return(
        <div className='container-cabecalho'>
            <div className='container-logo'>
                Seren
            </div>

            <div className='container-cumprimentos'>
                <p className='texto-cumprimentos'>Bom dia, {nomeUsuario}</p>
            </div>

            <div className='container-agendamentos'>
                <p className='texto-agendamentos'>Faltam <span>{ totalAgendamentos }</span> atendimentos</p>
            </div>
        </div>
    );
}

export default CabecalhoPaginaInicial;