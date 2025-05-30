import React, { useState, useEffect } from "react";
import "../../pages/PaginaPacientesDetalhes/PaginaPacientesDetalhes.css";
import "../PaginaPacientes/PaginaPacientes.css";
import useDocumentTitle from "../../components/useDocumentTitle";
import MenuPrincipal from "../../components/MenuPrincipal/MenuPrincipal.js";
import CabecalhoResponsivo from "../../components/CabecalhoResponsivo/CabecalhoResponsivo.js";
import CabecalhoUsuarioLogado from "../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js";
import ChecklistPagamentos from "../../components/ChecklistPagamentos/ChecklistPagamentos.js";
import useUsuarios from "../../hooks/useUsuarios";
import { PiNotePencilBold } from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { LuActivity } from "react-icons/lu";
import usePacienteDetalhes from "../../hooks/pacientes/usePacienteDetalhes.js";
import { atualizarPaciente } from "../../hooks/pacientes/UsePacienteAtualizar";
import { excluirPaciente } from "../../hooks/pacientes/usePacienteExcluir";
import calcularIdade from "../../hooks/pacientes/utilCalcularIdade";
import { BsClipboardPulse } from "react-icons/bs";
import RegistrosPacientesDetalhes from "../../components/RegistrosPacientesDetalhes/RegistrosPacientesDetalhes.js";
import BtnNovoRegistro from "../../components/RegistrosPacientesDetalhes/BtnNovoRegistro.js";

// function formatarDataParaInput(data) {
//     if (!data) return "";
//     const d = new Date(data);
//     const dLocal = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
//     const ano = dLocal.getFullYear();
//     const mes = String(d.getMonth() + 1).padStart(2, "0");
//     const dia = String(d.getDate()).padStart(2, "0");
//     return `${ano}-${mes}-${dia}`;
// }

function formatarTelefone(valor) {
  const cleaned = String(valor).replace(/\D/g, "").slice(0, 11);
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return cleaned;
}

