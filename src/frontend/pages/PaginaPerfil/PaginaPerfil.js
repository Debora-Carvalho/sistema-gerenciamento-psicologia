import React, { useEffect, useState } from 'react';
import './PaginaPerfil.css';
import useDocumentTitle from '../../components/useDocumentTitle';
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal.js';
import CabecalhoUsuarioLogado from '../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js';
import CabecalhoResponsivo from '../../components/CabecalhoResponsivo/CabecalhoResponsivo.js';
import ContainerFuncoesAgendamento from '../../components/Agendamentos/ContainerFuncoesAgendamento/ContainerFuncoesAgendamento.js';
import CardInfoAgendamento from '../../components/Agendamentos/CardInfoAgendamento/CardInfoAgendamento.js';

function PaginaPerfil() {
    useDocumentTitle("Perfil | Seren"); // mudando o Title da pagina

    return (
        <div className='container-pagina-perfil'>
            <div className='navbar'>
                <MenuPrincipal />
            </div>

            <div className='container-centro-perfil'>
                <div className='perfil-cabecalho'>
                    <CabecalhoUsuarioLogado />
                </div>

                <div className='perfil-cabecalho-responsivo'>
                    <CabecalhoResponsivo />
                </div>

                <div className='titulo-perfil'>
                    <h1 className='t-perfil'>Meu Perfil</h1>
                </div>

                <div className='container-opcoes-perfil'>
                    <div className='container-informacoes-perfil'>
                        <div className='container-borda-perfil'>
                            <p className='pA-perfil'>Nome</p>
                            <div className='container-editar-perfil'>
                                <p className='pL-perfil'>Leitura de Tela</p>
                                <button className='bt-editar'>
                                    <label>Editar</label>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='container-informacoes-perfil'>
                        <div className='container-borda-perfil'>
                            <p className='pA-perfil'>Nome</p>
                            <div className='container-editar-perfil'>
                                <p className='pL-perfil'>Leitura de Tela</p>
                                <button className='bt-editar'>
                                    <label>Editar</label>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='container-informacoes-perfil'>
                        <div className='container-borda-perfil'>
                            <p className='pA-perfil'>Nome</p>
                            <div className='container-editar-perfil'>
                                <p className='pL-perfil'>Leitura de Tela</p>
                                <button className='bt-editar'>
                                    <label>Editar</label>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='container-informacoes-perfil'>
                        <div className='container-borda-perfil'>
                            <p className='pA-perfil'>Nome</p>
                            <div className='container-editar-perfil'>
                                <p className='pL-perfil'>Leitura de Tela</p>
                                <button className='bt-editar'>
                                    <label>Editar</label>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaPerfil;