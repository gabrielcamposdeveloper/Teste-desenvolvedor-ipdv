# DATA

## Instruções para montar o banco de dados Postgree
**Para montar o banco de dados basta seguir os passos abaixo em ordem:**

1 - Você deve criar via script "1_CreateDatabase.sql" ou SGBD pgadmin o banco com as definições padrões:

Caso queira criar via interface, as informações abaixo podem te nortear:
OWNER = postgres
ENCODING = 'UTF8'
LC_COLLATE = 'pt_BR.UTF-8'
LC_CTYPE = 'pt_BR.UTF-8'
LOCALE_PROVIDER = 'libc'
TABLESPACE = pg_default
CONNECTION LIMIT = -1
IS_TEMPLATE = false;

    
2 - Execute a query do Script "2_CreateTable.sql"
3 - Execute a query do Script "3_CreateFunctions.sql"
4 - Execute a query do Script "4_CreateViews.sql"