import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaginaPacientes.css';
import Menu from '../../components/Menu/Menu';
import { FiFilter, FiSearch } from "react-icons/fi";
import { BsFileEarmarkPdf, BsThreeDots } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import useUsuarios from '../../hooks/useUsuarios';
import usePacientes from '../../hooks/pacientes/usePacientesListar';
import { exportarPDF } from '../../hooks/pacientes/usePacientesPdf';
import { excluirPaciente } from '../../hooks/pacientes/usePacienteExcluir';
import { atualizarPaciente } from '../../hooks/pacientes/UsePacienteAtualizar';
import { cadastrarPaciente } from '../../hooks/pacientes/usePacienteCadastrar';
import calcularIdade from '../../hooks/pacientes/utilCalcularIdade';
function PaginaPacientes() {
    console.log("UserID do localStorage:", localStorage.getItem("userID"));

    const { usuario } = useUsuarios();
    const { pacientes, setPacientes } = usePacientes();
    const navigate = useNavigate();

    const handleAbrirDetalhesPaciente = (pacienteId) => {
        localStorage.setItem("pacienteID", pacienteId);
        navigate("/pacientes-detalhes");
    };


    const resetarFormulario = () => {
        setNovoPaciente({
            nome: '',
            profissao: '',
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

    const [filtro, setFiltro] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [novoPaciente, setNovoPaciente] = useState({
        nome: '',
        profissao: '',
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
    const [mostrarFiltrosVisuais, setMostrarFiltrosVisuais] = useState(false);
    const [colunasVisiveis, setColunasVisiveis] = useState({
        nome: true,
        data: true,
        idade: true
    });
    const [erroCadastro, setErroCadastro] = useState('');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mostrarFiltrosVisuais && event.target.closest('.container-filtro') === null) {
                setMostrarFiltrosVisuais(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [mostrarFiltrosVisuais]);

    const pacientesFiltrados = pacientes.filter(p =>
        p.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        p.data.includes(filtro) ||
        calcularIdade(p.dataNascimento).toString().includes(filtro)
    );
    

    const editarPaciente = (id) => {
        const index = pacientes.findIndex(p => p._id === id);
        if (index !== -1) {
            setNovoPaciente({ ...pacientes[index] });
            setEditandoIndex(index);
            setMostrarFormulario(true);
            setErroCadastro('');
        }
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
                        <FiSearch className={`icone-lupa ${campoPesquisaFocado || filtro ? 'escondido' : ''}`} />
                        <input
                            type="text"
                            className="campo-pesquisa"
                            value={filtro}
                            onChange={e => setFiltro(e.target.value)}
                            onFocus={() => setCampoPesquisaFocado(true)}
                            onBlur={() => setCampoPesquisaFocado(false)}
                        />
                        {!campoPesquisaFocado && !filtro && (
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
                        <div className="container-filtro">
                            <button
                                className={`btn filtro cinza ${mostrarFiltrosVisuais ? 'ativo' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMostrarFiltrosVisuais(!mostrarFiltrosVisuais);
                                }}
                            >
                                <FiFilter /> Filtros
                            </button>
                            {mostrarFiltrosVisuais && (
                                <div className="filtros-colunas" onClick={(e) => e.stopPropagation()}>
                                    <label><input type="checkbox" checked={colunasVisiveis.nome} onChange={() => alternarColuna('nome')} /> Nome</label>
                                    <label><input type="checkbox" checked={colunasVisiveis.data} onChange={() => alternarColuna('data')} /> Data da sessão</label>
                                    <label><input type="checkbox" checked={colunasVisiveis.idade} onChange={() => alternarColuna('idade')} /> Idade</label>
                                </div>
                            )}
                        </div>
                        <button onClick={() => exportarPDF(pacientes, colunasVisiveis)}>
                            <BsFileEarmarkPdf /> Exportar PDF
                        </button>
                        <button className="btn adicionar cinza" onClick={() => {
                            setNovoPaciente({
                                nome: '',
                                profissao: '',
                                genero: '',
                                estadoCivil: '',
                                telefone: '',
                                email: '',
                                preferenciaContato: '',
                                dataNascimento: ''
                            });
                            setEditandoIndex(null); // ← importante: garante que o formulário entenda que é um novo cadastro
                            setMostrarFormulario(true);
                            setErroCadastro('');
                        }}>
                            <AiOutlineUserAdd /> Adicionar paciente
                        </button>

                    </div>
                </div>

                <div className="lista-pacientes">
                    <div className="botoes-mobile">
                        <button
                            className={`btn filtro cinza pequeno ${mostrarFiltrosVisuais ? 'ativo' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setMostrarFiltrosVisuais(!mostrarFiltrosVisuais);
                            }}
                        >
                            <FiFilter />
                        </button>
                        <button onClick={() => exportarPDF(pacientes, colunasVisiveis)}>
                            <BsFileEarmarkPdf /> Exportar PDF
                        </button>
                        <button className="btn adicionar cinza pequeno" onClick={() => {
                            setNovoPaciente({
                                nome: '',
                                profissao: '',
                                genero: '',
                                estadoCivil: '',
                                telefone: '',
                                email: '',
                                preferenciaContato: '',
                                dataNascimento: ''
                            });
                            setEditandoIndex(null);
                            setMostrarFormulario(true);
                            setErroCadastro('');
                        }}>
                            <AiOutlineUserAdd />
                        </button>

                    </div>

                    {mostrarFiltrosVisuais && (
                        <div className="filtros-colunas-mobile" onClick={(e) => e.stopPropagation()}>
                            <label><input type="checkbox" checked={colunasVisiveis.nome} onChange={() => alternarColuna('nome')} /> Nome</label>
                            <label><input type="checkbox" checked={colunasVisiveis.data} onChange={() => alternarColuna('data')} /> Data da sessão</label>
                            <label><input type="checkbox" checked={colunasVisiveis.idade} onChange={() => alternarColuna('idade')} /> Idade</label>
                        </div>
                    )}

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
                            {pacientesFiltrados.map((paciente) => (
                                <tr
                                    key={paciente._id}
                                    onClick={() => handleAbrirDetalhesPaciente(paciente._id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {colunasVisiveis.nome && <td>{paciente.nome}</td>}
                                    {colunasVisiveis.data && <td>{paciente.data}</td>}
                                    {colunasVisiveis.idade && ( <td>{calcularIdade(paciente.dataNascimento)}</td>)}
                                    <td>
                                        <div className="acoes">
                                            <BsThreeDots onClick={(e) => { e.stopPropagation(); }} style={{ cursor: "pointer" }} />
                                            <div className="menu-popup">
                                                <button onClick={(e) => { e.stopPropagation(); editarPaciente(paciente._id); }}>
                                                    Editar
                                                </button>
                                                <button onClick={(e) => { e.stopPropagation(); excluirPaciente(paciente._id, setPacientes); }}>
                                                    Excluir
                                                </button>
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
                            <input type="text" placeholder="Profissão" value={novoPaciente.profissao}
                                onChange={e => setNovoPaciente({ ...novoPaciente, profissao: e.target.value })} />
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
                        <button
                            className="btn salvar"
                            onClick={async () => {
                                if (editandoIndex !== null) {
                                    const sucesso = await atualizarPaciente(
                                        setErroCadastro,
                                        novoPaciente,
                                        editandoIndex,
                                        resetarFormulario,
                                        pacientes,
                                        setPacientes
                                    );
                                    if (sucesso) window.location.reload();
                                } else {
                                    cadastrarPaciente(
                                        novoPaciente,
                                        pacientes,
                                        editandoIndex,
                                        setPacientes,
                                        resetarFormulario,
                                        setErroCadastro
                                    );
                                }
                            }}
                        >
                            {editandoIndex !== null ? 'Salvar alterações' : 'Cadastrar'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaginaPacientes;