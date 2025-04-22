const { sendRecoveryEmail } = require("../services/emailService");
const bcrypt = require("bcryptjs");
const connectToDatabase = require("../config/mongodb");

async function recuperarSenhaHandler(req, res) {
  try {
    const db = await connectToDatabase();

      const { email } = req.body;
      const user = await db.collection("Usuario").findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expira = new Date(Date.now() + 15 * 60 * 1000);

      await db.collection("Usuario").updateOne(
        { email },
        {
          $set: {
            recoveryCode: code,
            recoveryexpira: expira
          }
        }
      );

      await sendRecoveryEmail(email, code);

      return res.status(200).json({ message: "Código enviado por e-mail" });
    
    } catch (error) {
        console.error("Erro ao solicitar código:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
      }
    }

    async function solicitarCodigoSenhaHandler(req,res){
        try{
            const db = await connectToDatabase();
            const { email, code } = req.body;
            const user = await db.collection("Usuario").findOne({ email });
      
            if (
              !user ||
              user.recoveryCode !== code ||
              new Date() > new Date(user.recoveryexpira)
            ) {
              return res.status(400).json({ error: "Código inválido ou expirado" });
            }
      
            await db.collection("Usuario").updateOne(
              { email },
              {
                $unset: {
                  recoveryCode: "",
                  recoveryexpira: ""
                }
              }
            );
      
            return res.status(200).json({ message: "Código válido" });
        } catch (error) {
        console.error("Erro ao solicitar código:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
      }
    }

    async function redefinirSenhaHandler(req,res) {
        try {
            const db = await connectToDatabase();
            const { email, novaSenha } = req.body;
            const user = await db.collection("Usuario").findOne({ email });
      
            if (!user) {
              return res.status(400).json({ error: "Usuário não encontrado!" });
            }
      
            if (await bcrypt.compare(novaSenha, user.senha)) {
              return res.status(400).json({ error: "A nova senha não pode ser igual à senha atual." });
            }
      
            const hash = await bcrypt.hash(novaSenha, 10);
      
            await db.collection("Usuario").updateOne(
              { email },
              {
                $set: { senha: hash },
              }
            );
      
            return res.status(200).json({ message: "Senha atualizada com sucesso" });
          } catch(error) {
            console.error("Erro ao solicitar código:", error);
            return res.status(500).json({ error: "Erro interno no servidor" });
          }
    }
    

module.exports = { recuperarSenhaHandler, solicitarCodigoSenhaHandler, redefinirSenhaHandler };
