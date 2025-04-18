import React, { useState, useEffect } from 'react';
import './LoginCodigoRecuperacaoSenha.css';
import imgHomemVerifiqueEmail from '../../assets/images/image-homem-verifiqueemail.png';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginCodigoRecuperacaoSenha() {
    const [codigo, setCodigo] = useState('');
    const { state } = useLocation();
    const email = state?.email; // pegando o email pelo estado da outra página, pois são páginas diferentes 
    const navigate = useNavigate();
    const [mensagemErro, setMensagemErro] = useState('');
    const [desabilitado, setDesabilitado] = useState(false);
    const codigoCorreto = '123456'; // valor para simulacao do código enviado por email
 
    
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
        try {
          const res = await fetch('http://localhost:4000/recuperar-senha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
      
          const data = await res.json();
      
          if (!res.ok) {
            alert(data.error || "Erro ao reenviar código.");
            return;
          }
      
          alert("Novo código enviado para o seu e-mail.");
        } catch (err) {
          console.error(err);
          alert("Erro de conexão ao tentar reenviar o código.");
        } finally {
            setTimeout(() => setDesabilitado(false), 30000);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const erro = validarCodigo(codigo);
        setMensagemErro(erro);
        

        if (!erro) {
            console.log('codigo válido, prosseguir com envio...');
            try {
                const response = await fetch('http://localhost:4000/recuperar-senha/codigo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email, 
                        code: codigo
                    })
                });const data = await response.json();

                if (response.ok) {
                    console.log('Código válido, prosseguir com envio...');
                    await alert("Código válido!")
                    navigate('/recuperar-senha/nova-senha',{ state: { email } }) // enviando o email para a página de senha
                } else {
                    setMensagemErro(data.error || 'Erro desconhecido');
                }

            } catch (error) {
                setMensagemErro('Erro de conexão. Tente novamente.');
                console.error('Erro ao enviar código para o backend', error);
            }
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
