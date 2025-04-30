import { alterarAgendamentoHandler } from '../src/backend/controllers/alterarAgendamento';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    return alterarAgendamentoHandler(req, res);
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
