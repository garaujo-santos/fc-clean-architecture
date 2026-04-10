# FC Clean Architecture

## Rodar testes

### Instalar dependencias

```bash
npm install
```

### Executar todos os testes

```bash
npm test
```

### Executar cobertura de testes

```bash
npm run test:coverage
```

### Executar um arquivo especifico

```bash
npm test -- src/usecase/product/create/create.product.integration.spec.ts
```

### Executar apenas os testes de product usecases

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
