// src/modules/cargo/cargo.routes.ts
import { Router } from 'express'
import * as controller from './cargo.controller'

const router = Router()

router.get('/', controller.listarCargos)
router.post('/', controller.criarCargo)
router.put('/:id', controller.atualizarCargo)
router.delete('/:id', controller.deletarCargo)

export default router
