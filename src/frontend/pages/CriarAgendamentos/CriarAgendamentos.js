import React, { useState } from 'react';
import './CriarAgendamentos.css';
import { ObjectId } from 'bson';
import { FaUser, FaCalendarAlt, FaPalette, FaVideo, FaExternalLinkAlt, FaClock } from 'react-icons/fa';
import { MdTitle } from 'react-icons/md';
import MenuResponsivo from '../../components/MenuResponsivo/MenuResponsivo';
import useCriarAgendamentos from '../../hooks/agendamentos/useCriarAgendamentos';
import usePacientes from '../../hooks/pacientes/usePacientesListar';
import usePacientesD from '../../hooks/pacientes/usePacienteDetalhes';
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal.js';
import CabecalhoUsuarioLogado from '../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js';
import CabecalhoResponsivo from '../../components/CabecalhoResponsivo/CabecalhoResponsivo.js';

const CriarAgendamentos = () => {
    const { adicionarAgendamento } = useCriarAgendamentos();
    const [agendamento, setAgendamento] = useState({
        id: new ObjectId().toString(),
        id_usuario: '',
        id_paciente: '',
        titulo: '',
        dataInicioData: '', // novo
        dataInicioHora: '', // novo
        // dataFimData: '', // novo
        dataFimHora: '', // novo
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

    const handleSalvar = async () => {
        if (!verificarCampos()) return;

        const DataInicio = new Date(`${agendamento.dataInicioData}T${agendamento.dataInicioHora}:00`).toISOString();
        const DataFim = new Date(`${agendamento.dataInicioData}T${agendamento.dataFimHora}:00`).toISOString();

        // if (new Date(DataInicio) >= new Date(DataFim)) {
        //     setErro('A data de início deve ser anterior à data de término.');
        //     return;
        // }

        try {
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

            if (agendamentoId) {
                setMostrarSucesso(true);
                setExibirPopupConfirmacao(true);
                // Resetar campos
                setAgendamento({
                    id: new ObjectId().toString(),
                    id_usuario: '',
                    id_paciente: '',
                    titulo: '',
                    dataInicioData: '',
                    dataInicioHora: '',
                    // dataFimData: '',
                    dataFimHora: '',
                    desc: '',
                    color: '#000000',
                    tipo: '',
                    linkSessao: '',
                    nomePaciente: ''
                });
            } else {
                setErro('Falha ao salvar o agendamento.');
            }
        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
            setErro('Erro inesperado. Tente novamente.');
        }
    };

    const confirmarSalvar = () => {
        console.log("Agendamento salvo:", agendamento);
        setExibirPopupConfirmacao(false);
        setMostrarSucesso(true);
        setTimeout(() => {
            setMostrarSucesso(false);
        }, 10000);
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
    };

    return (
        <div className='container-visualizar-agendamentos-criar'>
            <div className='navbar'>
                <MenuPrincipal />
            </div>
            <div className="agendamento-container">
                {/* <MenuResponsivo /> */}
                <div className='visualizar-agendamentos-cabecalho-criar'>
                    <CabecalhoUsuarioLogado />
                </div>

                <div className='visualizar-agendamentos-cabecalho-responsivo-criar'>
                    <CabecalhoResponsivo />
                </div>

                {/* <div className="perfil">
                    <div className="avatar"></div>
                    <div className="info">
                        <p>Ianara Holanda</p>
                        <p>email@email.com</p>
                    </div>
                </div> */}

                <h1>Novo agendamento</h1>

                <div className="agendamento-form">
                    {/* <div className="input-icon campo-longo">
                    <MdTitle />
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título"
                        value={agendamento.titulo}
                        onChange={handleChange}
                    />
                </div> */}

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
                    {/* <label>Data de término</label>
                <input
                    type="date"
                    name="dataFimData"
                    value={agendamento.dataFimData}
                    onChange={handleChange}
                /> */}
                    {/* <label>Hora de término</label> */}

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
                            <div className="seletor-cor">
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

                {mostrarSucesso && (
                    <div className="popup-sucesso-container show">
                        <div className="popup-sucesso">
                            <p>Paciente foi agendado com sucesso!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CriarAgendamentos;
//Anahí me perdoa
//kkkkkkkkkk vai dar certo