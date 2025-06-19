import { Request, Response } from 'express';
import { loginService } from './auth.service';


export async function login(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;
    const result = await loginService(email, senha);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}