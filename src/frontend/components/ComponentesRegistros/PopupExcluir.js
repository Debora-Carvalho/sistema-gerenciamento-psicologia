import React, { useState } from 'react';
import './Registro.css';

/* @param {object} props - As propriedades do componente.
 * @param {boolean} props.isOpen - Booleano para controlar a visibilidade do popup principal.
 * @param {function} props.onClose - Função de callback para fechar o popup principal.
 * @param {function} props.onConfirm - Função de callback a ser chamada quando a exclusão é confirmada.
 */

const PopupExcluir = ({ isOpen, onClose, onConfirm }) => {
    const [showDeletedPopup, setShowDeletedPopup] = useState(false);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);

    const handleConfirmExclusion = () => {
        onConfirm();
        setShowDeletedPopup(true);
    };

    const handleGoBack = () => {
        onClose();
        setShowDeletedPopup(false);
        setShowSuccessNotification(false);
    };

    const handleUnderstood = () => {
        setShowDeletedPopup(false);
        setShowSuccessNotification(true);
        onClose();

        setTimeout(() => {
            setShowSuccessNotification(false);
        }, 5000);
    };

    return (
        <>
            {isOpen && !showDeletedPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2 className="popup-title">Excluir este Registro?</h2>
                        <p className="popup-message">Esta ação não poderá ser revertida.</p>

                        <div className="button-group popup-buttons">
                            <button
                                type="button"
                                className="popup-back-button"
                                onClick={handleGoBack}
                            >
                                Voltar
                            </button>
                            <button
                                type="button"
                                className="popup-delete-button"
                                onClick={handleConfirmExclusion}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isOpen && showDeletedPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2 className="popup-title">Registro excluído</h2>
                        <p className="popup-message">Apenas esse registro do paciente foi excluído.</p>
                        <div className="button-group single-button-group">
                            <button
                                type="button"
                                className="popup-understood-button"
                                onClick={handleUnderstood}
                            >
                                Ok, entendi.
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessNotification && (
                <div className="success-notification">
                    Exclusão realizada com sucesso!
                </div>
            )}
        </>
    );
};

export default PopupExcluir;