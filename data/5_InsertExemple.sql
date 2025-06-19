-- Inserir cargos
INSERT INTO cargos (nome) VALUES
('Administrador'),
('Usuário Comum'),
('Gerente'),
('Suporte Técnico'),
('Desenvolvedor'),
('Analista'),
('Financeiro'),
('Marketing'),
('RH'),
('Vendas');

-- Inserir usuários
INSERT INTO usuarios (nome, email, cpf, telefone, ativo, cargo_id) VALUES
('João Silva', 'joao.silva@email.com', '123.456.789-00', '(11)91234-5678', TRUE, 1),
('Maria Oliveira', 'maria.oliveira@email.com', '234.567.890-11', '(21)99876-5432', TRUE, 2),
('Carlos Pereira', 'carlos.pereira@email.com', '345.678.901-22', '(31)98765-4321', TRUE, 3),
('Ana Souza', 'ana.souza@email.com', '456.789.012-33', '(41)91234-5678', TRUE, 4),
('Pedro Costa', 'pedro.costa@email.com', '567.890.123-44', '(51)99876-5432', TRUE, 5),
('Luciana Martins', 'luciana.martins@email.com', '678.901.234-55', '(61)98765-4321', TRUE, 6),
('Rafael Almeida', 'rafael.almeida@email.com', '789.012.345-66', '(71)91234-5678', TRUE, 7),
('Patrícia Fernandes', 'patricia.fernandes@email.com', '890.123.456-77', '(81)99876-5432', TRUE, 8),
('Bruno Carvalho', 'bruno.carvalho@email.com', '901.234.567-88', '(91)98765-4321', TRUE, 9),
('Mariana Lopes', 'mariana.lopes@email.com', '012.345.678-99', '(11)91234-5678', TRUE, 10);

-- Inserir credenciais (Senha criptografada com bcrypt hash 'senha123')
INSERT INTO credenciais (usuario_id, senha, token) VALUES
(1, '$2b$10$TswcP0wt/6Ty6I0TFSROR.fu7pGVDfXzFYLEShy/J74lLA7RX/9CW', NULL),
(2, '$2b$10$TswcP0wt/6Ty6I0TFSROR.fu7pGVDfXzFYLEShy/J74lLA7RX/9CW', NULL),
(3, '$2b$10$TswcP0wt/6Ty6I0TFSROR.fu7pGVDfXzFYLEShy/J74lLA7RX/9CW', NULL),
(4, '$2b$10$TswcP0wt/6Ty6I0TFSROR.fu7pGVDfXzFYLEShy/J74lLA7RX/9CW', NULL),
(5, '$2b$10$TswcP0wt/6Ty6I0TFSROR.fu7pGVDfXzFYLEShy/J74lLA7RX/9CW', NULL),
(6, '$2b$10$TswcP0wt/6Ty6I0TFSROR.fu7pGVDfXzFYLEShy/J74lLA7RX/9CW', NULL),
(7, '$2b$10$TswcP0wt/6Ty6I0TFSROR.fu7pGVDfXzFYLEShy/J74lLA7RX/9CW', NULL),
(8, '$2b$10$TswcP0wt/6Ty6I0TFSROR.fu7pGVDfXzFYLEShy/J74lLA7RX/9CW', NULL),
(9, '$2b$10$TswcP0wt/6Ty6I0TFSROR.fu7pGVDfXzFYLEShy/J74lLA7RX/9CW', NULL),
(10,'$2b$10$TswcP0wt/6Ty6I0TFSROR.fu7pGVDfXzFYLEShy/J74lLA7RX/9CW', NULL);
