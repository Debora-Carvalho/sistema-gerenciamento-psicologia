import React from 'react';
import './PopupPadrao.css';

function PopupPadrao({ aberto, titulo, mensagem, textoBotao, onBotaoClick }) {
  if (!aberto) return null;

  return (
    <div className="popup-overlay-padrao">
      <div className="popup-box-padrao">
        <h3>{titulo}</h3>
        <p>{mensagem}</p>
        <button className="btn-popup-padrao" onClick={onBotaoClick}>
          {textoBotao}
        </button>
      </div>
    </div>
  );
}

export default PopupPadrao;
