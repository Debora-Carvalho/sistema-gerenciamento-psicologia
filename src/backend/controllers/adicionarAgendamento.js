const { ObjectId } = require("mongodb");
const connectToDatabase = require("../config/mongodb");
const { sendConfirmationEmail } = require("../services/emailAgendamentoService");

async function adicionarAgendamentoHandler(req, res) {
    try {
        const { userID, titulo, dataInicio, dataFim, desc, color, tipo, nomePaciente } = req.body;

        console.log(userID, titulo, dataInicio, dataFim, desc, color, tipo, nomePaciente )
        if (!userID || !titulo || !dataInicio || !dataFim || !nomePaciente) {
            return res.status(400).json({ error: "userID, título, dataInicio e dataFim são obrigatórios" });
        }

        const db = await connectToDatabase();

        const paciente = await db.collection("Paciente").findOne({ nome : nomePaciente })

        if (!paciente){
            return res.status(400).json({ error: "Paciente não encontrado!" });
        }
        const novoAgendamento = {
            userID: new ObjectId(userID),  
            id_paciente: new ObjectId(paciente._id),
            titulo,
            dataInicio: new Date(dataInicio),  
            dataFim: new Date(dataFim),      
            desc,  
            color: color || "#3174ad",   
            tipo,
            nomePaciente      
        };

        const resultado = await db.collection("Agendamento").insertOne(novoAgendamento);

        if (resultado.insertedId) {
            await sendConfirmationEmail(paciente.email, nomePaciente, dataInicio, dataFim )
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
