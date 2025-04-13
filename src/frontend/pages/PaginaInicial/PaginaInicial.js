import React, { useState } from 'react';
import './PaginaInicial.css';
import CabecalhoPaginaInicial from '../../components/CabecalhoPaginaInicial/CabecalhoPaginaInicial.js';
import Menu from '../../components/Menu/Menu.js';
import CardsIndicadores from '../../components/CardsIndicadores/CardsIndicadores.js';
import useDocumentTitle from '../../components/useDocumentTitle';
import imgBtnAgendamentos from '../../assets/images/image-btn-home-agendamentos.png';
import imgBtnPacientes from '../../assets/images/image-btn-home-pacientes.png';
import imgBtnPagamentos from '../../assets/images/image-btn-home-pagamentos.png';
import imgBtnAnotacoes from '../../assets/images/image-btn-home-anotacoes.png';

function PaginaInicial() {
    useDocumentTitle("Página Inicial | Seren");// mudando o Title da pagina

    return(
        <div className='container'>
            <CabecalhoPaginaInicial />
            <div className='container-conteudo'>
                <div className='navbar'>
                    <Menu />
                </div>
                <div className='container-conteudo-cards'>
                    <div className='cards-indicadores'>
                        <CardsIndicadores />
                    </div>

                    <div className='container-botoes-calendario'>
                        <div className='cards-botoes-funcionalidades'>
                            <p>colocar o grid de botoes aqui</p>
                        </div>
                        <div className='card-calendario'>
                            <p>colocar o calenadario aqui</p>
                        </div>                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaInicial;