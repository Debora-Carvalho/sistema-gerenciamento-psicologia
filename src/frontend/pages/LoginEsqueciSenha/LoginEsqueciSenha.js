import React, { useState } from 'react';
import './LoginEsqueciSenha.css';
import imgMulherEsqueciSenha from '../../assets/images/image-mulher-esquecisenha.png';
import useDocumentTitle from '../../components/useDocumentTitle'
import useRecuperarSenha from '../../hooks/useRecuperarSenha';


function LoginEsqueciSenha() {
    useDocumentTitle("Recuperar Senha | Seren");// mudando o Title da pagina
    const [email, setEmail] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [desabilitado, setDesabilitado] = useState(false);
    const { enviarCodigo } = useRecuperarSenha();

    const validarEmail = (email) => {
        if (!email.includes('@')) {
            return 'Digite um email válido, é necessário conter o "@"';
        }

        const [usuario, dominio] = email.split('@');

        if (!usuario || !dominio) {
            return 'Digite um email válido para prosseguir.';
        }

        return ''; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const erro = validarEmail(email);
        setMensagemErro(erro);

        if (!erro) {
            console.log('email válido, prosseguir com envio...');
            setDesabilitado(true);
            enviarCodigo(email, setMensagemErro, setDesabilitado);
        }
    };

    return (
        <div className='container'>
            <div className='container-conteudo-esqueci-senha'> 
                <h1 className='titulo-principal'>Esqueci minha senha</h1>
                <p className='texto-explicativo'>Confirme o email cadastrado nessa conta para receber</p>
                <p className='texto-explicativo'>um código de segurança e criar uma nova senha</p>

                <form onSubmit={handleSubmit}>
                    <div className='campo-esqueci-senha'>
                        <div className='input-container'>

                            <label htmlFor='email'>Email</label>

                            <input
                                type='text'
                                id='email'
                                placeholder='Ex.: meunome@gmail.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            {/* mostrar o erro */}
                            {mensagemErro && (
                                <p className='mensagem-erro'>{mensagemErro}</p>
                            )}
                        </div>
                    </div>

                    <button id='btn-enviar-email' className='btn-enviar-email' type='submit'>
                        Enviar email
                    </button>
                </form>

                <p className='texto-explicativo'>
                    Lembrou a senha?&nbsp;&nbsp;
                    <span>
                        <a href='/' className='link-pagina-login'>Login</a>
                    </span>
                </p>
            </div>
            
            <img
                src={imgMulherEsqueciSenha}
                className='imagem-principal'
                alt="Ilustração de mulher com expressão de dúvida, sentada em sofá e com notebook em seu colo."
            />
        </div>
    );
}

export default LoginEsqueciSenha;

