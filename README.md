# API RESTful Node.js TypeScript

Uma API RESTful robusta construída com Node.js, TypeScript e Express, projetada para servir como back-end para aplicações que necessitem de operações CRUD e autenticação de usuários.

## 🚀 Características

- **Arquitetura Modular**: Rotas organizadas por recursos para fácil manutenção e escalabilidade
- **TypeScript**: Tipagem forte para reduzir erros em tempo de desenvolvimento
- **Autenticação Segura**: Implementação JWT com bcryptjs para hash de senhas
- **Validação de Dados**: Esquemas Yup para garantir integridade dos dados
- **Banco de Dados**: PostgreSQL com Knex para migrations e queries
- **Testes Automatizados**: Jest e Supertest para garantir qualidade do código

## 📋 Pré-requisitos

- Node.js (>= 16.x)
- Yarn
- PostgreSQL

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/matheusprado1/api-rest-node-typescript.git
cd api-rest-node-typescript
```

2. Instale as dependências:

```bash
yarn install
```

3. Configure o ambiente:

```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas configurações de banco de dados:

```
DB_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=seu_banco
JWT_SECRET=umsegredoseguro
```

5. Execute as migrations para criar as tabelas:

```bash
yarn knex:migrate
```

6. (Opcional) Execute os seeds para popular o banco com dados de exemplo:

```bash
yarn knex:seed
```

## 🏗️ Estrutura do Projeto

```
api-rest-node-typescript
├── src
│   ├── server
│   │   ├── controllers     # Controladores para cada recurso (cities, persons, users)
│   │   ├── database        # Configuração do banco, migrations, models e seeds
│   │   ├── routes          # Definição de rotas da API
│   │   ├── shared          # Componentes compartilhados (middlewares, serviços)
│   │   ├── Server.ts       # Configuração do servidor Express
│   │   └── index.ts        # Ponto de entrada do servidor
│   └── index.ts            # Ponto de entrada da aplicação
├── tests                   # Testes automatizados
├── .env.example            # Modelo para variáveis de ambiente
├── jest.config.ts          # Configuração do Jest
├── tsconfig.json           # Configuração do TypeScript
└── package.json            # Dependências e scripts
```

## 🚀 Uso

### Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento com reload automático:

```bash
yarn start
```

### Produção

Para compilar e iniciar o servidor em modo de produção:

```bash
yarn production
```

### Testes

Para executar os testes automatizados:

```bash
yarn test
```

### Gerenciamento do Banco

- **Executar migrations**: `yarn knex:migrate`
- **Reverter última migration**: `yarn knex:rollback`
- **Reverter todas as migrations**: `yarn knex:rollback-all`
- **Executar seeds**: `yarn knex:seed`

## 📚 API Endpoints

### Autenticação

- `POST /signin`: Autenticação de usuário (login)
- `POST /signup`: Registro de novo usuário

### Cidades

- `GET /cities`: Lista todas as cidades
- `GET /cities/:id`: Obtém uma cidade específica
- `POST /cities`: Cria uma nova cidade
- `PUT /cities/:id`: Atualiza uma cidade existente
- `DELETE /cities/:id`: Remove uma cidade

### Pessoas

- `GET /persons`: Lista todas as pessoas
- `GET /persons/:id`: Obtém uma pessoa específica
- `POST /persons`: Cria uma nova pessoa
- `PUT /persons/:id`: Atualiza uma pessoa existente
- `DELETE /persons/:id`: Remove uma pessoa

## 🔐 Autenticação

A API utiliza JSON Web Tokens (JWT) para autenticação. Para acessar rotas protegidas:

1. Obtenha um token via endpoint `/signin`
2. Inclua o token no header de suas requisições:
   ```
   Authorization: Bearer seu_token_jwt
   ```

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **TypeScript**: Superset tipado de JavaScript
- **Express**: Framework web para Node.js
- **Knex**: Query builder SQL
- **PostgreSQL**: Banco de dados relacional
- **JWT**: Autenticação via tokens
- **Yup**: Validação de esquemas
- **Jest & Supertest**: Framework de testes

## 🔗 Links Úteis

- [Documentação do Express](https://expressjs.com/)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do Knex](http://knexjs.org/)
- [Documentação do JWT](https://jwt.io/introduction/)

---

Desenvolvido por [Matheus Prado](https://github.com/matheusprado1)
