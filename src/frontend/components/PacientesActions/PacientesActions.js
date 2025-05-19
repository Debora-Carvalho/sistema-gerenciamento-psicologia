import { FiFilter, FiDownload, FiUserPlus } from "react-icons/fi";
import "./PacientesActions.css";

export default function PacientesActions({
    onFilter,
    onExport,
    onAddPaciente,
}) {
    return (
        <div className="pacientes-actions-bar">
            <button className="icon-btn" onClick={onFilter} title="Filtrar">
                <FiFilter size={20} />
            </button>
            <button className="icon-btn" onClick={onExport} title="Exportar PDF">
                <FiDownload size={20} />
            </button>
            <button className="icon-btn" onClick={onAddPaciente} title="Novo paciente">
                <FiUserPlus size={20} />
            </button>
        </div>
    );
}
