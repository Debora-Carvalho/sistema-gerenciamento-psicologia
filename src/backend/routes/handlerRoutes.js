const { cadastroUsuarioHandler } = require('../controllers/cadastroUsuario.js');
const { loginHandler } = require("../../backend/controllers/loginAutentica.js");

const handlerRouter = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.url === "/auth" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);

        if (data.action === "login") {
          return await loginHandler({ ...req, body: data }, res);
        } else if (data.action === "cadastro") {
          return await cadastroUsuarioHandler({ ...req, body: data }, res);
        } else {
          res.writeHead(400);
          return res.end(JSON.stringify({ error: "Ação inválida" }));
        }

      } catch (error) {
        console.error("Erro ao processar requisição:", error);
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Erro interno no servidor" }));
      }
    });

    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Rota não encontrada" }));
};

module.exports = { handlerRouter };
