import { Router } from 'express';
import { login } from './auth.controller';
import { validarLogin } from '../../middlewares/validarLogin';
import { handleValidation } from '../../middlewares/handleValidation';

const router = Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@exemplo.com
 *               senha:
 *                 type: string
 *                 format: password
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Sucesso no login, retorna token e dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                 usuario:
 *                   type: object
 *                   description: Dados do usuário logado
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', validarLogin, handleValidation, login);

export default router;
