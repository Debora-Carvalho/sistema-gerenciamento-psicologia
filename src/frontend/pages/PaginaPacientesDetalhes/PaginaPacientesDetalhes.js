import React, { useState, useEffect } from "react";
import "../../pages/PaginaPacientesDetalhes/PaginaPacientesDetalhes.css";
import useDocumentTitle from "../../components/useDocumentTitle";
import CabecalhoUsuarioLogado from "../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js";
import ChecklistPagamentos from "../../components/ChecklistPagamentos/ChecklistPagamentos.js";
import Menu from "../../components/Menu/Menu.js";
import { PiNotePencilBold } from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import usePacienteDetalhes from "../../hooks/pacientes/usePacienteDetalhes.js";
import { atualizarPaciente } from '../../hooks/pacientes/UsePacienteAtualizar';
import { excluirPaciente } from '../../hooks/pacientes/usePacienteExcluir';

function PaginaPacientesDetalhes() {
    console.log("UserID do localStorage:", localStorage.getItem("userID"));
    console.log("pacienteID do localStorage:", localStorage.getItem("pacienteID"));
    useDocumentTitle("Pacientes | Seren");
    const { paciente } = usePacienteDetalhes();
    const [setUsuario] = useState(null);
    const [editandoIndex, setEditandoIndex] = useState(null);
    const [popupAberto, setPopupAberto] = useState(false);
    const [popupExcluir, setPopupExcluir] = useState(false);
    const [popupSucesso, setPopupSucesso] = useState(false);


    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [novoPaciente, setNovoPaciente] = useState({
        nome: paciente?.nome || '',
        idade: paciente?.idade || '',
        genero: paciente?.genero || '',
        estadoCivil: paciente?.estadoCivil || '',
        telefone: paciente?.telefone || '',
        email: paciente?.email || '',
        preferenciaContato: paciente?.preferenciaContato || '',
        dataNascimento: paciente?.dataNascimento || '',
    });
    const [erroCadastro, setErroCadastro] = useState("");

    const resetarFormulario = () => {
        setNovoPaciente({
            nome: '',
            idade: '',
            genero: '',
            estadoCivil: '',
            telefone: '',
            email: '',
            preferenciaContato: '',
            dataNascimento: ''
        });
        setEditandoIndex(null);
        setMostrarFormulario(false);
        setErroCadastro('');
    };
    const editarPaciente = () => {
        if (!paciente) return;
        setNovoPaciente({
            nome: paciente.nome,
            idade: paciente.idade,
            genero: paciente.genero,
            estadoCivil: paciente.estadoCivil,
            telefone: paciente.telefone,
            email: paciente.email,
            preferenciaContato: paciente.preferenciaContato,
            dataNascimento: paciente.dataNascimento
        });
        setMostrarFormulario(true);
    };

    console.log(novoPaciente)
    return (
        <div className="container-pacientes-detalhes">
            <CabecalhoUsuarioLogado />
            <div className="container-conteudo-pacientes-detalhes">
                <div className="navbar">
                    <Menu />
                </div>
                <div className="container-conteudo-cards-pacientes-detalhes">
                    <div className="cards-paciente-pagamentos">
                        <div className="card-paciente">
                            <div className="card-paciente__cabecalho">
                                {!mostrarFormulario && (
                                    <p className="nome-paciente">
                                        {paciente ? paciente.nome : "Carregando..."}
                                    </p>
                                )}
                                <div>
                                    <div className="acao-paciente">
                                        {mostrarFormulario ? (
                                            <button
                                                className="btn-excluir-paciente"
                                                onClick={() => setPopupExcluir(true)}
                                            >
                                                <FaRegTrashCan className="icon-exclusao" />
                                            </button>
                                        ) : (
                                            <button className="btn-editar-paciente" onClick={() => { setMostrarFormulario(true); editarPaciente(paciente._id); }}>
                                                <PiNotePencilBold className="icon-edicao" />
                                            </button>
                                        )}
                                    </div>

                                    {mostrarFormulario && (
                                        <div className="modal-formulario-pacientes">
                                            <h3 className="titulo-editar"> Editar Paciente</h3>
                                            {erroCadastro && (
                                                <p style={{ color: "red" }}>{erroCadastro}</p>
                                            )}{" "}
                                            {/* Mensagem de erro */}
                                            <div className="form-group-pacientes">
                                                <input
                                                    type="text"
                                                    placeholder="Nome"
                                                    value={novoPaciente.nome}
                                                    onChange={(e) =>
                                                        setNovoPaciente({
                                                            ...novoPaciente,
                                                            nome: e.target.value,
                                                        })
                                                    }
                                                />

                                                <input
                                                    type="text"
                                                    placeholder="Idade"
                                                    value={novoPaciente.idade}
                                                    onChange={(e) =>
                                                        setNovoPaciente({
                                                            ...novoPaciente,
                                                            idade: e.target.value,
                                                        })
                                                    }
                                                />

                                                <select
                                                    value={novoPaciente.genero}
                                                    onChange={(e) =>
                                                        setNovoPaciente({
                                                            ...novoPaciente,
                                                            genero: e.target.value,
                                                        })
                                                    }
                                                >
                                                    <option value="">Gênero</option>
                                                    <option value="Feminino">Feminino</option>
                                                    <option value="Masculino">Masculino</option>
                                                    <option value="Outro">Outro</option>
                                                </select>

                                                <select
                                                    value={novoPaciente.estadoCivil}
                                                    onChange={(e) =>
                                                        setNovoPaciente({
                                                            ...novoPaciente,
                                                            estadoCivil: e.target.value,
                                                        })
                                                    }
                                                >
                                                    <option value="">Estado Civil</option>
                                                    <option value="Solteiro(a)">Solteiro(a)</option>
                                                    <option value="Casado(a)">Casado(a)</option>
                                                    <option value="Divorciado(a)">Divorciado(a)</option>
                                                    <option value="Viúvo(a)">Viúvo(a)</option>
                                                </select>

                                                <input
                                                    type="tel"
                                                    placeholder="Telefone"
                                                    value={novoPaciente.telefone}
                                                    onChange={(e) =>
                                                        setNovoPaciente({
                                                            ...novoPaciente,
                                                            telefone: e.target.value,
                                                        })
                                                    }
                                                />

                                                <input
                                                    type="email"
                                                    placeholder="E-mail"
                                                    value={novoPaciente.email}
                                                    onChange={(e) =>
                                                        setNovoPaciente({
                                                            ...novoPaciente,
                                                            email: e.target.value,
                                                        })
                                                    }
                                                />

                                                <select
                                                    value={novoPaciente.preferenciaContato}
                                                    onChange={(e) =>
                                                        setNovoPaciente({
                                                            ...novoPaciente,
                                                            preferenciaContato: e.target.value,
                                                        })
                                                    }
                                                >
                                                    <option value="">Preferência de Contato</option>
                                                    <option value="Telefone">Telefone</option>
                                                    <option value="E-mail">E-mail</option>
                                                    <option value="WhatsApp">WhatsApp</option>
                                                </select>

                                                <input
                                                    type="date"
                                                    placeholder="Data de Nascimento"
                                                    value={novoPaciente.dataNascimento}
                                                    onChange={(e) =>
                                                        setNovoPaciente({
                                                            ...novoPaciente,
                                                            dataNascimento: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="form-row buttons">
                                                <button
                                                    onClick={() => {
                                                        setMostrarFormulario(false);
                                                        setErroCadastro("");
                                                    }}
                                                >
                                                    Sair
                                                </button>
                                                <button className="btn salvar" onClick={() => {
                                                    atualizarPaciente(setErroCadastro, novoPaciente, editandoIndex, resetarFormulario);
                                                    setPopupAberto(true);
                                                }}>
                                                    Salvar alterações
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {popupAberto && (
                                <div className="popup-overlay">
                                    <div className="popup-box">
                                        <h3>Informações de paciente salvas!</h3>
                                        <p>Você alterou informações deste paciente com sucesso!</p>
                                        <button
                                            className="btn-popup"
                                            onClick={() =>
                                                (window.location.href = "/pacientes-detalhes")
                                            }
                                        >
                                            Ok, entendi!
                                        </button>
                                    </div>
                                </div>
                            )}

                            {popupExcluir && (
                                <div className="popup-overlay">
                                    <div className="popup-box">
                                        <h3>Deseja excluir este paciente?</h3>
                                        <p>Você não poderá reverter esta ação.</p>
                                        <div className="popup-buttons">
                                            <button
                                                className="btn-nao"
                                                onClick={() => setPopupExcluir(false)}
                                            >
                                                Não, cancelar
                                            </button>
                                            <button
                                                className="btn-sim"
                                                onClick={() => {
                                                    excluirPaciente();
                                                    setPopupExcluir(false);
                                                    setPopupSucesso(true);
                                                }}
                                            >
                                                Sim, excluir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {popupSucesso && (
                                <div className="popup-overlay">
                                    <div className="popup-box">
                                        <h3>Dados excluídos com sucesso!</h3>
                                        <button
                                            className="btn-popup"
                                            onClick={() =>
                                                (window.location.href = "/pacientes")
                                            }
                                        >
                                            Ok
                                        </button>
                                    </div>
                                </div>
                            )}


                            {!mostrarFormulario && (
                                paciente ? (
                                    <div className="card-paciente__infos">
                                        <div>
                                            <p className="paciente-atributo">
                                                Idade: <span>{paciente.nome}</span>
                                            </p>
                                            <p className="paciente-atributo">
                                                Gênero: <span>{paciente.genero}</span>
                                            </p>
                                            <p className="paciente-atributo">
                                                Estado civil: <span>{paciente.estadoCivil}</span>
                                            </p>
                                            <p className="paciente-atributo">
                                                Profissão: <span>{paciente.nome}</span>
                                            </p>
                                        </div>
                                        <div>
                                            <p className="paciente-atributo">
                                                Data de nascimento: <span>{paciente.dataNascimento}</span>
                                            </p>
                                            <p className="paciente-atributo">
                                                Telefone: <span>{paciente.telefone}</span>
                                            </p>
                                            <p className="paciente-atributo">
                                                Email: <span>{paciente.email}</span>
                                            </p>
                                            <p className="paciente-atributo">
                                                Preferência de contato: <span>{paciente.preferenciaContato}</span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="card-paciente__infos">
                                        <div>
                                            <p className="paciente-atributo">
                                                <span>carregando</span>
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}

                            {!mostrarFormulario && (
                                <div className="card-paciente__botoes">
                                    <a className="btn-historico-saude" href="#">
                                        <p>Histórico de saúde</p>
                                    </a>
                                    <a className="btn-plano-tratamento" href="#">
                                        <p>Plano de tratamento</p>
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="card-pagamentos">
                            <h3>Pagamentos</h3>
                            <div className="card-pagamentos-checklist">
                                <ChecklistPagamentos className="checklist" />
                            </div>
                        </div>
                    </div>
                    <div className="cards-anotacoes">
                        <div className="container-anotacoes-salvas">
                            <h1>Registros de sessões</h1>
                        </div>
                        <div className="container-nova-anotacao">
                            <h3>Adicionar anotação</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaginaPacientesDetalhes;