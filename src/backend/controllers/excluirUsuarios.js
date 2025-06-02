const { ObjectId } = require("mongodb");
const connectToDatabase = require("../config/mongodb");

async function excluirUsuarioHandler(req, res) {
    try {
        const { id_usuario } = req.body;

        if (!id_usuario) {
            return res.status(400).json({ error: "O ID do usuário é obrigatório" });
        }

        const db = await connectToDatabase();
        const objectId = new ObjectId(id_usuario);


        const resultadoUsuario = await db.collection("Usuario").deleteOne({ _id: objectId });

        const resultadoPacientes = await db.collection("Paciente").deleteMany({ id_usuario: objectId });

        const resultadoAgendamentos = await db.collection("Agendamento").deleteMany({ id_usuario: objectId });

        if (resultadoUsuario.deletedCount >= 1 || resultadoUsuario.deletedCount >= 1
            && resultadoPacientes.deletedCount >= 1
            || resultadoUsuario.deletedCount >= 1 && resultadoAgendamentos.deletedCount >= 1) {
            return res.status(200).json({
                success: true,
                message: "Usuário, pacientes e agendamentos excluídos com sucesso!"
            });
        } else {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

    } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
}

module.exports = { excluirUsuarioHandler };
