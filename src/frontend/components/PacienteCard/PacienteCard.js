import { FiEdit, FiTrash2 } from "react-icons/fi";
import "./PacienteCard.css";

export default function PacienteCard({ paciente, onEdit, onDelete }) {
    return (
        <div className="paciente-card">
            <div className="paciente-info">
                <p><span>Nome</span>{paciente.nome}</p>
                <p><span>Data da sessão</span>{paciente.dataSessao}</p>
                <p><span>Idade</span>{paciente.idade} anos</p>
            </div>
            <div className="paciente-actions">
                <button onClick={() => onEdit(paciente)} className="icon-btn">
                    <FiEdit size={22} />
                    <span>Editar</span>
                </button>
                <button onClick={() => onDelete(paciente)} className="icon-btn delete">
                    <FiTrash2 size={22} />
                    <span>Excluir</span>
                </button>
            </div>
        </div>
    );
}