import { buscarPacienteHandler } from '../src/backend/controllers/crudPaciente/buscarPacinete';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return buscarPacienteHandler(req, res);
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
