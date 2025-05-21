import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "../PaginaAgendamentosConcluidos/PaginaAgendamentosConcluidos.css";
import TabsFiltro from "../../components/Agendamentos/TabsFiltro";
import MenuPrincipal from '../../components/MenuPrincipal/MenuPrincipal.js';
import CardAgendamentosConcluidos from "../../components/AgendamentosConcluidos/CardAgendamentosConcluidos";
import useMapearAgendamentos from '../../features/PaginaAgendamentos/useMapearAgendamentos';

function AgendamentosConcluidos() {
  const [campoPesquisaFocado, setCampoPesquisaFocado] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [usuario, setUsuario] = useState({
    username: "Nome do Usuário",
    email: "usuario@email.com",
  });
  const agendamentos = useMapearAgendamentos();
  const agendamentosConcluidos = agendamentos.filter(
    (agendamento) => agendamento.statusAgendamento === "Concluído"
  );



  // const agendamentosPorData = agendamentos.reduce((acc, agendamento) => {
  //   const { data } = agendamento;
  //   if (!acc[data]) acc[data] = [];
  //   acc[data].push(agendamento);
  //   return acc;
  // }, {});


  // const datasOrdenadas = Object.keys(agendamentosPorData).sort(
  //   (a, b) => new Date(b) - new Date(a)
  // );

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
        <div className="conteudo-info-agendamento"> 
          {/* {datasOrdenadas.map((data) => (
            <div key={data}> */}
              {/* <div className="data-agendamento">
                <strong>{new Date(data).toLocaleDateString()}</strong>
              </div> */}
              <div className="lista-agendamentos">
                {/* {agendamentosConcluidos.map((agendamento, index) => (
                  <CardAgendamentosConcluidos key={index} {...agendamento} />
                ))} */}
                <div className='data-agendamento'>
                {agendamentosConcluidos.map((agendamento) => (
                <CardAgendamentosConcluidos
                key={agendamento._id}
                id={agendamento._id}
                dataInicio={agendamento.dataInicio}
                dataFim={agendamento.dataFim}
                nomePaciente={agendamento.nomePaciente}
                linkSessao={agendamento.linkSessao}
              />
            ))}
              </div>
            </div>
          {/* ))} */}
          </div>
        </div>
        <button className="btn-ver-mais">Ver mais</button>
      </div>
    // </div>
  );
}

export default AgendamentosConcluidos;
