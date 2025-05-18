const { ObjectId } = require("mongodb");
const connectToDatabase = require("../../config/mongodb");

async function buscarAgendamentosHandler(req, res) {
    try {
        const { userID } = req.body;

        if (!userID) {
            return res.status(400).json({ error: "userID é obrigatório" });
        }

        const db = await connectToDatabase();

        const agendamentos = await db.collection("Agendamento").find({ id_usuario: new ObjectId(userID) }).toArray();

        if (!agendamentos || agendamentos.length === 0) {
            return res.status(404).json({ error: "Nenhum agendamento encontrado" });
        }

        res.status(200).json({ agendamentos });
        
    } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { buscarAgendamentosHandler };
