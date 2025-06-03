export default function FiltroDropdown({ onClose, onApply, filtrosAtuais }) {

    const toggle = (key) => {
        onApply({
            ...filtrosAtuais,
            [key]: !filtrosAtuais[key],
        });
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div className="dropdown" onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: "auto", display: "flex", flexDirection: 'column', padding: "10px", right: "auto" }}>
                <h3>Filtrar por</h3>
                {["nome", "data", "idade"].map((f) => (
                    <label key={f} style={{ display: "flex", gap: "10px" }}>
                        <input
                            type="checkbox"
                            checked={filtrosAtuais[f]}
                            onChange={() => toggle(f)}
                        />
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </label>
                ))}

                <div className="btn-row">
                    <button className="cancel" onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}
