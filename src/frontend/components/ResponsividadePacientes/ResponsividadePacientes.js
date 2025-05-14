import React, { useState, useEffect } from "react";
import "./ResponsividadePacientes.css";
import { FaTrashAlt, FaEdit, FaFilter, FaFileExport, FaUserPlus, FaSearch } from "react-icons/fa";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
};

export const exportarPDF = async (pacientes, colunasVisiveis) => {
    try {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Lista de Pacientes', 105, 15, null, null, 'center');

        doc.setFontSize(10);
        const dataEmissao = new Date().toLocaleDateString('pt-BR');
        doc.text(`Emitido em: ${dataEmissao}`, 105, 22, null, null, 'center');

        const headers = [];
        const columnStyles = {};

        if (colunasVisiveis.nome) {
            headers.push('Nome');
            columnStyles[headers.length - 1] = { cellWidth: 60 };
        }

        if (colunasVisiveis.data) {
            headers.push('Data da Sessão');
            columnStyles[headers.length - 1] = { cellWidth: 40 };
        }

        if (colunasVisiveis.idade) {
            headers.push('Idade');
            columnStyles[headers.length - 1] = { cellWidth: 20 };
        }

        const data = pacientes.map(paciente => {
            const row = [];

            if (colunasVisiveis.nome) {
                row.push(paciente.nome || 'N/A');
            }

            if (colunasVisiveis.data) {
                row.push(paciente.data ? new Date(paciente.data).toLocaleDateString('pt-BR') : 'N/A');
            }

            if (colunasVisiveis.idade) {
                row.push(paciente.dataNascimento ? calcularIdade(paciente.dataNascimento) : 'N/A');
            }

            return row;
        });

        doc.autoTable({
            head: [headers],
            body: data,
            startY: 30,
            styles: { fontSize: 10 },
            columnStyles: columnStyles,
            margin: { left: 10 }
        });

        doc.save('lista_pacientes.pdf');

        return true;
    } catch (error) {
        console.error('Erro ao exportar PDF:', error);
        throw error;
    }
};

