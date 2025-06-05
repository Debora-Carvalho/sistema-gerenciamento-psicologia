import BASE_URL from '../configRota';

export default function useHistoSaudePaciente() {
    async function adicionarHistoricoSaude({ infoMedica, condiMedica, trataAnterior, userID, pacienteId }) {
        try {
            const response = await fetch(`${BASE_URL}/histoSaudePaciente`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ infoMedica, condiMedica, trataAnterior, userID, pacienteId }),
            });

            const data = await response.json();

            if (response.ok) {
                return {
                    success: true,
                    message: data.message || "Histórico adicionado com sucesso!",
                    error: null,
                };
            } else {
                return {
                    success: false,
                    message: null,
                    error: data.error || "Erro ao adicionar histórico.",
                };
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            return {
                success: false,
                message: null,
                error: "Erro na comunicação com o servidor.",
            };
        }
    }

    return { adicionarHistoricoSaude };
}
