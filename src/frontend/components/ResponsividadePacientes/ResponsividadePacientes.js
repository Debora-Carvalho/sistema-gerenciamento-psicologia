import React, { useState, useEffect } from "react";
import "./ResponsividadePacientes.css";
import { FaTrashAlt, FaEdit, FaFilter, FaFileExport, FaPlusCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importa a extensão autoTable
//import 'jspdf/dist/jspdf.debug.js';  // Não é necessário importar o debug em produção

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

    const handleFiltrarNome = () => {
        setFiltroSelecionado('nome');
        onFiltrar('nome');
    };


    const handleExportar = () => {
        setMostrarConfirmacaoExportar(true);
    };

    const confirmarExportacao = () => {
        setMensagemExportacao('Documento exportado com sucesso!');
        setTimeout(() => {
            setMensagemExportacao('');
        }, 10000);
        setMostrarConfirmacaoExportar(false);
        gerarPDF(); // Chama a função para gerar o PDF
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
        // Aqui você colocaria a lógica para salvar o novo paciente
        setMostrarFormularioCadastro(false);
        setNovoPaciente({ nome: '', dataSessao: '', idade: '', profissao: '', genero: '', estadoCivil: '', telefone: '', email: '', preferenciaContato: '', dataNascimento: '' }); // Limpa o formulário
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

    const gerarPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Nome", "Data da Sessão", "Idade", "Profissão", "Gênero", "Estado Civil", "Telefone", "Email", "Preferência de Contato", "Data de Nascimento"];
        const tableRows = [];

        pacientes.forEach(paciente => {
            const pacienteData = [
                paciente.nome,
                paciente.dataSessao,
                paciente.idade,
                paciente.profissao,
                paciente.genero,
                paciente.estadoCivil,
                formatarTelefoneParaDisplay(paciente.telefone),
                paciente.email,
                paciente.preferenciaContato,
                paciente.dataNascimento
            ];
            tableRows.push(pacienteData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 10 });
        doc.save("pacientes.pdf");
    };

    return (
        <div className="pagina-container">
            <main className="conteudo-principal">
                <div className="cabecalho">
                    <div className="input-pesquisa">
                        <FiSearch className="icone-pesquisa" />
                        <input type="text" placeholder="Pesquisar paciente" />
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
                        <button onClick={handleFiltrarNome}>
                            <FaFilter />
                        </button>
                        <button onClick={handleExportar} title="Exportar para PDF">
                            <FaFileExport />
                        </button>
                        <button onClick={handleAdicionarPaciente} title="Adicionar Paciente">
                            <FaPlusCircle />
                        </button>
                    </div>
                </div>

                <div className="lista-pacientes">
                    {(pacientes || []).map((paciente, i) => (
                        <div key={i} className="paciente-card">
                            <div className="info-paciente">
                                <p><strong>Nome</strong> {paciente.nome}</p>
                                <p><strong>Data da sessão</strong> {paciente.dataSessao}</p>
                                <p><strong>Idade</strong> {paciente.idade} anos</p>
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
                    <div className="mensagem-exportacao">
                        {mensagemExportacao}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ResponsividadePacientes;
