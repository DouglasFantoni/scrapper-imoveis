## Scrapper de imoveis em leilão

Esse scrapper de imoveis de leilão busca imoveis nos sites Caixa, Lance Judicial, Leilão Imovel e Zuckerman. Os imoveis são salvos em um banco RDS na AWS.

 O serviço roda toda terça, quinta, sexta e sábado pela manhã para buscar os imoveis e avisa o interessado no Telegram através de um Bot.

Este é um projeto de hobbie apenas, não está otimizado ou utilizando as melhores práticas.


### Instalação

1. Instale o serverless: `npm install -g serverless`
1. Instale as dependencias: `npm install`
2. Gere os tipos: `npm run generate:typings`
3. Edite o arquivo env e crie o banco de dados: `npx prisma db push`
4. inicie o servidor: `npm run dev`

#### Graphql Playground

Após a aplicação estar rodando deve-se acessar [http://localhost:3000/graphql](http://localhost:3000/graphql).

#### Deploy na AWS

Configurar profile de deploy
```bash
aws configure list-profiles
aws s3 ls --profile dev
```

Selecionar profile default: <br/>
```bash
export AWS_PROFILE=dev
```
Fazer deploy do banco de dados no Amazon RDS
```bash
aws cloudformation deploy --stack-name scrapper-imoveis-stack --template-file rdsdatabase.yaml
```

Referencia: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html

## Comandos Prisma

Para adicionar novas mudanças no banco:

```
npx prisma db push
```

Para criar uma nova migration (Versão do banco)

```
npx prisma migration dev --name v1.0.0
```

## Documentação das Tecnologias

[Prisma ](https://www.prisma.io/docs/getting-started)