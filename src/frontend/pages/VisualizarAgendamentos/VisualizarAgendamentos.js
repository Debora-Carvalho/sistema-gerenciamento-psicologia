import React, { useEffect, useState } from 'react';
import '../../pages/VisualizarAgendamentos/VisualizarAgendamentos.css';
import useDocumentTitle from '../../components/useDocumentTitle';
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal.js';
import CabecalhoUsuarioLogado from '../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js';
import CabecalhoResponsivo from '../../components/CabecalhoResponsivo/CabecalhoResponsivo.js';
import ContainerFuncoesAgendamento from '../../components/Agendamentos/ContainerFuncoesAgendamento/ContainerFuncoesAgendamento.js';
import CardInfoAgendamento from '../../components/Agendamentos/CardInfoAgendamento/CardInfoAgendamento.js';

function VisualizarAgendamentos() {
    useDocumentTitle("Agendamentos | Seren"); // mudando o Title da pagina

    const [limiteCards, setLimiteCards] = useState(5);  //esse é o limite de cards exibidos de inicio na tela
    const [filtro, setFiltro] = useState("hoje");

    const agendamentos = [
        { hora: '08:00', nome: 'Justino Silva Ferreira', periodo: '08:00 - 08:30' },
        { hora: '14:00', nome: 'Jessica Viana Amorim', periodo: '14:00 - 15:00' },
        { hora: '14:00', nome: 'Jessica Viana Amorim', periodo: '14:00 - 15:00' },
        { hora: '14:00', nome: 'Jessica Viana Amorim', periodo: '14:00 - 15:00' },
        { hora: '14:00', nome: 'Jessica Viana Amorim', periodo: '14:00 - 15:00' },
        { hora: '14:00', nome: 'Jessica Viana Amorim', periodo: '14:00 - 15:00' },
        { hora: '14:00', nome: 'Jessica Viana Amorim', periodo: '14:00 - 15:00' },
        { hora: '18:30', nome: 'Francisco de Oliveira Queiroz', periodo: '18:30 - 19:20' },
        { hora: '18:30', nome: 'Francisco de Oliveira Queiroz', periodo: '18:30 - 19:20' },
        { hora: '18:30', nome: 'Francisco de Oliveira Queiroz', periodo: '18:30 - 19:20' },
    ];

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
                    <ContainerFuncoesAgendamento filtro={filtro} setFiltro={setFiltro} />
                </div>

                <div className='visualizar-agendamentos-componente-cards'>
                    {filtro === "hoje" && (
                        <div className='agendamentos-componente-cards__hoje'>
                            {agendamentos.slice(0, limiteCards).map((agendamento, index) => (
                                <CardInfoAgendamento key={index} {...agendamento} />
                            ))}
                        </div>
                    )}

                    {filtro === "proximos" && (
                        <div className='agendamentos-componente-cards__proximos'>
                            <p className='componente-cards__proximos-data'>14/06/2025</p>
                            {agendamentos.slice(0, limiteCards).map((agendamento, index) => (
                                <CardInfoAgendamento key={index} {...agendamento} />
                            ))}
                        </div>
                    )}

                    {/* o botao btn-ver-mais permite exibir mais cards na tela 
                    (acrescenta 5 por vez ate acabar a listagem e o botao sumir) */}

                    {limiteCards < agendamentos.length  && (
                    <button className='btn-ver-mais' onClick={() => setLimiteCards(limiteCards + 5)}>
                        Ver mais
                    </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VisualizarAgendamentos;