function PaginaPacientesDetalhes() {
  console.log("UserID do localStorage:", localStorage.getItem("userID"));
  console.log(
    "pacienteID do localStorage:",
    localStorage.getItem("pacienteID")
  );
  useDocumentTitle("Pacientes | Seren");
  const { paciente } = usePacienteDetalhes();
  const [setUsuario] = useState(null);
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [popupAberto, setPopupAberto] = useState(false);
  const [popupExcluir, setPopupExcluir] = useState(false);
  const [popupSucesso, setPopupSucesso] = useState(false);
  const { usuario } = useUsuarios();
  const [campoPesquisaFocado, setCampoPesquisaFocado] = useState(false);
  const [mostrarModalAbordagem, setMostrarModalAbordagem] = useState(false);
  const [mostrarModalSaude, setMostrarModalSaude] = useState(false);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novoPaciente, setNovoPaciente] = useState({
    nome: paciente?.nome || "",
    profissao: paciente?.profissao || "",
    genero: paciente?.genero || "",
    estadoCivil: paciente?.estadoCivil || "",
    telefone: paciente?.telefone || "",
    email: paciente?.email || "",
    preferenciaContato: paciente?.preferenciaContato || "",
    dataNascimento: paciente?.dataNascimento,
    // dataNascimento: formatarDataParaInput(paciente?.dataNascimento),
  });
  const [erroCadastro, setErroCadastro] = useState("");

  const resetarFormulario = () => {
    setNovoPaciente({
      nome: "",
      profissao: "",
      genero: "",
      estadoCivil: "",
      telefone: "",
      email: "",
      preferenciaContato: "",
      dataNascimento: "",
    });
    setEditandoIndex(null);
    setMostrarFormulario(false);
    setErroCadastro("");
  };
  const editarPaciente = () => {
    if (!paciente) return;
    setNovoPaciente({
      nome: paciente.nome,
      profissao: paciente.profissao,
      genero: paciente.genero,
      estadoCivil: paciente.estadoCivil,
      telefone: paciente.telefone,
      email: paciente.email,
      preferenciaContato: paciente.preferenciaContato,
      dataNascimento: paciente.dataNascimento,
      // dataNascimento: formatarDataParaInput(paciente.dataNascimento),
    });
    setMostrarFormulario(true);
  };

  function formatarTelefoneInternacional(numero) {
    if (!numero) return "Telefone não disponível";

    const cleaned = String(numero).replace(/\D/g, "");

    if (cleaned.length < 11) return "Telefone não disponível";

    // const ddi = cleaned.slice(0, 2);
    // const ddd = cleaned.slice(2, 4);
    // const numeroLocal = cleaned.slice(4);

    const ddd = cleaned.slice(0, 2);
    const numeroLocal = cleaned.slice(2);

    if (numeroLocal.length === 9) {
      return `(${ddd}) ${numeroLocal.slice(0, 5)}-${numeroLocal.slice(5)}`;
    } else if (numeroLocal.length === 8) {
      return `(${ddd}) ${numeroLocal.slice(0, 4)}-${numeroLocal.slice(4)}`;
    } else {
      return `(${ddd}) ${numeroLocal}`;
    }
  }

  console.log(novoPaciente);
  return (
    <div className="container-pacientes-detalhes">
      <div className="navbar">
        <MenuPrincipal />
      </div>

      <div className="container-conteudo-pacientes-detalhes">
        <div
          style={{ alignItems: "center" }}
          className="pagina-inicial-cabecalho-responsivo"
        >
          <CabecalhoResponsivo />
        </div>

        <header className="top-bar">
          <div className="container-pesquisa">
            <FiSearch className={`icone-lupa ${campoPesquisaFocado}`} />
            <input
              type="text"
              className="campo-pesquisa"
              onFocus={() => setCampoPesquisaFocado(true)}
              onBlur={() => setCampoPesquisaFocado(false)}
            />
            {!campoPesquisaFocado && (
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

        <div className="cards-paciente-pagamentos">
          <div className="card-paciente">
            <div className="card-paciente__cabecalho">
              {!mostrarFormulario && (
                <p className="nome-paciente">
                  {paciente ? paciente.nome : "Carregando..."}
                </p>
              )}
              <div>
                <div className="acao-paciente">
                  {mostrarFormulario ? (
                    <div className="cabecalho-modal-edicao">
                      <h3 className="titulo-editar">Editar Paciente</h3>
                      <button
                        className="btn-excluir-paciente"
                        onClick={() => setPopupExcluir(true)}
                      >
                        <FaRegTrashCan
                          className="icon-exclusao"
                          title="Excluir o registro desse paciente"
                        />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn-editar-paciente"
                      onClick={() => {
                        setMostrarFormulario(true);
                        editarPaciente(paciente._id);
                      }}
                    >
                      <PiNotePencilBold
                        className="icon-edicao"
                        title="Editar o registro desse paciente"
                      />
                    </button>
                  )}
                </div>

                {mostrarFormulario && (
                  <div className="modal-formulario-pacientes">
                    {erroCadastro && (
                      <p style={{ color: "red" }}>{erroCadastro}</p>
                    )}{" "}
                    {/* Mensagem de erro */}
                    <div className="form-group-pacientes">
                      <input
                        type="text"
                        placeholder="Nome"
                        title="Nome completo do paciente"
                        value={novoPaciente.nome}
                        onChange={(e) =>
                          setNovoPaciente({
                            ...novoPaciente,
                            nome: e.target.value,
                          })
                        }
                      />

                      <input
                        type="text"
                        placeholder="profissao"
                        title="Alterar profissão do paciente"
                        value={novoPaciente.profissao}
                        onChange={(e) =>
                          setNovoPaciente({
                            ...novoPaciente,
                            profissao: e.target.value,
                          })
                        }
                      />

                      <select
                        value={novoPaciente.genero}
                        onChange={(e) =>
                          setNovoPaciente({
                            ...novoPaciente,
                            genero: e.target.value,
                          })
                        }
                      >
                        <option value="">Gênero</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Outro">Outro</option>
                      </select>

                      <select
                        value={novoPaciente.estadoCivil}
                        onChange={(e) =>
                          setNovoPaciente({
                            ...novoPaciente,
                            estadoCivil: e.target.value,
                          })
                        }
                      >
                        <option value="">Estado Civil</option>
                        <option value="Solteiro(a)">Solteiro(a)</option>
                        <option value="Casado(a)">Casado(a)</option>
                        <option value="Divorciado(a)">Divorciado(a)</option>
                        <option value="Viúvo(a)">Viúvo(a)</option>
                      </select>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        placeholder="(XX) XXXXX-XXXX"
                        value={formatarTelefone(novoPaciente.telefone)}
                        onChange={(e) => {
                          const validarNumTelefone = e.target.value.replace(
                            /\D/g,
                            ""
                          );
                          if (validarNumTelefone.length <= 11) {
                            setNovoPaciente({
                              ...novoPaciente,
                              telefone: validarNumTelefone,
                            });
                          }
                        }}
                      />
                      {/* <input
                                                type="tel"
                                                placeholder="Telefone"
                                                title="Digite apenas números com o DDD, no formato: 5511987654321"
                                                value={formatarTelefone(novoPaciente.telefone)}
                                                onChange={(e) => {
                                                    const validarNumTelefone = e.target.value.replace(
                                                        /\D/g,
                                                        ""
                                                    );
                                                    if (validarNumTelefone.length <= 13) {
                                                        setNovoPaciente({
                                                            ...novoPaciente,
                                                            telefone: validarNumTelefone,
                                                        });
                                                    }
                                                }}
                                            /> */}
                      {novoPaciente.telefone.length > 0 &&
                        novoPaciente.telefone.length !== 11 && (
                          <span style={{ color: "red", fontSize: "0.8rem" }}>
                            O telefone deve conter exatamente 13 números, no
                            formato: 5511987654321.
                          </span>
                        )}

                      <input
                        type="email"
                        placeholder="E-mail"
                        title="Alterar email do paciente"
                        value={novoPaciente.email}
                        onChange={(e) =>
                          setNovoPaciente({
                            ...novoPaciente,
                            email: e.target.value,
                          })
                        }
                      />

                      <select
                        value={novoPaciente.preferenciaContato}
                        onChange={(e) =>
                          setNovoPaciente({
                            ...novoPaciente,
                            preferenciaContato: e.target.value,
                          })
                        }
                      >
                        <option value="">Preferência de Contato</option>
                        <option value="Telefone">Telefone</option>
                        <option value="E-mail">E-mail</option>
                        <option value="WhatsApp">WhatsApp</option>
                      </select>

                      <input
                        type="date"
                        placeholder="Data de Nascimento"
                        title="Alterar data de nascimento"
                        value={
                          new Date(novoPaciente.dataNascimento)
                            .toISOString()
                            .split("T")[0]
                        }
                        onChange={(e) =>
                          setNovoPaciente({
                            ...novoPaciente,
                            dataNascimento: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-row buttons">
                      <button
                        className="btn-editar-cancelar"
                        onClick={() => {
                          setMostrarFormulario(false);
                          setErroCadastro("");
                        }}
                      >
                        Cancelar
                      </button>

                      <button
                        className="btn salvar"
                        onClick={() => {
                          atualizarPaciente(
                            setErroCadastro,
                            novoPaciente,
                            editandoIndex,
                            resetarFormulario
                          );
                          setPopupAberto(true);
                        }}
                      >
                        Salvar alterações
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {popupAberto && (
              <div className="popup-overlay">
                <div className="popup-box">
                  <h3>Informações de paciente salvas!</h3>
                  <p>Você alterou informações deste paciente com sucesso!</p>
                  <button
                    className="btn-popup"
                    onClick={() =>
                      (window.location.href = "/pacientes-detalhes")
                    }
                  >
                    Ok, entendi!
                  </button>
                </div>
              </div>
            )}

            {popupExcluir && (
              <div className="popup-overlay">
                <div className="popup-box">
                  <h3>Deseja excluir este paciente?</h3>
                  <p>Você não poderá reverter esta ação.</p>
                  <div className="popup-buttons">
                    <button
                      className="btn-nao"
                      onClick={() => setPopupExcluir(false)}
                    >
                      Não, cancelar
                    </button>
                    <button
                      className="btn-sim"
                      onClick={() => {
                        excluirPaciente();
                        setPopupExcluir(false);
                        setPopupSucesso(true);
                      }}
                    >
                      Sim, excluir
                    </button>
                  </div>
                </div>
              </div>
            )}

            {popupSucesso && (
              <div className="popup-overlay">
                <div className="popup-box">
                  <h3>Dados excluídos com sucesso!</h3>
                  <button
                    className="btn-popup"
                    onClick={() => (window.location.href = "/pacientes")}
                  >
                    Ok
                  </button>
                </div>
              </div>
            )}

            {!mostrarFormulario &&
              (paciente ? (
                <>
                  <div className="card-paciente__infos">
                    <div>
                      <p className="paciente-atributo">
                        Idade:{" "}
                        <span>
                          {calcularIdade(paciente.dataNascimento)} anos
                        </span>
                      </p>

                      <p className="paciente-atributo">
                        Estado civil: <span>{paciente.estadoCivil}</span>
                      </p>

                      <p className="paciente-atributo container-btn-direcionar-whatsapp">
                        Telefone:
                        <span>
                          <span>
                            {paciente.telefone &&
                            /^\+?\d{11,15}$/.test(paciente.telefone)
                              ? formatarTelefoneInternacional(paciente.telefone)
                              : "Telefone não disponível"}
                          </span>
                        </span>
                        <a
                          className="btn-direcionar-whatsapp"
                          href={`https://wa.me/55${paciente?.telefone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaWhatsapp
                            className="icon-whatsapp-telefone"
                            title="Ao clicar no ícone você será redirecionado(a) &#10;para a conversa de Whatsapp com esse paciente"
                          />
                        </a>
                      </p>

                      <p className="paciente-atributo">
                        Preferência de contato:{" "}
                        <span>{paciente.preferenciaContato}</span>
                      </p>
                    </div>

                    <div>
                      <p className="paciente-atributo">
                        Gênero: <span>{paciente.genero}</span>
                      </p>

                      <p className="paciente-atributo">
                        Profissão: <span>{paciente.profissao}</span>
                      </p>

                      <p className="paciente-atributo">
                        Email: <span>{paciente.email}</span>
                      </p>

                      <p className="paciente-atributo">
                        Data de nascimento:
                        <span>
                          {new Date(paciente.dataNascimento).toLocaleDateString(
                            "pt-BR",
                            {
                              timeZone: "UTC",
                            }
                          )}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="card-paciente__botoes">
                    <button
                      className="btn-historico-saude"
                      onClick={() => {
                         setMostrarModalSaude(!mostrarModalSaude);
                         setPopupAberto(false);
                      }}
                    >
                      <LuActivity />
                      Histórico de saúde
                    </button>
                    {mostrarModalSaude && (
                      <div className="modal-saude">
                        <h3 className="title-saude">Histórico de saúde</h3>
                        <input
                          type="text"
                          className="descricao-saude"
                          placeholder="Informações médicas..."
                          id="descricao"
                          name="descricao"
                        />

                        <input
                          type="text"
                          className="descricao-saude"
                          placeholder="Condições médicas..."
                          id="descricao"
                          name="descricao"
                        />

                        <input
                          type="text"
                          className="descricao-saude"
                          placeholder="Tratamentos anteriores..."
                          id="descricao"
                          name="descricao"
                        />
                        <div className="form-row buttons">
                          <button onClick={() => setMostrarModalSaude(false)}>
                            Cancelar
                          </button>
                             <button
                            className="btn salvar" onClick={() => {
                                //lógica para salvar os dados aqui!
                                setPopupAberto(true); 
                              setMostrarModalAbordagem(false);
                            }}
                          >
                            Salvar
                          </button>
                        </div>
                      </div>
                    )}
                    <button
                      className="btn-plano-tratamento"
                        onClick={() =>{
                         setMostrarModalAbordagem(true); 
                         setPopupAberto(false);
                      }}
                    >
                      <BsClipboardPulse />
                      Abordagem
                    </button>
                    {mostrarModalAbordagem && (
                      <div className="modal-abordagem">
                        <h3 className="title-abordagem">Abordagem</h3>
                        <textarea
                          className="descricao-abordagem"
                          placeholder="Adicione aqui as principais abordagens utilizadas com o paciente"
                          id="descricao"
                          name="descricao"
                        />
                        <div className="form-row buttons">
                          <button
                            onClick={() => setMostrarModalAbordagem(false)}
                          >
                            Cancelar
                          </button>
                          <button
                            className="btn salvar" onClick={() => {
                                //lógica para salvar os dados aqui!
                                setPopupAberto(true); 
                              setMostrarModalAbordagem(false);
                            }}
                          >
                            Salvar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="card-paciente__infos">
                  <div>
                    <p className="paciente-atributo">
                      <span>carregando</span>
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="card-adicionar-registro">
              <BtnNovoRegistro />
          </div>

          {/* <div className="card-pagamentos">
              <h3>Pagamentos</h3>
              <div className="card-pagamentos-checklist">
                  <ChecklistPagamentos className="checklist" />
              </div>
          </div> */}
        </div>

        <div className="cards-anotacoes">
          <RegistrosPacientesDetalhes />
        </div>
      </div>
    </div>
  );
}

export default PaginaPacientesDetalhes;