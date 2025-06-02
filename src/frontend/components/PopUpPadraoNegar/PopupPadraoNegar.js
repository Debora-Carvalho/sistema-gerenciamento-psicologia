import React from 'react';
import './PopupPadraoNegar.css';

function PopUpPadraoNegar({ aberto, titulo, mensagem, textoBotao, onBotaoClick, onCancelar }) {
    if (!aberto) return null;

    return (
        <div className="popup-overlay-padrao">
            <div className="popup-box-padrao">
                <h3>{titulo}</h3>
                <p>{mensagem}</p>
                <div className="botoes-popup-padrao-negar">
                    <button className="btn-popup-padrao-confirmar" onClick={onBotaoClick}>
                        {textoBotao}
                    </button>
                    <button id='btn-popup-padrao-btn-cancelar' onClick={onCancelar}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopUpPadraoNegar;
