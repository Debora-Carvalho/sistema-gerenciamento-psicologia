import { adicionarAgendamentoHandler } from '../controllers/adicionarAgendamento';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return adicionarAgendamentoHandler(req, res);
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
}
