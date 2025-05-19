import React, { useEffect, useState } from 'react';
import '../../pages/VisualizarAgendamentos/VisualizarAgendamentos.css';
import useDocumentTitle from '../../components/useDocumentTitle';
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal.js';
import CabecalhoUsuarioLogado from '../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js';
import CabecalhoResponsivo from '../../components/CabecalhoResponsivo/CabecalhoResponsivo.js';
import ContainerFuncoesAgendamento from '../../components/Agendamentos/ContainerFuncoesAgendamento/ContainerFuncoesAgendamento.js';

function VisualizarAgendamentos() {
    useDocumentTitle("Agendamentos | Seren"); // mudando o Title da pagina

    return (
        <div className='container-visualizar-agendamentos'>
            <div className='navbar'>
                <MenuPrincipal />
            </div>

            <div className='container-conteudo-visualizar-agendamentos'>
                <div className='visualizar-agendamentos-cabecalho'>
                    <CabecalhoUsuarioLogado />
                </div>

                <div className='visualizar-agendamentos-cabecalho-responsivo'>
                    <CabecalhoResponsivo />
                </div>

                <div className='visualizar-agendamentos-componente-funcoes'>
                    <ContainerFuncoesAgendamento />
                </div>

            </div>
        </div>
    );
}

export default VisualizarAgendamentos;