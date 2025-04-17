const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://serenAdmins:seren123@seren.ow7lda9.mongodb.net/?retryWrites=true&w=majority&appName=Seren";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connect() {
    try {
        await client.connect();
        console.log("✅ Conectado ao MongoDB com sucesso!");
        return client.db("Paciente");
    } catch (error) {
        console.error("Erro na conexão com MongoDB:", error);
        throw error;
    }
}

async function cadastroPacienteHandler(req, res) {
    const db = await connect();

    try {
        const {
            nome,
            idade,
            genero,
            estadoCivil,
            telefone,
            email,
            preferenciaContato,
            dataNascimento,
            userID,
        } = req.body;

        const pacienteExistente = await db.collection("Paciente").findOne({ email });

        if (pacienteExistente) {
            res.writeHead(400);
            return res.end(JSON.stringify({ error: "Paciente já cadastrado com esse e-mail!" }));
        }

        const novoPaciente = {
            nome,
            idade,
            genero,
            estadoCivil,
            telefone,
            email,
            preferenciaContato,
            dataNascimento,
            id_usuario: userID
        };

        await db.collection("Paciente").insertOne(novoPaciente);

        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ success: true, message: "Paciente cadastrado com sucesso!" }));

    } catch (err) {
        console.error("Erro ao cadastrar paciente:", err);
        res.writeHead(500);
        return res.end(JSON.stringify({ error: "Erro interno ao cadastrar paciente." }));
    }
}


module.exports = { cadastroPacienteHandler };
