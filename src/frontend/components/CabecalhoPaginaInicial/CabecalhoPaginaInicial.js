import React, { useEffect, useState } from 'react';
import './CabecalhoPaginaInicial.css';

function CabecalhoPaginaInicial() {
    const nomeUsuario = 'Ianara';
    const totalAgendamentos = 15;

    const [saudacao, setSaudacao] = useState('');

    // atualizar a saudação com base na hora do sistema
    const atualizarSaudacao = () => {
        const horaAtual = new Date().getHours();

        if (horaAtual < 12) {
            setSaudacao('Bom dia');
        } else if (horaAtual < 18) {
            setSaudacao('Boa tarde');
        } else {
            setSaudacao('Boa noite');
        }
    };

    useEffect(() => {
        atualizarSaudacao(); 

        const intervalo = setInterval(() => {
            atualizarSaudacao(); // atualiza a saudação a cada minuto
        }, 60000); // 60.000 ms = 1 minuto

        return () => clearInterval(intervalo); 
    }, []);

    return (
        <div className='container-cabecalho'>
            <div className='container-logo'>
                Seren
            </div>

            <div className='container-cumprimentos'>
                <p className='texto-cumprimentos'>{saudacao}, {nomeUsuario}</p>
            </div>

            <div className='container-agendamentos'>
                <p className='texto-agendamentos'>
                    Faltam <span>{totalAgendamentos}</span> atendimentos
                </p>
            </div>
        </div>
    );
}

export default CabecalhoPaginaInicial;
