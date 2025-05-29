const connectToDatabase = require("../../config/mongodb");
const { ObjectId } = require("mongodb");

async function buscarHistoSaudeHandler(req, res) {
  try {
    const { pacienteID } = req.body;

    if (!pacienteID) {
      return res.status(400).json({ error: "pacienteID é obrigatório" });
    }

    const db = await connectToDatabase();



    const historicoSaude = await db
      .collection("HistoricoSaude")
      .findOne({ id_paciente: new ObjectId(pacienteID) }); 

    if (!historicoSaude) {
      return res.status(404).json({ error: "Histórico de Saúde não encontrado" });
    }

    res.status(200).json({ historicoSaude });
  } catch (error) {
    console.error("Erro ao buscar histórico de saúde:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}


module.exports = { buscarHistoSaudeHandler };
