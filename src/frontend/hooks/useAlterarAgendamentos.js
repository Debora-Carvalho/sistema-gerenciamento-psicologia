export default function useAlterarAgendamento() {
    const alterarAgendamento = async (agendamentoId, novosDados, onUpdate) => {
        try {
            const response = await fetch("/api/alterarAgendamentos", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ agendamentoId, novosDados }),
            });

            const data = await response.json();

            if (response.ok) {
                if (onUpdate) {
                    onUpdate(agendamentoId, novosDados);
                }
            } else {
                alert(data.error || "Erro ao alterar o agendamento.");
            }
        } catch (error) {
            console.error("Erro ao alterar o agendamento:", error);
            alert("Erro ao tentar alterar o agendamento");
        }
    };

    return { alterarAgendamento };
}
