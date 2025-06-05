const connectToDatabase = require("../../config/mongodb");
const { ObjectId } = require("mongodb");

async function adicionarAbordagemHandler(req, res) {
    try {
        const { abordagem, userID, pacienteId } = req.body;
        const db = await connectToDatabase();

        if (!abordagem || !userID || !pacienteId) {
            return res.status(400).json({ error: "abordagem, userID, pacienteId são necessários" });
        }

        const filtro = {
            id_usuario: new ObjectId(userID),
            id_paciente: new ObjectId(pacienteId)
        };

        const historicoExistente = await db.collection("HistoricoSaude").findOne(filtro);

        if (historicoExistente) {
            await db.collection("HistoricoSaude").updateOne(
                { _id: historicoExistente._id },
                { $set: { abordagem } }
            );

            return res.status(200).json({ success: true, message: "Abordagem atualizada com sucesso!" });
        }

        const novoHistorico = {
            abordagem,
            id_paciente: new ObjectId(pacienteId),
            id_usuario: new ObjectId(userID),
        };

        await db.collection("HistoricoSaude").insertOne(novoHistorico);

        return res.status(201).json({ success: true, message: "Abordagem adicionada com sucesso!" });

    } catch (error) {
        console.error("Erro ao adicionar abordagem:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { adicionarAbordagemHandler };
