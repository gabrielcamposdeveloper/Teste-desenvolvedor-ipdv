import { Router } from 'express'
import { listarUsuarios } from './user.controller'
import { validarToken } from '../../middlewares/validarToken'

const router = Router()

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
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
 *                   email:
 *                     type: string
 *       401:
 *         description: Token inválido ou não fornecido
 */

router.get('/', validarToken, listarUsuarios)

export default router
