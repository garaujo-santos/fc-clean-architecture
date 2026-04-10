# FC Clean Architecture

Repositorio unico para os desafios do modulo, mantendo evolucao incremental no mesmo projeto.

## Setup

### Instalar dependencias

```bash
npm install
```

## Desafio 1 - Use Cases de Product

### Rodar todos os testes

```bash
npm test
```

### Rodar cobertura de testes

```bash
npm run test:coverage
```

### Rodar apenas testes de Product Use Cases

```bash
npm test -- \
  src/usecase/product/create/create.product.unit.spec.ts \
  src/usecase/product/create/create.product.integration.spec.ts \
  src/usecase/product/find/find.product.unit.spec.ts \
  src/usecase/product/find/find.product.integration.spec.ts \
  src/usecase/product/list/list.product.unit.spec.ts \
  src/usecase/product/list/list.product.integration.spec.ts \
  src/usecase/product/update/update.product.unit.spec.ts \
  src/usecase/product/update/update.product.integration.spec.ts
```

## Desafio 2 - Endpoint GET /product + E2E

### Subir API

```bash
npm run dev
```

Rotas disponiveis:

- `GET /customer`
- `POST /customer`
- `GET /product`

### Rodar testes E2E da API

```bash
npm run test:e2e
```

### Rodar apenas o E2E de Product

```bash
npm test -- src/infrastructure/api/__tests__/product.e2e.spec.ts
```

## Desafio 3 - Notification Pattern na Entidade Product

### Rodar os testes do desafio

```bash
npm test -- src/domain/product/entity/product.spec.ts
```

Esse teste cobre as validacoes da entidade Product, incluindo o cenario de multiplos erros na notificacao.

## Desafio 4 - Alteração da validação e testes de regressão

### Subir API

```bash
npm run dev
```

Rotas disponiveis:

- `GET /customer`
- `POST /customer`
- `GET /product`

### Rodar testes E2E da API

```bash
npm run test:e2e
```

### Rodar todos os testes

```bash
npm test
```
