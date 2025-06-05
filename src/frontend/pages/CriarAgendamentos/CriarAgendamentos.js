import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CriarAgendamentos.css';
import { ObjectId } from 'bson';
import { FaUser, FaCalendarAlt, FaPalette, FaVideo, FaExternalLinkAlt, FaClock } from 'react-icons/fa';
import { MdTitle } from 'react-icons/md';
import useCriarAgendamentos from '../../hooks/agendamentos/useCriarAgendamentos';
import usePacientes from '../../hooks/pacientes/usePacientesListar';
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal.js';
import CabecalhoUsuarioLogado from '../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js';
import CabecalhoResponsivo from '../../components/CabecalhoResponsivo/CabecalhoResponsivo.js';
import TelaDeCarregamento from '../../components/CarregamentoTela/TelaDeCarregamento.js';
const CriarAgendamentos = () => {
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();
    const { adicionarAgendamento } = useCriarAgendamentos();
    const [agendamento, setAgendamento] = useState({
        id: new ObjectId().toString(),
        id_usuario: '',
        id_paciente: '',
        titulo: '',
        dataInicioData: '',
        dataInicioHora: '',
        dataFimHora: '',
        desc: '',
        color: '#000000',
        tipo: '',
        linkSessao: '',
        nomePaciente: ''
    });

    const [erro, setErro] = useState('');
    const [exibirPopupConfirmacao, setExibirPopupConfirmacao] = useState(false);
    const [mostrarSucesso, setMostrarSucesso] = useState(false);
    const [mostrarSeletorCor, setMostrarSeletorCor] = useState(false);
    const { pacientes } = usePacientes();

    const plataformas = ['Google Meet', 'Teams', 'Zoom', 'Outros'];
    const coresPadrao = ['#000000', '#01429E', '#ff0000', '#00ff00', '#FFA500', '#800080', '#FFC0CB', '#A52A2A'];


    const handleChange = (e) => {
        const { name, value } = e.target;

        let novoAgendamento = {
            ...agendamento,
            [name]: value
        };

        if (name === 'nomePaciente') {
            novoAgendamento.titulo = value; // Define o título como nome do paciente
        }

        setAgendamento(novoAgendamento);
        setErro('');
    };

    const selecionarCor = (cor) => {
        setAgendamento({
            ...agendamento,
            color: cor
        });
        setMostrarSeletorCor(false);
    };

    const verificarCampos = () => {
        if (!agendamento.titulo || !agendamento.nomePaciente || !agendamento.dataInicioData || !agendamento.dataInicioHora || !agendamento.dataFimHora) {
            setErro('Por favor, preencha todos os campos obrigatórios.');
            return false;
        }
        return true;
    };

    const handleSalvar = () => {
        if (!verificarCampos()) return;
        setExibirPopupConfirmacao(true);
    };


    const confirmarSalvar = async () => {
        const DataInicio = new Date(`${agendamento.dataInicioData}T${agendamento.dataInicioHora}:00`).toISOString();
        const DataFim = new Date(`${agendamento.dataInicioData}T${agendamento.dataFimHora}:00`).toISOString();

        try {
            setCarregando(true);
            const userID = localStorage.getItem("userID");
            const agendamentoId = await adicionarAgendamento(
                userID,
                agendamento.titulo,
                DataInicio,
                DataFim,
                agendamento.desc,
                agendamento.color,
                agendamento.tipo,
                agendamento.nomePaciente,
                agendamento.linkSessao
            );
            setCarregando(false);
            if (agendamentoId) {
                setMostrarSucesso(true);
                setExibirPopupConfirmacao(false);
                // Resetar campos
                setAgendamento({
                    id: new ObjectId().toString(),
                    id_usuario: '',
                    id_paciente: '',
                    titulo: '',
                    dataInicioData: '',
                    dataInicioHora: '',
                    dataFimHora: '',
                    desc: '',
                    color: '#000000',
                    tipo: '',
                    linkSessao: '',
                    nomePaciente: ''
                });

                navigate("/visualizar-agendamentos", {
                    state: { sucesso: true, mensagem: "Paciente foi agendado com sucesso!" }
                });

            } else {
                setErro('Falha ao salvar o agendamento.');
            }
        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
            setErro('Erro inesperado. Tente novamente.');
        }
    };


    const cancelarSalvar = () => {
        setExibirPopupConfirmacao(false);
    };

    const handleCancelar = () => {
        setAgendamento({
            id: new ObjectId().toString(),
            id_usuario: '',
            id_paciente: '',
            titulo: '',
            DataInicio: '',
            dataFim: '',
            desc: '',
            color: '#000000',
            tipo: '',
            linkSessao: '',
            nomePaciente: ''
        });
        setErro('');
        navigate("/visualizar-agendamentos");
    };

    return (
        <div className='container-visualizar-agendamentos-criar'>
            <div className='navbar'>
                <MenuPrincipal />
            </div>
            <div className="agendamento-container">
                <div className='visualizar-agendamentos-cabecalho-criar'>
                    <CabecalhoUsuarioLogado />
                </div>

                <div className='visualizar-agendamentos-cabecalho-responsivo-criar'>
                    <CabecalhoResponsivo />
                </div>

                <h1>Novo agendamento</h1>

                <div className="agendamento-form">

                    <div className="input-icon campo-longo">
                        <FaUser />
                        <select
                            name="nomePaciente"
                            value={agendamento.nomePaciente}
                            onChange={handleChange}
                        >
                            <option value="">Selecione um paciente</option>
                            {pacientes.map((paciente) => (
                                <option key={paciente._id} value={paciente.nome}>
                                    {paciente.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* <label>Data da sessão: </label> */}
                    <div className="input-icon campo-longo">
                        <FaCalendarAlt />
                        <input
                            type="date"
                            name="dataInicioData"
                            value={agendamento.dataInicioData}
                            onChange={handleChange}
                        />
                    </div>

                    {/* <label>Hora de início</label> */}
                    <div className="input-icon campo-longo">
                        <FaClock />
                        <input
                            type="time"
                            name="dataInicioHora"
                            value={agendamento.dataInicioHora}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-icon campo-longo">
                        <FaClock />
                        <input
                            type="time"
                            name="dataFimHora"
                            value={agendamento.dataFimHora}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-icon campo-longo">
                        <FaExternalLinkAlt />
                        <input
                            type="text"
                            name="linkSessao"
                            placeholder="Link da sessão"
                            value={agendamento.linkSessao}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-icon">
                        <FaVideo />
                        <select name="tipo" value={agendamento.tipo} onChange={handleChange}>
                            <option value="">Plataforma</option>
                            {plataformas.map((plataforma, index) => (
                                <option key={index} value={plataforma}>{plataforma}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-icon seletor-cor-container">
                        <FaPalette />
                        <div
                            className="cor-selecionada"
                            style={{ backgroundColor: agendamento.color }}
                            onClick={() => setMostrarSeletorCor(!mostrarSeletorCor)}
                        ></div>
                        {mostrarSeletorCor && (
                            <div
                                className="seletor-cor"
                                onMouseDown={(e) => {
                                    e.preventDefault(); // Impede o comportamento padrão do mouse down, que pode incluir a perda de foco.
                                    e.stopPropagation();
                                }}
                            >
                                <div className="text-sm font-semibold mb-2 text-gray-700">Selecione uma cor abaixo:</div>
                                <input
                                    type="color"
                                    value={agendamento.color}
                                    onChange={(e) => selecionarCor(e.target.value)}
                                />
                                <div className="cores-padrao">
                                    {coresPadrao.map((cor, index) => (
                                        <div
                                            key={index}
                                            className="opcao-cor"
                                            style={{ backgroundColor: cor }}
                                            onClick={() => selecionarCor(cor)}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {erro && <p className="mensagem-erro">{erro}</p>}
                </div>

                <div className="buttons">
                    <button className="cancelar" onClick={handleCancelar}>Cancelar</button>
                    <button className="salvar" onClick={handleSalvar}>Salvar</button>
                </div>

                {exibirPopupConfirmacao && (
                    <div className="popup-overlay">
                        <div className="popup-confirmacao">
                            <p>Deseja realmente salvar este agendamento?</p>
                            <div className="popup-buttons">
                                <button className="confirmar" onClick={confirmarSalvar}>Confirmar</button>
                                <button className="voltar" onClick={cancelarSalvar}>Voltar</button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
            {carregando && <TelaDeCarregamento mensagem="Salvando agendamento..." />}
        </div>
    );
};

export default CriarAgendamentos;
