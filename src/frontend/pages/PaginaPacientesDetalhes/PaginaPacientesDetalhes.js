import React, { useState, useEffect } from "react";
import "../../pages/PaginaPacientesDetalhes/PaginaPacientesDetalhes.css";
import useDocumentTitle from "../../components/useDocumentTitle";
import CabecalhoUsuarioLogado from "../../components/CabecalhoUsuarioLogado/CabecalhoUsuarioLogado.js";
import ChecklistPagamentos from "../../components/ChecklistPagamentos/ChecklistPagamentos.js";
import Menu from "../../components/Menu/Menu.js";
import { PiNotePencilBold } from "react-icons/pi";

function PaginaPacientesDetalhes() {
  useDocumentTitle("Pacientes | Seren");

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function buscarUsuario() {
      try {
        const userID = localStorage.getItem("userID");

        if (!userID) {
          console.error("userID não encontrado no localStorage.");
          return;
        }

        const response = await fetch("http://localhost:4000/pagina-inicial", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userID }),
        });

        const data = await response.json();

        if (response.ok) {
          setUsuario(data.usuario);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    }

    buscarUsuario();
  }, []);

  const [pacientes, setPacientes] = useState([
    { nome: "Andreia Oliveira Justina", data: "27/09/2025", idade: "42 anos" },
    { nome: "Maria Fernanda Gonzales", data: "30/09/2025", idade: "22 anos" },
    { nome: "Roberto da Silva Souza", data: "01/10/2025", idade: "35 anos" },
    { nome: "Fabricio da Costa", data: "11/05/2025", idade: "26 anos" },
    {
      nome: "Maria da Conceição Oliveira",
      data: "01/07/2025",
      idade: "55 anos",
    },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novoPaciente, setNovoPaciente] = useState({
    nome: "",
    idade: "",
    genero: "",
    estadoCivil: "",
    telefone: "",
    email: "",
    preferenciaContato: "",
    dataNascimento: "",
  });
  const [erroCadastro, setErroCadastro] = useState("");

  const adicionarPaciente = async () => {
    const userID = localStorage.getItem("userID");

    if (!novoPaciente.nome || !novoPaciente.telefone) {
      setErroCadastro("Por favor, preencha o nome e o telefone do paciente.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/pacientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...novoPaciente, userID }),
      });

      const data = await response.json();

      if (response.ok) {
        setPacientes([...pacientes, data.pacienteCadastrado]);

        setNovoPaciente({
          nome: "",
          idade: "",
          genero: "",
          estadoCivil: "",
          telefone: "",
          email: "",
          preferenciaContato: "",
          dataNascimento: "",
        });

        setMostrarFormulario(false);
        setErroCadastro("");
      } else {
        setErroCadastro(data.error || "Erro ao cadastrar paciente.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados do paciente:", error);
      setErroCadastro("Erro ao comunicar com o servidor.");
    }
  };

  return (
    <div className="container-pacientes-detalhes">
      <CabecalhoUsuarioLogado />
      <div className="container-conteudo-pacientes-detalhes">
        <div className="navbar">
          <Menu />
        </div>
        <div className="container-conteudo-cards-pacientes-detalhes">
          <div className="cards-paciente-pagamentos">
            <div className="card-paciente">
              <div className="card-paciente__cabecalho">
                {!mostrarFormulario && (
                  <p className="nome-paciente">
                    Maria Aparecida Fernandes Gonzalez Da Rocha
                  </p>
                )}
                <div>
                  <button
                    className="btn-editar-paciente"
                    onClick={() => setMostrarFormulario(true)}
                  >
                    <PiNotePencilBold className="icon-edicao" />
                  </button>
                  {mostrarFormulario && (
                    <div className="modal-formulario-pacientes">
                      <h3 className="titulo-editar"> Editar Paciente</h3>
                      {erroCadastro && (
                        <p style={{ color: "red" }}>{erroCadastro}</p>
                      )}{" "}
                      {/* Mensagem de erro */}
                      <div className="form-group-pacientes">
                        <input
                          type="text"
                          placeholder="Nome"
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
                          placeholder="Idade"
                          value={novoPaciente.idade}
                          onChange={(e) =>
                            setNovoPaciente({
                              ...novoPaciente,
                              idade: e.target.value,
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
                          placeholder="Telefone"
                          value={novoPaciente.telefone}
                          onChange={(e) =>
                            setNovoPaciente({
                              ...novoPaciente,
                              telefone: e.target.value,
                            })
                          }
                        />

                        <input
                          type="email"
                          placeholder="E-mail"
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
                          value={novoPaciente.dataNascimento}
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
                          onClick={() => {
                            setMostrarFormulario(false);
                            setErroCadastro("");
                          }}
                        >
                          Sair
                        </button>
                        <button onClick={adicionarPaciente}>Salvar</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {!mostrarFormulario && (
                <div className="card-paciente__infos">
                  <div>
                    <p className="paciente-atributo">
                      Idade: <span>31 anos</span>
                    </p>
                    <p className="paciente-atributo">
                      Gênero: <span>Feminino</span>
                    </p>
                    <p className="paciente-atributo">
                      Estado civil: <span>Casada</span>
                    </p>
                    <p className="paciente-atributo">
                      Profissão: <span>Advogada</span>
                    </p>
                  </div>
                  <div>
                    <p className="paciente-atributo">
                      Data de nascimento: <span>03/09/1993</span>
                    </p>
                    <p className="paciente-atributo">
                      Telefone: <span>(11) 93456-8790</span>
                    </p>
                    <p className="paciente-atributo">
                      Email: <span>mafe.rocha@gmail.com</span>
                    </p>
                    <p className="paciente-atributo">
                      Preferência de contato: <span>Email</span>
                    </p>
                  </div>
                </div>
              )}

              {!mostrarFormulario && (
                <div className="card-paciente__botoes">
                  <a className="btn-historico-saude" href="#">
                    <p>Histórico de saúde</p>
                  </a>
                  <a className="btn-plano-tratamento" href="#">
                    <p>Plano de tratamento</p>
                  </a>
                </div>
              )}
            </div>

            <div className="card-pagamentos">
              <h3>Pagamentos</h3>

              <div className="card-pagamentos-checklist">
                <ChecklistPagamentos className="checklist" />
              </div>
            </div>
          </div>

          <div className="cards-anotacoes">
            <div className="container-anotacoes-salvas">
              <h1>Registros de sessões</h1>
            </div>
            <div className="container-nova-anotacao">
              <h3>Adicionar anotação</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginaPacientesDetalhes;
