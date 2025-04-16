const { cadastroUsuarioHandler } = require('../controllers/cadastroUsuario.js');
const { loginHandler } = require("../../backend/controllers/loginAutentica.js");
const { recuperarSenhaHandler } = require("../../backend/controllers/recuperarSenha.js");
const { buscarUsuarioHandler } = require("../controllers/buscarUsuarios.js"); // 

const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on("data", chunk => {
      body += chunk;
    });
    req.on("end", () => {
      resolve(body);
    });
    req.on("error", err => {
      reject(err);
    });
  });
};

const handlerRouter = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (
    (req.url === "/recuperar-senha" ||
     req.url === "/recuperar-senha/codigo" ||
     req.url === "/recuperar-senha/nova-senha") &&
    req.method === "POST"
  ) {
    try {
      await recuperarSenhaHandler(req, res); 
    } catch (error) {
      console.error("Erro em recuperarSenhaHandler:", error);
      res.writeHead(500);
      res.end(JSON.stringify({ error: "Erro interno no servidor" }));
    }
    return;
  }

  if (req.url === "/pagina-inicial" && req.method === "POST") {
    try {
      await buscarUsuarioHandler(req, res); 
    } catch (error) {
      console.error("Erro em buscarUsuarioHandler:", error);
      res.writeHead(500);
      res.end(JSON.stringify({ error: "Erro interno no servidor" }));
    }
    return;
  }

  if (req.url === "/auth" && req.method === "POST") {
    try {
      const body = await getRequestBody(req);
      const data = JSON.parse(body);

      if (data.action === "login") {
        await loginHandler({ ...req, body: data }, res); 
      } else if (data.action === "cadastro") {
        await cadastroUsuarioHandler({ ...req, body: data }, res);
      } else {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Ação inválida" }));
      }
    } catch (error) {
      console.error("Erro ao processar requisição:", error);
      res.writeHead(500);
      res.end(JSON.stringify({ error: "Erro interno no servidor" }));
    }
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Rota não encontrada" }));
};

module.exports = { handlerRouter };
