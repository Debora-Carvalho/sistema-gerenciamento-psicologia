import React from 'react';
import './Editar.css';

const Editar = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Editar agendamento</h2>
                <div className="formulario">
                    <input type="text" placeholder="Título" />
                    <input type="text" placeholder="Paciente" />
                    <input type="date" placeholder="Data" />
                    <input type="text" placeholder="Link da sessão" />
                    <input type="time" placeholder="Horário de início" />
                    <input type="time" placeholder="Horário de término" />
                    <select>
                        <option>Plataforma</option>
                        <option>Zoom</option>
                        <option>Google Meet</option>
                    </select>
                    <select>
                        <option>Cores</option>
                        <option>Azul</option>
                        <option>Verde</option>
                    </select>
                </div>
                <div className="botoes">
                    <button className="cancelar" onClick={onClose}>Cancelar</button>
                    <button className="salvar">Salvar</button>
                </div>
            </div>
        </div>
    );
};

export default Editar;
