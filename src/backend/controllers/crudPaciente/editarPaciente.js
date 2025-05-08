const connectToDatabase = require("../../config/mongodb");
const { ObjectId } = require("mongodb");

async function editarPacienteHandler(req, res) {
    try {
        const db = await connectToDatabase();
        const {
            id,
            nome,
            profissao,
            genero,
            estadoCivil,
            telefone,
            email,
            preferenciaContato,
            dataNascimento,
            userID
        } = req.body;

        if (!id) {
            return res.status(400).json({ error: "ID do paciente não fornecido." });
        }

        const pacienteAtualizado = {
            nome,
            profissao,
            genero,
            estadoCivil,
            telefone: parseInt(telefone),
            email,
            preferenciaContato,
            dataNascimento: new Date(dataNascimento),
            id_usuario: userID
        };

        const resultado = await db.collection("Paciente").updateOne(
            { _id: new ObjectId(id) },
            { $set: pacienteAtualizado }
        );

        if (resultado.modifiedCount === 0) {
            return res.status(404).json({ error: "Paciente não encontrado ou dados idênticos aos existentes." });
        }

        return res.status(200).json({ success: true, message: "Paciente atualizado com sucesso!", pacienteAtualizado });
    } catch (error) {
        console.error("Erro ao editar paciente:", error);
        return res.status(500).json({ error: "Erro interno ao editar paciente." });
    }
}

module.exports = { editarPacienteHandler };
