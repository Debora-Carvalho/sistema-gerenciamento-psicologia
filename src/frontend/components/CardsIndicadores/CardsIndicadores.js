import React, { useState } from 'react';
import './CardsIndicadores.css';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const dadosIndicadores = [
    { numIndicador: 131, txtIndicador: 'Notificações' },
    { numIndicador: 11, txtIndicador: 'Pacientes inativos' },
    { numIndicador: 4, txtIndicador: 'Pagamentos a vencer' },
    { numIndicador: 9, txtIndicador: 'Agendamentos do dia' },
    { numIndicador: 2, txtIndicador: 'Mensagens novas' },
];

function CardsIndicadores() {
    const [indiceAtual, setIndiceAtual] = useState(0);
    const quantidadePorTela = window.innerWidth <= 768 ? 1 : 3;

    const proximo = () => {
        setIndiceAtual((prev) => (prev + 1) % dadosIndicadores.length);
    };

    const anterior = () => {
        setIndiceAtual((prev) => (prev - 1 + dadosIndicadores.length) % dadosIndicadores.length);
    };

    const cardsVisiveis = [];
    for (let i = 0; i < quantidadePorTela; i++) {
        const index = (indiceAtual + i) % dadosIndicadores.length;
        cardsVisiveis.push(dadosIndicadores[index]);
    }

    return (
        <div className='container-cards-indicadores'>
            <div className='card-indicadores seta-card' onClick={anterior}>
                <IoIosArrowBack className='icon-seta' />
            </div>

            {cardsVisiveis.map((item, index) => (
                <div key={index} className={'card-indicadores'}>
                    <p className='numeroIndicador'>{item.numIndicador}</p>
                    <p className='texto-descritivo'>{item.txtIndicador}</p>
                </div>
            ))}

            <div className='card-indicadores seta-card' onClick={proximo}>
                <IoIosArrowForward className='icon-seta' />
            </div>
        </div>
    );
}

export default CardsIndicadores;
