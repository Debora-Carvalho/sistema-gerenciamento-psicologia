import { useNavigate } from 'react-router-dom';
import BASE_URL from './configRota';

export default function useRecuperarCodigo() {
    const navigate = useNavigate();

    const verificarCodigo = async ({ email, codigo }, setMensagemErro, onSucesso) => {
        try {
            const response = await fetch(`${BASE_URL}/recuperarCodigo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code: codigo }),
            });

            const data = await response.json();

            if (response.ok) {
                onSucesso?.(); // executa o pop-up de sucesso
            } else {
                setMensagemErro(data.error || 'Erro desconhecido');
            }
        } catch (error) {
            setMensagemErro('Erro de conexão. Tente novamente.');
            console.error('Erro ao enviar código para o backend', error);
        }
    };

    return { verificarCodigo };
}