const ResponsividadePacientes = ({ pacientes, onEditar, onExcluir, onFiltrar }) => {
    const [filtroSelecionado, setFiltroSelecionado] = useState(null);
    const [mostrarConfirmacaoExportar, setMostrarConfirmacaoExportar] = useState(false);
    const [mostrarFormularioCadastro, setMostrarFormularioCadastro] = useState(false);
    const [mensagemExportacao, setMensagemExportacao] = useState('');
    const [novoPaciente, setNovoPaciente] = useState({
        nome: '',
        dataSessao: '',
        idade: '',
        profissao: '',
        genero: '',
        estadoCivil: '',
        telefone: '',
        email: '',
        preferenciaContato: '',
        dataNascimento: ''
    });
    const [erroCadastro, setErroCadastro] = useState('');
    const [colunasVisiveis, setColunasVisiveis] = useState({
        nome: true,
        data: true,
        idade: true,
    });
    const [filtroTexto, setFiltroTexto] = useState('');
    const [pacientesFiltrados, setPacientesFiltrados] = useState(pacientes);

    // Atualiza a lista de pacientes filtrados
    useEffect(() => {
        const resultadoFiltro = aplicarFiltro(pacientes);
        setPacientesFiltrados(resultadoFiltro);
    }, [pacientes, filtroSelecionado, filtroTexto]);

    const handleFiltrar = (tipoFiltro) => {
        setFiltroSelecionado(tipoFiltro);
        onFiltrar(tipoFiltro, filtroTexto);
    };

    const aplicarFiltro = (pacientes) => {
        if (!filtroSelecionado || !filtroTexto) {
            return pacientes;
        }

        const filtroTextoLower = filtroTexto.toLowerCase();

        switch (filtroSelecionado) {
            case 'nome':
                return pacientes.filter(paciente => paciente.nome.toLowerCase().includes(filtroTextoLower));
            case 'dataSessao':
                return pacientes.filter(paciente => paciente.dataSessao && paciente.dataSessao.toLowerCase().includes(filtroTextoLower));
            case 'idade':
                return pacientes.filter(paciente => {
                    const idadePaciente = paciente.dataNascimento ? calcularIdade(paciente.dataNascimento) : null;
                    return idadePaciente !== null && idadePaciente.toString().includes(filtroTextoLower);
                });
            default:
                return pacientes;
        }
    }


    const handleExportar = () => {
        setMostrarConfirmacaoExportar(true);
    };

    const confirmarExportacao = async () => {
        setMostrarConfirmacaoExportar(false);
        try {
            const sucesso = await exportarPDF(pacientes, colunasVisiveis);
            if (sucesso) {
                setMensagemExportacao('Documento exportado com sucesso!');
            }
        } catch (error) {
            console.error("Falha ao exportar:", error);
            setMensagemExportacao('Erro ao exportar o documento.');
        } finally {
            setTimeout(() => {
                setMensagemExportacao('');
            }, 3000);
        }

    };

    const cancelarExportacao = () => {
        setMostrarConfirmacaoExportar(false);
    };

    const handleAdicionarPaciente = () => {
        setMostrarFormularioCadastro(true);
        setNovoPaciente({
            nome: '',
            dataSessao: '',
            idade: '',
            profissao: '',
            genero: '',
            estadoCivil: '',
            telefone: '',
            email: '',
            preferenciaContato: '',
            dataNascimento: ''
        });
        setErroCadastro('');
    };

    const handleSalvarPaciente = () => {
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
        console.log('Paciente Salvo:', novoPaciente);
        
        setMostrarFormularioCadastro(false);
        setNovoPaciente({ nome: '', dataSessao: '', idade: '', profissao: '', genero: '', estadoCivil: '', telefone: '', email: '', preferenciaContato: '', dataNascimento: '' });
    };

    const handleCancelarCadastro = () => {
        setMostrarFormularioCadastro(false);
        setNovoPaciente({ nome: '', dataSessao: '', idade: '', profissao: '', genero: '', estadoCivil: '', telefone: '', email: '', preferenciaContato: '', dataNascimento: '' });
        setErroCadastro('');
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

    useEffect(() => {
        if (mensagemExportacao) {
            const timer = setTimeout(() => {
                setMensagemExportacao('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [mensagemExportacao]);

    return (
        <div className="pagina-container">
            <main className="conteudo-principal">
                <div className="cabecalho">
                    <div className="input-pesquisa">
                        <FaSearch className="icone-pesquisa" />
                        <input
                            type="text"
                            placeholder="Pesquisar paciente"
                            value={filtroTexto}
                            onChange={(e) => setFiltroTexto(e.target.value)}
                        />
                    </div>
                    <div className="usuario-info">
                        <div className="foto-usuario"></div>
                        <div>
                            <strong>Ianara Holanda</strong>
                            <p>email@email.com</p>
                        </div>
                    </div>
                </div>

                <div className="titulo-area">
                    <h2>Pacientes</h2>
                    <div className="icones-filtros">
                        <button className="botao-filtro" onClick={() => handleFiltrar('nome')} title="Filtrar por nome">
                            <FaFilter />
                        </button>
                        <button title="Exportar para PDF" onClick={handleExportar}>
                            <FaFileExport />
                        </button>
                        <button onClick={handleAdicionarPaciente} title="Adicionar Paciente">
                            <FaUserPlus />
                        </button>
                    </div>
                </div>

                <div className="lista-pacientes">
                    {pacientesFiltrados.map((paciente, i) => (
                        <div key={i} className="paciente-card">
                            <div className="info-paciente">
                                <p><strong>Nome:</strong> {paciente.nome}</p>
                                <p><strong>Data da sessão:</strong> {paciente.dataSessao || 'N/A'}</p>
                                <p><strong>Idade:</strong> {paciente.dataNascimento ? calcularIdade(paciente.dataNascimento) : 'N/A'} anos</p>
                            </div>
                            <div className="acoes-paciente">
                                <button className="editar" onClick={() => onEditar(paciente)}>
                                    <FaEdit /> Editar</button>
                                <button className="excluir" onClick={() => onExcluir(paciente)}>
                                    <FaTrashAlt /> Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="ver-mais-container">
                    <button className="ver-mais">Ver mais</button>
                </div>

                {mostrarConfirmacaoExportar && (
                    <div className="popup-confirmacao">
                        <p>Deseja realmente exportar a lista de pacientes para PDF?</p>
                        <div className="botoes-popup">
                            <button className="btn-confirmar" onClick={confirmarExportacao}>Sim</button>
                            <button className="btn-cancelar" onClick={cancelarExportacao}>Não</button>
                        </div>
                    </div>
                )}

                {mostrarFormularioCadastro && (
                    <div className="popup-formulario">
                        <h3>Adicionar Novo Paciente</h3>
                        {erroCadastro && <p className="erro-cadastro">{erroCadastro}</p>}
                        <div className="formulario-cadastro-container">
                            <div className="form-group">
                                <label>Nome:</label>
                                <input
                                    type="text"
                                    value={novoPaciente.nome}
                                    name="nome"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Profissão:</label>
                                <input
                                    type="text"
                                    value={novoPaciente.profissao}
                                    name="profissao"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Data da Sessão:</label>
                                <input
                                    type="text"
                                    value={novoPaciente.dataSessao}
                                    name="dataSessao"
                                    onChange={(e) => setNovoPaciente({ ...novoPaciente, dataSessao: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Idade:</label>
                                <input
                                    type="text"
                                    value={novoPaciente.idade}
                                    name="idade"
                                    onChange={(e) => setNovoPaciente({ ...novoPaciente, idade: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Gênero:</label>
                                <select
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
                                <label>Estado Civil:</label>
                                <select
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
                            <div className="form-group">
                                <label>Telefone:</label>
                                <input
                                    type="tel"
                                    name="telefone"
                                    placeholder="(XX) XXXXX-XXXX"
                                    value={formatarTelefoneParaDisplay(novoPaciente.telefone)}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>E-mail:</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="seuemail.@provedor.com"
                                    value={novoPaciente.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Preferência de Contato:</label>
                                <select
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
                        <div className="botoes-popup botoes-formulario-cadastro">
                            <button className="btn-confirmar" onClick={handleSalvarPaciente}>Salvar</button>
                            <button className="btn-cancelar" onClick={handleCancelarCadastro}>Cancelar</button>
                        </div>
                    </div>
                )}
                {mensagemExportacao && (
                    <div className={`mensagem-exportacao ${mensagemExportacao.startsWith('Erro') ? 'erro' : ''}`}>
                        {mensagemExportacao}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ResponsividadePacientes;


//AMANDA SUA BURRA: AJusta o filtro;Espaço vazio; botões e garante que a foto do user tá aparecendo. pfv.