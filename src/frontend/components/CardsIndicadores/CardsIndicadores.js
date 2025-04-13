import React, { useState } from 'react';
import './CardsIndicadores.css';

function CardsIndicadores() {
    const totalNotificacoes = 131;
    const totalInativos = 11;
    const totalPagamentosPendentes = 4;

    return(
        <div className='container-cards'>
            <div className='card'>
                <p>{totalNotificacoes}</p>
                <p className='texto-descritivo'>Notificações</p>
            </div>

            <div className='card'>
                <p>{totalInativos}</p>
                <p className='texto-descritivo'>Pacientes inativos</p>
            </div>

            <div className='card'>
                <p>{totalPagamentosPendentes}</p>
                <p className='texto-descritivo'>Pagamentos a vencer</p>
            </div>
        </div>
    );
}

export default CardsIndicadores;