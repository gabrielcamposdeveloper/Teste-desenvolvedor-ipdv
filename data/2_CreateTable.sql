-- 2. Criação das tabelas e regras

-- Tabela de cargos
CREATE TABLE cargos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE
);

-- Tabela de usuários
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  ativo BOOLEAN DEFAULT TRUE,
  cargo_id INTEGER,
  CONSTRAINT fk_cargo FOREIGN KEY (cargo_id) REFERENCES cargos(id)
    ON DELETE SET NULL
);

-- Tabela de credenciais
CREATE TABLE credenciais (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL UNIQUE,
  senha TEXT NOT NULL,
  token TEXT,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE CASCADE
);

-- Regras de validação
ALTER TABLE usuarios ADD CONSTRAINT chk_cpf_format CHECK (cpf ~ '^\d{3}\.\d{3}\.\d{3}-\d{2}$');
ALTER TABLE usuarios ADD CONSTRAINT chk_telefone_format CHECK (telefone ~ '^\(\d{2}\)\d{4,5}-\d{4}$');
ALTER TABLE usuarios ADD CONSTRAINT chk_nome_minimo CHECK (char_length(trim(nome)) >= 3);
ALTER TABLE usuarios ADD CONSTRAINT chk_email_formato CHECK (email ~ '^[^@]+@[^@]+\.[^@]+$');


