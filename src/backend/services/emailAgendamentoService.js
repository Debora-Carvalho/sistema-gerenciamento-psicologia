const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "seren.atendimento@gmail.com", 
    pass: "hajd raou mdka hpwo"
  }
});

async function sendConfirmationEmail(to, nomePaciente, dataInicio, dataFim) {
  await transporter.sendMail({
    from: "seren.atendimento@gmail.com",
    to,
    subject: "Consulta",
    text: `Olá! ${nomePaciente},

    Sua consulta foi confirmada para ${dataInicio} e ${dataFim}.
    Abraços,
    Equipe Seren`


  });
}

module.exports = { sendConfirmationEmail };
