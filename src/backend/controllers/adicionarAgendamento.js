const { ObjectId } = require("mongodb");
const connectToDatabase = require("../config/mongodb");

async function adicionarAgendamentoHandler(req, res) {
    try {
        const { userID, dataInicio, dataFim, color } = req.body;

        if (!userID ||  !dataInicio || !dataFim) {
            return res.status(400).json({ error: "userID, servico, dataInicio e dataFim são obrigatórios" });
        }

        const db = await connectToDatabase();

        const novoAgendamento = {
            userID: new ObjectId(userID),  
            dataInicio: new Date(dataInicio),  
            dataFim: new Date(dataFim),        
            color: color || "#3174ad",         
        };

        const resultado = await db.collection("Agendamento").insertOne(novoAgendamento);

        if (resultado.insertedId) {
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
