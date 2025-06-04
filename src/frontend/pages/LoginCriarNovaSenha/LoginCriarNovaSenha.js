import React, { useState, useEffect } from 'react';
import './LoginCriarNovaSenha.css';
import { useLocation, useNavigate } from 'react-router-dom';
import imgMulherNovaSenha from '../../assets/images/image-mulher-novasenha.png';
import useNovaSenha from '../../hooks/useNovaSenha';

function LoginCriarNovaSenha() {
    const [novaSenha, setNovaSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();
    const email = state?.email;
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erroSenhaInvalida, setErroSenhaInvalida] = useState(false);
    const [popupAberto, setPopupAberto] = useState(false);
    const { atualizarSenha } = useNovaSenha();
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarSenhaNova, setMostrarSenhaNova] = useState(false);

    useEffect(() => {
        if (!email) {
            navigate('/');
        }
    }, [email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!novaSenha) {
            setMensagemErro('Preencha todos os campos.');
            return;
        }

        const erro = validarSenha(novaSenha, confirmarSenha);
        // usar senha Valeriano24@

        if (erro) {
            setMensagemErro(erro);
            setErroSenhaInvalida(true);
            return;
        }

        atualizarSenha({ email, novaSenha }, setMensagemErro, setPopupAberto, setErroSenhaInvalida);

    };

    const validarSenha = (novaSenha, confirmarSenha) => {
        const regexSenhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!regexSenhaForte.test(novaSenha)) {
            return 'Senha inválida, a senha precisa ter 8 dígitos, especial, maiúscula e número.';
        }

        if (novaSenha !== confirmarSenha) {
            return 'As senhas não coincidem.';
        }

        return '';
    };

    return (
        <div className='container'>
            <div className='container-conteudo-nova-senha'>
                <h1 className='titulo-principal'>Crie sua nova senha</h1>
                <p className='texto-explicativo'>Sua nova senha deve ser diferente das anteriores.</p>
                <p className='texto-explicativo'>Recomendamos utilizar no mínimo 8 caracteres.</p>

                <form onSubmit={handleSubmit}>
                    <div className='campo-incluir-nova-senha'>
                        <div className='input-container'>
                            {mensagemErro && (
                                <p className='mensagem-erro'>{mensagemErro}</p>
                            )}
                            <label htmlFor='senha'>Nova senha</label>
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                id='senha'
                                className={erroSenhaInvalida ? 'erro' : ''}
                                placeholder='Nova senha'
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="olho-novasenha"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                            >
                                {mostrarSenha ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <div className='campo-incluir-nova-senha'>
                        <div className='input-container'>
                            <label htmlFor='confirmarSenha'>Confirmar nova senha</label>
                            <input
                                type={mostrarSenhaNova ? "text" : "password"}
                                id='confirmarSenha'
                                className={erroSenhaInvalida ? 'erro' : ''}
                                placeholder='Confirmar nova senha'
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="olho-novasenha"
                                onClick={() => setMostrarSenhaNova(!mostrarSenhaNova)}
                            >
                                {mostrarSenhaNova ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <button id='btn-confirmar' className='btn-confirmar' type='submit'>
                        Criar nova senha
                    </button>

                    <button id='btn-login' className='btn-login' type='button' onClick={() => window.location.href = '/'}>
                        Login
                    </button>
                </form>
            </div>

            {popupAberto && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h3>Senha alterada</h3>
                        <p>Você alterou sua senha com sucesso.<br />Por favor, faça novo login</p>
                        <button className="btn-popup" onClick={() => window.location.href = '/'}>
                            Fazer Login
                        </button>

                    </div>
                </div>
            )}

            <img
                src={imgMulherNovaSenha}
                className='imagem-principal'
                alt="Mulher sentada usando seu notebook no chão"
            />
        </div>
    );
}



export default LoginCriarNovaSenha;
