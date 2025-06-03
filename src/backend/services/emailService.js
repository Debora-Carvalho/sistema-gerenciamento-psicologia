const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "seren.atendimento@gmail.com",
        pass: "hajd raou mdka hpwo"
    }
});

async function sendRecoveryEmail(to, code) {
    await transporter.sendMail({
        from: "seren.atendimento@gmail.com",
        to,
        subject: "Recuperação de Senha - Seren",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="text-align: center;">
            <img src="https://raw.githubusercontent.com/Debora-Carvalho/sistema-gerenciamento-psicologia/refs/heads/master/src/frontend/assets/images/image-btn-home-pacientes.png" alt="Logo Seren" style="max-width: 150px; margin-bottom: 20px;" />
            </div>
            <h2 style="color: #4A90E2;">Recuperação de Senha</h2>
            <p>Olá!</p>
            <p>Recebemos uma solicitação para redefinir sua senha na plataforma <strong>Seren</strong>.</p>
            <p>Use o código abaixo para prosseguir com a redefinição:</p>
            <div style="font-size: 24px; font-weight: bold; background-color: #f4f4f4; padding: 12px; text-align: center; border-radius: 5px; margin: 20px 0;">
            ${code}
            </div>
            <p>Este código é válido por <strong>15 minutos</strong>.</p>
            <p>Se você não fez essa solicitação, pode ignorar este e-mail com segurança.</p>
            <br />
            <p style="color: #777;">Atenciosamente,<br>Equipe Seren</p>
        </div>
        `
    });
}

async function sendAppointmentNotificationToUser(to, nomePaciente, dataTexto, horarioTexto, linkSessao) {
    await transporter.sendMail({
        from: "seren.atendimento@gmail.com",
        to,
        subject: "Novo Agendamento Recebido - Seren",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="text-align: center;">
            <img src="https://raw.githubusercontent.com/Debora-Carvalho/sistema-gerenciamento-psicologia/refs/heads/master/src/frontend/assets/images/image-btn-home-pacientes.png" alt="Logo Seren" style="max-width: 150px; margin-bottom: 20px;" />
            </div>
            <h2 style="color: #4A90E2;">Novo Agendamento</h2>
            <p>Olá!</p>
            <p>Um novo agendamento foi realizado por <strong>${nomePaciente}</strong>.</p>
            <p><strong>Data:</strong>${dataTexto} <br />
            <strong>Horário:</strong> ${horarioTexto}</p>
            <p>Link da sessão:</p>
            <p><a href="${linkSessao}" target="_blank">${linkSessao}</a></p>
            <br />
            <p style="color: #777;">Atenciosamente,<br>Equipe Seren</p>
        </div>
        `
    });
}

async function sendAppointmentConfirmationToPatient(to, nomePaciente, dataTexto, horarioTexto, linkSessao) {
    await transporter.sendMail({
        from: "seren.atendimento@gmail.com",
        to,
        subject: "Confirmação de Agendamento - Seren",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="text-align: center;">
            <img src="https://raw.githubusercontent.com/Debora-Carvalho/sistema-gerenciamento-psicologia/refs/heads/master/src/frontend/assets/images/image-btn-home-pacientes.png" alt="Logo Seren" style="max-width: 150px; margin-bottom: 20px;" />
            </div>
            <h2 style="color: #4A90E2;">Agendamento Confirmado</h2>
            <p>Olá ${nomePaciente},</p>
            <p>Seu agendamento foi confirmado com sucesso na plataforma <strong>Seren</strong>.</p>
            <p><strong>Data:</strong> ${dataTexto}<br />
            <strong>Horário:</strong> ${horarioTexto}</p>
            <p>Você pode acessar a sessão no horário marcado pelo link abaixo:</p>
            <p style="text-align: center; margin: 20px 0;">
            <a href="${linkSessao}" style="background-color: #4A90E2; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px;">Entrar na Sessão</a>
            </p>
            <p>Se precisar reagendar ou cancelar, entre em contato com a profissional.</p>
            <br />
            <p style="color: #777;">Atenciosamente,<br>Equipe Seren</p>
        </div>
        `
    });
}

async function sendReagendamentoNotificationToUser(to, nomePaciente, dataTexto, horarioTexto, linkSessao) {
    await transporter.sendMail({
        from: "seren.atendimento@gmail.com",
        to,
        subject: "Agendamento Reagendado - Seren",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="text-align: center;">
                <img src="https://raw.githubusercontent.com/Debora-Carvalho/sistema-gerenciamento-psicologia/refs/heads/master/src/frontend/assets/images/image-btn-home-pacientes.png" alt="Logo Seren" style="max-width: 150px; margin-bottom: 20px;" />
            </div>
            <h2 style="color: #FFA500;">Reagendamento Realizado</h2>
            <p>Olá,</p>
            <p>O paciente <strong>${nomePaciente}</strong> teve seu agendamento <strong>reagendado</strong>.</p>
            <p><strong>Nova Data:</strong> ${dataTexto}<br />
            <strong>Novo Horário:</strong> ${horarioTexto}</p>
            <p>Link atualizado da sessão:</p>
            <p><a href="${linkSessao}" target="_blank">${linkSessao}</a></p>
            <br />
            <p style="color: #777;">Atenciosamente,<br>Equipe Seren</p>
        </div>
        `
    });
}

async function sendReagendamentoConfirmationToPatient(to, nomePaciente, dataTexto, horarioTexto, linkSessao) {
    await transporter.sendMail({
        from: "seren.atendimento@gmail.com",
        to,
        subject: "Seu Agendamento Foi Reagendado - Seren",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="text-align: center;">
                <img src="https://raw.githubusercontent.com/Debora-Carvalho/sistema-gerenciamento-psicologia/refs/heads/master/src/frontend/assets/images/image-btn-home-pacientes.png" alt="Logo Seren" style="max-width: 150px; margin-bottom: 20px;" />
            </div>
            <h2 style="color: #FFA500;">Agendamento Reagendado</h2>
            <p>Olá ${nomePaciente},</p>
            <p>Seu agendamento na plataforma <strong>Seren</strong> foi <strong>reagendado</strong> com sucesso.</p>
            <p><strong>Nova Data:</strong> ${dataTexto}<br />
            <strong>Novo Horário:</strong> ${horarioTexto}</p>
            <p>Acesse sua sessão no novo horário pelo link abaixo:</p>
            <p style="text-align: center; margin: 20px 0;">
                <a href="${linkSessao}" style="background-color: #FFA500; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px;">Acessar Sessão</a>
            </p>
            <p>Se precisar de ajuda, entre em contato com a profissional responsável.</p>
            <br />
            <p style="color: #777;">Atenciosamente,<br>Equipe Seren</p>
        </div>
        `
    });
}

module.exports = { sendReagendamentoConfirmationToPatient, sendReagendamentoNotificationToUser, sendRecoveryEmail, sendAppointmentConfirmationToPatient, sendAppointmentNotificationToUser };