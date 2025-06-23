import { Request, Response } from 'express'
import * as userService from './user.service'

export const listarUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await userService.listarUsuarios()
    res.json(usuarios)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao listar usuários' })
  }
}
