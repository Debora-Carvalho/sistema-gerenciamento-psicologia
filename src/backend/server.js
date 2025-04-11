// servidor

const http = require("http");
const { loginHandler } = require("../backend/controllers/loginAutentica");

const port = process.env.PORT || 4000;  

const server = http.createServer(loginHandler);

server.listen(port, () => {
  console.log(`✅ Servidor Node rodando na porta ${port}!`);
});
