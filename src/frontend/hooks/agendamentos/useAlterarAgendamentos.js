import BASE_URL from '../configRota';

export default function useAlterarAgendamento() {
    const alterarAgendamento = async ( agendamentoId, novosDados, onSuccess) => {
        try {
            const response = await fetch(`${BASE_URL}/alterarAgendamentos`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ agendamentoId, novosDados }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                if (onSuccess) onSuccess(); 
                return data.agendamentoId;
            } else {
                alert(data.error || "Erro ao editar agendamento.");
            }

        } catch (error) {
            console.error("Erro ao alterar o agendamento:", error);
            alert("Erro ao tentar alterar o agendamento");
        }
    };

    return { alterarAgendamento };
}