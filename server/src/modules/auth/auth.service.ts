import { db } from '../../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function loginService(email: string, senha: string) {
  const userQuery = `
    SELECT u.id, u.nome, u.email, u.ativo, c.senha
    FROM usuarios u
    JOIN credenciais c ON u.id = c.usuario_id
    WHERE u.email = $1
  `;

  const { rows } = await db.query(userQuery, [email]);
  const user = rows[0];

  if (!user) throw new Error('Usuário não encontrado');
  if (!user.ativo) throw new Error('Usuário desativado');

  const senhaValida = await bcrypt.compare(senha, user.senha);
  if (!senhaValida) throw new Error('Senha inválida');

  const token = jwt.sign(
    { id: user.id, nome: user.nome, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '60m' }
  );

  return {
    message: 'Login realizado com sucesso',
    token,
    usuario: {
      id: user.id,
      nome: user.nome,
      email: user.email,
    },
  };
}
