import { FiEdit, FiTrash2 } from "react-icons/fi";
import "./PacienteCard.css";
export default function PacienteCard({ paciente, onEdit, onDelete, colunasVisiveis, onOpenDetails }) {
    return (
        <div
            className="paciente-card"
            onClick={() => onOpenDetails(paciente._id)}
            style={{ cursor: "pointer" }}
        >
            <div className="paciente-info">
                {colunasVisiveis?.nome && (
                    <p><span>Nome</span>{paciente.nome}</p>
                )}
                {colunasVisiveis?.data && (
                    <p><span>Data da sessão</span>{paciente.dataSessao}</p>
                )}
                {colunasVisiveis?.idade && (
                    <p><span>Idade</span>{paciente.idade} anos</p>
                )}
            </div>
            <div className="paciente-actions">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(paciente._id);
                    }}
                    className="icon-btn"
                >
                    <FiEdit size={22} />
                    <span>Editar</span>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(paciente);
                    }}
                    className="icon-btn delete"
                >
                    <FiTrash2 size={22} />
                    <span>Excluir</span>
                </button>
            </div>
        </div>
    );
}

