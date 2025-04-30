import { useNavigate } from 'react-router-dom';

export default function useRecuperarSenha() {
    const navigate = useNavigate();

    const enviarCodigo = async (email, setMensagemErro, setDesabilitado) => {
        try {
            const resposta = await fetch("/api/recuperarSenha", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await resposta.json();

            if (!resposta.ok) {
                setMensagemErro(data.error || 'Erro ao enviar o e-mail. Tente novamente.');
                return;
            }

            setMensagemErro('');
            alert('Código de recuperação enviado para seu e-mail!');
            navigate('/recuperar-senha/codigo', { state: { email } });

        } catch (err) {
            console.error(err);
            setMensagemErro('Erro de conexão com o servidor.');
        } finally {

            if (setDesabilitado) {
                setTimeout(() => setDesabilitado(false), 30000);
            }
        }
    };

    return { enviarCodigo };
}
