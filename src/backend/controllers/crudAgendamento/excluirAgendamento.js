const { ObjectId } = require("mongodb");
const connectToDatabase = require("../../config/mongodb");

async function excluirAgendamentoHandler(req, res) {
    try {
        const { agendamentoId, pacienteId, tipo } = req.body;

        const db = await connectToDatabase();

        if (tipo === 'um') {
            if (!agendamentoId) {
                return res.status(400).json({ error: "O ID do agendamento é obrigatório" });
            }

            const resultado = await db.collection("Agendamento").deleteOne({ _id: new ObjectId(agendamentoId) });

            if (resultado.deletedCount === 1) {
                return res.status(200).json({ success: true, message: "Agendamento excluído com sucesso!" });
            } else {
                return res.status(404).json({ error: "Agendamento não encontrado." });
            }

        } else if (tipo === 'todos') {
            if (!pacienteId || !ObjectId.isValid(pacienteId)) {
                return res.status(400).json({ error: "ID do paciente é obrigatório ou inválido" });
            }

            const resultado = await db.collection("Agendamento").deleteMany({
                id_paciente: new ObjectId(pacienteId)
            });

            return res.status(200).json({
                success: true,
                message: `${resultado.deletedCount} agendamentos do paciente foram excluídos com sucesso!`,
            });
        } else {
            return res.status(400).json({ error: "Tipo de exclusão inválido" });
        }

    } catch (error) {
        console.error("Erro ao excluir agendamento(s):", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { excluirAgendamentoHandler };
