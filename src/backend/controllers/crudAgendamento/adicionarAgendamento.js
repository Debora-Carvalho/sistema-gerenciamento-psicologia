const { ObjectId } = require("mongodb");
const connectToDatabase = require("../../config/mongodb");
const { sendAppointmentNotificationToUser, sendAppointmentConfirmationToPatient } = require("../../services/emailService");

async function adicionarAgendamentoHandler(req, res) {
  try {
    const { userID, titulo, dataInicio, dataFim, desc, color, tipo, nomePaciente, linkSessao } = req.body;
    const dataInicioObj = new Date(dataInicio);
    const dataFimObj = new Date(dataFim);

    if (!userID || !titulo || !dataInicio || !dataFim || !nomePaciente) {
      return res.status(400).json({ error: "userID, título, dataInicio e dataFim são obrigatórios" });
    }

    const db = await connectToDatabase();

    const agendamentoDuplicado = await db.collection("Agendamento").findOne({
      dataInicio: new Date(dataInicio),
      dataFim: new Date(dataFim)
    });

    if (agendamentoDuplicado) {
      return res.status(400).json({ error: "Já existe um agendamento neste horário." });
    }
    // Isa comentei por que agora o titulo é o nome do paciente entao ira se repetir blz veja o codigo de CriarAgendamento.js
    // const agendamentoAntigo = await db.collection("Agendamento").findOne({ titulo })

    // if (agendamentoAntigo) {
    //   return res.status(400).json({ error: "Agendamento já realizado" });
    // }

    const usuario = await db.collection("Usuario").findOne({ _id: new ObjectId(userID) })
    const paciente = await db.collection("Paciente").findOne({ nome: nomePaciente })

    if (!paciente) {
      return res.status(400).json({ error: "Paciente não encontrado!" });
    }
    const novoAgendamento = {
      id_usuario: new ObjectId(userID),
      id_paciente: new ObjectId(paciente._id),
      titulo,
      dataInicio: dataInicioObj,
      dataFim: dataFimObj,
      desc,
      color: color || "#3174ad",
      tipo,
      nomePaciente,
      linkSessao
    };



    const resultado = await db.collection("Agendamento").insertOne(novoAgendamento);
    const dataInicioFormatada = dataInicioObj.toLocaleDateString("pt-BR");
    const horaInicioFormatada = dataInicioObj.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
    const dataFimFormatada = dataFimObj.toLocaleDateString("pt-BR");
    const horaFimFormatada = dataFimObj.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
    const mesmaData = dataInicioObj.toDateString() === dataFimObj.toDateString();
    const mesmoHorario = horaInicioFormatada === horaFimFormatada;
    const dataTexto = mesmaData ? dataInicioFormatada : `${dataInicioFormatada} até ${dataFimFormatada}`;
    const horarioTexto = mesmoHorario ? horaInicioFormatada : `${horaInicioFormatada} até ${horaFimFormatada}`;

    if (resultado.insertedId) {
      await sendAppointmentNotificationToUser(usuario.email, nomePaciente, dataTexto, horarioTexto, linkSessao)
      await sendAppointmentConfirmationToPatient(paciente.email, nomePaciente, dataTexto, horarioTexto, linkSessao)
      return res.status(201).json({ success: true, message: "Agendamento adicionado com sucesso!", agendamentoId: resultado.insertedId });
    } else {
      return res.status(500).json({ error: "Erro ao adicionar o agendamento." });
    }

  } catch (error) {
    console.error("Erro ao adicionar agendamento:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

module.exports = { adicionarAgendamentoHandler };
