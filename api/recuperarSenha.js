import { recuperarSenhaHandler } from '../src/backend/controllers/recuperarSenha';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return recuperarSenhaHandler(req, res);
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
