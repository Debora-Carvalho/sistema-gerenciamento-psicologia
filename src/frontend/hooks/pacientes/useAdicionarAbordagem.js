import BASE_URL from '../configRota';

export default function useAdicionarAbordagem() {
  async function adicionarAbordagem({ abordagem, userID, pacienteId }) {
    try {
      const response = await fetch(`${BASE_URL}/adicionarAbordagem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ abordagem, userID, pacienteId }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        return {
          success: true,
          message: data.message,
          error: null,
        };
      } else {
        return {
          success: false,
          message: null,
          error: data.error || 'Erro ao adicionar abordagem.',
        };
      }
    } catch (error) {
      console.error('Erro ao adicionar abordagem:', error);
      return {
        success: false,
        message: null,
        error: 'Erro de conexão com o servidor.',
      };
    }
  }

  return { adicionarAbordagem };
}
