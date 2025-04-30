import { buscarAgendamentosHandler } from '../src/backend/controllers/buscarAgendamentos';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return buscarAgendamentosHandler(req, res);
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
