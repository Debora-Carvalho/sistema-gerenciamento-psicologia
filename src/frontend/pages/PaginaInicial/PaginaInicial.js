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
import Calendario from '../../components/Calendario/Calendario.js';

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
                            <div className='card'>
                                <img src={imgBtnPacientes} alt='Ilustração'/>
                                <a className='btn-pacientes' href='/pacientes'>
                                    <p>Pacientes</p>
                                </a>
                            </div>

                            <div className='card'>
                                <img src={imgBtnAnotacoes} alt='Ilustração'/>
                                <a className='btn-anotacoes' href='#'>
                                    <p>Anotações</p>
                                </a>
                            </div>

                            <div className='card'>
                                <img src={imgBtnAgendamentos} alt='Ilustração'/>
                                <a className='btn-agendamentos' href='#'>
                                    <p>Agendamentos</p>
                                </a>
                            </div>

                            <div className='card'>
                                <img src={imgBtnPagamentos} alt='Ilustração'/>
                                <a className='btn-pagamentos' href='#'>
                                    <p>Pagamentos</p>
                                </a>
                            </div>
                        </div>
                        <div className='card-calendario'>
                            <Calendario />
                        </div>                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaInicial;