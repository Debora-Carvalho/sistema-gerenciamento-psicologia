const { ObjectId } = require("mongodb");
const connectToDatabase = require("../config/mongodb");

async function excluirAgendamentoHandler(req, res) {
    try {
        const { agendamentoId } = req.body; 

        if (!agendamentoId) {
            return res.status(400).json({ error: "O ID do agendamento é obrigatório" });
        }

        const db = await connectToDatabase();
        
        const resultado = await db.collection("Agendamento").deleteOne({ _id: new ObjectId(agendamentoId) });

        if (resultado.deletedCount === 1) {
            return res.status(200).json({ success: true, message: "Agendamento excluído com sucesso!" });
        } else {
            return res.status(404).json({ error: "Agendamento não encontrado." });
        }
        
    } catch (error) {
        console.error("Erro ao excluir agendamento:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { excluirAgendamentoHandler };
