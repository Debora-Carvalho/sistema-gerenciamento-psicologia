const { ObjectId } = require("mongodb");
const connectToDatabase = require("../../config/mongodb");
const {sendReagendamentoConfirmationToPatient, sendReagendamentoNotificationToUser} = require("../../services/emailService");

async function alterarAgendamentoHandler(req, res) {
    try {
        const { agendamentoId, novosDados } = req.body;

        if (!agendamentoId) {
            return res.status(400).json({ error: "O ID do agendamento é obrigatório" });
        }

        if (!novosDados || typeof novosDados !== 'object') {
            return res.status(400).json({ error: "Os novos dados do agendamento são obrigatórios e devem ser um objeto" });
        }

        const db = await connectToDatabase();
        //verificando se o agendamento existe no banco
        const agendamentoExistente = await db.collection("Agendamento").findOne({ _id: new ObjectId(agendamentoId) });
        //agendamento não existindo enviando erro
        if (!agendamentoExistente) {
            return res.status(404).json({ error: "Agendamento não encontrado." });
        }

        //transformando data enviada para new data
        const novoDataInicio = new Date(novosDados.dataInicio);
        const novoDataFim = new Date(novosDados.dataFim)    ;

        //verificando se existe mudnaça no horario e data do agendamento
        const houveMudancadata =
            (novoDataInicio && novoDataInicio.getTime() !== new Date(agendamentoExistente.dataInicio).getTime()) ||
            (novoDataFim && novoDataFim.getTime() !== new Date(agendamentoExistente.dataFim).getTime());
        
        const { _id, ...updateData } = novosDados;

        //sobreescrevendo os dads de datainicio e datafim do updateData, pois agora esta em Data
        if (novoDataInicio) updateData.dataInicio = novoDataInicio;
        if(novoDataFim) updateData.dataFim = novoDataFim;

        const resultado = await db.collection("Agendamento").updateOne(
            { _id: new ObjectId(agendamentoId) },
            { $set: updateData }
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: "Agendamento não encontrado." });
        }

        // Enviar e-mails de notificação se houveMudancadata for true
        if (houveMudancadata) {
            const usuario = await db.collection("Usuario").findOne({ _id: new ObjectId(agendamentoExistente.id_usuario) });
            const paciente = await db.collection("Paciente").findOne({ _id: new ObjectId(agendamentoExistente.id_paciente) });

            const dataInicioFormatada = novoDataInicio.toLocaleDateString("pt-BR");
            const horaInicioFormatada = novoDataInicio.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
            const dataFimFormatada = novoDataFim.toLocaleDateString("pt-BR");
            const horaFimFormatada = novoDataFim.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });

            const mesmaData = novoDataInicio.toDateString() === novoDataFim.toDateString();
            const mesmoHorario = horaInicioFormatada === horaFimFormatada;
            const dataTexto = mesmaData ? dataInicioFormatada : `${dataInicioFormatada} até ${dataFimFormatada}`;
            const horarioTexto = mesmoHorario ? horaInicioFormatada : `${horaInicioFormatada} até ${horaFimFormatada}`;

            await sendReagendamentoNotificationToUser(usuario.email, paciente.nome, dataTexto, horarioTexto, agendamentoExistente.linkSessao);
            await sendReagendamentoConfirmationToPatient(paciente.email, paciente.nome, dataTexto, horarioTexto, agendamentoExistente.linkSessao);
        }

        return res.status(200).json({ success: true, message: "Agendamento atualizado com sucesso!" });

    } catch (error) {
        console.error("Erro ao alterar agendamento:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { alterarAgendamentoHandler };