import React, { useState } from 'react';
import './PaginaInicial.css';
import CabecalhoPaginaInicial from '../../components/CabecalhoPaginaInicial/CabecalhoPaginaInicial.js';
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal.js';
import CardsIndicadores from '../../components/CardsIndicadores/CardsIndicadores.js';
import useDocumentTitle from '../../components/useDocumentTitle';
import imgBtnAgendamentos from '../../assets/images/image-btn-home-agendamentos.png';
import imgBtnPacientes from '../../assets/images/image-btn-home-pacientes.png';
import imgBtnPagamentos from '../../assets/images/image-btn-home-pagamentos.png';
import imgBtnAnotacoes from '../../assets/images/image-btn-home-anotacoes.png';
import Calendario from '../../components/Calendario/Calendario.js';

function PaginaInicial() {
    useDocumentTitle("Página Inicial | Seren");// mudando o Title da pagina

    console.log("UserID do localStorage:", localStorage.getItem("userID"));


    return (
        <div className='container-pagina-inicial'>
            <div className='navbar'>
                <MenuPrincipal />
            </div>
                
            <div className='container-conteudo-pagina-inicial'>
                <div className='pagina-inicial-cabecalho'>
                    <CabecalhoPaginaInicial />
                </div>

                <div className='pagina-inicial-cards-indicadores'>
                    <CardsIndicadores />
                </div>

                <div className='container-botoes-calendario'>
                    <div className='cards-botoes-funcionalidades'>
                        <div className='card-inicio-funcionalidade'>
                            <img src={imgBtnPacientes} alt='Ilustração'/>
                            <a className='btn-pacientes' href='/pacientes'>
                                <p>Pacientes</p>
                            </a>
                        </div>

                        <div className='card-inicio-funcionalidade'>
                            <img src={imgBtnAnotacoes} alt='Ilustração'/>
                            <a className='btn-anotacoes' href='#'>
                                <p>Anotações</p>
                            </a>
                        </div>

                        <div className='card-inicio-funcionalidade'>
                            <img src={imgBtnAgendamentos} alt='Ilustração'/>
                            <a className='btn-agendamentos' href='#'>
                                <p>Agendamentos</p>
                            </a>
                        </div>

                        <div className='card-inicio-funcionalidade'>
                            <img src={imgBtnPagamentos} alt='Ilustração'/>
                            <a className='btn-pagamentos' href='#'>
                                <p>Pagamentos</p>
                            </a>
                        </div>
                    </div>
                    
                    <div className='card-calendario-inicio'>
                        <Calendario />
                    </div>  

                    <div className='card-calendario-responsivo'>
                        <img src={imgBtnPagamentos} alt='Ilustração'/>
                        <a className='btn-abrir-calendario-responsivo' href='#'>
                            <p>Abrir calendário</p>
                        </a>
                    </div>                                        
                </div>
            </div>
        </div>
    );
}

export default PaginaInicial;