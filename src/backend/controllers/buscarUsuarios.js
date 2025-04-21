const { ObjectId } = require("mongodb");
const connectToDatabase = require("../config/mongodb");

async function buscarUsuarioHandler(req, res) {
    try {
        const { userID } = req.body;

        if (!userID) {
            return res.status(400).json({ error: "userID é obrigatório" });
        }

        const db = await connectToDatabase();

        const usuario = await db.collection("Usuario").findOne({ _id: new ObjectId(userID) });

        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        const { senha, ...dadosUsuario } = usuario;

        res.status(200).json({ usuario: dadosUsuario });
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { buscarUsuarioHandler };


// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");


// const uri = "mongodb+srv://serenAdmins:seren123@seren.ow7lda9.mongodb.net/?retryWrites=true&w=majority&appName=Seren";
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function connect() {
//   await client.connect();
//   return client.db("Usuario");
// }

// async function parseBody(req) {
//   return new Promise((resolve, reject) => {
//     let body = '';
//     req.on('data', chunk => body += chunk);
//     req.on('end', () => {
//       try {
//         const json = JSON.parse(body);
//         resolve(json);
//       } catch (err) {
//         reject(new Error("JSON inválido"));
//       }
//     });
//     req.on("error", reject);
//   });
// }

// async function buscarUsuarioHandler(req, res) {
//   try {
//     if (req.method === "POST" && req.url === "/pagina-inicial") {
//       const db = await connect();
//       const { userID } = await parseBody(req);

//       if (!userID) {
//         res.writeHead(400, { "Content-Type": "application/json" });
//         return res.end(JSON.stringify({ error: "userID é obrigatório" }));
//       }

//       const usuario = await db.collection("Usuario").findOne({ _id: new ObjectId(userID) });

//       if (!usuario) {
//         res.writeHead(404, { "Content-Type": "application/json" });
//         return res.end(JSON.stringify({ error: "Usuário não encontrado" }));
//       }

//       const { senha, ...dadosUsuario } = usuario;

//       res.writeHead(200, { "Content-Type": "application/json" });
//       return res.end(JSON.stringify({ usuario: dadosUsuario }));
//     }

//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Rota não encontrada" }));
//   } catch (error) {
//     console.error("Erro ao buscar usuário:", error);
//     res.writeHead(500, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ error: "Erro interno no servidor" }));
//   }
// }

// module.exports = { buscarUsuarioHandler };
