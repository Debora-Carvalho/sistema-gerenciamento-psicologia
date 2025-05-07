import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaginaPacientes.css';
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
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const [mensagemPopup, setMensagemPopup] = useState('');
    const [tipoPopup, setTipoPopup] = useState(''); // 'sucesso' ou 'erro'
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
        //esconde depois de uns segundos, coloquei 10 apra testar
        setTimeout(() => {
            setMostrarPopup(false);
        }, 10000);
    };



    useEffect(() => {
        const handleClickOutsideFiltro = (event) => {
            if (mostrarFiltrosVisuais && event.target.closest('.container-filtro') === null) {
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
            if (!e.target.closest('.acoes')) {
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
        setPacienteIdParaExcluir(id); // Armazena o ID do paciente a ser excluído
        setMostrarPopupExcluir(true); 
        setMenuAberto(null);
    };

    const confirmarExclusaoPaciente = async () => {
        setMostrarPopupExcluir(false); 
        if (pacienteIdParaExcluir) {
            try {
                // Chama a função para excluir o paciente
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

    // Nova função para lidar com o clique no botão de exportar
    const handleExportarPdfClick = () => {
        setConfirmarExportacao(true); // Mostrar o popup de confirmação de exportação
    };

    // Função para confirmar o download do PDF
    const confirmarDownloadPdf = async () => {
        setConfirmarExportacao(false); 
        try {
            await exportarPDF(pacientes, colunasVisiveis);
            mostrarNotificacao('PDF exportado com sucesso!', 'sucesso'); // Opcionnal: mostrar notificação de sucesso
        } catch (error) {
            mostrarNotificacao('Erro ao exportar PDF. Tente novamente.', 'erro');
        }
    };

    // Função para cancelar o download do PDF
    const cancelarDownloadPdf = () => {
        setConfirmarExportacao(false); 
    };

    const formatarTelefone = (telefone) => {
        const cleaned = ('' + telefone).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
        if (match) {
            return `${match[1]}${match[2]}${match[3]}`; 
        }
        return cleaned; 
    };

    const formatarTelefoneParaDisplay = (telefone) => {
        const cleaned = ('' + telefone).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return telefone;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'telefone') {
            newValue = formatarTelefone(value);
        }

        setNovoPaciente({ ...novoPaciente, [name]: newValue });
    };

    const validarEmail = (email) => {
        // Expressão regular para validar email
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    };

    const validarNomeProfissao = (texto) => {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(texto);
    };

    const validarDataNascimento = (dataNascimento) => {
        if (!dataNascimento) return false;

        const dataNasc = new Date(dataNascimento);
        const hoje = new Date();
        const idade = hoje.getFullYear() - dataNasc.getFullYear();

        if (idade > 18) {
            return true;
        } else if (idade === 18) {
            // Verifica o mês e dia
            const mesAtual = hoje.getMonth();
            const diaAtual = hoje.getDate();
            const mesNasc = dataNasc.getMonth();
            const diaNasc = dataNasc.getDate();

            if (mesAtual > mesNasc || (mesAtual === mesNasc && diaAtual >= diaNasc)) {
                return true;
            }
        }
        return false;
    };

    const handleCancelarCadastro = () => {
        resetarFormulario();
    };


    return (
        <div className="pagina-container">
            {/* Popup de notificação */}
            {mostrarPopup && (
                <div className={`popup-notificacao ${tipoPopup}`}>
                    {mensagemPopup}
                </div>
            )}
            {/* Popup de confirmação para exportar PDF */}
            {confirmarExportacao && (
                <div className="modal-confirmacao">
                    <p>Deseja realmente exportar a lista de pacientes para PDF?</p>
                    <div className="botoes-confirmacao">
                        <button onClick={confirmarDownloadPdf} className="btn salvar">Sim</button>
                        <button onClick={cancelarDownloadPdf} className="btn cinza">Não</button>
                    </div>
                </div>
            )}
            {/* Popup de confirmação para excluir paciente */}
            {mostrarPopupExcluir && (
                <div className="modal-confirmacao">
                    <p>Deseja realmente excluir este paciente?</p>
                    <div className="botoes-confirmacao">
                        <button onClick={confirmarExclusaoPaciente} className="btn-excluir-blue">Sim</button>
                        <button onClick={cancelarExclusaoPaciente} className="btn cinza">Não</button>
                    </div>
                </div>
            )}
            <div className={`menu-lateral ${menuMobileVisivel ? 'menu-mobile-visivel' : ''}`}>
                {/* <div className="logo-seren">Seren</div>
        <Menu /> */}
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
                        <button onClick={handleExportarPdfClick} className="btn-pdf">
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
                            setEditandoIndex(null);
                            setMostrarFormulario(true);
                            setErroCadastro('');
                        }}>
                            <AiOutlineUserAdd /> Adicionar paciente
                        </button>
                    </div>
                </div>
                <div className="lista-pacientes">
                    <div className="botoes-mobile">

                        <button onClick={handleExportarPdfClick} className="btn-pdf">
                            <BsFileEarmarkPdf />
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
                            {pacientesFiltrados.length > 0 ? (
                                pacientesFiltrados.map((paciente) => (
                                    <tr key={paciente._id} onClick={() => handleAbrirDetalhesPaciente(paciente._id)}>
                                        {colunasVisiveis.nome && <td>{paciente.nome || 'N/A'}</td>}
                                        {colunasVisiveis.data && <td>{paciente.data || 'N/A'}</td>}
                                        {colunasVisiveis.idade && <td>{paciente.dataNascimento ? calcularIdade(paciente.dataNascimento) : 'N/A'}</td>}
                                        <td className="acoes-td" onClick={(e) => e.stopPropagation()}>
                                            <div
                                                className={`acoes ${menuAberto === paciente._id ? 'ativo' : ''}`}
                                                onClick={() => setMenuAberto(menuAberto === paciente._id ? null : paciente._id)}
                                            >
                                                <BsThreeDots />
                                                {menuAberto === paciente._id && (
                                                    <div className="menu-popup">
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
                            {/* Adicionando duas linhas vazias */}
                            <tr><td colSpan={Object.values(colunasVisiveis).filter(Boolean).length + 1}></td></tr>
                            <tr><td colSpan={Object.values(colunasVisiveis).filter(Boolean).length + 1}></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {mostrarFormulario && (
                <div className="modal-formulario">
                    <h3>{modoEdicao ? 'Editar paciente' : 'Adicionar novo paciente'}</h3>
                    {erroCadastro && <p className="erro-cadastro">{erroCadastro}</p>}

                    <div className="form-row">
                        <div className="form-group">
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
                        <div className="form-group">
                            <label htmlFor="genero">Profissão</label>
                            <input
                                type="text"
                                placeholder="Profissão"
                                value={novoPaciente.profissao}
                                onChange={(e) =>
                                    setNovoPaciente({ ...novoPaciente, profissao: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
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
                        <div className="form-group">
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
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="telefone">Telefone</label>
                            <input
                                type="tel"
                                id="telefone"
                                name="telefone"
                                placeholder="(XX) XXXXX-XXXX"
                                value={formatarTelefoneParaDisplay(novoPaciente.telefone)}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="seuemail.@provedor.com"
                                value={novoPaciente.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
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
                        <div className="form-group">
                            <label htmlFor="dataNascimento">Data de Nascimento</label>
                            <input
                                type="date"
                                id="dataNascimento"
                                name="dataNascimento"
                                value={novoPaciente.dataNascimento}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-row buttons">
                        <button onClick={handleCancelarCadastro}>Cancelar</button>
                        <button
                            className="btn salvar"
                            onClick={async () => {
                                let hasErrors = false;
                                let errorMessage = '';

                                if (!novoPaciente.nome.trim() || !novoPaciente.telefone.trim() || !novoPaciente.dataNascimento || !novoPaciente.email) {
                                    hasErrors = true;
                                    errorMessage = "Por favor, preencha todos os campos obrigatórios (Nome, Telefone, Data de Nascimento e E-mail).";
                                } else if (!validarNomeProfissao(novoPaciente.nome)) {
                                    hasErrors = true;
                                    errorMessage = "Nome não deve conter números ou caracteres especiais.";
                                } else if (!validarEmail(novoPaciente.email)) {
                                    hasErrors = true;
                                    errorMessage = "E-mail inválido.";
                                } else if (!validarDataNascimento(novoPaciente.dataNascimento)) {
                                    hasErrors = true;
                                    errorMessage = "O paciente deve ter pelo menos 18 anos.";
                                }

                                setErroCadastro(errorMessage);

                                if (hasErrors) {
                                    return;
                                }


                                const pacienteParaSalvar = {
                                    ...novoPaciente,
                                    telefone: novoPaciente.telefone,
                                };

                                if (editandoIndex !== null) {
                                    const sucesso = await atualizarPaciente(
                                        setErroCadastro,
                                        pacienteParaSalvar,
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
                                        const pacienteExistente = pacientes.find(p =>
                                            p.email === novoPaciente.email || p.telefone === novoPaciente.telefone
                                        );
                                        if (pacienteExistente) {
                                            setErroCadastro("Paciente com esses dados já está registrado.");
                                            return;
                                        }
                                        await cadastrarPaciente(
                                            pacienteParaSalvar,
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
                            }}
                        >
                            {modoEdicao ? 'Salvar alterações' : 'Cadastrar'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaginaPacientes;
