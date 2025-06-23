import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_aqui'

export const validarToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ mensagem: 'Token não fornecido' })
    return
  }

  const token = authHeader.split(' ')[1] 

  if (!token) {
    res.status(401).json({ mensagem: 'Token inválido' })
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ mensagem: 'Token inválido ou expirado' })
  }
}
