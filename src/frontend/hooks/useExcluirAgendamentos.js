export default function useDeleteAgendamento() {
    const deleteAgendamento = async (agendamentoId, onDelete) => {

        try {
            const response = await fetch("/api/server/excluirAgendamentos", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ agendamentoId }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Agendamento excluído com sucesso!")
                onDelete(agendamentoId);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Erro ao excluir o agendamento:", error);
            alert("Erro ao tentar excluir o agendamento");
        } 
    };

    return { deleteAgendamento };

}

