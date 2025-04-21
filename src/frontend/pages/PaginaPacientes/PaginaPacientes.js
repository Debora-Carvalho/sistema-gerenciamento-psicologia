import React, { useState, useEffect, useRef } from 'react';
import './PaginaPacientes.css';
import Menu from '../../components/Menu/Menu';
import { FiFilter, FiSearch } from "react-icons/fi";
import { BsFileEarmarkPdf, BsThreeDots } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import useUsuarios from '../../hooks/useUsuarios';

function PaginaPacientes() {
    const { usuario } = useUsuarios();

    const [pacientes, setPacientes] = useState([
        { nome: 'Andreia Oliveira Justina', data: '27/09/2025', idade: '42 anos' },
    ]);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [novoPaciente, setNovoPaciente] = useState({
        nome: '',
        idade: '',
        genero: '',
        estadoCivil: '',
        telefone: '',
        email: '',
        preferenciaContato: '',
        dataNascimento: ''
    });
    const [editandoIndex, setEditandoIndex] = useState(null);
    const [menuMobileVisivel, setMenuMobileVisivel] = useState(false);
    const [campoPesquisaFocado, setCampoPesquisaFocado] = useState(false);
    const [colunasVisiveis, setColunasVisiveis] = useState({
        nome: true,
        data: true,
        idade: true
    });
    const [erroCadastro, setErroCadastro] = useState('');
    const [pesquisaTexto, setPesquisaTexto] = useState('');

    const adicionarPaciente = async () => {
        const userID = localStorage.getItem("userID");

        if (!novoPaciente.nome || !novoPaciente.telefone) {
            setErroCadastro('Por favor, preencha o nome e o telefone do paciente.');
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/cadastroPaciente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...novoPaciente, userID }), // ← Aqui está a correção
            });

            const data = await response.json();

            if (response.ok) {
                if (editandoIndex !== null) {
                    const novosPacientes = [...pacientes];
                    novosPacientes[editandoIndex] = data.pacienteCadastrado;
                    setPacientes(novosPacientes);
                    setEditandoIndex(null);
                } else {
                    setPacientes([...pacientes, data.pacienteCadastrado]);
                }

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
                setMostrarFormulario(false);
                setErroCadastro('');
            } else {
                setErroCadastro(data.error || 'Erro ao cadastrar paciente.');
            }
        } catch (error) {
            console.error("Erro ao enviar dados do paciente:", error);
            setErroCadastro("Erro ao comunicar com o servidor.");
        }
    };


    const editarPaciente = (index) => {
        setNovoPaciente({ ...pacientes[index] });
        setEditandoIndex(index);
        setMostrarFormulario(true);
        setErroCadastro('');
    };

    const toggleMenuMobile = () => {
        setMenuMobileVisivel(!menuMobileVisivel);
    };

    const alternarColuna = (campo) => {
        setColunasVisiveis(prev => ({ ...prev, [campo]: !prev[campo] }));
    };

    return (
        <div className="pagina-container">
            <div className={`menu-lateral ${menuMobileVisivel ? 'menu-mobile-visivel' : ''}`}>
                <div className="logo-seren">Seren</div>
                <Menu />
            </div>

            <div className="conteudo-principal">
                <header className="top-bar">
                    <button className="menu-hamburguer" onClick={toggleMenuMobile}>
                        <HiMenu />
                    </button>
                    <div className="container-pesquisa">
                        <FiSearch className={`icone-lupa ${campoPesquisaFocado || pesquisaTexto ? 'escondido' : ''}`} />
                        <input
                            type="text"
                            className="campo-pesquisa"
                            value={pesquisaTexto}
                            onChange={e => setPesquisaTexto(e.target.value)}
                            onFocus={() => setCampoPesquisaFocado(true)}
                            onBlur={() => setCampoPesquisaFocado(false)}
                        />
                        {!campoPesquisaFocado && !pesquisaTexto && (
                            <span className="texto-pesquisa">Pesquisar paciente</span>
                        )}
                    </div>
                    <div className="usuario-info">
                        <div className="avatar" />
                        {usuario ? (
                            <div className="info-texto">
                                <strong>{usuario.username}</strong>
                                <span>{usuario.email}</span>
                            </div>
                        ) : (
                            <div className="info-texto">
                                <strong>Carregando...</strong>
                            </div>
                        )}
                    </div>
                </header>

                <div className="titulo-acoes-container">
                    <h2 className="titulo-pacientes">Pacientes</h2>
                    <div className="botoes-desktop">
                        <button
                            className="btn filtro cinza"
                            onClick={() => console.log("Filtro clicado!")}>
                            <FiFilter /> Filtros
                        </button>

                        <button className="btn pdf cinza">
                            <BsFileEarmarkPdf /> Exportar PDF
                        </button>
                        <button className="btn adicionar cinza" onClick={() => {
                            setMostrarFormulario(true);
                            setErroCadastro(''); // Limpa qualquer erro ao abrir o formulário
                        }}>
                            <AiOutlineUserAdd /> Adicionar paciente
                        </button>
                    </div>
                </div>

                <div className="lista-pacientes">
                    <div className="botoes-mobile">
                        <button
                            className="btn filtro cinza pequeno"
                            onClick={() => console.log("Filtro clicado!")}>
                            <FiFilter />
                        </button>

                        <button className="btn pdf cinza pequeno">
                            <BsFileEarmarkPdf />
                        </button>
                        <button className="btn adicionar cinza pequeno" onClick={() => {
                            setMostrarFormulario(true);
                            setErroCadastro(''); // Limpa qualquer erro ao abrir o formulário
                        }}>
                            <AiOutlineUserAdd />
                        </button>
                    </div>

                    {/* {mostrarFiltrosVisuais && (
                        <div className="filtros-colunas-mobile" onClick={(e) => e.stopPropagation()}>
                            <label><input type="checkbox" checked={colunasVisiveis.nome} onChange={() => alternarColuna('nome')} /> Nome</label>
                            <label><input type="checkbox" checked={colunasVisiveis.data} onChange={() => alternarColuna('data')} /> Data da sessão</label>
                            <label><input type="checkbox" checked={colunasVisiveis.idade} onChange={() => alternarColuna('idade')} /> Idade</label>
                        </div>
                    )} */}

                    <table className="tabela-pacientes">
                        <thead>
                            <tr>
                                {colunasVisiveis.nome && <th>Nome</th>}
                                {colunasVisiveis.data && <th>Data da sessão</th>}
                                {colunasVisiveis.idade && <th>Idade</th>}
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientes.map((paciente, index) => (
                                <tr key={index}>
                                    {colunasVisiveis.nome && <td>{paciente.nome}</td>}
                                    {colunasVisiveis.data && <td>{paciente.data}</td>}
                                    {colunasVisiveis.idade && <td>{paciente.idade}</td>}
                                    <td>
                                        <div className="acoes">
                                            <BsThreeDots />
                                            <div className="menu-popup">
                                                <button onClick={() => editarPaciente(index)}>Editar</button>
                                                <button onClick={() => setPacientes(pacientes.filter((_, i) => i !== index))}>Excluir</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {mostrarFormulario && (

                <div className="modal-formulario">
                    <h3>{editandoIndex !== null ? 'Editar Paciente' : 'Adicionar novo paciente'}</h3>
                    {erroCadastro && <p style={{ color: 'red' }}>{erroCadastro}</p>} {/* Mensagem de erro */}
                    <div className="form-row">
                        <div className="form-group">
                            <input type="text" placeholder="Nome" value={novoPaciente.nome}
                                onChange={e => setNovoPaciente({ ...novoPaciente, nome: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Idade" value={novoPaciente.idade}
                                onChange={e => setNovoPaciente({ ...novoPaciente, idade: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <select value={novoPaciente.genero}
                                onChange={e => setNovoPaciente({ ...novoPaciente, genero: e.target.value })}>
                                <option value="">Gênero</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select value={novoPaciente.estadoCivil}
                                onChange={e => setNovoPaciente({ ...novoPaciente, estadoCivil: e.target.value })}>
                                <option value="">Estado Civil</option>
                                <option value="Solteiro(a)">Solteiro(a)</option>
                                <option value="Casado(a)">Casado(a)</option>
                                <option value="Divorciado(a)">Divorciado(a)</option>
                                <option value="Viúvo(a)">Viúvo(a)</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <input type="tel" placeholder="Telefone" value={novoPaciente.telefone}
                                onChange={e => setNovoPaciente({ ...novoPaciente, telefone: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="E-mail" value={novoPaciente.email}
                                onChange={e => setNovoPaciente({ ...novoPaciente, email: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <select value={novoPaciente.preferenciaContato}
                                onChange={e => setNovoPaciente({ ...novoPaciente, preferenciaContato: e.target.value })}>
                                <option value="">Preferência de Contato</option>
                                <option value="Telefone">Telefone</option>
                                <option value="E-mail">E-mail</option>
                                <option value="WhatsApp">WhatsApp</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="date" placeholder="Data de Nascimento" value={novoPaciente.dataNascimento}
                                onChange={e => setNovoPaciente({ ...novoPaciente, dataNascimento: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-row buttons">
                        <button onClick={() => {
                            setMostrarFormulario(false);
                            setErroCadastro('');
                        }}>Sair</button>
                        <button onClick={adicionarPaciente}>Salvar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaginaPacientes;