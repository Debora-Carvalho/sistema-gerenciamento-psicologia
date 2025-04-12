import React, { useState } from 'react';
import './Login.css';
import useDocumentTitle from '../../components/useDocumentTitle';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
  useDocumentTitle("Login | Seren");

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembreDeMim, setLembreDeMim] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const usuarioCadastrado = {
    email: 'usuario@exemplo.com',
    senha: '123456'
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="container-login">
      <form className="formulario-login" onSubmit={handleSubmit}>
        <h1 id="titulo-login">Login</h1>

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

        {mensagemErro && (
          <p className="mensagem-erro" aria-live="polite">{mensagemErro}</p>
        )}

        <button id="btn-entrar" className="btn-entrar" type="submit">
          Entrar
        </button>

        <div className="recuperar-senha">
          <Link to="/recuperar-senha/nova-senha">
            Esqueceu sua senha?
          </Link>
        </div>
      </form>
<div className='bem-vinda'>
     <h1 id="titulo-login">Bem-vinda de volta ao</h1>
           <h1 id="titulo-logo">Seren!</h1>
     
           <div id="subtitulo-cadastro">
             <h4>Se conecte-se para gerenciar sua vida profissional de forma prática e rápida</h4>
             <h4>Ainda não uma conta?</h4>
           </div>
     
           <Link to="/Cadastro">
             <button id="btn-cadstro" className="btn-cadastro" type="button">
               Cadastre-se
             </button>
           </Link>
          </div>
    </div>
  );
};

export default Login;
