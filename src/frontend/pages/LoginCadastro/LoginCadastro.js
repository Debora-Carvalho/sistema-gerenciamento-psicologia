import React, { useState , useEffect} from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom'; 
import './LoginCadastro.css';
import useDocumentTitle from '../../components/useDocumentTitle';

function LoginCadastro() {
  useDocumentTitle("Login e Cadastro | Seren");

  const [username, setUsername] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [lembreDeMim, setLembreDeMim] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  useEffect(() => {
    const btnLogin = document.getElementById("btn-login");
    const btnCadastro = document.getElementById("btn-cadastro");
    const container = document.querySelector(".container");
  
    btnCadastro?.addEventListener("click", () => {
      container?.classList.add("mostrar-cadastro");
    });
  
    btnLogin?.addEventListener("click", () => {
      container?.classList.remove("mostrar-cadastro");
    });
  }, []);

  const validarCadastro = () => {
    if (!username || !telephone || !email || !senha || !confirmaSenha) {
      return 'Preencha todos os campos.';
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return 'E-mail inválido.'; 
    }

    const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if (!telefoneRegex.test(telephone)) {
      return 'Número de celular inválido.'; 
    }

    if (senha.length < 8) {
      return 'A senha deve ter no mínimo 8 caracteres.'; 
    }

    if (senha !== confirmaSenha) {
      return 'Senhas não correspondem! Tente novamente.';
    }

    return '';
  };

  const usuarioCadastrado = {
    email: 'usuario@exemplo.com',
    senha: '12345678'
  };

  const validarLogin = () => {
    if (!email || !senha) {
      return 'Preencha todos os campos.';
    }

    if (email !== usuarioCadastrado.email || senha !== usuarioCadastrado.senha) {
      return 'E-mail ou senha incorretos.';
    }

    return '';
  };

  const handleSubmit = (e, tipoFormulario) => {
    e.preventDefault();

    if (tipoFormulario === 'cadastro') {
      const erro = validarCadastro();
      setMensagemErro(erro);

      if (!erro) {
        console.log({ username, telephone, email });
        alert("Dados cadastrados com sucesso!");

        setUsername('');
        setTelephone('');
        setEmail('');
        setSenha('');
        setConfirmaSenha('');
      }
    }

    if (tipoFormulario === 'login') {
      const erro = validarLogin();
      setMensagemErro(erro);

      if (!erro) {
        if (lembreDeMim) {
          localStorage.setItem('emailSalvo', email);
        }

        console.log({ email, senha });
        alert("Login concluído! Acessando sistema...");

        setEmail('');
        setSenha('');
        setLembreDeMim(false);
      }
    }
  };

  return (
    <div class="container">
      <div class='first-content'>
        <div class='first-column'>
          <h1 className="titulo">Bem-vinda de volta ao</h1>
          <h1 className="titulo-logo">Seren!</h1>

          <div className="subtitulo">
            <h4>Se conecte-se para gerenciar sua vida profissional de forma prática e rápida</h4>
            <h4>Ainda não tem uma conta?</h4>
          </div>

          <Link to="#cadastro">
            <button id="btn-cadastro" className="btn" type="button">
              Cadastre-se
            </button>
          </Link>
        </div>
<div class='second-colum'> 
        <form className="form-login" onSubmit={(e) => handleSubmit(e, 'login')}>
          <h1 class="titulo">Login</h1>
          <div>
            <MdEmail className="icon" />
            <input
              id="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <FaLock className="icon" />
            <input
              id="senha"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="lembreDeMim"
              checked={lembreDeMim}
              onChange={(e) => setLembreDeMim(e.target.checked)}
            />
            <label htmlFor="lembreDeMim">Lembre de mim</label>
          </div>

          {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}

          <button id="btn-entrar" className="btn" type="submit">
            Entrar
          </button>

          <div className="recuperar-senha">
            <Link to="/recuperar-senha/nova-senha">
              Esqueceu sua senha?
            </Link>
          </div>
        </form>
      </div>
      </div>

      <div className='second-content'>
        <div className='first-column'>
          <h1 className="titulo">Bem-vinda ao</h1>
          <h1 className="titulo-logo">Seren!</h1>

          <div className="subtitulo">
            <h4>Cadastre-se para gerenciar sua vida profissional de forma prática e rápida</h4>
            <h4>Já tem uma conta?</h4>
          </div>

          <Link to="#login">
            <button id="btn-login" className="btn" type="button">
              Logar-se
            </button>
          </Link>
        </div>
     <div class='second-colum'> 
        <form className="form-cadastro" onSubmit={(e) => handleSubmit(e, 'cadastro')}>
          <h1 className="titulo">Crie sua conta</h1>

          <div>
            <FaUser className="icon" />
            <input
              id="username"
              type="text"
              placeholder="Nome e sobrenome"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <BsFillTelephoneFill className="icon" />
            <input
              id="telephone"
              type="tel"
              placeholder="Celular"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </div>

          <div>
            <MdEmail className="icon" />
            <input
              id="email"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <FaLock className="icon" />
            <input
              id="senha"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div>
            <FaLock className="icon" />
            <input
              id="confirmaSenha"
              type="password"
              placeholder="Confirmação de senha"
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
            />
          </div>

          {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}

          <button id="btn-criar-conta" className="btn-criar" type="submit">
            Criar conta
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default LoginCadastro;
