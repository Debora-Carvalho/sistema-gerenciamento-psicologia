import React from "react";
import "./ResponsividadePacientes.css";
import { FaTrashAlt, FaEdit, FaFilter, FaUsers, FaUserAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const ResponsividadePacientes = () => {
    return (
        <div className="pagina-container">
            <aside className="menu-lateral">
                <div className="icone-menu">
                    <div className="hamburguer"></div>
                    <div className="hamburguer"></div>
                    <div className="hamburguer"></div>
                </div>
            </aside>

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
                        <button><FaFilter /></button>
                        <button><FaUserAlt /></button>
                        <button><FaUsers /></button>
                    </div>
                </div>

                <div className="lista-pacientes">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="paciente-card">
                            <div className="info-paciente">
                                <p><strong>Nome</strong> Andreia Oliveira Justina</p>
                                <p><strong>Data da sessão</strong> 27/09/2025</p>
                                <p><strong>Idade</strong> 42 anos</p>
                            </div>
                            <div className="acoes-paciente">
                                <button className="editar"><FaEdit /> Editar</button>
                                <button className="excluir"><FaTrashAlt /> Excluir</button>
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