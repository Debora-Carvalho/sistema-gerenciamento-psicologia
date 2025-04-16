//servidor

const http = require("http");
const { handlerRouter } = require("../backend/routes/handlerRoutes");

const port = process.env.PORT || 4000;  

const server = http.createServer(handlerRouter);

server.listen(port, () => {
  console.log(`✅ Servidor Node rodando na porta ${port}!`);
});