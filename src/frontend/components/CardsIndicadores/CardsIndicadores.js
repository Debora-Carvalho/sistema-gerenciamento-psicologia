import React, { useState } from 'react';
import './CardsIndicadores.css';
import { IoIosArrowForward } from "react-icons/io";

function CardsIndicadores() {
    const totalNotificacoes = 131;
    const totalInativos = 11;
    const totalPagamentosPendentes = 4;

    return(
        <div className='container-cards'>
            <div className='card'>
                <p className='numeroIndicador'>{totalNotificacoes}</p>
                <p className='texto-descritivo'>Notificações</p>
            </div>

            <div className='card linha-separacao'>
                <p className='numeroIndicador'>{totalInativos}</p>
                <p className='texto-descritivo'>Pacientes inativos</p>
            </div>

            <div className='card'>
                <p className='numeroIndicador'>{totalPagamentosPendentes}</p>
                <p className='texto-descritivo'>Pagamentos a vencer</p>
            </div>

            <div className='card'>
                <IoIosArrowForward className='icon-seta' />
            </div>            
        </div>
    );
}

export default CardsIndicadores;