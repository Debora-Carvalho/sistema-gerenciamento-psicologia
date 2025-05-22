const connectToDatabase = require("../../config/mongodb");
const { ObjectId } = require("mongodb");

async function UpdateUsuarioHandler(req, res) {

    console.log("Body recebido:", req.body);

    try {
        const db = await connectToDatabase();
        const {
            id,
            nome,
            telephone,
            email
        } = req.body;

        if (!id) {
            return res.status(400).json({ error: "ID do usuario não fornecido." });
        }

        const usuarioAtualizado = {
            username: nome, 
            email,
            telephone: parseInt(telephone)
        };

        const resultado = await db.collection("Usuario").updateOne(
            { _id: new ObjectId(id) },
            { $set: usuarioAtualizado }
        );

        if (resultado.modifiedCount === 0) {
            return res.status(404).json({ success: false, error: "Usuario não encontrado ou dados idênticos aos existentes." });
        }

        return res.status(200).json({ success: true, message: "Usuario atualizado com sucesso!", usuarioAtualizado });
    } catch (error) {
        console.error("Erro ao editar usuario:", error);
        return res.status(500).json({ error: "Erro interno ao editar Usuario." });
    }
}

module.exports = { UpdateUsuarioHandler };
