const connectToDatabase = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const buscarFotoPerfilHandler = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "ID de usuário inválido." });
        }

        const db = await connectToDatabase();
        const usuariosCollection = db.collection("Usuario");

        const usuario = await usuariosCollection.findOne(
            { _id: new ObjectId(userId) },
            { projection: { fotoPerfil: 1 } }
        );

        if (!usuario || !usuario.fotoPerfil || !usuario.fotoPerfil.data) {
            return res.status(404).json({ error: "Foto de perfil não encontrada" });
        }

        res.setHeader("Content-Type", usuario.fotoPerfil.contentType);
        res.send(Buffer.from(usuario.fotoPerfil.data.buffer || usuario.fotoPerfil.data));

    } catch (err) {
        console.error("Erro ao buscar imagem:", err);
        return res.status(500).json({ error: "Erro ao buscar imagem." });
    }
};

module.exports = { buscarFotoPerfilHandler };
