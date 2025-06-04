import { useState } from "react";
import PacienteCard from "../PacienteCard/PacienteCard";
import "./PacientesList.css";

export default function PacientesList({ pacientes, onEdit, onDelete, colunasVisiveis, onOpenDetails }) {
    const [visible, setVisible] = useState(4);
    const handleLoadMore = () => setVisible((v) => v + 4);

    return (
        <div>
            {pacientes.slice(0, visible).map((p) => (
                <PacienteCard
                    key={p.id || p._id}
                    paciente={p}
                    onEdit={() => onEdit(p._id)}
                    onDelete={() => onDelete(p)}
                    colunasVisiveis={colunasVisiveis}
                    onOpenDetails={onOpenDetails}
                />
            ))}

            {visible < pacientes.length && (
                <button className="ver-mais" onClick={handleLoadMore}>
                    Ver mais
                </button>
            )}
        </div>
    );
}
