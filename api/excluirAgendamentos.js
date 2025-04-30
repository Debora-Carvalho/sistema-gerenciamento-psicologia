import { excluirAgendamentoHandler } from '../src/backend/controllers/excluirAgendamento';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    return excluirAgendamentoHandler(req, res);
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
