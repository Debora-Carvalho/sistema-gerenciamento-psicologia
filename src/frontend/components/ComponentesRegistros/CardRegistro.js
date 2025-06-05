import React from "react";
import "./Registro.css";

function CardRegistro({ nomePaciente, descricao, data }) {
  const dataObj = new Date(data);
  const horaInicio = dataObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="container-card-registro">
      <p className="card-registro-paciente">{nomePaciente}</p>
      <div className="card-registro-conteudo">
        <div className="hora-registro">{horaInicio}</div>
        <p className="card-registro-descricao">{descricao}</p>
      </div>
    </div>
  );
}

export default CardRegistro;
