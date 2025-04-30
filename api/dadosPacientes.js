import { buscarPacientesHandler } from '../src/backend/controllers/crudPaciente/buscarPacinetes';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return buscarPacientesHandler(req, res);
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
