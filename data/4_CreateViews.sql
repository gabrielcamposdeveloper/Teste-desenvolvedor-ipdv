-- 4. Criação das Views

CREATE OR REPLACE VIEW vw_usuarios_cargos AS
SELECT
  u.id,
  u.nome,
  u.email,
  u.cpf,
  u.telefone,
  u.ativo,
  c.nome AS cargo_nome
FROM usuarios u
LEFT JOIN cargos c ON u.cargo_id = c.id;
