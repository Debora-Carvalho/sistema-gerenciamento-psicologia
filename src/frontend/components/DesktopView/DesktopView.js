import React from 'react';
import { RiSearchLine } from "react-icons/ri";
import {FiFilter, FiEdit, FiTrash } from 'react-icons/fi';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import { AiOutlineUserAdd } from 'react-icons/ai';
import FotoPerfil from '../../features/PaginaPerfil/FotoPerfil';
import TelaDeCarregamento from '../CarregamentoTela/TelaDeCarregamento';
import useUsuarios from '../../hooks/useUsuarios';


export function DesktopView({
    filtro,
    setFiltro,
    campoPesquisaFocado,
    setCampoPesquisaFocado,
    userID,
    usuario,
    mostrarFiltrosVisuais,
    setMostrarFiltrosVisuais,
    colunasVisiveis,
    alternarColuna,
    handleExportarPdfClick,
    pacientes,
    handleAbrirDetalhesPaciente,
    abrirPopupEdicao,
    confirmarExclusao,
    setMostrarFormulario,
    setNovoPaciente,
    setEditandoIndex,
    setErroCadastro,
    calcularIdade,
    datasPorPaciente
}) {
    // const { usuario } = useUsuarios();
    if (!usuario) {
        return <TelaDeCarregamento mensagem="Carregando cabeçalho..." />;
    }
    return (
        <>
            <header className="top-bar">
                <div className='container-cabecalho-usuario-logado'>
                <div className="container-barra-pesquisa-usuario-logado">
                    <RiSearchLine className="icon-lupa" alt="Ícone de lupa" />
                    <input
                        type="text"
                        className="campo-pesquisa"
                        value={filtro}
                        placeholder="Pesquisar paciente"
                        onChange={e => setFiltro(e.target.value)}
                        onFocus={() => setCampoPesquisaFocado(true)}
                        onBlur={() => setCampoPesquisaFocado(false)}
                    />
                </div>
                <div className='container-perfil'>
                    <div className='foto-perfil'>
                        <FotoPerfil userId={usuario._id} />
                    </div>
                    <div className='infos-usuario'>
                        <p className="nome-usuario">{usuario.username?.split(' ')[0]}</p>
                        <p>{usuario.email}</p>
                    </div>
                </div>
                </div>
            </header>
            <div className="titulo-acoes-container">
                <h2 className="titulo-pacientes">Pacientes</h2>
                <div className="botoes-desktop">
                    <div className="container-filtro">
                        <button
                            className={`btn filtro cinza ${mostrarFiltrosVisuais ? 'ativo' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setMostrarFiltrosVisuais(!mostrarFiltrosVisuais);
                            }}
                        >
                            <FiFilter /> Filtros
                        </button>
                        {mostrarFiltrosVisuais && (
                            <div className="filtros-colunas" onClick={(e) => e.stopPropagation()}>
                                <label><input type="checkbox" checked={colunasVisiveis.nome} onChange={() => alternarColuna('nome')} /> Nome</label>
                                <label><input type="checkbox" checked={colunasVisiveis.data} onChange={() => alternarColuna('data')} /> Data da sessão</label>
                                <label><input type="checkbox" checked={colunasVisiveis.idade} onChange={() => alternarColuna('idade')} /> Idade</label>
                            </div>
                        )}
                    </div>
                    <button onClick={handleExportarPdfClick} className="btn-pdf">
                        <BsFileEarmarkPdf /> Exportar PDF
                    </button>
                    <button className="btn adicionar cinza" onClick={() => {
                        setNovoPaciente({
                            nome: '',
                            profissao: '',
                            genero: '',
                            estadoCivil: '',
                            telefone: '',
                            email: '',
                            preferenciaContato: '',
                            dataNascimento: ''
                        });
                        setEditandoIndex(null);
                        setMostrarFormulario(true);
                        setErroCadastro('');
                    }}>
                        <AiOutlineUserAdd /> Adicionar paciente
                    </button>
                </div>
            </div>
            <div className="lista-pacientes">
                <table className="tabela-pacientes">
                    <thead>
                        <tr>
                            {colunasVisiveis.nome && <th>Nome</th>}
                            {colunasVisiveis.data && <th>Data da sessão</th>}
                            {colunasVisiveis.idade && <th>Idade</th>}
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.length > 0 ? (
                            pacientes.map((paciente) => (
                                <tr key={paciente._id} onClick={() => handleAbrirDetalhesPaciente(paciente._id)}>
                                    {colunasVisiveis.nome && <td>{paciente.nome || 'N/A'}</td>}
                                    {colunasVisiveis.data && (
                                        <td>
                                            {datasPorPaciente[paciente._id]
                                                ? new Date(datasPorPaciente[paciente._id]).toLocaleDateString('pt-BR')
                                                : 'N/A'}
                                        </td>
                                    )}
                                    {colunasVisiveis.idade && <td>{paciente.dataNascimento ? calcularIdade(paciente.dataNascimento) : 'N/A'}</td>}
                                    <td className="acoes-td" onClick={(e) => e.stopPropagation()}>
                                        <button onClick={() => abrirPopupEdicao(paciente._id)} className="btn-acao-tabela-editar">
                                            <FiEdit /> Editar
                                        </button>
                                        <button onClick={() => confirmarExclusao(paciente._id)} className="btn-acao-tabela-excluir">
                                            <FiTrash /> Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={Object.values(colunasVisiveis).filter(Boolean).length + 1}>
                                    Nenhum paciente encontrado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
