import BASE_URL from '../configRota';
export default function useDeleteAgendamento() {
    const deleteAgendamento = async ({ agendamentoId, pacienteId, tipo }) => {

        try {
            const response = await fetch(`${BASE_URL}/excluirAgendamentos`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ agendamentoId, pacienteId, tipo }),
            });

            const data = await response.json();

            if (response.ok) {
                return { sucesso: true, mensagem: data.message };
            } else {
                return { sucesso: false, mensagem: data.error };
            }
        } catch (error) {
            console.error("Erro ao excluir o(s) agendamento:", error);
            return { sucesso: false, mensagem: "Erro ao tentar excluir o(s) agendamento" };
        }
    };

    return { deleteAgendamento };

}

