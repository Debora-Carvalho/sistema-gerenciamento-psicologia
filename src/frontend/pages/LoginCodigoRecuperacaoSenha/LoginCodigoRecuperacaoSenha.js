import React, { useState } from 'react';
import './LoginCodigoRecuperacaoSenha.css';
import imgHomemVerifiqueEmail from '../../assets/images/image-homem-verifiqueemail.png';

function LoginCodigoRecuperacaoSenha() {
    const [codigo, setCodigo] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const codigoCorreto = '123456'; // valor para simulacao do código enviado por email

    const validarCodigo = (codigo) => {
        if (!/^\d+$/.test(codigo)) {
            return 'Digite um código válido para prosseguir.';
        }

        if (codigo !== codigoCorreto) {
            return 'Código incorreto. Verifique novamente o email.';
            // Backend: acrescentar validacao do codigo real
        }

        return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const erro = validarCodigo(codigo);
        setMensagemErro(erro);

        if (!erro) {
            console.log('codigo válido, prosseguir com envio...');
            // Backend: acrescentar codigo para o envio do codigo
        }
    };

    return (
        <div className='container'>
            <div className='container-conteudo'> 
                <h1 className='titulo-principal'>Verifique seu email</h1>
                <p className='texto-explicativo'>Digite o código de segurança recebido por email</p>

                <form onSubmit={handleSubmit}>
                    <div className='campo-incluir-codigo'>
                        <div className='input-container'>
                            {/* mostrar o erro */}
                            {mensagemErro && (
                                <p className='mensagem-erro'>{mensagemErro}</p>
                            )}
                            <label htmlFor='codigo'>Código de segurança</label>

                            <input
                                type='text'
                                id='codigo'
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button id='btn-verificar-codigo' className='btn-verificar-codigo' type='submit'>
                        Verificar
                    </button>
                </form>

                <p className='texto-explicativo'>
                    Não recebeu o código?&nbsp;&nbsp;
                    <span>
                        <a href="/"className='link-reenviar-codigo'>Reenviar</a>
                    </span>
                </p>
            </div>
            
            <img
                src={imgHomemVerifiqueEmail}
                className='imagem-principal'
                alt="Ilustração de homem com expressão sorridente, sentado em sofá e com notebook em seu colo."
            />
        </div>
    );
}

export default LoginCodigoRecuperacaoSenha;
