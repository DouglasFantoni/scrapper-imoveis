### Prisma GraphQL schema first sample

This sample project uses sqlite as the relational database. To use a different database, check the [Prisma docs](https://www.prisma.io/docs/getting-started).

### Installation

1. Install dependencies: `npm install`
2. Generate TypeScript type definitions for the GraphQL schema: `npm run generate:typings`
3. Create sqlite database and create tables: `npx prisma db push`
4. Start server: `npm run start:dev`

### Graphql Playground

When the application is running, you can go to [http://localhost:3000/graphql](http://localhost:3000/graphql) to access the GraphQL Playground.  See [here](https://docs.nestjs.com/graphql/quick-start#playground) for more.



AWS CLI

Referencia: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html

aws configure list-profiles
aws s3 ls --profile dev

Selecionar profile default: <br/>
export AWS_PROFILE=dev

aws cloudformation deploy --stack-name scrapper-imoveis-stack --template-file rdsdatabase.yaml


## Comandos Prisma

Para adicionar novas mudanças no banco:

```
npx prisma db push
```

Para criar uma nova migration (Versão do banco)

```
npx prisma migration dev --name v1.0.0
```