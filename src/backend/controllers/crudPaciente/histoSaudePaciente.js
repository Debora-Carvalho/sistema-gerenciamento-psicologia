const connectToDatabase = require("../../config/mongodb");

async function histoSaudePacienteHandler(req, res) {
    try {
        const { infoMedica, condiMedica, trataAnterior, userID, pacienteId } = req.body;
        const db = await connectToDatabase();

        if (!infoMedica || !condiMedica || !trataAnterior || !userID || !pacienteId) {
            return res.status(400).json({
                error: "infoMedica, condiMedica, trataAnterior, userID, pacienteId são necessários"
            });
        }

        const filtro = {
            id_usuario: userID,
            id_paciente: pacienteId
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
                id_paciente: pacienteId,
                id_usuario: userID
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
