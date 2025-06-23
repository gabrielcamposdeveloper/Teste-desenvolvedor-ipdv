import { Request, Response } from 'express'
import * as cargoService from './cargo.service'

export const listarCargos = async (req: Request, res: Response): Promise<void> => {
  try {
    const cargos = await cargoService.listarCargos()
    res.json(cargos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao listar cargos' })
  }
}
