import { useNavigate } from 'react-router-dom';
import '../Agendamentos/Componentes-agendamento.css'; 

function OpcoesDropdownConcluidos() {
  const navigate = useNavigate();

  return (
    <div className="dropdown">
      <button onClick={() => navigate("/pacientes-detalhes")}>
        Ver paciente
      </button>
      <button>
        Agendar novamente
      </button>
    </div>
  );
}

export default OpcoesDropdownConcluidos;
