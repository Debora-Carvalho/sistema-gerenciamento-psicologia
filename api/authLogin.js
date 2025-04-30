// api/authLogin.js
import { loginHandler } from '../src/backend/controllers/loginAutentica';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return loginHandler(req, res);
  } else {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }
}
