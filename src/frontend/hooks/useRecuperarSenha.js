import { useNavigate } from 'react-router-dom';
import BASE_URL from './configRota';

export default function useRecuperarSenha() {
    const navigate = useNavigate();

    const enviarCodigo = async (email, setMensagemErro, setDesabilitado, onSucesso) => {
        try {
            const resposta = await fetch(`${BASE_URL}/recuperarSenha`, {
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
            onSucesso?.(); // executa o pop-up de sucesso

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
