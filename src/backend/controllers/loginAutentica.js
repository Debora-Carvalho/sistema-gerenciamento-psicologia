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

  async function autenticaLogin(email, senha) {
    try {
      const db = await connect(); // conexão ao banco de dados
      const usuariosCollection = db.collection("Usuario"); // pegamos a coleção usuários
  
      // procura o email do usuário na coleção
      const user = await usuariosCollection.findOne({ email });
        
      // se tiver email e a senha conferir então o userID será o id que está na propriedade do documento(_id)
      if (user && user.senha === senha) {
        return { success: true, userID: user._id };
      } else {
        return { success: false, message: "Credenciais inválidas" };
      }
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error); // caso dê algum outro erro na conexão com o servidor(eu sofri)
      return { success: false, message: "Erro no servidor" };
    }
  }

  // função que será chamada no `server.js` para processar a requisição e enviar a resposta
async function loginHandler(req, res) {
     // configurar CORS que permite a conversação entre os dois servidores 

        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        // ainda lidando com o CORS
        if (req.method === "OPTIONS") {
            res.writeHead(204);
            res.end();
            return;
        }

    if (req.method === "POST" && req.url === "/") {
      let body = "";
  
      // coletar os dados enviados no corpo da requisição e transformando em string
      req.on("data", chunk => {
        body += chunk.toString();
      });
  
      req.on("end", async () => {
        try {
          // convertendo o corpo da requisição (já em string) para JSON e transformando para as const email e senha
          const { email, senha } = JSON.parse(body);
  
          // chama a função acima
          const response = await autenticaLogin(email, senha);
  
          if (response.success) {
            // se as credenciais forem válidas, envia o userID
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(response));  // retorna sucesso com o userID
          } else {
            // Se falhar, envia mensagem de erro
            res.writeHead(401, { "Content-Type": "application/json" });
            res.end(JSON.stringify(response));  // retorna falha com a mensagem de erro
          }
        } catch (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, message: "Erro no servidor" }));
        }
      });
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, message: "Rota não encontrada" }));
    }
  }

  module.exports = { loginHandler };