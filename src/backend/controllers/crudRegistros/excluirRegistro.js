const { ObjectId } = require("mongodb");
const connectToDatabase = require("../../config/mongodb");

async function excluirRegistroHandler(req, res) {
    try {
        const { registroId } = req.body;

        const db = await connectToDatabase();
        if (!registroId) {
            return res.status(400).json({ error: "O ID do registro é obrigatório" });
        }

        const resultado = await db.collection("Registro").deleteOne({ _id: new ObjectId(registroId) });

        if (resultado.deletedCount === 1) {
            return res.status(200).json({ success: true, message: "Registro excluído com sucesso!" });
        } else {
            return res.status(404).json({ error: "Registro não encontrado." });
        }
    } catch (error) {
        console.error("Erro ao excluir registro(s):", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { excluirRegistroHandler };
