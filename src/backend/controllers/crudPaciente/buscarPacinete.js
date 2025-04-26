const { ObjectId } = require("mongodb");
const connectToDatabase = require("../../config/mongodb");

function isValidObjectId(id) {
    return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
}

async function buscarPacienteHandler(req, res) {
    try {
        const { pacienteID } = req.body;

        if (!pacienteID) {
            return res.status(400).json({ error: "pacienteID é obrigatório" });
        }

        if (!isValidObjectId(pacienteID)) {
            return res.status(400).json({ error: "pacienteID inválido" });
        }

        const db = await connectToDatabase();
        const paciente = await db.collection("Paciente").findOne({ _id: new ObjectId(pacienteID) });

        if (!paciente) {
            return res.status(404).json({ error: "Paciente não encontrado" });
        }

        const { senha, ...dadosPaciente } = paciente;

        res.status(200).json({ paciente: dadosPaciente });
    } catch (error) {
        console.error("Erro ao buscar paciente:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { buscarPacienteHandler };
