import BASE_URL from '../configRota';

export default function useBuscarHisto() {
    async function buscarHistoricoSaude(pacienteID) {
        try {
            const response = await fetch(`${BASE_URL}/buscarHistoSaude`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pacienteID }),
            });

            const data = await response.json();

            if (response.ok && data.historicoSaude) {
                return {
                    historicoSaude: data.historicoSaude,
                    success: true,
                    error: null,
                };
            } else {
                return {
                    historicoSaude: null,
                    success: false,
                    error: data.error || "Erro ao buscar histórico de saúde.",
                };
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            return {
                historicoSaude: null,
                success: false,
                error: "Erro na comunicação com o servidor.",
            };
        }
    }

    return { buscarHistoricoSaude };
}
