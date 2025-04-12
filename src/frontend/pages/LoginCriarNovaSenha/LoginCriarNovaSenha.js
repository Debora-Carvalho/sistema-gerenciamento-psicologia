import React, {useState, useEffect} from 'react';
import './LoginCriarNovaSenha.css';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginCriarNovaSenha() {
    const [novaSenha, setNovaSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();
    const email = state?.email;

    useEffect(() => {
            if (!email) {
                navigate('/');
            }
        }, [email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!novaSenha ) {
            setMensagemErro('Preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/recuperar-senha/nova-senha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    novaSenha
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMensagemErro('');
                setMensagemSucesso('Senha atualizada com sucesso!');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setMensagemErro(data.error || 'Erro ao atualizar a senha');
                setMensagemSucesso('');
            }
        } catch (err) {
            console.error('Erro ao enviar nova senha', err);
            setMensagemErro('Erro de conexão com o servidor.');
        }
    };


    return(
        <div className='container'>
            <h1>Criar nova senha</h1>
            <form onSubmit={handleSubmit}>
                {mensagemErro && <p className="erro">{mensagemErro}</p>}
                {mensagemSucesso && <p className="sucesso">{mensagemSucesso}</p>}

                <label htmlFor="novaSenha">Nova senha:</label>
                <input
                    type="password"
                    id="novaSenha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    required
                />

                <button type="submit">Atualizar Senha</button>
            </form>
        </div>
    );
}

export default LoginCriarNovaSenha;