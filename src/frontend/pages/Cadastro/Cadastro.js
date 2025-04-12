import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom'; 
import './Cadastro.css';
import useDocumentTitle from '../../components/useDocumentTitle';

function Cadastro() {
  useDocumentTitle("Cadastro | Seren");

  const [username, setUsername] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const validarCadastro= () => {
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
    //Back, todas as condições de validação vocês podem arrumar para oque quiserem

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erro = validarCadastro();
    setMensagemErro(erro);

    if (!erro) {
      console.log({ username, telephone, email });
      alert("Dados cadastrados com sucesso!");

      // essa parte limpa os campos
      // se não quiserem que limpem, podem mudar pra voltar pra login 
      setUsername('');
      setTelephone('');
      setEmail('');
      setSenha('');
      setConfirmaSenha('');
    }
  };

  return (
    <div className="container-cadastro">
      <div className='bem-vinda'>
      <h1 id="primeiro-titulo-cadastro">Bem-vinda ao</h1>
      <h1 id="titulo-logo">Seren!</h1>

      <div id="subtitulo-cadastro">
        <h4>Cadastre-se para gerenciar sua vida profissional de forma prática e rápida</h4>
        <h4>Já tem uma conta?</h4>
      </div>

      <Link to="/">
        <button id="btn-login" className="btn-login" type="button">
          Logar-se
        </button>
      </Link>
      </div>

      <form className="formulario-cadastro" onSubmit={handleSubmit}>
        <h1 id="segundo-titulo-cadastro">Crie sua conta</h1>

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

        {mensagemErro && (
          <p className="mensagem-erro" aria-live="polite">{mensagemErro}</p>
        )}

        <button id="btn-criar-conta" className="btn-criar" type="submit">
          Criar conta
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
