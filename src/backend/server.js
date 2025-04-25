const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routesExpress');

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
    console.log(`✅ Servidor Express rodando na porta ${PORT}`);
});

// //servidor

// const http = require("http");
// const { handlerRouter } = require("../backend/routes/handlerRoutes");

// const port = process.env.PORT || 4000;  

// const server = http.createServer(handlerRouter);

// server.listen(port, () => {
//   console.log(`✅ Servidor Node rodando na porta ${port}!`);
// });