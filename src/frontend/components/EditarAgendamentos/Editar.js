import React, { useState } from 'react';
import './Editar.css';

const Editar = () => {
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [mostrarSucesso, setMostrarSucesso] = useState(false);

    // if (!isOpen) return null;

    const confirmarEdicao = () => {
        setMostrarConfirmacao(false);
        setMostrarSucesso(true);
        setTimeout(() => {
            setMostrarSucesso(false);
            // onClose(); // fecha modal depois do sucesso
        }, 2000); // mensagem some em 2 segundos
    };

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
                    {/* <button className="cancelar" onClick={onClose}>Cancelar</button> */}
                    <button className="salvar" onClick={() => setMostrarConfirmacao(true)}>Salvar</button>
                </div>

                {mostrarConfirmacao && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <p>Deseja realmente salvar essa edição?</p>
                            <div className="popup-botoes">
                                <button className="nao" onClick={() => setMostrarConfirmacao(false)}>Não</button>
                                <button className="sim" onClick={confirmarEdicao}>Sim</button>
                            </div>
                        </div>
                    </div>
                )}

                {mostrarSucesso && (
                    <div className="sucesso">
                        Edição salva com sucesso!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Editar;