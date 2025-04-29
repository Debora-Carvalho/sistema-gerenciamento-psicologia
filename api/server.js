const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('../src/backend/routes/routesExpress');
const serverless = require('serverless-http');

// const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/', routes);

// app.listen(PORT, () => {
//     console.log(`✅ Servidor Express rodando na porta ${PORT}`);
// });

// export default serverless(app);


// //servidor

// const http = require("http");
// const { handlerRouter } = require("../backend/routes/handlerRoutes");

// const port = process.env.PORT || 4000;  

// const server = http.createServer(handlerRouter);

// server.listen(port, () => {
//   console.log(`✅ Servidor Node rodando na porta ${port}!`);
// });

module.exports = serverless(app);
