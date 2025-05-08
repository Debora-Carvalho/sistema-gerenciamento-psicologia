import React, { useState, useEffect } from 'react';
import './LoginCodigoRecuperacaoSenha.css';
import imgHomemVerifiqueEmail from '../../assets/images/image-homem-verifiqueemail.png';
import { useLocation, useNavigate } from 'react-router-dom';
import useRecuperarCodigo from '../../hooks/useRecuperarCodigo';
import useRecuperarSenha from '../../hooks/useRecuperarSenha';
import PopupPadrao from '../../components/PopupPadrao/PopupPadrao.js';

function LoginCodigoRecuperacaoSenha() {
    const [codigo, setCodigo] = useState('');
    const { state } = useLocation();
    const email = state?.email; // pegando o email pelo estado da outra página, pois são páginas diferentes 
    const navigate = useNavigate();
    const [mensagemErro, setMensagemErro] = useState('');
    const [desabilitado, setDesabilitado] = useState(false);
    const codigoCorreto = '123456'; // valor para simulacao do código enviado por email
    const { verificarCodigo } = useRecuperarCodigo();
    const [popupReenvioAberto, setPopupReenvioAberto] = useState(false);
    const [popupCodigoValidoAberto, setPopupCodigoValidoAberto] = useState(false);
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
        enviarCodigo(
            email,
            setMensagemErro,
            setDesabilitado,
            () => setPopupReenvioAberto(true) // exibir o popup
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const erro = validarCodigo(codigo);
        setMensagemErro(erro);
        
        if (!erro) {
            console.log('codigo válido, prosseguir com envio...');
            verificarCodigo(
                { email, codigo },
                setMensagemErro,
                () => setPopupCodigoValidoAberto(true) // abrir o popup quando for sucesso
            );
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

                            <button id='btn-verificar-codigo' className='btn-verificar-codigo' type='submit'>
                                Verificar
                            </button>
                        </div>
                    </div>
                </form>

                <p className='texto-explicativo'>
                    Não recebeu o código?&nbsp;&nbsp;
                    <span>
                        <a className='link-reenviar-codigo' onClick={reenviarCodigo}>Reenviar</a>
                    </span>
                </p>
            </div>

            <PopupPadrao
                aberto={popupReenvioAberto}
                titulo="Código Reenviado!"
                mensagem="Um novo código foi enviado para seu e-mail, verifique a caixa de entrada."
                textoBotao="Continuar"
                onBotaoClick={() => setPopupReenvioAberto(false)}
            />

            <PopupPadrao
                aberto={popupCodigoValidoAberto}
                titulo="Código Verificado!"
                mensagem="Vamos prosseguir para definir sua nova senha."
                textoBotao="Continuar"
                onBotaoClick={() => {
                    setPopupCodigoValidoAberto(false);
                    navigate('/recuperar-senha/nova-senha', { state: { email } });
                }}
            />

            <img
                src={imgHomemVerifiqueEmail}
                className='imagem-principal'
                alt="Ilustração de homem com expressão sorridente, sentado em sofá e com notebook em seu colo."
            />
        </div>
    );
}

export default LoginCodigoRecuperacaoSenha;
