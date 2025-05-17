const { ObjectId } = require("mongodb");
const connectToDatabase = require("../../config/mongodb");

async function alterarAgendamentoHandler(req, res) {
    try {
        const { agendamentoId, novosDados } = req.body;

        if (!agendamentoId) {
            return res.status(400).json({ error: "O ID do agendamento é obrigatório" });
        }

        if (!novosDados || typeof novosDados !== 'object') {
            return res.status(400).json({ error: "Os novos dados do agendamento são obrigatórios e devem ser um objeto" });
        }

        const db = await connectToDatabase();

        const { _id, ...updateData } = novosDados;

        const resultado = await db.collection("Agendamento").updateOne(
            { _id: new ObjectId(agendamentoId) },
            { $set: updateData }
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: "Agendamento não encontrado." });
        }

        return res.status(200).json({ success: true, message: "Agendamento atualizado com sucesso!" });

    } catch (error) {
        console.error("Erro ao alterar agendamento:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { alterarAgendamentoHandler };
