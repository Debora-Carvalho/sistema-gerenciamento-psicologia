const { ObjectId } = require("mongodb");
const connectToDatabase = require("../../config/mongodb");

async function buscarRegistrosHandler(req, res) {
    try {
        const { userID } = req.body;

        if (!userID) {
            return res.status(400).json({ error: "userID é obrigatório" });
        }

        const db = await connectToDatabase();

        const registros = await db.collection("Registro").find({ id_usuario: new ObjectId(userID) }).toArray();

        if (!registros || registros.length === 0) {
            return res.status(404).json({ error: "Nenhum registro encontrado" });
        }

        res.status(200).json({ registros });

    } catch (error) {
        console.error("Erro ao buscar registros:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { buscarRegistrosHandler };
