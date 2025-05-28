import { useState, useCallback } from 'react';
import useAtualizarStatusAgendamento from './useAtualizarAgendamentoStatus';
//preferivel trazer o objeto inteiro de agendamento pois necessario no atualizaStatus
export default function useAgendamentoStatus(userID, agendamentoId, agendamento) {
    const estadoInicialLocalStorage = localStorage.getItem(`atendimento-${agendamentoId}`) === 'true';
    const [ativaAtendimento, setAtivaAtendimento] = useState(estadoInicialLocalStorage);
    const { atualizarStatus } = useAtualizarStatusAgendamento();
    const tipo = 'um';

    const alternarAtendimento = useCallback(() => {
        const novoStatus = !ativaAtendimento;
        const statusAgendamento = novoStatus ? "Em andamento" : "Concluído";
        const pacienteId = agendamento.id_paciente

        setAtivaAtendimento(novoStatus);
        localStorage.setItem(`atendimento-${agendamentoId}`, novoStatus);
        atualizarStatus({tipo, statusAgendamento, userID, agendamentoId, pacienteId});
    }, [ativaAtendimento, atualizarStatus, userID, agendamentoId]);

    return { ativaAtendimento, alternarAtendimento };
}
