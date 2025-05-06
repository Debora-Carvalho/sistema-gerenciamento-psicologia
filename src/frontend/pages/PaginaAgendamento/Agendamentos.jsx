import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi'; 
import { FiSearch } from 'react-icons/fi'; 
import '../PaginaAgendamento/Agendamentos.css';
import Menu from '../../components/Menu/Menu'; 
import CardAgendamento from '../../components/Agendamentos/CardAgendamento';
import OpcoesDropdown from '../../components/Agendamentos/OpcoesDropdown';
import TabsFiltro from '../../components/Agendamentos/TabsFiltro';

function Agendamentos() {
  const [campoPesquisaFocado, setCampoPesquisaFocado] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [usuario, setUsuario] = useState({
    username: 'Nome do Usuário',
    email: 'usuario@email.com'
  });

  const agendamentos = [
    { hora: '09:00', nome: 'Maria Aparecida Fernandes Gonzalez', periodo: '09:00 - 09:30' },
    { hora: '10:00', nome: 'Francisco de Oliveira Queiroz', periodo: '10:00 - 10:30' },
    { hora: '13:30', nome: 'Paola Braga Souza', periodo: '13:30 - 14:00' },
    { hora: '14:30', nome: 'Jessica Viana Amorim', periodo: '13:30 - 14:00' },
    { hora: '15:30', nome: 'Justino Silva Ferreira', periodo: '13:30 - 14:00' }
  ];

  return (
    <div className="pagina-container">
      <Menu />
      <div className="conteudo-principal">
        <header className="top-bar">
          <div className="container-pesquisa">
            <FiSearch className={`icone-lupa ${campoPesquisaFocado || filtro ? 'escondido' : ''}`} />
            <input
              type="text"
              className="campo-pesquisa"
              value={filtro}
              onChange={e => setFiltro(e.target.value)}
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

        <div className="conteudo">
          <header>
            <h1 className="titulo">Agendamentos</h1>
            <TabsFiltro />
          </header>

          <button className="btn-novo-agendamento">Novo agendamento</button>
          <a className="link-bloquear-agenda" href="#">Bloquear agenda</a>

          <div className="lista-agendamentos">
            {agendamentos.map((ag, index) => (
              <CardAgendamento key={index} {...ag} />
            ))}
          </div>

          <button className="btn-ver-mais">Ver mais</button>
        </div>
      </div>
    </div>
  );
}

export default Agendamentos;