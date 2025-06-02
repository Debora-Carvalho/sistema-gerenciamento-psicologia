export default function FiltroDropdownGrafico({ onClose, onApply, filtrosAtuais, position }) {
    const toggle = (key) => {
        onApply({
            ...filtrosAtuais,
            [key]: !filtrosAtuais[key],
        });
    };

    const opcoes = {
        genero: 'Gênero',
        estadoCivil: 'Estado Civil',
        agendamentos: 'Agendamentos',
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div
                className="dropdown"
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: "absolute",
                    top: position.top,
                    left: position.left,
                    background: "#fff",
                    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    padding: "16px",
                    zIndex: 1000,
                    minWidth: "200px"
                }}
            >
                {Object.keys(opcoes).map((key) => (
                    <label key={key} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                        <input
                            type="checkbox"
                            checked={filtrosAtuais[key]}
                            onChange={() => toggle(key)}
                        />
                        {opcoes[key]}
                    </label>
                ))}

                <div style={{ marginTop: "12px", textAlign: "right" }}>
                    <button className="cancel" onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
}
