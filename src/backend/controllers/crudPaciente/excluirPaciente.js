const { ObjectId } = require("mongodb");
const connectToDatabase = require("../../config/mongodb");

async function excluirPacienteHandler(req, res) {
    try {
        const { pacienteID } = req.body;

        if (!pacienteID) {
            return res.status(400).json({ error: "pacienteID é obrigatório" });
        }

        const db = await connectToDatabase();

        const resultado = await db
            .collection("Paciente")
            .deleteOne({ _id: new ObjectId(pacienteID) });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ error: "Paciente não encontrado" });
        }

        res.status(200).json({ mensagem: "Paciente excluído com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir paciente:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { excluirPacienteHandler };
