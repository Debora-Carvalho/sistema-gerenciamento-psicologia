import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./PaginaVisualizarRegistros.css";
import "../../pages/VisualizarAgendamentos/VisualizarAgendamentos.css";
import useDocumentTitle from "../../components/useDocumentTitle";
import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal.js";
import CabecalhoUsuarioLogado from "../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js";
import CabecalhoResponsivo from "../../components/CabecalhoResponsivo/CabecalhoResponsivo.js";
import FuncoesRegistro from "../../components/ComponentesRegistros/FuncoesRegistro.js";
import CardRegistro from "../../components/ComponentesRegistros/CardRegistro.js";

function VisualizarRegistros() {
  useDocumentTitle("Registros | Seren");

  const location = useLocation();
  const filtroInicial = location.state?.filtro || "hoje";

  const [limiteCards, setLimiteCards] = useState(3);
  const [nomePacienteBusca, setNomePacienteBusca] = useState("");
  const [filtro, setFiltro] = useState(filtroInicial);

  // Estado com registros, agora usando "descricao" no lugar de "registro"
  const [registros, setRegistros] = useState([
    { data: "2025-06-05T08:30:00", nomePaciente: "Ana", descricao: "Consulta de rotina." },
    { data: "2025-06-03T14:00:00", nomePaciente: "Carlos", descricao: "Exame de sangue." },
  ]);

  // Função para adicionar novo registro
  const adicionarRegistro = (novoRegistro) => {
    setRegistros([...registros, novoRegistro]);
  };

  // Função para filtrar registros pela data conforme filtro
  const filtrarRegistros = (registros, filtro) => {
    const hoje = new Date();

    return registros.filter((registro) => {
      const data = new Date(registro.data);

      if (filtro === "hoje") {
        return (
          data.getDate() === hoje.getDate() &&
          data.getMonth() === hoje.getMonth() &&
          data.getFullYear() === hoje.getFullYear()
        );
      }

      if (filtro === "semana") {
        const diaSemana = hoje.getDay(); // 0 (domingo) até 6 (sábado)
        const inicioSemana = new Date(hoje);
        inicioSemana.setDate(hoje.getDate() - diaSemana);
        const fimSemana = new Date(inicioSemana);
        fimSemana.setDate(inicioSemana.getDate() + 6);

        inicioSemana.setHours(0, 0, 0, 0);
        fimSemana.setHours(23, 59, 59, 999);
        data.setHours(0, 0, 0, 0);

        return data >= inicioSemana && data <= fimSemana;
      }

      if (filtro === "mes") {
        return (
          data.getMonth() === hoje.getMonth() &&
          data.getFullYear() === hoje.getFullYear()
        );
      }

      return true;
    });
  };

  return (
    <div className="container-visualizar-agendamentos">
      <div className="navbar">
        <MenuPrincipal />
      </div>

      <div className="container-conteudo-visualizar-agendamentos">
        <div className="visualizar-agendamentos-cabecalho">
          <CabecalhoUsuarioLogado
            nomePacienteBusca={nomePacienteBusca}
            setNomePacienteBusca={setNomePacienteBusca}
            exibirPesquisa={true}
          />
        </div>

        <div className="visualizar-agendamentos-cabecalho-responsivo">
          <CabecalhoResponsivo
            nomePacienteBusca={nomePacienteBusca}
            setNomePacienteBusca={setNomePacienteBusca}
            exibirPesquisa={true}
          />
        </div>

        <div className="funcoes-registros">
          <FuncoesRegistro
            filtro={filtro}
            setFiltro={setFiltro}
            adicionarRegistro={adicionarRegistro}  
          />
        </div>

        <div className="card-registros">
          {filtrarRegistros(registros, filtro)
            .slice(0, limiteCards)
            .map(({ nomePaciente, descricao, data }, index) => (
              <CardRegistro
                key={index}
                nomePaciente={nomePaciente}
                descricao={descricao}
                data={data}
              />
            ))}
        </div>

        <button
          className="btn-ver-mais"
          onClick={() => setLimiteCards(limiteCards + 5)}
        >
          Ver mais
        </button>
      </div>
    </div>
  );
}

export default VisualizarRegistros;
