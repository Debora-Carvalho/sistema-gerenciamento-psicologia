const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://serenAdmins:seren123@seren.ow7lda9.mongodb.net/?retryWrites=true&w=majority&appName=Seren";
// por favor utilizar esta conexão acima para conectar no mongodb Compass, apenas o link.

// criando um cliente mongo com as configurações da api do servidor do mongo.
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

const { sendRecoveryEmail } = require("../services/emailService");
const bcrypt = require("bcryptjs");

async function connect() {
    try {
        await client.connect(); 
        console.log("✅ Conectado ao MongoDB com sucesso!");
        return client.db("Usuario");
    } catch (error) {
        console.error("Erro na conexão com MongoDB:", error);
        throw error;
    }
}

async function parseBody(req) {
    return new Promise((resolve) => {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => resolve(JSON.parse(body)));
    });
  }

  async function recuperarSenhaHandler(req, res) {
    const db = await connect();
  
    if (req.method === "POST" && req.url === "/recuperar-senha") {
      const { email } = await parseBody(req);
      const user = await db.collection("Usuario").findOne({ email });
  
      if (!user) {
        res.writeHead(404);
        return res.end(JSON.stringify({ error: "Usuário não encontrado" }));
      }
  
      const code = Math.floor(100000 + Math.random() * 900000).toString(); // gerando o código
      const expira = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos é muito? acho que é um tempo bom >:-), se for mudar os minutos é só mudar o 15 que tá aqui
  
      await db.collection("Usuario").updateOne(
        { email },
        {
          $set: {
            recoveryCode: code,
            recoveryexpira: expira
          }
        }
      );
  
      await sendRecoveryEmail(email, code);
  
      res.writeHead(200);
      return res.end(JSON.stringify({ message: "Código enviado por e-mail" }));
    }
  
    if (req.method === "POST" && req.url === "/recuperar-senha/codigo") {
      const { email, code } = await parseBody(req);
      const user = await db.collection("Usuario").findOne({ email });
  
      if (
        !user ||
        user.recoveryCode !== code ||
        new Date() > new Date(user.recoveryexpira)
      ) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: "Código inválido ou expirado" }));
      }
  
      res.writeHead(200);
      return res.end(JSON.stringify({ message: "Código válido" }));
    }
  
    if (req.method === "POST" && req.url === "/recuperar-senha/nova-senha") {
      const { email, novaSenha } = await parseBody(req);
      const user = await db.collection("Usuario").findOne({ email });
  
      if (!user ) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: "Usuário não encontrado!" }));
      }
  
      const hash = await bcrypt.hash(novaSenha, 10);
  
      await db.collection("Usuario").updateOne(
        { email },
        {
          $set: { password: hash },
        }
      );
  
      res.writeHead(200);
      return res.end(JSON.stringify({ message: "Senha atualizada com sucesso" }));
    }
  
    return false; 
  }
  
  module.exports = { recuperarSenhaHandler };