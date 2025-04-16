import React, { useState } from 'react';
import '../../pages/PaginaPacientesDetalhes/PaginaPacientesDetalhes.css';
import useDocumentTitle from '../../components/useDocumentTitle';
import CabecalhoUsuarioLogado from '../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js';
import ChecklistPagamentos from '../../components/ChecklistPagamentos/ChecklistPagamentos.js'
import Menu from '../../components/Menu/Menu.js';
import { PiNotePencilBold } from "react-icons/pi";

function PaginaPacientesDetalhes() {
    useDocumentTitle("Pacientes | Seren");

    return(
        <div className='container-pacientes-detalhes'>
            <CabecalhoUsuarioLogado />
            <div className='container-conteudo-pacientes-detalhes'>
                <div className='navbar'>
                    <Menu />
                </div>

                <div className='container-conteudo-cards-pacientes-detalhes'>
                    <div className='cards-paciente-pagamentos'>
                        <div className='card-paciente'>
                            <div className='card-paciente__cabecalho'>
                                <p className='nome-paciente'>
                                    Maria Aparecida Fernandes Gonzalez Da Rocha
                                </p>

                                <a className='btn-editar-paciente' href='#'>
                                    <PiNotePencilBold className='icon-edicao'/>
                                </a>
                            </div>

                            <div className='card-paciente__infos'>
                                <div>
                                    <p className='paciente-atributo'>Idade: <span>31 anos</span></p>
                                    <p className='paciente-atributo'>Gênero: <span>Feminino</span></p>
                                    <p className='paciente-atributo'>Estado civil: <span>Casada</span></p>
                                    <p className='paciente-atributo'>Profissão: <span>Advogada</span></p>
                                </div>
                                <div>
                                    <p className='paciente-atributo'>Data de nascimento: <span>03/09/1993</span></p>
                                    <p className='paciente-atributo'>Telefone: <span>(11) 93456-8790</span></p>
                                    <p className='paciente-atributo'>Email: <span>mafe.rocha@gmail.com</span></p>
                                    <p className='paciente-atributo'>Preferência de contato: <span>Email</span></p>
                                </div>
                            </div>

                            <div className='card-paciente__botoes'>
                                <a className='btn-historico-saude' href='#'>
                                    <p>Histórico de saúde</p>
                                </a>
                                <a className='btn-plano-tratamento' href='#'>
                                    <p>Plano de tratamento</p>
                                </a>
                            </div>
                        </div>

                        <div className='card-pagamentos'>
                            <h3>Pagamentos</h3>

                            <div className='card-pagamentos-checklist'>
                                <ChecklistPagamentos className='checklist' />
                            </div>
                        </div>
                    </div>

                    <div className='cards-anotacoes'>
                        <div className='container-anotacoes-salvas'>
                            <h1>Registros de sessões</h1>
                        </div>
                        <div className='container-nova-anotacao'>
                            <h3>Adicionar anotação</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaPacientesDetalhes;