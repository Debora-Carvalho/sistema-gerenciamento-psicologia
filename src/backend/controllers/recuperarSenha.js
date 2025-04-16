const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://serenAdmins:seren123@seren.ow7lda9.mongodb.net/?retryWrites=true&w=majority&appName=Seren";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

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
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const json = JSON.parse(body);
        resolve(json);
      } catch (err) {
        reject(new Error("Corpo da requisição não é um JSON válido"));
      }
    });
    req.on("error", reject);
  });
}

async function recuperarSenhaHandler(req, res) {
  try {
    const db = await connect();

    if (req.method === "POST" && req.url === "/recuperar-senha") {
      const { email } = await parseBody(req);
      const user = await db.collection("Usuario").findOne({ email });

      if (!user) {
        res.writeHead(404);
        return res.end(JSON.stringify({ error: "Usuário não encontrado" }));
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expira = new Date(Date.now() + 15 * 60 * 1000);

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

      await db.collection("Usuario").updateOne(
        { email },
        {
          $unset: {
            recoveryCode: "",
            recoveryexpira: ""
          }
        }
      );

      res.writeHead(200);
      return res.end(JSON.stringify({ message: "Código válido" }));
    }

    if (req.method === "POST" && req.url === "/recuperar-senha/nova-senha") {
      const { email, novaSenha } = await parseBody(req);
      const user = await db.collection("Usuario").findOne({ email });

      if (!user) {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: "Usuário não encontrado!" }));
      }

      if (await bcrypt.compare(novaSenha, user.senha)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'A nova senha não pode ser igual à senha atual.' }));
      }

      const hash = await bcrypt.hash(novaSenha, 10);

      await db.collection("Usuario").updateOne(
        { email },
        {
          $set: { senha: hash },
        }
      );

      res.writeHead(200);
      return res.end(JSON.stringify({ message: "Senha atualizada com sucesso" }));
    }

    // Se cair aqui, a rota não foi tratada
    res.writeHead(404);
    return res.end(JSON.stringify({ error: "Rota não encontrada" }));

  } catch (error) {
    console.error("❌ Erro no recuperarSenhaHandler:", error);
    res.writeHead(500);
    return res.end(JSON.stringify({ error: "Erro interno no servidor" }));
  }
}

module.exports = { recuperarSenhaHandler };
