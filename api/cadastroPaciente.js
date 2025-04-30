import { cadastroPacienteHandler } from '../src/backend/controllers/crudPaciente/cadastroPaciente';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return cadastroPacienteHandler(req, res);
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
