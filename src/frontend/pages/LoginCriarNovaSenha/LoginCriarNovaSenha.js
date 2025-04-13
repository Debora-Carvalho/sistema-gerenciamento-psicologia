import React, { useState } from 'react';
import './LoginCriarNovaSenha.css';
import imgMulherNovaSenha from '../../assets/images/image-mulher-novasenha.png';

function LoginCriarNovaSenha() {
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [erroSenhaInvalida, setErroSenhaInvalida] = useState(false);
    const [popupAberto, setPopupAberto] = useState(false);



    const validarSenha = (senha, confirmarSenha) => {
        const regexSenhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!regexSenhaForte.test(senha)) {
            return 'Senha inválida';
        }

        if (senha !== confirmarSenha) {
            return 'As senhas não coincidem.';
        }

        return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const erro = validarSenha(senha, confirmarSenha);
    
        if (erro) {
            setMensagemErro(erro);
            setErroSenhaInvalida(true);
            return;
        }
    
        setMensagemErro('');
        setErroSenhaInvalida(false);
        
        setPopupAberto(true);
        
    };

    return (
        <div className='container'>
            <div className='container-conteudo'>
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
                                type='password'
                                id='senha'
                                className={erroSenhaInvalida ? 'erro' : ''}
                                placeholder='Nova senha'
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className='campo-incluir-nova-senha'>
                        <div className='input-container'>
                            <label htmlFor='confirmarSenha'>Confirmar nova senha</label>
                            <input
                                type='password'
                                id='confirmarSenha'
                                className={erroSenhaInvalida ? 'erro' : ''}
                                placeholder='Confirmar nova senha'
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button id='btn-confirmar' className='btn-confirmar' type='submit'>
                        Criar nova senha
                    </button>

                    <button id='btn-login' className='btn-login' type='button'>
                        Login
                    </button>
                </form>
            </div>

            {popupAberto && (
            <div className="popup-overlay">
                <div className="popup-box">
                    <h3>Senha alterada</h3>
                    <p>Você alterou sua senha com sucesso.<br />Por favor, faça novo login</p>
                    <button className="btn-popup" onClick={() => console.log('Redirecionar login')}>
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
