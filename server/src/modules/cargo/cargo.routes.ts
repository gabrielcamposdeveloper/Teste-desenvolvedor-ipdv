import { Router } from 'express'
import { listarCargos } from './cargo.controller'
import { validarToken } from '../../middlewares/validarToken'

const router = Router()

/**
 * @openapi
 * /cargos:
 *   get:
 *     summary: Lista todos os cargos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cargos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *       401:
 *         description: Token inválido ou não fornecido
 */

router.get('/', validarToken, listarCargos)

export default router
