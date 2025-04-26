const bcrypt = require('bcryptjs');
const connectToDatabase = require("../config/mongodb");

async function autenticaLogin(email, senha) {
    try {
        const db = await connectToDatabase();
        const usuariosCollection = db.collection("Usuario");

        const user = await usuariosCollection.findOne({ email });
        if (user && await bcrypt.compare(senha, user.senha)) {
            return { success: true, userID: user._id };
        }
        return { success: false, message: "Credenciais inválidas" };
    } catch (error) {
        console.error("Erro ao autenticar usuário:", error);
        return { success: false, message: "Erro no servidor" };
    }
}

const loginHandler = async (req, res) => {
    const { email, senha } = req.body;
    const response = await autenticaLogin(email, senha);
    if (response.success) return res.status(200).json(response);
    return res.status(401).json(response);
};

module.exports = { loginHandler };


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const bcrypt = require('bcryptjs');

// const uri = "mongodb+srv://serenAdmins:seren123@seren.ow7lda9.mongodb.net/?retryWrites=true&w=majority&appName=Seren";


// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function connect() {
//   try {
//     await client.connect();
//     console.log("✅ Conectado ao MongoDB com sucesso!");
//     return client.db("Usuario");
//   } catch (error) {
//     console.error("Erro na conexão com MongoDB:", error);
//     throw error;
//   }
// }

// async function autenticaLogin(email, senha) {
//   try {
//     const db = await connect();
//     const usuariosCollection = db.collection("Usuario");

//     const user = await usuariosCollection.findOne({ email });

//     if (user && await bcrypt.compare(senha, user.senha)) {
//       return { success: true, userID: user._id };
//     } else {
//       return { success: false, message: "Credenciais inválidas" };
//     }
//   } catch (error) {
//     console.error("Erro ao autenticar usuário:", error);
//     return { success: false, message: "Erro no servidor" };
//   }
// }

// async function loginHandler(req, res) {
//   try {

//     const { email, senha } = req.body;

//     const response = await autenticaLogin(email, senha);

//     if (response.success) {
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(response));
//     } else {
//       res.writeHead(401, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(response));
//     }

//   } catch (err) {
//     console.error("Erro no loginHandler:", err);
//     res.writeHead(500, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ success: false, message: "Erro no servidor" }));
//   }
// }

// module.exports = { loginHandler };
