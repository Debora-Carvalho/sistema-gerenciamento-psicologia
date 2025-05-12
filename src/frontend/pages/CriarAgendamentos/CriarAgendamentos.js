import React, { useState } from 'react';
import './CriarAgendamentos.css';
import { ObjectId } from 'bson';

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

    const plataformas = ['Google Meet', 'Teams', 'Zoom', 'Outros'];

    const handleChange = (e) => {
        setAgendamento({
            ...agendamento,
            [e.target.name]: e.target.value
        });
    };

    const handleSalvar = () => {
        console.log("Agendamento salvo:", agendamento);
        // salvar no back
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
                <input type="text" name="titulo" placeholder="Título" value={agendamento.titulo} onChange={handleChange} />
                <input type="text" name="nomePaciente" placeholder="Paciente" value={agendamento.nomePaciente} onChange={handleChange} />
                <label>Data:</label>
                <input type="date" name="DataInicio" value={agendamento.DataInicio} onChange={handleChange} />
                <label>Horário de Início:</label>
                <input type="time" name="DataInicio" onChange={handleChange} />
                <label>Horário de Término:</label>
                <input type="time" name="dataFim" onChange={handleChange} />
                <input type="text" name="linkSessao" placeholder="Link da sessão" value={agendamento.linkSessao} onChange={handleChange} />
                <select name="tipo" value={agendamento.tipo} onChange={handleChange}>
                    <option value="">Plataforma</option>
                    {plataformas.map((plataforma, index) => (
                        <option key={index} value={plataforma}>{plataforma}</option>
                    ))}
                </select>
                <select name="color" value={agendamento.color} onChange={handleChange}>
                    <option value="#000000">Cor</option>
                    <option value="#01429E">Azul</option>
                    <option value="#ff0000">Vermelho</option>
                    <option value="#00ff00">Verde</option>
                </select>
            </div>

            <div className="buttons">
                <button className="cancelar" onClick={handleCancelar}>Cancelar</button>
                <button className="salvar" onClick={handleSalvar}>Salvar</button>
            </div>
        </div>
    );
};

export default CriarAgendamentos;