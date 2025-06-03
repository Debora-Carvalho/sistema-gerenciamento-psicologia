const express = require('express');
const router = express.Router();

const { loginHandler } = require('../controllers/loginAutentica');
const { cadastroUsuarioHandler } = require('../controllers/cadastroUsuario');
const { recuperarSenhaHandler, solicitarCodigoSenhaHandler, redefinirSenhaHandler } = require('../controllers/recuperarSenha');
const { buscarUsuarioHandler } = require('../controllers/buscarUsuarios');
const {excluirUsuarioHandler} = require('../controllers/excluirUsuarios')

// const { cadastroPacienteHandler } = require('../controllers/cadastroPaciente');
const { buscarAgendamentosHandler } = require('../controllers/crudAgendamento/buscarAgendamentos');
const { adicionarAgendamentoHandler } = require('../controllers/crudAgendamento/adicionarAgendamento');
const { excluirAgendamentoHandler } = require('../controllers/crudAgendamento/excluirAgendamento');
const { alterarAgendamentoHandler } = require('../controllers/crudAgendamento/alterarAgendamento');
const {adicionarStatusAgendamentoHandler} = require('../controllers/crudAgendamento/adicionarStatusAgendamento');

const { cadastroPacienteHandler } = require('../controllers/crudPaciente/cadastroPaciente');
const { buscarPacientesHandler } = require('../controllers/crudPaciente/buscarPacinetes');
const { excluirPacienteHandler } = require('../controllers/crudPaciente/excluirPaciente');
const { editarPacienteHandler } = require('../controllers/crudPaciente/editarPaciente')
const { buscarPacienteHandler } = require('../controllers/crudPaciente/buscarPacinete');
const {indexBackend} = require('../controllers/indexBackend');
const { UpdateUsuarioHandler } = require('../controllers/crudUsuario/UpdateUsuario');
const upload = require("../middlewares/uploadImagem");
const { uploadFotoPerfilHandler } = require("../controllers/uploadFotoPerfil");
const { buscarFotoPerfilHandler } = require("../controllers/buscarFotoPerfil");
const { histoSaudePacienteHandler } = require('../controllers/crudPaciente/histoSaudePaciente');
const { adicionarAbordagemHandler } = require('../controllers/crudPaciente/adicionarAbordagem');
const { buscarHistoSaudeHandler } = require('../controllers/crudPaciente/buscarHistoSaude');

router.post('/authLogin', loginHandler);
router.get('/', indexBackend)

//Crud usuario:
router.post('/cadastroUsuario', cadastroUsuarioHandler);
router.post('/dadosUsuario', buscarUsuarioHandler);
router.post('/excluirUsuarios', excluirUsuarioHandler);
router.post('/updateUsuario', UpdateUsuarioHandler);

router.post('/recuperarSenha', recuperarSenhaHandler);
router.post('/cadastroPaciente', cadastroPacienteHandler);
router.post('/recuperarCodigo', solicitarCodigoSenhaHandler);
router.post('/recuperarNovaSenha', redefinirSenhaHandler);
router.post('/buscarAgendamentos', buscarAgendamentosHandler);
router.post('/criarAgendamentos', adicionarAgendamentoHandler);
router.delete('/excluirAgendamentos', excluirAgendamentoHandler);
router.put('/alterarAgendamentos', alterarAgendamentoHandler);
router.put('/adicionarStatusAgendamento', adicionarStatusAgendamentoHandler)

router.post('/dadosPacientes', buscarPacientesHandler);
router.post('/dadosPaciente', buscarPacienteHandler);
router.post('/excluirPaciente', excluirPacienteHandler);
router.post('/editarPaciente', editarPacienteHandler)

router.post('/histoSaudePaciente', histoSaudePacienteHandler)
router.post('/adicionarAbordagem', adicionarAbordagemHandler)
router.post('/buscarHistoSaude', buscarHistoSaudeHandler )

router.post("/upload-foto-perfil", upload.single("imagem"), uploadFotoPerfilHandler);
router.get("/foto/:id", buscarFotoPerfilHandler);

module.exports = router;



// const { cadastroUsuarioHandler } = require('../controllers/cadastroUsuario.js');
// const { loginHandler } = require("../../backend/controllers/loginAutentica.js");
// const { recuperarSenhaHandler } = require("../../backend/controllers/recuperarSenha.js");
// const { buscarUsuarioHandler } = require("../controllers/buscarUsuarios.js"); // 
// const { cadastroPacienteHandler } = require("../controllers/cadastroPaciente.js");

// const getRequestBody = (req) => {
//     return new Promise((resolve, reject) => {
//         let body = '';
//         req.on("data", chunk => {
//             body += chunk;
//         });
//         req.on("end", () => {
//             resolve(body);
//         });
//         req.on("error", err => {
//             reject(err);
//         });
//     });
// };

// const handlerRouter = async (req, res) => {
//     const cleanUrl = req.url.replace(/\/+$/, "");

//     res.setHeader("Content-Type", "application/json");
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//     if (req.method === "OPTIONS") {
//         res.writeHead(204);
//         return res.end();
//     }

//     if (
//         (req.url === "/recuperar-senha" ||
//             req.url === "/recuperar-senha/codigo" ||
//             req.url === "/recuperar-senha/nova-senha") &&
//         req.method === "POST"
//     ) {
//         try {
//             await recuperarSenhaHandler(req, res);
//         } catch (error) {
//             console.error("Erro em recuperarSenhaHandler:", error);
//             res.writeHead(500);
//             res.end(JSON.stringify({ error: "Erro interno no servidor" }));
//         }
//         return;
//     }

//     if (req.url === "/pagina-inicial" && req.method === "POST") {
//         try {
//             await buscarUsuarioHandler(req, res);
//         } catch (error) {
//             console.error("Erro em buscarUsuarioHandler:", error);
//             res.writeHead(500);
//             res.end(JSON.stringify({ error: "Erro interno no servidor" }));
//         }
//         return;
//     }

//     if (req.url === "/auth" && req.method === "POST") {
//         try {
//             const body = await getRequestBody(req);
//             const data = JSON.parse(body);

//             if (data.action === "login") {
//                 await loginHandler({ ...req, body: data }, res);
//             } else if (data.action === "cadastro") {
//                 await cadastroUsuarioHandler({ ...req, body: data }, res);
//             } else {
//                 res.writeHead(400);
//                 res.end(JSON.stringify({ error: "Ação inválida" }));
//             }
//         } catch (error) {
//             console.error("Erro ao processar requisição:", error);
//             res.writeHead(500);
//             res.end(JSON.stringify({ error: "Erro interno no servidor" }));
//         }
//         return;
//     }

//     if (req.url === "/pacientes" && req.method === "POST") {
//         try {
//             const body = await getRequestBody(req);
//             const data = JSON.parse(body);

//             await cadastroPacienteHandler({ ...req, body: data }, res);
//         } catch (error) {
//             console.error("Erro em cadastroPacienteHandler:", error);
//             res.writeHead(500);
//             res.end(JSON.stringify({ error: "Erro interno no servidor" }));
//         }
//         return;
//     }

//     res.writeHead(404);
//     res.end(JSON.stringify({ error: "Rota não encontrada" }));
// };

// module.exports = { handlerRouter };
