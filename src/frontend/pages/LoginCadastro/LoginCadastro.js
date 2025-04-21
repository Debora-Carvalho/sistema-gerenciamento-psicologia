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

    const validarLogin = () => {
        if (!email || !senha) {
            return 'Preencha todos os campos!';
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(email)) {
            return 'Digite um e-mail válido';
        }
        
        return '';
    };



    const handleSubmit = async (e, tipoFormulario) => {
        e.preventDefault();

        if (tipoFormulario === 'cadastro') {
            const erro = validarCadastro();
            setMensagemErro(erro);

            if (!erro) {
                const userData = { email, senha, username, telephone };

                try {
                    const response = await fetch("http://localhost:4000/cadastroUsuario", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                    });

                    const data = await response.json();

                    if (response.ok && data.success) {
                        setMensagemErro("Cadastro concluído! Acessando login...");
                        window.location.reload();
                    } else {
                        setMensagemErro(data.error || "Erro ao cadastrar!");
                    }
                } catch (error) {
                    console.error("Erro na requisição:", error);
                    setMensagemErro("Erro na comunicação com o servidor.");
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

            if (erro) {
                setMensagemErro(erro);
                return; // Interrompe o processo se houver erro
            }

            setMensagemErro(''); // limpa a mensagem se não houver erro

            if (!erro) {
                const userData = { email, senha };

                try {
                    const response = await fetch("http://localhost:4000/authLogin", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                    });

                    const data = await response.json();

                    if (response.ok && data.success) {
                        if (lembreDeMim) {
                            localStorage.setItem('emailSalvo', email);
                        }
                        localStorage.setItem("userID", data.userID);
                        setMensagemErro("Login concluído! Acessando sistema...");
                        navigate("/pagina-inicial");
                    } else {
                        setMensagemErro(data.message || "Erro ao tentar autenticar!");
                    }
                } catch (error) {
                    console.error("Erro na requisição:", error);
                    setMensagemErro("Erro na comunicação com o servidor.");
                }

                setEmail('');
                setSenha('');
                setLembreDeMim(false);
            }
        }
    };


    return (
        <div className={`container-lc ${modoCadastro ? "mostrar-cadastro" : ""}`}>
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
                                <div className='conteudo-login1'>
                                    <h1 className="titulo">Login</h1>
                                    {mensagemErro && <p className="mensagem-erro-login">{mensagemErro}</p>}
                                    <div className="conteudo-cadastro-formulario"><MdEmail /><input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                                    <div className="conteudo-cadastro-formulario" ><FaLock /><input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} /></div>
                                    <div className="checkbox-container">
                                        <input type="checkbox" id="lembreDeMim" checked={lembreDeMim} onChange={(e) => setLembreDeMim(e.target.checked)} />
                                        <label id="lembre" htmlFor="lembreDeMim">Lembre de mim</label>
                                    </div>
                                    <button className="btn-entrar" type="submit">Entrar</button>
                                    <div className="recuperar-senha">
                                        <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
                                    </div>
                                </div>
                                <img className="img-login" src={imgMulherLogin} alt="Mulher com notebook" />

                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="second-content">
                <div className="first-column">
                    <div className='conteudo-login'>
                        <h1 className="titulo">Bem-vinda ao</h1>
                        <h1 className="titulo-logo">Seren!</h1>
                        <div className="subtitulo">
                            <h4>Cadastre-se para gerenciar sua vida profissional</h4>
                            <h4>Já tem uma conta?</h4>
                        </div>
                        <button className="btn-logar-se" onClick={() => setModoCadastro(false)}>Logar-se</button>
                    </div>
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
                                <div className='conteudo-cadastro'>
                                    <h1 className="titulo">Crie sua conta</h1>
                                    {mensagemErro && <p className="mensagem-erro-login">{mensagemErro}</p>}
                                    <div className="conteudo-cadastro-formulario"><FaUser /><input type="text" placeholder="Nome e sobrenome" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
                                    <div className="conteudo-cadastro-formulario" ><BsFillTelephoneFill /><input type="tel" placeholder="Celular" value={telephone} onChange={(e) => setTelephone(e.target.value)} /></div>
                                    <div className="conteudo-cadastro-formulario"><MdEmail /><input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                                    <div className="conteudo-cadastro-formulario" ><FaLock /><input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} /></div>
                                    <div className="conteudo-cadastro-formulario" ><FaLock /><input type="password" placeholder="Confirmação de senha" value={confirmaSenha} onChange={(e) => setConfirmaSenha(e.target.value)} /></div>
                                    <button className="btn-criar" type="submit">Criar conta</button>
                                    <img className="img-cadastro" src={imgMulherCadastro} alt="Mulher com notebook" />
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default LoginCadastro;