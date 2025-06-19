-- 3. Criação das Functions

CREATE OR REPLACE FUNCTION criar_usuario_com_credenciais(
    p_nome VARCHAR,
    p_email VARCHAR,
    p_cpf VARCHAR,
    p_telefone VARCHAR,
    p_cargo_id INTEGER,
    p_senha TEXT
) RETURNS VOID AS $$
DECLARE
    usuario_id INTEGER;
BEGIN
    -- Verifica se email ou cpf existem
    IF EXISTS (SELECT 1 FROM usuarios WHERE email = p_email OR cpf = p_cpf) THEN
        RAISE EXCEPTION 'Email ou CPF já cadastrado.';
    END IF;

    -- Insere usuário
    INSERT INTO usuarios (nome, email, cpf, telefone, cargo_id)
    VALUES (p_nome, p_email, p_cpf, p_telefone, p_cargo_id)
    RETURNING id INTO usuario_id;

    -- Insere credenciais
    INSERT INTO credenciais (usuario_id, senha) 
    VALUES (usuario_id, p_senha);
END;
$$ LANGUAGE plpgsql;
