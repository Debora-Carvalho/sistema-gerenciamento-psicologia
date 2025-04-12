const { recuperarSenhaHandler } = require("../../backend/controllers/recuperarSenha.js");

const { loginHandler } = require("../../backend/controllers/loginAutentica.js");

// Função do servidor (delegação das rotas)
const handlerRouter = async (req, res) => {
  // Configurar CORS e headers
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // Delegação das rotas para o recuperaSenha.js
  if (
    (req.url === "/recuperar-senha" ||
     req.url === "/recuperar-senha/codigo" ||
     req.url === "/recuperar-senha/nova-senha") &&
    req.method === "POST"
  ) {
    return await recuperarSenhaHandler(req, res);
  }
  

  if (req.url === "/" && req.method === "POST") {
    return await loginHandler(req, res);
  }

  // Se a rota não for encontrada
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Rota não encontrada" }));
};

module.exports = {handlerRouter};