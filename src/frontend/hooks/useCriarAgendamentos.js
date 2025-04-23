import { useState } from 'react';

export default function useAdicionarAgendamento() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const adicionarAgendamento = async (userID, dataInicio, dataFim, color = "#3174ad") => {
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            const response = await fetch("http://localhost:4000/criarAgendamentos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID,
                    dataInicio,
                    dataFim,
                    color
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccessMessage("Agendamento adicionado com sucesso!");
                return data.agendamentoId;
            } else {
                setError(data.error || "Erro ao adicionar agendamento.");
            }
        } catch (error) {
            console.error("Erro ao adicionar agendamento:", error);
            setError("Erro na comunicação com o servidor.");
        } finally {
            setLoading(false);
        }
    };

    return {
        adicionarAgendamento,
        loading,
        error,
        successMessage,
    };
}
