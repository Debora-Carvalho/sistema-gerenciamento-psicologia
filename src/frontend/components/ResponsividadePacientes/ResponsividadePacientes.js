import React from "react";
import "./ResponsividadePacientes.css";
import { FaTrashAlt, FaEdit, FaFilter, FaUsers, FaUserAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const ResponsividadePacientes = ({ pacientes, onEditar, onExcluir, onFiltrar }) => {
    return (
        <div className="pagina-container">
            <main className="conteudo-principal">
                <div className="cabecalho">
                    <div className="input-pesquisa">
                        <FiSearch className="icone-pesquisa" />
                        <input type="text" placeholder="Pesquisar paciente" />
                    </div>
                    <div className="usuario-info">
                        <div className="foto-usuario"></div>
                        <div>
                            <strong>Ianara Holanda</strong>
                            <p>email@email.com</p>
                        </div>
                    </div>
                </div>

                <div className="titulo-area">
                    <h2>Pacientes</h2>
                    <div className="icones-filtros">
                        <button onClick={() => onFiltrar("um")}><FaFilter /></button>
                        <button onClick={() => onFiltrar("individual")}><FaUserAlt /></button>
                        <button onClick={() => onFiltrar("grupo")}><FaUsers /></button>
                    </div>
                </div>

                <div className="lista-pacientes">
                    {(pacientes || []).map((paciente, i) => (
                        <div key={i} className="paciente-card">
                            <div className="info-paciente">
                                <p><strong>Nome</strong> {paciente.nome}</p>
                                <p><strong>Data da sessão</strong> {paciente.dataSessao}</p>
                                <p><strong>Idade</strong> {paciente.idade} anos</p>
                            </div>
                            <div className="acoes-paciente">
                                <button className="editar" onClick={() => onEditar(paciente)}><FaEdit /> Editar</button>
                                <button className="excluir" onClick={() => onExcluir(paciente)}><FaTrashAlt /> Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="ver-mais-container">
                    <button className="ver-mais">Ver mais</button>
                </div>
            </main>
        </div>
    );
};

export default ResponsividadePacientes;


/**/