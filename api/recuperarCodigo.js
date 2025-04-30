import { solicitarCodigoSenhaHandler } from '../src/backend/controllers/recuperarSenha';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return solicitarCodigoSenhaHandler(req, res);
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
