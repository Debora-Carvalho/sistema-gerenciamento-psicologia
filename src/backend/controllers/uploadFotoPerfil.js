const cloudinary = require("../config/cloudinary");
const connectToDatabase = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const uploadFotoPerfilHandler = async (req, res) => {
    try {
        const userId = req.body.userId;
        const file = req.file;

        if (!file || !userId) {
            return res.status(400).json({ error: "Arquivo ou userId faltando." });
        }

        const result = await cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "fotos_perfil" },
            async (error, result) => {
                if (error) {
                    console.error("Erro no Cloudinary:", error);
                    return res.status(500).json({ error: "Erro ao enviar imagem para Cloudinary." });
                }

                const db = await connectToDatabase();
                const usuariosCollection = db.collection("Usuario");

                await usuariosCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    { $set: { fotoPerfilUrl: result.secure_url } }
                );

                return res.status(200).json({ success: true, url: result.secure_url });
            }
        );

        result.end(file.buffer);

    } catch (err) {
        console.error("Erro geral:", err);
        return res.status(500).json({ error: "Erro interno no servidor." });
    }
};

module.exports = { uploadFotoPerfilHandler };
