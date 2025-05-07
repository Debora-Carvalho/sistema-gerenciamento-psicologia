const connectToDatabase = require("../../config/mongodb");

async function cadastroPacienteHandler(req, res) {
    try {
        const db = await connectToDatabase();
        const {
            nome,
            profissao,
            genero,
            estadoCivil,
            telefone,
            email,
            preferenciaContato,
            dataNascimento,
            userID,
        } = req.body;

        const pacienteExistente = await db.collection("Paciente").findOne({ email });

        if (pacienteExistente) {
            res.writeHead(400);
            return res.status(400).json({ error: "Paciente já possui conta!" });
        }

        const novoPaciente = {
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

        await db.collection("Paciente").insertOne(novoPaciente);

        return res.status(201).json({ success: true, message: "Paciente cadastrado com sucesso!", pacienteCadastrado: novoPaciente });
    } catch (error) {
        console.error("Erro ao cadastrar paciente:", error);
        return res.status(500).json({ error: "Erro interno ao cadastrar Paciente." });
    }
}

module.exports = { cadastroPacienteHandler };
