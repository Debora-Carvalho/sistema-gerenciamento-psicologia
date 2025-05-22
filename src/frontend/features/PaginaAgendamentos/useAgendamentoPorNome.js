import { useMemo } from 'react';
import useMapearAgendamentos from './useMapearAgendamentos'; 

const useAgendamentosPorNome = (nomePacienteBusca, filtro) => {
  const agendamentos = useMapearAgendamentos();

  const agendamentosFiltrados = useMemo(() => {
    const hoje = new Date().toLocaleDateString('pt-BR');

    return agendamentos.filter((agendamento) => {
    
      const nomeValido = agendamento.nomePaciente.toLowerCase().includes(nomePacienteBusca.toLowerCase());
      const dataAgendamento = new Date(agendamento.dataInicio).toLocaleDateString('pt-BR');
      const status = agendamento.statusAgendamento?.toLowerCase();

      if (!nomeValido) return false; 

      switch (filtro) {
        case 'hoje':
          return dataAgendamento === hoje && status !== 'concluído' && status !== 'cancelado';
        case 'proximos':
          return dataAgendamento !== hoje && status !== 'concluído' && status !== 'cancelado';
        case 'concluidos':
          return status === 'concluído';
        case 'cancelados':
          return status === 'cancelado';
        default:
          return true; 
      }
    });
  }, [agendamentos, nomePacienteBusca, filtro]);

  return agendamentosFiltrados;
}

export default useAgendamentosPorNome;
