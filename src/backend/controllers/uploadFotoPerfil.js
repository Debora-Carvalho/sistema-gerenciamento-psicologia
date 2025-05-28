const connectToDatabase = require("../config/mongodb");
const { ObjectId } = require('mongodb');

const uploadFotoPerfilHandler = async (req, res) => {
    try {
        const userId = req.body.userId;
        const file = req.file;

        if (!file || !userId) {
            return res.status(400).json({ error: "Arquivo ou userId faltando." });
        }

        const db = await connectToDatabase();
        const usuariosCollection = db.collection('Usuario');


        const resultado = await usuariosCollection.updateOne(
            { _id: new ObjectId(userId) },
            { 
                $set: { 
                    fotoPerfil: {
                        data: file.buffer,
                        contentType: file.mimetype,
                        nome: file.originalname,
                        tamanho: file.size
                    }
                }
            }
        );

        if (resultado.matchedCount === 0) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        return res.status(200).json({ success: true });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
};

module.exports = { uploadFotoPerfilHandler };
