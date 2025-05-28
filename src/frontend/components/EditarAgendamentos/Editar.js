import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ObjectId } from 'bson';
import useAlterarAgendamento from '../../hooks/agendamentos/useAlterarAgendamentos.js';
import usePacientes from '../../hooks/pacientes/usePacientesListar.js';
import { FaUser, FaCalendarAlt, FaClock, FaExternalLinkAlt, FaVideo, FaPalette } from 'react-icons/fa';
import { MdTitle } from 'react-icons/md';
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal.js';
import CabecalhoUsuarioLogado from '../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js';
import CabecalhoResponsivo from '../../components/CabecalhoResponsivo/CabecalhoResponsivo.js';

const Editar = () => {
    const { alterarAgendamento } = useAlterarAgendamento();
    const navigate = useNavigate();
    const location = useLocation();
    const { agendamento, modo } = location.state || {};
    const modoAtual = modo || "editar";
    const [exibirPopupConfirmacao, setExibirPopupConfirmacao] = useState(false);
    const [mostrarSeletorCor, setMostrarSeletorCor] = useState(false);
    const { pacientes } = usePacientes();

    const plataformas = ['Google Meet', 'Teams', 'Zoom', 'Outros'];
    const coresPadrao = ['#000000', '#01429E', '#ff0000', '#00ff00', '#FFA500', '#800080', '#FFC0CB', '#A52A2A'];

    const [formData, setFormData] = useState({
        id: agendamento?.id || new ObjectId().toString(),
        id_usuario: agendamento?.id_usuario || '',
        id_paciente: agendamento?.id_paciente || '',
        titulo: agendamento?.titulo || '',
        dataInicioData: agendamento?.dataInicioData || '',
        dataInicioHora: agendamento?.dataInicioHora || '',
        dataFimHora: agendamento?.dataFimHora || '',
        desc: agendamento?.desc || '',
        color: agendamento?.color || '#000000',
        tipo: agendamento?.tipo || '',
        linkSessao: agendamento?.linkSessao || '',
        nomePaciente: agendamento?.nomePaciente || ''
    });

    const converterISOParaDataHora = (isoString) => {
        const data = new Date(isoString);
        const dataFormatada = data.toISOString().split('T')[0]; // YYYY-MM-DD
        const horaFormatada = data.toTimeString().slice(0, 5);   // HH:MM
        return { data: dataFormatada, hora: horaFormatada };
    };

    const [erro, setErro] = useState('');
    const [mostrarSucesso, setMostrarSucesso] = useState(false);

    useEffect(() => {
        if (agendamento) {
            const { data: dataInicioData, hora: dataInicioHora } = converterISOParaDataHora(agendamento.dataInicio);
            const { hora: dataFimHora } = converterISOParaDataHora(agendamento.dataFim);

            setFormData({
                id: agendamento._id?.$oid,
                id_usuario: agendamento.id_usuario?.$oid,
                id_paciente: agendamento.id_paciente?.$oid,
                titulo: agendamento.titulo,
                dataInicioData,
                dataInicioHora,
                dataFimHora,
                desc: agendamento.desc,
                color: agendamento.color,
                tipo: agendamento.tipo,
                linkSessao: agendamento.linkSessao,
                nomePaciente: agendamento.nomePaciente
            });
        }
    }, [agendamento]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleCancelar = () => {
        setFormData({
            id: '',
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
    };

    const selecionarCor = (cor) => {
        setFormData(prevState => ({
            ...prevState,
            color: cor
        }));
    };

    const handleSalvar = () => {
        setExibirPopupConfirmacao(true);
    };


    const confirmarSalvar = async () => {
        const DataInicio = new Date(`${formData.dataInicioData}T${formData.dataInicioHora}:00`).toISOString();
        const DataFim = new Date(`${formData.dataInicioData}T${formData.dataFimHora}:00`).toISOString();

        const agendamentoID = localStorage.getItem("agendamentoID");
        //   console.log(agendamentoID)

        const novosDados = {
            id_usuario: formData.id_usuario,
            id_paciente: formData.id_paciente,
            titulo: formData.titulo,
            dataInicio: DataInicio,
            dataFim: DataFim,
            desc: formData.desc,
            color: formData.color,
            tipo: formData.tipo,
            linkSessao: formData.linkSessao,
            nomePaciente: formData.nomePaciente,
            statusAgendamento: 'Em andamento'
        };
        //   console.log(novosDados)
        try {
            await alterarAgendamento(agendamentoID, novosDados, () => {
                setMostrarSucesso(true);
                setExibirPopupConfirmacao(false);
                setTimeout(() => {
                    setMostrarSucesso(false);
                    navigate("/visualizar-agendamentos");
                }, 1000);
            });
        } catch (error) {
            console.error('Erro ao alterar agendamento:', error);
            setErro('Erro inesperado ao tentar atualizar.');
        }
    };


    const cancelarSalvar = () => {
        setExibirPopupConfirmacao(false);
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

                <h1>{modo === "reagendar" ? "Agendar novamente" : "Editar agendamento"}</h1>


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
                            value={formData.nomePaciente}
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
                            value={formData.dataInicioData || ''}
                            onChange={handleChange}
                        />
                    </div>

                    {/* <label>Hora de início</label> */}
                    <div className="input-icon campo-longo">
                        <FaClock />
                        <input
                            type="time"
                            name="dataInicioHora"
                            value={formData.dataInicioHora || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-icon campo-longo">
                        <FaClock />
                        <input
                            type="time"
                            name="dataFimHora"
                            value={formData.dataFimHora || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-icon campo-longo">
                        <FaExternalLinkAlt />
                        <input
                            type="text"
                            name="linkSessao"
                            placeholder="Link da sessão"
                            value={formData.linkSessao}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-icon">
                        <FaVideo />
                        <select name="tipo" value={formData.tipo} onChange={handleChange}>
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
                            style={{ backgroundColor: formData.color }}
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
                    <button className="salvar" onClick={handleSalvar}>
                        {modo === "reagendar" ? "Agendar novamente" : "Salvar"}
                    </button>
                </div>

                {exibirPopupConfirmacao && (
                    <div className="popup-overlay">
                        <div className="popup-confirmacao">
                            <p>
                                {modo === "reagendar"
                                    ? "Deseja realmente reagendar novamente este agendamento?"
                                    : "Deseja realmente editar este agendamento?"}
                            </p>

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
                            <p>{modo === "reagendar"
                                ? "Paciente foi reagendado com sucesso!"
                                : "Paciente foi editado com sucesso!"}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Editar;