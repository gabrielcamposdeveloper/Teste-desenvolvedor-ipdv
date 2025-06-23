import { body } from 'express-validator'

export const validarLogin = [
  body('email')
    .notEmpty().withMessage('E-mail é obrigatório')
    .isEmail().withMessage('E-mail inválido'),

  body('senha')
    .notEmpty().withMessage('Senha é obrigatória')
    .isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
]
