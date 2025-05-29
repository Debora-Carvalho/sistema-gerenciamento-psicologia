import React, { useState, useEffect } from 'react';
import './Registro.css';

const EditarRegistro = ({ isOpen, onClose, onSave, initialRecord }) => {
    const [editedRecord, setEditedRecord] = useState(initialRecord || '');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);

    useEffect(() => {
        setEditedRecord(initialRecord || '');
    }, [initialRecord]);

    if (!isOpen) return null;

    const handleSaveClick = () => {
        setShowConfirmation(true);
    };

    const handleConfirmSave = () => {
        onSave(editedRecord);
        setShowConfirmation(false);
        setShowSuccessNotification(true);

        setTimeout(() => {
            setShowSuccessNotification(false);
            onClose();
        }, 5000);
    };

    const handleCancelConfirmation = () => {
        setShowConfirmation(false);
    };

    const handleCancelEdit = () => {
        onClose();
    };

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2 className="modal-title">Editar Registro</h2>

                    <div className="form-group">
                        <label htmlFor="edited-registro" className="input-label">Registro</label>
                        <textarea
                            id="edited-registro"
                            className="textarea-field"
                            value={editedRecord}
                            onChange={(e) => setEditedRecord(e.target.value)}
                            placeholder="Edite o registro aqui..."
                            rows="10"
                        ></textarea>
                    </div>

                    <div className="button-group">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={handleCancelEdit}
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            className="save-button"
                            onClick={handleSaveClick}
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            </div>

            {showConfirmation && (
                <div className="confirmation-overlay">
                    <div className="confirmation-content">
                        <p className="confirmation-message">Deseja realmente salvar essas alterações?</p>
                        <div className="button-group confirmation-buttons">
                            <button
                                type="button"
                                className="cancel-confirmation-button"
                                onClick={handleCancelConfirmation}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="confirm-save-button"
                                onClick={handleConfirmSave}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessNotification && (
                <div className="success-notification">
                    Ação realizada com sucesso!
                </div>
            )}
        </>
    );
};

export default EditarRegistro;