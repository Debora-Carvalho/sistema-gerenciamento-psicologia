import { editarPacienteHandler } from '../src/backend/controllers/crudPaciente/editarPaciente';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return editarPacienteHandler(req, res);
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
