const { ObjectId } = require("mongodb");
const connectToDatabase = require("../../config/mongodb");
async function adicionarStatusAgendamentoHandler(req, res) {
    try {
        const { tipo, statusAgendamento, userID, agendamentoId, pacienteId } = req.body;
        const db = await connectToDatabase();

        if (!statusAgendamento || !userID || !agendamentoId) {
            return res.status(400).json({ error: "statusAgendamento, userID, agendamentoId são necessários" });
        }

        const usuario = await db.collection("Usuario").findOne({ _id: new ObjectId(userID) })

        if (!usuario) {
            return res.status(400).json({ error: "Usuário não encontrado!" });
        }

        const responder = (resultado) => {
            if (resultado.modifiedCount > 0) {
                return res.status(200).json({ success: true });
            }
            //  else { me irritou pois nao entendi o por que isso aparecer depois de iniciar a sessao
            //     return res.status(404).json({ error: "Agendamento não encontrado ou status não modificado." });
            // }
        };

        if (tipo == 'um') {
            const resultadoStatus = await db.collection("Agendamento").updateOne(
                { _id: new ObjectId(agendamentoId) },
                { $set: { statusAgendamento: statusAgendamento } }
            );

            return responder(resultadoStatus);

        } else if (tipo === 'todos') {
            const resultadoStatus = await db.collection("Agendamento").updateMany(
                { id_paciente: new ObjectId(pacienteId) },
                { $set: { statusAgendamento: statusAgendamento } }
            );

            return responder(resultadoStatus);

        }

    } catch (error) {
        console.error("Erro ao adicionar status:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { adicionarStatusAgendamentoHandler };