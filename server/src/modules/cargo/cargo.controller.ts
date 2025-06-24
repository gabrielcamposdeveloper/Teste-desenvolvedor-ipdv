import { Request, Response } from 'express'
import * as cargoService from './cargo.service'

export const listarCargos = async (_: Request, res: Response) => {
  const cargos = await cargoService.listarCargos()
  res.json(cargos)
}

export const criarCargo = async (req: Request, res: Response) => {
  try {
    const novo = await cargoService.criarCargo(req.body)
    res.status(201).json(novo)
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao criar cargo' })
  }
}

export const atualizarCargo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const atualizado = await cargoService.atualizarCargo(id, req.body)
    res.json(atualizado)
  } catch {
    res.status(400).json({ mensagem: 'Erro ao atualizar cargo' })
  }
}

export const deletarCargo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    await cargoService.deletarCargo(id)
    res.status(204).send()
  } catch {
    res.status(400).json({ mensagem: 'Erro ao deletar cargo' })
  }
}
