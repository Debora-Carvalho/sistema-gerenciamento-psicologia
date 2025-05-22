import { useState, useCallback } from 'react';
import useAtualizarStatusAgendamento from './useAtualizarAgendamentoStatus';

export default function useAgendamentoStatus(userID, agendamentoId) {
  const estadoInicialLocalStorage = localStorage.getItem(`atendimento-${agendamentoId}`) === 'true';
  const [ativaAtendimento, setAtivaAtendimento] = useState(estadoInicialLocalStorage);
  const { atualizarStatus } = useAtualizarStatusAgendamento();

  const alternarAtendimento = useCallback(() => {
    const novoStatus = !ativaAtendimento;
    const statusAgendamento = novoStatus ? "Em andamento" : "Concluído";

    setAtivaAtendimento(novoStatus);
    localStorage.setItem(`atendimento-${agendamentoId}`, novoStatus);
    atualizarStatus(statusAgendamento, userID, agendamentoId);
  }, [ativaAtendimento, atualizarStatus, userID, agendamentoId]);

  return { ativaAtendimento, alternarAtendimento };
}
