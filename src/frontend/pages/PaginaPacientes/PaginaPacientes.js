import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaginaPacientes.css';
// import { FiFilter, FiSearch, FiEdit, FiTrash } from "react-icons/fi"; // Importando FiEdit e FiTrash
// import { BsFileEarmarkPdf } from "react-icons/bs"; // Removido BsThreeDots
// import { AiOutlineUserAdd } from "react-icons/ai";
import useUsuarios from '../../hooks/useUsuarios';
import usePacientes from '../../hooks/pacientes/usePacientesListar';
import { exportarPDF } from '../../hooks/pacientes/usePacientesPdf';
import { excluirPaciente } from '../../hooks/pacientes/usePacienteExcluir';
import { atualizarPaciente } from '../../hooks/pacientes/UsePacienteAtualizar';
import { cadastrarPaciente } from '../../hooks/pacientes/usePacienteCadastrar';
import calcularIdade from '../../hooks/pacientes/utilCalcularIdade';
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal.js';
import CabecalhoResponsivo from "../../components/CabecalhoResponsivo/CabecalhoResponsivo.js";
import useAgendamentos from '../../hooks/agendamentos/useAgendamentos';
import useLeitorDeTela from '../../features/LeitorTela/useLeitorTela.js';
import useInitPaginaPacientes from '../../features/PaginaPacientes/useInitPaginaPacientes.js';
import useLeituraInicial from '../../features/PaginaPacientes/useLeituraInicial.js';
import useClickForaFiltro from '../../features/PaginaPacientes/useClickForaFiltro.js';
import { MobileView } from '../../components/MobileView/MobileView.js';
import { DesktopView } from '../../components/DesktopView/DesktopView.js';
function PaginaPacientes() {
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
    const [isMobile, setIsMobile] = useState(false);
    const userID = localStorage.getItem("userID");


    const handleAbrirDetalhesPaciente = (pacienteId) => {
        localStorage.setItem("pacienteID", pacienteId);
        navigate("/pacientes-detalhes");
    };

    const { leituraAtiva, lerSeNaoLido } = useLeitorDeTela();

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

    const pacientesFiltrados = pacientes.filter(p =>
        p.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        (p.data && p.data.includes(filtro)) ||
        (p.dataNascimento && calcularIdade(p.dataNascimento).toString().includes(filtro))
    );

    const abrirPopupEdicao = (id) => {
        const index = pacientes.findIndex(p => p._id === id);
        if (index !== -1) {
            setNovoPaciente({ ...pacientes[index] });
            setEditandoIndex(index);
            setMostrarFormulario(true);
            setErroCadastro('');
        }
        setMenuAberto(null);
    };

    const alternarColuna = (campo) => {
        setColunasVisiveis(prev => ({ ...prev, [campo]: !prev[campo] }));
    };

    const confirmarExclusao = async (id) => {
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

    const formatarTelefoneParaDisplay = (telefone) => {
        const cleaned = String(telefone).replace(/\D/g, '').slice(0, 11);
        const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return cleaned;
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'telefone') {
            const somenteNumeros = value.replace(/\D/g, '');
            setNovoPaciente(prev => ({ ...prev, telefone: somenteNumeros }));
        } else {
            setNovoPaciente(prev => ({ ...prev, [name]: value }));
        }

    };

    const validarTelefone = (telefone) => {
        const regex = /^(\d{2})(\d{5})(\d{4})$/;
        return regex.test(telefone);
    };


    const validarEmail = (email) => {
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

    const datasPorPaciente = {};

    const { buscarAgendamentos } = useAgendamentos();
    const [agendamentos, setAgendamentos] = useState([]);


    useInitPaginaPacientes({ setIsMobile, setMenuAberto, buscarAgendamentos, userID, setAgendamentos });

    useLeituraInicial({
        leituraAtiva,
        lerSeNaoLido,
        texto: 'Bem-vindo à página pacientes. Você pode criar, alterar, visualizar, buscar e apagar pacientes.'
    });

    useClickForaFiltro({ mostrarFiltrosVisuais, setMostrarFiltrosVisuais });

    agendamentos.forEach(agendamento => {
        const id = agendamento.id_paciente;
        const data = new Date(agendamento.dataInicio);
        if (!datasPorPaciente[id] || data < new Date(datasPorPaciente[id])) {
            datasPorPaciente[id] = agendamento.dataInicio;
        }
    });

    const listaDePacientes = pacientesFiltrados.map((paciente) => ({
        ...paciente,
        data: datasPorPaciente[paciente._id] ? new Date(datasPorPaciente[paciente._id]).toLocaleDateString('pt-BR') : 'N/A',
        idade: paciente.dataNascimento ? calcularIdade(paciente.dataNascimento) : 'N/A',
    }));

    const [filtroMobile, setFiltroMobile] = useState('');
    const [pacientesFiltradosMobile, setPacientesFiltradosMobile] = useState(listaDePacientes);

    useEffect(() => {
        setPacientesFiltradosMobile(listaDePacientes);
    }, [listaDePacientes]);

    const handleFiltrarMobile = (tipo) => {
        setFiltroMobile(tipo);
        if (tipo === 'um') {
            setPacientesFiltradosMobile(listaDePacientes.filter(p => p.individual === true)); // Ajuste na lógica de filtro
        } else if (tipo === 'individual') {
            setPacientesFiltradosMobile(listaDePacientes.filter(p => p.tipo === 'Individual'));
        }
        else if (tipo === 'grupo') {
            setPacientesFiltradosMobile(listaDePacientes.filter(p => p.tipo === 'Grupo'));
        }
        else {
            setPacientesFiltradosMobile(listaDePacientes);
        }
    };


    return (
        <div className="pagina-container">
            {/* comentado para não ficar tão ruim a visualização no mobile corrigir */}
            {<div className='navbar'>
                <MenuPrincipal />
            </div>}
            {mostrarPopup && (
                <div className={`popup-notificacao ${tipoPopup}`}>
                    {mensagemPopup}
                </div>
            )}
            {confirmarExportacao && (
                <div className="modal-confirmacao">
                    <p>Deseja realmente exportar a lista de pacientes para PDF?</p>
                    <div className="botoes-confirmacao">
                        <button onClick={confirmarDownloadPdf} className="btn salvar">Sim</button>
                        <button onClick={cancelarDownloadPdf} className="btn cinza">Não</button>
                    </div>
                </div>
            )}
            {mostrarPopupExcluir && (
                <div className="modal-confirmacao">
                    <p>Deseja realmente excluir este paciente?</p>
                    <div className="botoes-confirmacao">
                        <button onClick={confirmarExclusaoPaciente} className="btn-excluir-blue">Sim</button>
                        <button onClick={cancelarExclusaoPaciente} className="btn cinza">Não</button>
                    </div>
                </div>
            )}

            <div className="visualizar-paciente-cabecalho-responsivo">
                <CabecalhoResponsivo nomePacienteBusca={false}
                    setNomePacienteBusca={false}
                    exibirPesquisa={false} />
            </div>
            <div className="conteudo-principal-pacientes">
                {isMobile ? (
                    <MobileView
                        pacientes={pacientesFiltradosMobile}
                        setPacientes={setPacientes}
                        setMostrarFormulario={setMostrarFormulario}
                        mostrarFormulario={mostrarFormulario}
                        onEditar={abrirPopupEdicao}
                        onExcluir={confirmarExclusao}
                        onFiltrar={handleFiltrarMobile}
                    />
                ) : (
                    <DesktopView
                        filtro={filtro}
                        setFiltro={setFiltro}
                        campoPesquisaFocado={campoPesquisaFocado}
                        setCampoPesquisaFocado={setCampoPesquisaFocado}
                        userID={userID}
                        usuario={usuario}
                        mostrarFiltrosVisuais={mostrarFiltrosVisuais}
                        setMostrarFiltrosVisuais={setMostrarFiltrosVisuais}
                        colunasVisiveis={colunasVisiveis}
                        alternarColuna={alternarColuna}
                        handleExportarPdfClick={handleExportarPdfClick}
                        pacientes={pacientesFiltrados}
                        handleAbrirDetalhesPaciente={handleAbrirDetalhesPaciente}
                        abrirPopupEdicao={abrirPopupEdicao}
                        confirmarExclusao={confirmarExclusao}
                        setMostrarFormulario={setMostrarFormulario}
                        setNovoPaciente={setNovoPaciente}
                        setEditandoIndex={setEditandoIndex}
                        setErroCadastro={setErroCadastro}
                        calcularIdade={calcularIdade}
                        datasPorPaciente={datasPorPaciente}
                    />
                )}

            </div>
            {mostrarFormulario && (
                <div className="modal-formulario">
                    <h3 style={{ color: modoEdicao ? 'inherit' : '#004080' }}>
                        {modoEdicao ? 'Editar paciente' : 'Adicionar novo paciente'}
                    </h3>

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
                                onChange={(e) => {
                                    const rawValue = e.target.value.replace(/\D/g, '');
                                    if (rawValue.length <= 11) {
                                        handleInputChange({
                                            target: {
                                                name: "telefone",
                                                value: rawValue
                                            }
                                        });
                                    }
                                }}
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
                                placeholder="Data de Nascimento"
                                title="Alterar data de nascimento"
                                value={
                                    novoPaciente.dataNascimento
                                        ? new Date(novoPaciente.dataNascimento).toISOString().split("T")[0]
                                        : ''
                                }
                                onChange={(e) =>
                                    setNovoPaciente({
                                        ...novoPaciente,
                                        dataNascimento: e.target.value,
                                    })
                                }
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

                                if (!novoPaciente.nome.trim() || !String(novoPaciente.telefone).trim() || !novoPaciente.dataNascimento || !novoPaciente.email) {
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
                                } else if (!validarTelefone(novoPaciente.telefone)) {
                                    hasErrors = true;
                                    errorMessage = "Telefone inválido. Inclua o DDI (ex: +55).";
                                }

                                setErroCadastro(errorMessage);

                                if (hasErrors) {
                                    return;
                                }

                                const pacienteParaSalvar = {
                                    ...novoPaciente,
                                    telefone: novoPaciente.telefone ? Number(novoPaciente.telefone) : null,
                                    _id: novoPaciente._id
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
                                        const idPacienteAtualizado = pacienteParaSalvar._id || localStorage.getItem("pacienteID");

                                        if (idPacienteAtualizado) {
                                            localStorage.setItem("pacienteID", idPacienteAtualizado);
                                        }

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
                                        const resultado = await cadastrarPaciente(
                                            pacienteParaSalvar,
                                            pacientes,
                                            editandoIndex,
                                            setPacientes,
                                            resetarFormulario,
                                            setErroCadastro
                                        );
                                        if (resultado) {
                                            mostrarNotificacao('Paciente cadastrado com sucesso!', 'sucesso');
                                        } else {
                                            mostrarNotificacao('Erro no cadastro.', 'erro');
                                        }

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