const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "isabelllacom2l@gmail.com", /// apenas para teste, por favor não utilizar o meu e-mail
    pass: "fmwr kmah wmve zytx"
  }
});

async function sendRecoveryEmail(to, code) {
  await transporter.sendMail({
    from: "isabelllacom2l@gmail.com",
    to,
    subject: "Recuperação de Senha",
    text: `Olá!

    Você solicitou a recuperação de senha na plataforma Seren. 
    
    Aqui está seu código:
    ${code}
    
    O código é válido por 15 minutos.
    
    Se você não solicitou isso, apenas ignore este e-mail.
    
    Abraços,
    Equipe Seren`


  });
}

module.exports = { sendRecoveryEmail };
