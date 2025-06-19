import { Router } from 'express';
import { login } from './auth.controller';

const router = Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sucesso
 *       401:
 *         description: Credenciais inválidas
 */

router.post('/login', login);

export default router;
