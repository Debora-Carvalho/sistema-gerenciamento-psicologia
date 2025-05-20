import "./ConfirmDelete.css";

/* recebe o paciente só para mostrar o nome, opcional */
export default function ConfirmDelete({ onClose, onConfirm, paciente }) {
    return (
        <div className="overlay" onClick={onClose}>
            <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
                <p>
                    Remover <strong>{paciente?.nome}</strong> da lista?
                </p>

                <div className="btn-row">
                    <button className="cancel" onClick={onClose}>
                        Cancelar
                    </button>
                    <button
                        className="confirm"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
