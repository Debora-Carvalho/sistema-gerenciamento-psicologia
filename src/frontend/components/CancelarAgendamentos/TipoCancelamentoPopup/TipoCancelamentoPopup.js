import React, { useState } from 'react';
import './TipoCancelamentoPopup.css';
import PopupPadrao from '../../PopupPadrao/PopupPadrao.js'; // ajuste o caminho se necessário

function TipoCancelamentoPopup({ aberto, onBotaoClick }) {
    const [tipoSelecionado, setTipoSelecionado] = useState('');
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [popupFinal, setPopupFinal] = useState(false);

    if (!aberto) return null;

    const handleContinuar = () => {
        if (tipoSelecionado) {
            setMostrarConfirmacao(true);
        }
    };

    const handleConfirmarAcao = () => {
        setMostrarConfirmacao(false);
        setPopupFinal(true);
    };

    const fecharTudo = () => {
        setTipoSelecionado('');
        setMostrarConfirmacao(false);
        setPopupFinal(false);
        onBotaoClick(); // Fecha o popup original
    };

    return (
        <div className="tipo-cancelamento-popup-overlay-padrao">
            <div className="tipo-cancelamento-popup-box-padrao">
                {!mostrarConfirmacao && !popupFinal && (
                    <div className='tipo-cancelamento-popup-principal'>
                        <h3>Que tipo de cancelamento deseja realizar?</h3>

                        <div className="grupo-radio-cancelamento">
                            <label className={`radio-label ${tipoSelecionado === 'um' ? 'selecionado' : ''}`}>
                                <input
                                    className="grupo-radio-cancelamento__input"
                                    type="radio"
                                    name="tipoCancelamento"
                                    value="um"
                                    checked={tipoSelecionado === 'um'}
                                    onChange={() => setTipoSelecionado('um')}
                                />
                                Cancelar este agendamento
                            </label>

                            <label className={`radio-label ${tipoSelecionado === 'todos' ? 'selecionado' : ''}`}>
                                <input
                                    className="grupo-radio-cancelamento__input"
                                    type="radio"
                                    name="tipoCancelamento"
                                    value="todos"
                                    checked={tipoSelecionado === 'todos'}
                                    onChange={() => setTipoSelecionado('todos')}
                                />
                                Cancelar este e todos os demais agendamentos deste paciente
                            </label>
                        </div>

                        <div className="container-tipo-cancelamento__botoes">
                            <button className="btn-cancelamento-voltar" onClick={onBotaoClick}>
                                Voltar
                            </button>

                            <button
                                className="btn-cancelamento-continuar"
                                onClick={handleContinuar}
                                disabled={!tipoSelecionado}
                            >
                                Continuar o cancelamento
                            </button>
                        </div>
                    </div>
                )}

                {mostrarConfirmacao && tipoSelecionado === 'um' && (
                    <div className="container-popup-confirmacao">
                        <h3>Cancelar este agendamento?</h3>
                        <p>Esta ação excluirá apenas este agendamento.</p>
                        <div className="container-tipo-cancelamento__botoes">
                            <button className="btn-cancelamento-voltar" onClick={() => setMostrarConfirmacao(false)}>
                                Não, quero voltar
                            </button>
                            <button className="btn-cancelamento-continuar" onClick={handleConfirmarAcao}>
                                Sim
                            </button>
                        </div>
                    </div>
                )}

                {mostrarConfirmacao && tipoSelecionado === 'todos' && (
                    <div className="container-popup-confirmacao">
                        <h3>Cancelar este e demais agendamentos?</h3>
                        <p>Essa ação apagará todos os agendamentos desse paciente e não poderá ser revertida.</p>
                        <div className="container-tipo-cancelamento__botoes">
                            <button className="btn-cancelamento-voltar" onClick={() => setMostrarConfirmacao(false)}>
                                Não, quero voltar
                            </button>
                            <button className="btn-cancelamento-continuar" onClick={handleConfirmarAcao}>
                                Cancelar todos
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {popupFinal && (
                <PopupPadrao
                    aberto={popupFinal}
                    titulo="Cancelamento realizado"
                    mensagem={
                        tipoSelecionado === 'um'
                            ? 'O agendamento foi cancelado com sucesso.'
                            : 'Todos os agendamentos deste paciente foram cancelados.'
                    }
                    textoBotao="Ok, entendi!"
                    onBotaoClick={fecharTudo}
                />
            )}
        </div>
    );
}

export default TipoCancelamentoPopup;
