import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "../PaginaAgendamentosConcluidos/PaginaAgendamentosConcluidos.css";
import TabsFiltro from "../../components/Agendamentos/TabsFiltro";
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal.js';
import CardAgendamentosConcluidos from "../../components/AgendamentosConcluidos/CardAgendamentosConcluidos";

function AgendamentosConcluidos() {
  const [campoPesquisaFocado, setCampoPesquisaFocado] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [usuario, setUsuario] = useState({
    username: "Nome do Usuário",
    email: "usuario@email.com",
  });

  const agendamentos = [
    { hora: "09:00", nome: "Maria Aparecida Fernandes Gonzalez", periodo: "09:00 - 09:30", data: "2025-04-28", link: "Link da sessão"},
    { hora: "10:00", nome: "Francisco de Oliveira Queiroz", periodo: "10:00 - 10:30", data: "2025-04-28", link: "Link da sessão"},
    { hora: "13:30", nome: "Paola Braga Souza", periodo: "13:30 - 14:00", data: "2025-04-28" , link: "Link da sessão"},
    { hora: "14:30", nome: "Jessica Viana Amorim", periodo: "13:30 - 14:00", data: "2025-05-02", link: "Link da sessão" },
    { hora: "15:30", nome: "Justino Silva Ferreira", periodo: "13:30 - 14:00", data: "2025-05-02", link: "Link da sessão" },
  ];


  const agendamentosPorData = agendamentos.reduce((acc, agendamento) => {
    const { data } = agendamento;
    if (!acc[data]) acc[data] = [];
    acc[data].push(agendamento);
    return acc;
  }, {});


  const datasOrdenadas = Object.keys(agendamentosPorData).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <div className="pagina-container">
      <MenuPrincipal />
      <div className="conteudo-principal">
        <header className="top-bar">
          <div className="container-pesquisa">
            <FiSearch className={`icone-lupa ${campoPesquisaFocado || filtro ? "escondido" : ""}`} />
            <input
              type="text"
              className="campo-pesquisa"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              onFocus={() => setCampoPesquisaFocado(true)}
              onBlur={() => setCampoPesquisaFocado(false)}
            />
            {!campoPesquisaFocado && !filtro && (
              <span className="texto-pesquisa">Pesquisar paciente</span>
            )}
          </div>
          <div className="usuario-info">
            <div className="avatar" />
            {usuario ? (
              <div className="info-texto">
                <strong>{usuario.username}</strong>
                <span>{usuario.email}</span>
              </div>
            ) : (
              <div className="info-texto">
                <strong>Carregando...</strong>
              </div>
            )}
          </div>
        </header>

        <div className="conteudo-concluidos">
          <div className="cabecalho-concluidos"> 
          <header className="conteudo-filtros">
            <h1 className="titulo">Agendamentos</h1>
            <TabsFiltro />
          </header>
          <div className="btn-funcoes"> 
          <button className="btn-novo-agendamento">Novo agendamento</button>
          <a className="link-bloquear-agenda" href="#">Bloquear agenda</a>
          </div>
        </div>
          {datasOrdenadas.map((data) => (
            <div key={data}>
              <div className="data-agendamento">
                <strong>{new Date(data).toLocaleDateString()}</strong>
              </div>
              <div className="lista-agendamentos">
                {agendamentosPorData[data].map((agendamento, index) => (
                  <CardAgendamentosConcluidos key={index} {...agendamento} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="btn-ver-mais">Ver mais</button>
      </div>
    </div>
  );
}

export default AgendamentosConcluidos;
