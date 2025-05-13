import React, { useState, useEffect } from 'react';
import './CriarAgendamentos.css';
import { ObjectId } from 'bson';
import LinksSessao from '../../components/CriarAgendamentos/LinksSessao';
import { FaUser, FaCalendarAlt, FaClock, FaPalette, FaVideo, FaExternalLinkAlt } from 'react-icons/fa';
import { MdTitle } from 'react-icons/md';

const CriarAgendamentos = () => {
    const [agendamento, setAgendamento] = useState({
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
    const [erro, setErro] = useState('');
    const [exibirPopupConfirmacao, setExibirPopupConfirmacao] = useState(false);
    const [exibirPopupSucesso, setExibirPopupSucesso] = useState(false);
    const [mostrarSucesso, setMostrarSucesso] = useState(false);

    const plataformas = ['Google Meet', 'Teams', 'Zoom', 'Outros'];

    const handleChange = (e) => {
        setAgendamento({
            ...agendamento,
            [e.target.name]: e.target.value
        });
        setErro('');
    };

    const verificarCampos = () => {
        if (!agendamento.titulo || !agendamento.nomePaciente || !agendamento.DataInicio) {
            setErro('Por favor, preencha todos os campos obrigatórios.');
            return false;
        }
        return true;
    };

    const handleSalvar = () => {
        if (verificarCampos()) {
            setExibirPopupConfirmacao(true);
        }
    };

    const confirmarSalvar = () => {
        console.log("Agendamento salvo:", agendamento);
        // Aqui é com vcs do back kkk
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
        <div className="agendamento-container">
            <div className="perfil">
                <div className="avatar"></div>
                <div className="info">
                    <p>Ianara Holanda</p>
                    <p>email@email.com</p>
                </div>
            </div>

            <h1>Novo agendamento</h1>

            <div className="agendamento-form">
                <div className="input-icon campo-longo">
                    <MdTitle />
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título"
                        value={agendamento.titulo}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-icon campo-longo">
                    <FaUser />
                    <input
                        type="text"
                        name="nomePaciente"
                        placeholder="Paciente"
                        value={agendamento.nomePaciente}
                        onChange={handleChange}
                    />
                </div>

                <label>Data:</label>
                <div className="input-icon campo-longo">
                    <FaCalendarAlt />
                    <input
                        type="date"
                        name="DataInicio"
                        value={agendamento.DataInicio}
                        onChange={handleChange}
                    />
                </div>

                <label>Horário de Início:</label>
                <div className="input-icon campo-longo">
                    <FaClock />
                    <input type="time" name="DataInicio" onChange={handleChange} />
                </div>

                <label>Horário de Término:</label>
                <div className="input-icon campo-longo">
                    <FaClock />
                    <input type="time" name="dataFim" onChange={handleChange} />
                </div>

                <div className="input-icon campo-longo">
                    <FaExternalLinkAlt />
                    <LinksSessao
                        plataforma={agendamento.tipo}
                        linkSessao={agendamento.linkSessao}
                        onLinkChange={(link) => setAgendamento({ ...agendamento, linkSessao: link })}
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

                <div className="input-icon">
                    <FaPalette />
                    <select name="color" value={agendamento.color} onChange={handleChange}>
                        <option value="#000000">Cor</option>
                        <option value="#01429E">Azul</option>
                        <option value="#ff0000">Vermelho</option>
                        <option value="#00ff00">Verde</option>
                    </select>
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
    );
};
export default CriarAgendamentos;
//Anahí me perdoa ^^