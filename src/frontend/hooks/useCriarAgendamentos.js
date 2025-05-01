import BASE_URL from './configRota';

export default function useAdicionarAgendamento() {
    const adicionarAgendamento = async (userID, titulo, dataInicio, dataFim, desc, color = "#3174ad", tipo) => {

        try {
            const response = await fetch(`${BASE_URL}/criarAgendamentos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID,
                    titulo,
                    dataInicio,
                    dataFim,
                    desc,
                    color,
                    tipo
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert("Agendamento criado com sucesso!")
                return data.agendamentoId;
            } else {
                alert(data.error || "Erro ao adicionar agendamento.");
            }
        } catch (error) {
            console.error("Erro ao adicionar agendamento:", error);
            alert("Erro na comunicação com o servidor.");
        }
    };

    return {
        adicionarAgendamento
    };
}
