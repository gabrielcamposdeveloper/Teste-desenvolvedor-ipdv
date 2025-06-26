# Teste-desenvolvedor-ipdv

**Considerações iniciais** -  O projeto foi dividido em 3 diferentes pacotes: 
- Client (Frontend Vue.js);
- Server (Backend Express.js);
- Data (SQL).

## INSTRUÇÕES USO/INSTALAÇÃO: DATA
- Você deve criar via script "1_CreateDatabase.sql" ou SGBD pgadmin o banco com as definições padrões:

- Acesso (Senha padrão - estou informando porque criptografo)
  
EMAIL: maria.oliveira@email.com
SENHA: senha123

- Caso queira criar via interface, as informações abaixo podem te nortear:
```sh 
OWNER = postgres
ENCODING = 'UTF8'
LC_COLLATE = 'pt_BR.UTF-8'
LC_CTYPE = 'pt_BR.UTF-8'
LOCALE_PROVIDER = 'libc'
TABLESPACE = pg_default
CONNECTION LIMIT = -1
IS_TEMPLATE = false;
```
 
- Execute a query do Script "2_CreateTable.sql"
- Execute a query do Script "3_CreateFunctions.sql"
- Execute a query do Script "4_CreateViews.sql"

## INSTRUÇÕES USO/INSTALAÇÃO: CLIENT
Usando o terminal na pasta do projeto:

```sh
cd client
```
 
```sh
npm install
```

```sh
npm run dev
```


## INSTRUÇÕES USO/INSTALAÇÃO: SERVER
Usando o terminal na pasta do projeto:

```sh
cd server
```
 
```sh
npm install
```

```sh
npm run dev
```



# Resumo do desafio
**1. INTRODUÇÃO**

Utilizamos o teste para avaliar os conhecimentos e as habilidades dos 
candidatos e da visão arquitetônica relacionadas ao desenvolvimento. Esse teste 
o ajudará a identificar candidatos com experiência. 

**2. REQUISITO** 

- O back-end deve utilizar Node.Js/Express; 
- O front-end deve utilizar o Vue.JS com Vuetify; 
- Utilizar o PostgreSQL para modelagem e banco de dados;

Nota:  
- Utilizamos a API (back-end) separada do front (front-end) então esperamos 
receber os códigos separados e com package.json separadas. 
- Layout e design ficam a critério do candidato.

  
**3. TESTE**
- CRIAR uma interface de cadastro de usuário e cargo; 
- Criar a função de vincular o usuário ao cargo 
- Criar a LISTAGEM dos usuários relacionado ao cargo; 
- Criar a possibilidade de ATUALIZAR os dados do usuário e cargo; 
- Criar a possibilidade de DESATIVAR o usuário. 
- Criar uma tela login com usuário e senha para entrar no sistema (para o 
login deverá usar um token JWT de sessão que devera expirar em 60 
minutos sendo necessário renova-lo) 
- Criar um botão para sair do sistema retornando na tela de login.

