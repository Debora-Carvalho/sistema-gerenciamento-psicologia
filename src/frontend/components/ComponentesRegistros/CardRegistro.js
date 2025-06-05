import "./Registro.css";
import { useState } from "react";
import DropdonwnRegistros from "./DropdownRegistros.js";

function CardRegistro({
  nomePaciente,
  descricao,
  data,
  registro,
  id_paciente,
}) {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);
  const dataObj = new Date(data);
  const horaInicio = dataObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dataAtual = dataObj.toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

  return (
    <div className="container-card-registro">
      <p className="data-registro">{dataAtual}</p>
      <p className="card-registro-paciente">{nomePaciente}</p>
      <div className="card-registro-conteudo">
        <div className="hora-registro">{horaInicio}</div>
        <p className="card-registro-descricao">{descricao}</p>

        <div className="dropdown-container">
          <button
            className="btn-opcoes"
            onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
          >
            Opções
          </button>
          {mostrarOpcoes && (
            <DropdonwnRegistros id_paciente={id_paciente} registro={registro} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CardRegistro;
