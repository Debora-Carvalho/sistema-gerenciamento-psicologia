import { useNavigate } from 'react-router-dom';

export default function useRecuperarCodigo() {
    const navigate = useNavigate();

    const verificarCodigo = async ({ email, codigo }, setMensagemErro) => {
        try {
            const response = await fetch('/api/recuperarCodigo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code: codigo }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Código válido!");
                navigate('/recuperar-senha/nova-senha', { state: { email } });
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
