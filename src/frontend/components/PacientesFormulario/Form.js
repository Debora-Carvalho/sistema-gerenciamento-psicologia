import { useState, useEffect } from "react";
import "./Form.css";

const inicial = {
    nome: "",
    profissao: "",
    genero: "",
    estadoCivil: "",
    telefone: "",
    email: "",
    preferencia: "",
    nascimento: "",
};

export default function Form({ onClose, onSave, paciente }) {
    const [dados, setDados] = useState(inicial);
    const [erro, setErro] = useState("");

    useEffect(() => {
        if (paciente) {
            setDados(paciente);
        } else {
            setDados(inicial);
        }
        setErro("");
    }, [paciente]);

    const handleChange = (e) => {
        setDados({ ...dados, [e.target.name]: e.target.value });
        setErro("");
    };

    const validar = () => {
        const obrigatoriosPreenchidos =
            String(dados.nome || "").trim() &&
            String(dados.profissao || "").trim() &&
            String(dados.email || "").trim() &&
            String(dados.telefone || "").trim() &&
            String(dados.genero || "").trim() &&
            String(dados.estadoCivil || "").trim() &&
            String(dados.preferencia || "").trim() &&
            String(dados.nascimento || "").trim();


        if (!obrigatoriosPreenchidos) {
            return "Preencha todos os campos obrigatórios para salvar";
        }

        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email);
        if (!emailOk) {
            return "Preencha um e‑mail válido";
        }

        return "";
    };

    const submit = () => {
        const msg = validar();
        if (msg) {
            setErro(msg);
            return;
        }
        onSave(dados);
        onClose();
    };

    return (
        <div className="overlay" onClick={onClose}>
            {/* <form
                className="form-box"
                noValidate
                onClick={(e) => e.stopPropagation()}
                onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                }}
            >
                <h3>{paciente ? "Editar" : "Novo"} paciente</h3>

                {erro && <span className="erro">{erro}</span>}

                <input
                    name="nome"
                    placeholder="Nome*"
                    value={dados.nome}
                    onChange={handleChange}
                    required
                />
                <input
                    name="profissao"
                    placeholder="Profissão*"
                    value={dados.profissao}
                    onChange={handleChange}
                    required
                />

                <select
                    name="genero"
                    value={dados.genero}
                    onChange={handleChange}
                    required
                >
                    <option value="">Gênero*</option>
                    <option>Feminino</option>
                    <option>Masculino</option>
                    <option>Não-binário</option>
                    <option>Outro</option>
                </select>

                <select
                    name="estadoCivil"
                    value={dados.estadoCivil}
                    onChange={handleChange}
                    required
                >
                    <option value="">Estado Civil*</option>
                    <option>Solteiro(a)</option>
                    <option>Casado(a)</option>
                    <option>Divorciado(a)</option>
                    <option>Viúvo(a)</option>
                </select>

                <input
                    name="telefone"
                    placeholder="Telefone* (99) 99999-9999"
                    value={dados.telefone}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    placeholder="E‑mail*"
                    value={dados.email}
                    onChange={handleChange}
                    required
                    type="email"
                />

                <select
                    name="preferencia"
                    value={dados.preferencia}
                    onChange={handleChange}
                    required
                >
                    <option value="">Preferência de contato*</option>
                    <option>Telefone</option>
                    <option>Email</option>
                    <option>WhatsApp</option>
                </select>

                <input
                    type="date"
                    name="nascimento"
                    value={dados.nascimento}
                    onChange={handleChange}
                    required
                />
            {/* </form> */}

                <div className="btn-row">
                    <button type="button" className="cancel" onClick={onClose}>
                        Cancelar
                    </button>
                    <button type="submit" className="confirm">
                        Salvar
                    </button>
                </div> 
        </div>
    );
}
