const connectToDatabase = require("../../config/mongodb");
const { ObjectId } = require("mongodb");

async function histoSaudePacienteHandler(req, res) {
    try {
        const { infoMedica, condiMedica, trataAnterior, userID, pacienteId } = req.body;
        const db = await connectToDatabase();

        if (!infoMedica || !condiMedica || !trataAnterior || !userID || !pacienteId) {
            return res.status(400).json({
                error: "infoMedica, condiMedica, trataAnterior, userID, pacienteId são necessários"
            });
        }

        const usuario = await db.collection("Usuario").findOne({ _id: new ObjectId(userID) })
        const paciente = await db.collection("Paciente").findOne({ _id: new ObjectId(pacienteId) })

        if (!usuario || !paciente) {
            return res.status(404).json({ error: "Usuário ou paciente não encontrado" });
        }


        const filtro = {
            id_usuario: new ObjectId(userID),
            id_paciente: new ObjectId(pacienteId)
        };

        const historicoExistente = await db.collection("HistoricoSaude").findOne(filtro);

        if (historicoExistente) {
            await db.collection("HistoricoSaude").updateOne(filtro, {
                $set: {
                    infoMedica,
                    condiMedica,
                    trataAnterior
                }
            });

            return res.status(200).json({ success: true, message: "Histórico de saúde atualizado com sucesso!" });
        } else {
            const novoHistorico = {
                infoMedica,
                condiMedica,
                trataAnterior,
                id_paciente: new ObjectId(paciente._id),
                id_usuario: new ObjectId(usuario._id)
            };

            await db.collection("HistoricoSaude").insertOne(novoHistorico);

            return res.status(201).json({ success: true, message: "Histórico de saúde criado com sucesso!" });
        }

    } catch (error) {
        console.error("Erro ao adicionar/atualizar histórico de saúde:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { histoSaudePacienteHandler };
