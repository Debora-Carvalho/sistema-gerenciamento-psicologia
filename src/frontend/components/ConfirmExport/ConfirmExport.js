import "./ConfirmExport.css";

export default function ConfirmExport({ onClose, onConfirm }) {
    return (
        <div className="overlay" onClick={onClose}>
            <div
                className="confirm-box"
                onClick={(e) => e.stopPropagation()}
            >
                <p>Exportar lista para PDF?</p>
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
