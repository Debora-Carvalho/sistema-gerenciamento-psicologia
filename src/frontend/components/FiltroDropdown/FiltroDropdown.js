import { useState } from "react";
import "./FiltroDropdown.css";

export default function FiltroDropdown({ onClose, onApply }) {
    const [checks, setChecks] = useState({
        nome: true,
        data: false,
        idade: false,
    });

    const toggle = (key) =>
        setChecks((c) => ({ ...c, [key]: !c[key] }));

    return (
        <div className="overlay" onClick={onClose}>
            <div
                className="dropdown"
                onClick={(e) => e.stopPropagation()}
            >
                <h3>Filtrar por</h3>
                {["nome", "data", "idade"].map((f) => (
                    <label key={f}>
                        <input
                            type="checkbox"
                            checked={checks[f]}
                            onChange={() => toggle(f)}
                        />
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </label>
                ))}

                <div className="btn-row">
                    <button
                        className="cancel"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="confirm"
                        onClick={() => {
                            onApply(checks);
                            onClose();
                        }}
                    >
                        Aplicar
                    </button>
                </div>
            </div>
        </div>
    );
}
