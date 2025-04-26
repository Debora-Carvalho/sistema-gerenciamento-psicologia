// controllers/cadastroUsuario.js
const bcrypt = require("bcryptjs");
const connectToDatabase = require("../config/mongodb");

const cadastroUsuarioHandler = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const { email, senha, username, telephone } = req.body;

        const usuarioExistente = await db.collection("Usuario").findOne({ email });

        if (usuarioExistente) {
            return res.status(400).json({ error: "Usuário já possui conta!" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = {
            email,
            senha: senhaCriptografada,
            username,
            telephone
        };

        await db.collection("Usuario").insertOne(novoUsuario);

        return res.status(201).json({ success: true, message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        return res.status(500).json({ error: "Erro interno ao cadastrar usuário." });
    }
};

module.exports = { cadastroUsuarioHandler };

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://serenAdmins:seren123@seren.ow7lda9.mongodb.net/?retryWrites=true&w=majority&appName=Seren";

// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// const bcrypt = require("bcryptjs");

// async function connect() {
//     try {
//         await client.connect();
//         console.log("✅ Conectado ao MongoDB com sucesso!");
//         return client.db("Usuario");
//     } catch (error) {
//         console.error("Erro na conexão com MongoDB:", error);
//         throw error;
//     }
// }

// async function cadastroUsuarioHandler(req, res) {
//     const db = await connect();

//     try {

//         let { email, senha, username, telephone } = req.body;

//         const user = await db.collection("Usuario").findOne({ email });

//         if (user) {
//             res.writeHead(400);
//             return res.end(JSON.stringify({ error: "Usuário já possui conta!" }));
//         }

//         senha = await bcrypt.hash(senha, 10);

//         const novoUsuario = {
//             email,
//             senha,
//             username,
//             telephone
//         };

//         await db.collection("Usuario").insertOne(novoUsuario);

//         res.writeHead(201, { "Content-Type": "application/json" });
//         return res.end(JSON.stringify({ success: true, message: "Usuário cadastrado com sucesso!" }));
//     } catch (err) {
//         console.error("Erro ao cadastrar usuário:", err);
//         res.writeHead(500);
//         return res.end(JSON.stringify({ error: "Erro interno ao cadastrar usuário." }));
//     }
// }

// module.exports = { cadastroUsuarioHandler };
