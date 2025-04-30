import { redefinirSenhaHandler } from '../src/backend/controllers/recuperarSenha';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return redefinirSenhaHandler(req, res);
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
