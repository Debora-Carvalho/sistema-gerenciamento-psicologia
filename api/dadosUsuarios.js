import { buscarUsuarioHandler } from '../src/backend/controllers/buscarUsuarios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return buscarUsuarioHandler(req, res);
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
