import { Router } from 'express'
import * as userController from './user.controller'
import { validarToken } from '../../middlewares/validarToken'

const router = Router()

/**
 * @openapi
 * tags:
 *   - name: Usuário
 *     description: Operações relacionadas a usuários
 */

/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - Usuário
 *     summary: Lista todos os usuários ativos
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
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.get('/', validarToken, userController.listarUsuarios)

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags:
 *       - Usuário
 *     summary: Busca um usuário pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do usuário
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', validarToken, userController.buscarUsuario)

/**
 * @openapi
 * /users:
 *   post:
 *     tags:
 *       - Usuário
 *     summary: Cria um novo usuário
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *               - cargo_id
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               cpf:
 *                 type: string
 *               telefone:
 *                 type: string
 *               cargo_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Token inválido ou não fornecido
 */
router.post('/', validarToken, userController.criarUsuario)

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     tags:
 *       - Usuário
 *     summary: Atualiza um usuário existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do usuário a ser atualizado
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               cpf:
 *                 type: string
 *               telefone:
 *                 type: string
 *               ativo:
 *                 type: boolean
 *               cargo_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', validarToken, userController.atualizarUsuario)

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Usuário
 *     summary: Deleta (desativa) um usuário (delete lógico)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do usuário a ser deletado
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso (inativado)
 *       401:
 *         description: Token inválido ou não fornecido
 *       404:
 *         description: Usuário não encontrado ou já inativo
 */
router.delete('/:id', validarToken, userController.deletarUsuario)

export default router
