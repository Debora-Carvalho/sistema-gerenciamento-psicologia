const { ObjectId } = require("mongodb");
const connectToDatabase = require("../../config/mongodb");

async function adicionarRegistroHandler(req, res) {
    try {
        const { nomePaciente, conteudoAnotacao, dataHoraAnotacao, userID, pacienteID } = req.body;

        if (!nomePaciente || !conteudoAnotacao || !dataHoraAnotacao || !pacienteID) {
            return res.status(400).json({ error: "nomePaciente, conteudoAnotacao,  dataHoraAnotacao, pacienteID são obrigatórios" });
        }

        const db = await connectToDatabase();

        const registroDuplicado = await db.collection("Registro").findOne({
            dataHoraAnotacao: new Date(dataHoraAnotacao)
        });

        if (registroDuplicado) {
            return res.status(400).json({ error: "Já existe um registro neste horário." });
        }

        const usuario = await db.collection("Usuario").findOne({ _id: userID })
        const paciente = await db.collection("Paciente").findOne({ _id: pacienteID })

        if (!paciente) {
            return res.status(400).json({ error: "Paciente não encontrado!" });
        }

        const novoRegistro = {
            nomePaciente,
            conteudoAnotacao,
            dataHoraAnotacao,
            id_usuario: new ObjectId(usuario._id),
            id_paciente: new ObjectId(paciente._id)
        };

        const resultado = await db.collection("Registro").insertOne(novoRegistro);

        if (resultado.insertedId) {
            return res.status(201).json({ success: true, message: "Registro adicionado com sucesso!" });
        } else {
            return res.status(500).json({ error: "Erro ao adicionar o registro." });
        }

    } catch (error) {
        console.error("Erro ao adicionar registro:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { adicionarRegistroHandler };
