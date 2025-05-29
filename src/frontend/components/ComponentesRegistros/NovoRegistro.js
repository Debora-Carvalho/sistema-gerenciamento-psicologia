import React, { useState } from 'react';
import './Registro.css';

const NovoRegistro = ({ isOpen, onClose, onSave }) => {
    const [paciente, setPaciente] = useState('');
    const [data, setData] = useState('');
    const [registro, setRegistro] = useState('');
    const [errors, setErrors] = useState({});
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        if (!paciente.trim()) {
            newErrors.paciente = 'O nome do paciente é obrigatório.';
            isValid = false;
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!data.trim()) {
            newErrors.data = 'A data é obrigatória.';
            isValid = false;
        } else if (!dateRegex.test(data)) {
            newErrors.data = 'Formato de data inválido. Use AAAA-MM-DD.';
            isValid = false;
        } else {
            const selectedDate = new Date(data);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            selectedDate.setHours(0, 0, 0, 0);

            if (selectedDate > currentDate) {
                newErrors.data = 'A data não pode ser futura.';
                isValid = false;
            }
        }

        if (!registro.trim()) {
            newErrors.registro = 'O campo de registro é obrigatório.';
            isValid = false;
        } else if (registro.trim().length < 10) {
            newErrors.registro = 'O registro deve ter pelo menos 10 caracteres.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = () => {
        if (validateForm()) {
            onSave({ paciente, data, registro });
            setPaciente('');
            setData('');
            setRegistro('');
            setErrors({});
            onClose();
            setShowSuccessNotification(true);
            
            setTimeout(() => {
                setShowSuccessNotification(false);
            }, 5000);
        }
    };

    const handleCancel = () => {
        setPaciente('');
        setData('');
        setRegistro('');
        setErrors({});
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">Novo Registro</h2>

                        <div className="form-group">
                            <label htmlFor="paciente" className="input-label"></label>
                            <input
                                type="text"
                                id="paciente"
                                className="input-field"
                                value={paciente}
                                onChange={(e) => setPaciente(e.target.value)}
                                placeholder="Nome do Paciente"
                            />
                            {errors.paciente && <p className="error-message">{errors.paciente}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="data" className="input-label"></label>
                            <input
                                type="date"
                                id="data"
                                className="input-field"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                            />
                            {errors.data && <p className="error-message">{errors.data}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="registro" className="input-label"></label>
                            <textarea
                                id="registro"
                                className="textarea-field"
                                value={registro}
                                onChange={(e) => setRegistro(e.target.value)}
                                placeholder="Detalhes do registro..."
                                rows="5"
                            ></textarea>
                            {errors.registro && <p className="error-message">{errors.registro}</p>}
                        </div>

                        <div className="button-group">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={handleCancel}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="save-button"
                                onClick={handleSave}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessNotification && (
                <div className="success-notification">
                    Registro salvo com sucesso!
                </div>
            )}
        </>
    );
};

export default NovoRegistro;