import React, { useState } from 'react';
import '../../pages/PaginaInicial/PaginaInicial.css';
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
    useDocumentTitle("Página Inicial | Seren");

    return(
        <div className='container-pagina-inicial'>
            <CabecalhoPaginaInicial />
            <div className='container-conteudo-pagina-inicial'>
                <div className='navbar'>
                    <Menu />
                </div>
                <div className='container-conteudo-cards-pagina-inicial'>
                    <div className='cards-indicadores'>
                        <CardsIndicadores />
                    </div>

                    <div className='container-botoes-calendario-pagina-inicial'>
                        <div className='cards-botoes-funcionalidades-pagina-inicial'>
                            <div className='card'>
                                <img src={imgBtnPacientes} alt='Ilustração'/>
                                <a className='btn-pacientes' href='#'>
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
                        <div className='card-calendario-pagina-inicial'>
                            <Calendario />
                        </div>                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaInicial;