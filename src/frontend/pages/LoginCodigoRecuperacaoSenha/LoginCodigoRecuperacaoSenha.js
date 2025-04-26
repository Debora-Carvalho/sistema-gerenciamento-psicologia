import React, { useState, useEffect } from 'react';
import './LoginCodigoRecuperacaoSenha.css';
import imgHomemVerifiqueEmail from '../../assets/images/image-homem-verifiqueemail.png';
import { useLocation, useNavigate } from 'react-router-dom';
import useRecuperarCodigo from '../../hooks/useRecuperarCodigo';
import useRecuperarSenha from '../../hooks/useRecuperarSenha';

function LoginCodigoRecuperacaoSenha() {
    const [codigo, setCodigo] = useState('');
    const { state } = useLocation();
    const email = state?.email; // pegando o email pelo estado da outra página, pois são páginas diferentes 
    const navigate = useNavigate();
    const [mensagemErro, setMensagemErro] = useState('');
    const [desabilitado, setDesabilitado] = useState(false);
    const codigoCorreto = '123456'; // valor para simulacao do código enviado por email
    const { verificarCodigo } = useRecuperarCodigo();
    const { enviarCodigo } = useRecuperarSenha();
    
 
    
    useEffect(() => {
        if (!email) {
            navigate('/'); // caso não identificar o email retornar
        }
    }, [email, navigate]);
    
    const validarCodigo = (codigo) => {
        if (!/^\d+$/.test(codigo)) {
            return 'Digite um código válido para prosseguir.';
        }
        return '';
    };
    
    const reenviarCodigo = async () => {
        setDesabilitado(true);
        enviarCodigo(email, setMensagemErro, setDesabilitado);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const erro = validarCodigo(codigo);
        setMensagemErro(erro);
        
        if (!erro) {
            console.log('codigo válido, prosseguir com envio...');
            verificarCodigo({ email, codigo }, setMensagemErro);
        }
    };
            
    return (
        <div className='container'>
            <div className='container-conteudo-recuperar-senha'> 
                <h1 className='titulo-principal'>Verifique seu email</h1>
                <p className='texto-explicativo'>Digite o código de segurança recebido por email</p>

                <form onSubmit={handleSubmit}>
                    <div className='campo-incluir-codigo'>
                        <div className='input-container'>

                            <label htmlFor='codigo'>Código de segurança</label>

                            <input
                                type='text'
                                id='codigo'
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                required
                            />

                            {/* mostrar o erro */}
                            {mensagemErro && (
                                <p className='mensagem-erro'>{mensagemErro}</p>
                            )}
                        </div>
                    </div>

                    <button id='btn-verificar-codigo' className='btn-verificar-codigo' type='submit'>
                        Verificar
                    </button>
                </form>

                <p className='texto-explicativo'>
                    Não recebeu o código?&nbsp;&nbsp;
                    <span>
                        <a className='link-reenviar-codigo' onClick={reenviarCodigo}>Reenviar</a>
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
