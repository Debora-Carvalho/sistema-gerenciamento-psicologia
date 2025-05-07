import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

function MobilePacientes() {
    console.log("UserID do localStorage:", localStorage.getItem("userID"));
    const { usuario } = useUsuarios();
    const { pacientes, setPacientes } = usePacientes();
    const navigate = useNavigate();
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [mensagemPopup, setMensagemPopup] = useState('');
    const [tipoPopup, setTipoPopup] = useState('');
    const [confirmarExportacao, setConfirmarExportacao] = useState(false);
    const [mostrarPopupExcluir, setMostrarPopupExcluir] = useState(false);
    const [pacienteIdParaExcluir, setPacienteIdParaExcluir] = useState(null);
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
    const [menuAberto, setMenuAberto] = useState(null);
    const modoEdicao = editandoIndex !== null;

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

    const mostrarNotificacao = (mensagem, tipo) => {
        setMensagemPopup(mensagem);
        setTipoPopup(tipo);
        setMostrarPopup(true);
        setTimeout(() => {
            setMostrarPopup(false);
        }, 10000);
    };

    useEffect(() => {
        const handleClickOutsideFiltro = (event) => {
            if (mostrarFiltrosVisuais && event.target.closest('.mobile-container-filtro') === null) {
                setMostrarFiltrosVisuais(false);
            }
        };
        document.addEventListener('click', handleClickOutsideFiltro);
        return () => {
            document.removeEventListener('click', handleClickOutsideFiltro);
        };
    }, [mostrarFiltrosVisuais]);

    useEffect(() => {
        const handleClickOutsideAcoes = (e) => {
            if (!e.target.closest('.mobile-acoes')) {
                setMenuAberto(null);
            }
        };
        document.addEventListener('click', handleClickOutsideAcoes);
        return () => document.removeEventListener('click', handleClickOutsideAcoes);
    }, []);

    const pacientesFiltrados = pacientes.filter(p =>
        p.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        (p.data && p.data.includes(filtro)) ||
        (p.dataNascimento && calcularIdade(p.dataNascimento).toString().includes(filtro))
    );

    const editarPaciente = (id) => {
        const index = pacientes.findIndex(p => p._id === id);
        if (index !== -1) {
            setNovoPaciente({ ...pacientes[index] });
            setEditandoIndex(index);
            setMostrarFormulario(true);
            setErroCadastro('');
        }
        setMenuAberto(null);
    };

    const toggleMenuMobile = () => {
        setMenuMobileVisivel(!menuMobileVisivel);
    };

    const alternarColuna = (campo) => {
        setColunasVisiveis(prev => ({ ...prev, [campo]: !prev[campo] }));
    };

    const handleExcluirPaciente = (id) => {
        setPacienteIdParaExcluir(id);
        setMostrarPopupExcluir(true);
        setMenuAberto(null);
    };

    const confirmarExclusaoPaciente = async () => {
        setMostrarPopupExcluir(false);
        if (pacienteIdParaExcluir) {
            try {
                await excluirPaciente(pacienteIdParaExcluir, setPacientes);
                mostrarNotificacao('Paciente excluído com sucesso!', 'sucesso');
            } catch (error) {
                mostrarNotificacao('Erro ao excluir paciente. Tente novamente.', 'erro');
            } finally {
                setPacienteIdParaExcluir(null);
            }
        }
    };

    const cancelarExclusaoPaciente = () => {
        setMostrarPopupExcluir(false);
        setPacienteIdParaExcluir(null);
    };

    const handleExportarPdfClick = () => {
        setConfirmarExportacao(true);
    };

    const confirmarDownloadPdf = async () => {
        setConfirmarExportacao(false);
        try {
            await exportarPDF(pacientes, colunasVisiveis);
            mostrarNotificacao('PDF exportado com sucesso!', 'sucesso');
        } catch (error) {
            mostrarNotificacao('Erro ao exportar PDF. Tente novamente.', 'erro');
        }
    };

    const cancelarDownloadPdf = () => {
        setConfirmarExportacao(false);
    };

    const formatarTelefone = (telefone) => {
        const cleaned = ('' + telefone).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{0,5})(\d{0,4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}${match[3] ? '-' + match[3] : ''}`;
        }
        return telefone;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoPaciente(prevPaciente => ({
            ...prevPaciente,
            [name]: value
        }));
    };

    const handleCancelarCadastro = () => {
        resetarFormulario();
    };

    const validarEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSalvarPaciente = async () => {
        if (!novoPaciente.nome || !novoPaciente.telefone) {
            setErroCadastro("Nome e Telefone são obrigatórios.");
            return;
        }
        if (novoPaciente.email && !validarEmail(novoPaciente.email)) {
            setErroCadastro("E-mail inválido.");
            return;
        }

        if (editandoIndex !== null) {
            const sucesso = await atualizarPaciente(
                setErroCadastro,
                novoPaciente,
                editandoIndex,
                resetarFormulario,
                pacientes,
                setPacientes
            );
            if (sucesso) {
                mostrarNotificacao('Paciente atualizado com sucesso!', 'sucesso');
            } else {
                mostrarNotificacao('Erro ao atualizar paciente. Tente novamente.', 'erro');
            }
        } else {
            try {
                await cadastrarPaciente(
                    novoPaciente,
                    pacientes,
                    editandoIndex,
                    setPacientes,
                    resetarFormulario,
                    setErroCadastro
                );
                mostrarNotificacao('Paciente cadastrado com sucesso!', 'sucesso');
            } catch (error) {
                mostrarNotificacao('Erro no cadastro. Servidor pode estar fora.', 'erro');
            }
        }
    };

    return (
        <div className="mobile-pagina-container">
            {mostrarPopup && (
                <div className={`mobile-popup-notificacao ${tipoPopup}`}>
                    {mensagemPopup}
                </div>
            )}
            {confirmarExportacao && (
                <div className="mobile-modal-confirmacao">
                    <p>Deseja realmente exportar a lista de pacientes para PDF?</p>
                    <div className="mobile-botoes-confirmacao">
                        <button onClick={confirmarDownloadPdf} className="mobile-btn salvar">Sim</button>
                        <button onClick={cancelarDownloadPdf} className="mobile-btn cinza">Não</button>
                    </div>
                </div>
            )}
            {mostrarPopupExcluir && (
                <div className="mobile-modal-confirmacao">
                    <p>Deseja realmente excluir este paciente?</p>
                    <div className="mobile-botoes-confirmacao">
                        <button onClick={confirmarExclusaoPaciente} className="mobile-btn-excluir-blue">Sim</button>
                        <button onClick={cancelarExclusaoPaciente} className="mobile-btn cinza">Não</button>
                    </div>
                </div>
            )}
            <div className="mobile-conteudo-principal">
                <header className="mobile-top-bar">
                    <button className="mobile-menu-hamburguer" onClick={toggleMenuMobile}>
                        <HiMenu />
                    </button>
                    <div className="mobile-container-pesquisa">
                        <FiSearch className={`mobile-icone-lupa ${campoPesquisaFocado || filtro ? 'escondido' : ''}`} />
                        <input
                            type="text"
                            className="mobile-campo-pesquisa"
                            value={filtro}
                            onChange={e => setFiltro(e.target.value)}
                            onFocus={() => setCampoPesquisaFocado(true)}
                            onBlur={() => setCampoPesquisaFocado(false)}
                        />
                        {!campoPesquisaFocado && !filtro && (
                            <span className="mobile-texto-pesquisa">Pesquisar paciente</span>
                        )}
                    </div>
                    <div className="mobile-usuario-info">
                        <div className="mobile-avatar" />
                        {usuario ? (
                            <div className="mobile-info-texto">
                                <strong>{usuario.username}</strong>
                                <span>{usuario.email}</span>
                            </div>
                        ) : (
                            <div className="mobile-info-texto">
                                <strong>Carregando...</strong>
                            </div>
                        )}
                    </div>
                </header>
                <div className="mobile-titulo-acoes-container">
                    <h2 className="mobile-titulo-pacientes">Pacientes</h2>
                    <div className="mobile-botoes-desktop">
                        <div className="mobile-container-filtro">
                            <button
                                className={`mobile-btn filtro cinza ${mostrarFiltrosVisuais ? 'ativo' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMostrarFiltrosVisuais(!mostrarFiltrosVisuais);
                                }}
                            >
                                <FiFilter /> Filtros
                            </button>
                            {mostrarFiltrosVisuais && (
                                <div className="mobile-filtros-colunas" onClick={(e) => e.stopPropagation()}>
                                    <label><input type="checkbox" checked={colunasVisiveis.nome} onChange={() => alternarColuna('nome')} /> Nome</label>
                                    <label><input type="checkbox" checked={colunasVisiveis.data} onChange={() => alternarColuna('data')} /> Data da sessão</label>
                                    <label><input type="checkbox" checked={colunasVisiveis.idade} onChange={() => alternarColuna('idade')} /> Idade</label>
                                </div>
                            )}
                        </div>
                        <button onClick={handleExportarPdfClick} className="mobile-btn-pdf">
                            <BsFileEarmarkPdf /> Exportar PDF
                        </button>
                        <button className="mobile-btn adicionar cinza" onClick={() => {
                            resetarFormulario();
                            setMostrarFormulario(true);
                        }}>
                            <AiOutlineUserAdd /> Adicionar paciente
                        </button>
                    </div>
                </div>
                <div className="mobile-lista-pacientes">
                    <div className="mobile-botoes-mobile">
                        <button onClick={handleExportarPdfClick} className="mobile-btn-pdf">
                            <BsFileEarmarkPdf />
                        </button>
                        <button className="mobile-btn adicionar cinza pequeno" onClick={() => {
                            resetarFormulario();
                            setMostrarFormulario(true);
                        }}>
                            <AiOutlineUserAdd />
                        </button>
                    </div>
                    {mostrarFiltrosVisuais && (
                        <div className="mobile-filtros-colunas-mobile" onClick={(e) => e.stopPropagation()}>
                            <label><input type="checkbox" checked={colunasVisiveis.nome} onChange={() => alternarColuna('nome')} /> Nome</label>
                            <label><input type="checkbox" checked={colunasVisiveis.data} onChange={() => alternarColuna('data')} /> Data da sessão</label>
                            <label><input type="checkbox" checked={colunasVisiveis.idade} onChange={() => alternarColuna('idade')} /> Idade</label>
                        </div>
                    )}
                    <table className="mobile-tabela-pacientes">
                        <thead>
                            <tr>
                                {colunasVisiveis.nome && <th>Nome</th>}
                                {colunasVisiveis.data && <th>Data da sessão</th>}
                                {colunasVisiveis.idade && <th>Idade</th>}
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientesFiltrados.length > 0 ? (
                                pacientesFiltrados.map((paciente) => (
                                    <tr key={paciente._id} onClick={() => handleAbrirDetalhesPaciente(paciente._id)}>
                                        {colunasVisiveis.nome && <td>{paciente.nome || 'N/A'}</td>}
                                        {colunasVisiveis.data && <td>{paciente.data || 'N/A'}</td>}
                                        {colunasVisiveis.idade && <td>{paciente.dataNascimento ? calcularIdade(paciente.dataNascimento) : 'N/A'}</td>}
                                        <td className="mobile-acoes-td" onClick={(e) => e.stopPropagation()}>
                                            <div
                                                className={`mobile-acoes ${menuAberto === paciente._id ? 'ativo' : ''}`}
                                                onClick={() => setMenuAberto(menuAberto === paciente._id ? null : paciente._id)}
                                            >
                                                <BsThreeDots />
                                                {menuAberto === paciente._id && (
                                                    <div className="mobile-menu-popup">
                                                        <button onClick={() => editarPaciente(paciente._id)}>Editar</button>
                                                        <button onClick={() => handleExcluirPaciente(paciente._id)}>Excluir</button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={Object.values(colunasVisiveis).filter(Boolean).length + 1}>
                                        Nenhum paciente encontrado
                                    </td>
                                </tr>
                            )}
                            <tr><td colSpan={Object.values(colunasVisiveis).filter(Boolean).length + 1}></td></tr>
                            <tr><td colSpan={Object.values(colunasVisiveis).filter(Boolean).length + 1}></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {mostrarFormulario && (
                <div className="mobile-modal-formulario">
                    <h3>{modoEdicao ? 'Editar paciente' : 'Adicionar novo paciente'}</h3>
                    {erroCadastro && <p className="mobile-erro-cadastro">{erroCadastro}</p>}

                    <div className="mobile-form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Nome completo"
                            value={novoPaciente.nome}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mobile-form-group">
                        <label htmlFor="dataNascimento">Data de Nascimento</label>
                        <input
                            type="date"
                            id="dataNascimento"
                            name="dataNascimento"
                            value={novoPaciente.dataNascimento}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mobile-form-group">
                        <label htmlFor="profissao">Profissão</label>
                        <input
                            type="text"
                            id="profissao"
                            name="profissao"
                            placeholder="Profissão"
                            value={novoPaciente.profissao}
                            onChange={(e) =>
                                setNovoPaciente({ ...novoPaciente, profissao: e.target.value })
                            }
                        />
                    </div>

                    <div className="mobile-form-group">
                        <label htmlFor="genero">Gênero</label>
                        <select
                            id="genero"
                            name="genero"
                            value={novoPaciente.genero}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    <div className="mobile-form-group">
                        <label htmlFor="estadoCivil">Estado Civil</label>
                        <select
                            id="estadoCivil"
                            name="estadoCivil"
                            value={novoPaciente.estadoCivil}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione</option>
                            <option value="Solteiro(a)">Solteiro(a)</option>
                            <option value="Casado(a)">Casado(a)</option>
                            <option value="Divorciado(a)">Divorciado(a)</option>
                            <option value="Viúvo(a)">Viúvo(a)</option>
                        </select>
                    </div>

                    <div className="mobile-form-group">
                        <label htmlFor="telefone">Telefone</label>
                        <input
                            type="tel"
                            id="telefone"
                            name="telefone"
                            placeholder="(XX) XXXXX-XXXX"
                            value={novoPaciente.telefone}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mobile-form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="seu@email.com"
                            value={novoPaciente.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mobile-form-group">
                        <label htmlFor="preferenciaContato">Preferência de Contato</label>
                        <select
                            id="preferenciaContato"
                            name="preferenciaContato"
                            value={novoPaciente.preferenciaContato}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione</option>
                            <option value="Telefone">Telefone</option>
                            <option value="E-mail">E-mail</option>
                            <option value="WhatsApp">WhatsApp</option>
                        </select>
                    </div>

                    <div className="mobile-form-buttons">
                        <button onClick={handleCancelarCadastro}>Cancelar</button>
                        <button
                            className="mobile-btn salvar"
                            onClick={handleSalvarPaciente}
                        >
                            {modoEdicao ? 'Salvar alterações' : 'Cadastrar'}
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default MobilePacientes;
