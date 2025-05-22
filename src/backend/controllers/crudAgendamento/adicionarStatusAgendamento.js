const { ObjectId } = require("mongodb");
const connectToDatabase = require("../../config/mongodb");
async function adicionarStatusAgendamentoHandler(req, res) {
  try {
    const { statusAgendamento, userID, agendamentoId } = req.body;

    if (!statusAgendamento || !userID || !agendamentoId) {
      return res.status(400).json({ error: "statusAgendamento, userID, agendamentoId são necessários" });
    }

    const db = await connectToDatabase();


    const usuario = await db.collection("Usuario").findOne({ _id: new ObjectId(userID) })

    if (!usuario) {
      return res.status(400).json({ error: "Usuário não encontrado!" });
    }
    const resultadoStatus = await db.collection("Agendamento").updateOne(
            { _id: new ObjectId(agendamentoId) },
            { $set: { statusAgendamento: statusAgendamento } }
    );

    if (resultadoStatus.modifiedCount > 0) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ error: "Agendamento não encontrado ou status não modificado." });
    }

  } catch (error) {
    console.error("Erro ao adicionar status:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

module.exports = { adicionarStatusAgendamentoHandler };
