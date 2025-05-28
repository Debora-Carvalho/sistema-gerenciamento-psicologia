import BASE_URL from '../../hooks/configRota.js';

export default function useAtualizarStatusAgendamento() {
    const atualizarStatus = async ({tipo, statusAgendamento, userID, agendamentoId, pacienteId}) => {

        try {
            const response = await fetch(`${BASE_URL}/adicionarStatusAgendamento`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tipo,
                    statusAgendamento,
                    userID,
                    agendamentoId,
                    pacienteId
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                console.log("Status atualizado com sucesso.");
                window.location.reload();
            } else {
                alert(data.error || "Erro ao atualizar status do agendamento.");
            }
        } catch (error) {
            console.error("Erro ao atualizar status do agendamento:", error);
            alert("Erro ao tentar atualizar o status do agendamento.");
        }
    };

    return { atualizarStatus };
}
