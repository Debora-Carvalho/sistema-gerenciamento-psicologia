import VLibras from "../../components/VLibras/VLibras";

export default function handleLibras() {
  const habilitarLibras = async (userID, titulo, dataInicio, dataFim, desc, color = "#3174ad", tipo, nomePaciente, linkSessao) => {

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
          tipo,
          nomePaciente,
          linkSessao
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
    habilitarLibras
  };
}
