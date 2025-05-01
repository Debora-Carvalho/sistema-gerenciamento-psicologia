import BASE_URL from './configRota';

export default function useAgendamentos() {
    const buscarAgendamentos = async (userID) => {
        try {
            const response = await fetch(`${BASE_URL}/buscarAgendamentos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userID }),
            });

            const data = await response.json();

            if (response.ok && Array.isArray(data.agendamentos)) {
                return {
                    agendamentos: data.agendamentos,
                    success: true,
                    error: null,
                };
            } else {
                return {
                    agendamentos: [],
                    success: false,
                    error: data.error || "Erro ao buscar agendamentos.",
                };
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            return {
                agendamentos: [],
                success: false,
                error: "Erro na comunicação com o servidor.",
            };
        }
    };

    return { buscarAgendamentos };
}
