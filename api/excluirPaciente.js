import { excluirPacienteHandler } from '../src/backend/controllers/crudPaciente/excluirPaciente';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return excluirPacienteHandler(req, res);
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
