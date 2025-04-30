import { cadastroUsuarioHandler } from '../src/backend/controllers/cadastroUsuario';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return cadastroUsuarioHandler(req, res);
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
