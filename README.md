## API REST

API RESTful construída com Node.js, TypeScript e Express.

## Descrição

Este projeto é uma API RESTful desenvolvida em **TypeScript**, utilizando o framework **Express**, que serve como back-end para aplicações que necessitem de operações de CRUD e autenticação de usuários. A estrutura está organizada para permitir fácil manutenção e crescimento do código.

## Funcionalidades

* Rotas organizadas por recursos
* Validação de dados com **Yup**
* Autenticação via **JSON Web Tokens (JWT)**
* Migrations e seeds de banco usando **Knex**
* Testes automatizados com **Jest** e **Supertest**

## Tecnologias Utilizadas

* Node.js
* TypeScript
* Express
* Knex
* PostgreSQL
* dotenv
* bcryptjs
* http-status-codes
* cors
* yup
* JSON Web Token
* Jest
* Supertest

## Pré-requisitos

* Node.js (>= 16.x)
* Yarn

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/matheusprado1/api-rest-node-typescript.git
   cd api-rest-node-typescript
   ```
2. Instale as dependências:

   ```bash
   yarn install
   ```
3. Copie o arquivo de ambiente e preencha as variáveis:

   ```bash
   cp .env.example .env
   ```
4. Configure o banco de dados no arquivo `.env`:

   ```ini
   DB_CLIENT=pg
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_DATABASE=seu_banco
   JWT_SECRET=umsegredoseguro
   ```

## Banco de Dados

Execute as migrations para criar as tabelas:

```bash
yarn knex:migrate
```

Caso queira popular dados de exemplo:

```bash
yarn knex:seed
```

Para reverter as migrations:

```bash
yarn knex:rollback
```

## Scripts

* `yarn start` — Inicia o servidor em modo de desenvolvimento (com reload automático).
* `yarn production` — Compila e inicia o servidor para produção.
* `yarn test` — Executa os testes automatizados.
* `yarn knex:migrate` — Executa as migrations.
* `yarn knex:rollback` — Reverte a última migration.
* `yarn knex:rollback-all` — Reverte todas as migrations.
* `yarn knex:seed` — Executa os seeds.

## Executando em Produção

1. Faça build (instalação automática do TypeScript):

   ```bash
   yarn install
   # após install, o script postinstall executa 'tsc'
   ```
2. Inicie o servidor:

   ```bash
   yarn production
   ```

## Testes

Para rodar os testes:

```bash
yarn test
```

## Deploy

Este projeto está hospedado no Railway: [Clique aqui](https://api-rest-node-typescript-production.up.railway.app)

## Estrutura do Projeto

```
api-rest-node-typescript
├── src
│   ├── server
│   └── index.ts
├── tests
├── .env.example
├── jest.config.ts
├── tsconfig.json
├── package.json
└── yarn.lock
```
