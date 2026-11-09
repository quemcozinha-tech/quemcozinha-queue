# @quemcozinha-tech/queue

Pacote npm de infraestrutura pura para filas BullMQ. Exporta primitivos de conexão Redis e fábrica de filas/workers — sem conhecimento de nenhuma feature de negócio.

## Uso

```ts
import { createRedisConnection, createQueue, createWorker } from "@quemcozinha-tech/queue";

const redis = createRedisConnection(process.env.REDIS_URL ?? "redis://localhost:6379");

// Produtor (qcozinha-api)
const queue = createQueue<MyJobPayload>("my-queue", redis);
await queue.add("job-name", payload, { attempts: 3 });

// Consumidor (qcozinha-ocr-service)
const worker = createWorker<MyJobPayload>("my-queue", async (job) => {
  // processar job.data
}, redis);
```

Cada serviço define seus próprios tipos de payload localmente — o pacote não carrega tipos de negócio.

## Desenvolvimento local

Este pacote é referenciado como `file:../quemcozinha-queue` em `qcozinha-api` e `qcozinha-ocr-service`. Por isso **precisa ser construído antes** de qualquer `npm ci` nesses projetos.

```bash
npm ci
npm run build   # gera dist/ — necessário para os file: deps resolverem
```

Após qualquer mudança no código-fonte, rode `npm run build` novamente e reinicie os serviços dependentes.

## Scripts

| Comando       | Descrição                          |
|---------------|------------------------------------|
| `npm run build` | Compila TypeScript para `dist/`  |
| `npm test`    | Roda testes com Vitest             |

## Publicação (produção)

Em produção, o pacote é publicado no GitHub Packages como `@quemcozinha-tech/queue`. Os serviços trocam o `file:` dep pela versão publicada:

```json
"@quemcozinha-tech/queue": "^1.0.0"
```

O build Docker de cada serviço usa `.npmrc` com `@quemcozinha-tech:registry=https://npm.pkg.github.com` e `NPM_TOKEN` para autenticar no GitHub Packages.
