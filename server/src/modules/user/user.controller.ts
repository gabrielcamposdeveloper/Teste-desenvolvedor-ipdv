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

export const buscarUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id)
    const usuario = await userService.buscarUsuarioPorId(id)
    if (!usuario) {
      res.status(404).json({ mensagem: 'Usuário não encontrado' })
      return
    }
    res.json(usuario)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao buscar usuário' })
  }
}

export const criarUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuario = await userService.criarUsuario(req.body)
    res.status(201).json(usuario)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao criar usuário' })
  }
}

export const atualizarUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id)
    const usuario = await userService.atualizarUsuario(id, req.body)
    if (!usuario) {
      res.status(404).json({ mensagem: 'Usuário não encontrado' })
      return
    }
    res.json(usuario)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao atualizar usuário' })
  }
}

export const deletarUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id)
    const success = await userService.deletarUsuario(id)
    if (!success) {
      res.status(404).json({ mensagem: 'Usuário não encontrado ou já inativo' })
      return
    }
    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensagem: 'Erro ao desativar usuário' })
  }
}
