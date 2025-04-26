const connectToDatabase = require("../../config/mongodb");

async function buscarPacientesHandler(req, res) {
    try {
        const { userID } = req.body;

        if (!userID) {
            return res.status(400).json({ error: "userID é obrigatório" });
        }

        const db = await connectToDatabase();

        const pacientes = await db
            .collection("Paciente")
            .find({ id_usuario: userID })
            .toArray();

        if (pacientes.length === 0) {
            return res.status(404).json({ error: "Nenhum paciente encontrado para esse usuário" });
        }

        res.status(200).json({ pacientes });
    } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { buscarPacientesHandler };
