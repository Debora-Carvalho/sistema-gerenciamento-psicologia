const { ObjectId } = require("mongodb");
const connectToDatabase = require("../../config/mongodb");

async function alterarRegistroHandler(req, res) {
    try {
        const { registroId, novosDados } = req.body;

        if (!registroId) {
            return res.status(400).json({ error: "O ID do registro é obrigatório" });
        }

        if (!novosDados || typeof novosDados !== 'object') {
            return res.status(400).json({ error: "Os novos dados do registro são obrigatórios e devem ser um objeto" });
        }

        const db = await connectToDatabase();

        const { _id, ...updateData } = novosDados;

        const resultado = await db.collection("Registro").updateOne(
            { _id: new ObjectId(registroId) },
            { $set: updateData }
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: "Registro não encontrado." });
        }

        return res.status(200).json({ success: true, message: "Registro atualizado com sucesso!" });

    } catch (error) {
        console.error("Erro ao alterar registro:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { alterarRegistroHandler };
