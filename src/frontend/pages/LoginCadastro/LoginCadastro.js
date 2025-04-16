import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaLock } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import imgMulherCadastro from '../../assets/images/image-mulher-cadastro.png';
import imgMulherLogin from '../../assets/images/image-mulher-login.png';
import imgPlanta from '../../assets/images/image-planta-login.png';
import { Link, useNavigate } from 'react-router-dom';
import './LoginCadastro.css';
import useDocumentTitle from '../../components/useDocumentTitle';

function LoginCadastro() {
  const [modoCadastro, setModoCadastro] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [username, setUsername] = useState('');
  const [telephone, setTelephone] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [lembreDeMim, setLembreDeMim] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  const navigate = useNavigate();

  useDocumentTitle('Login e Cadastro | Seren');

  const validarCadastro = () => {
    if (!username || !telephone || !email || !senha || !confirmaSenha) return 'Preencha todos os campos.';
    if (!/\S+@\S+\.\S+/.test(email)) return 'E-mail inválido.';
    if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(telephone)) return 'Número de celular inválido.';
    if (senha.length < 8) return 'A senha deve ter no mínimo 8 caracteres.';
    if (senha !== confirmaSenha) return 'Senhas não correspondem!';
    return '';
  };

  const validarLogin = () => (!email || !senha ? 'Preencha todos os campos!' : '');

  const handleSubmit = async (e, tipoFormulario) => {
    e.preventDefault();
    if (tipoFormulario === 'cadastro') {
      const erro = validarCadastro();
      setMensagemErro(erro);

      if (!erro) {
        
        const userData = {
          action: "cadastro",
          email,
          senha,
          username,
          telephone
        };

          try {
            // realiza a requisição POST usando fetch
            const response = await fetch("http://localhost:4000/auth", {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // define o tipo de conteúdo
              },
              body: JSON.stringify(userData), // converte os dados em JSON
            });

              const data = await response.json();
              // checa se a resposta foi bem-sucedida 
              if (response.ok && data.success) {
              
                await alert("Cadastro concluído! Acessando login...");
                window.location.reload();

            } else {
              alert( data.error ||"Erro ao cadastrar! ");
            }
          } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro na comunicação com o servidor.");
          }
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
        // dados a serem enviados para a loginAutentica
        const userData = {
          action: "login",
          email,
          senha
        };

        try {
          // realiza a requisição POST usando fetch
          const response = await fetch("http://localhost:4000/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // define o tipo de conteúdo
            },
            body: JSON.stringify(userData), // converte os dados em JSON
          });

            const data = await response.json();
            // checa se a resposta foi bem-sucedida 
            if (response.ok && data.success) {
              if (lembreDeMim) {
                localStorage.setItem('emailSalvo', email);
              }

              // se login for bem-sucedido, salva o userID no localStorage
              localStorage.setItem("userID", data.userID);
              alert("Login concluído! Acessando sistema...");
              navigate("/pagina-inicial"); 

          } else {
            alert( data.message ||"Erro ao tentar autenticar! ");
          }
        } catch (error) {
          console.error("Erro na requisição:", error);
          alert("Erro na comunicação com o servidor.");
        }

        setEmail('');
        setSenha('');
        setLembreDeMim(false);
      }
      }
      };

  return (
    <div className={`container ${modoCadastro ? "mostrar-cadastro" : ""}`}>
      <div className="first-content">
        <div className="first-column">
          <h1 className="titulo">Bem-vinda de volta ao</h1>
          <h1 className="titulo-logo">Seren!</h1>
          <div className="subtitulo">
            <h4>Se conecte-se para gerenciar sua vida profissional</h4>
            <h4>Ainda não tem uma conta?</h4>
          </div>
          <button className="btn-cadastre-se" onClick={() => setModoCadastro(true)}>Cadastre-se</button>
          <img className="img-planta-cadastro" src={imgPlanta} alt="Planta vermelha" />
        </div>

        <div className="second-column">
          <AnimatePresence mode="wait">
            {!modoCadastro && (
              <motion.form
                key="login"
                className="form-login"
                onSubmit={(e) => handleSubmit(e, 'login')}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="titulo">Login</h1>
                <div><MdEmail className="icon" /><input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div><FaLock className="icon" /><input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} /></div>
                <div className="checkbox-container">
                  <input type="checkbox" id="lembreDeMim" checked={lembreDeMim} onChange={(e) => setLembreDeMim(e.target.checked)} />
                  <label htmlFor="lembreDeMim">Lembre de mim</label>
                </div>
                {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}
                <button className="btn-entrar" type="submit">Entrar</button>
                <div className="recuperar-senha">
                  <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
                  <img className="img-login" src={imgMulherLogin} alt="Mulher com notebook" />
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="second-content">
        <div className="first-column">
          <h1 className="titulo">Bem-vinda ao</h1>
          <h1 className="titulo-logo">Seren!</h1>
          <div className="subtitulo">
            <h4>Cadastre-se para gerenciar sua vida profissional</h4>
            <h4>Já tem uma conta?</h4>
          </div>
          <button className="btn-logar-se" onClick={() => setModoCadastro(false)}>Logar-se</button>
          <img className="img-planta-login" src={imgPlanta} alt="Planta vermelha" />
        </div>

        <div className="second-column">
          <AnimatePresence mode="wait">
            {modoCadastro && (
              <motion.form
                key="cadastro"
                className="form-cadastro"
                onSubmit={(e) => handleSubmit(e, 'cadastro')}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="titulo">Crie sua conta</h1>
                <div><FaUser className="icon" /><input type="text" placeholder="Nome e sobrenome" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
                <div><BsFillTelephoneFill className="icon" /><input type="tel" placeholder="Celular" value={telephone} onChange={(e) => setTelephone(e.target.value)} /></div>
                <div><MdEmail className="icon" /><input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div><FaLock className="icon" /><input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} /></div>
                <div><FaLock className="icon" /><input type="password" placeholder="Confirmação de senha" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} /></div>
                {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}
                <button className="btn-criar" type="submit">Criar conta</button>
                <img className="img-cadastro" src={imgMulherCadastro} alt="Mulher com notebook" />
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default LoginCadastro;