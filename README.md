# CoviScope

Dashboard de monitoramento COVID-19 com Next.js App Router, filtros por intervalo/data, i18n e visualizações interativas.

Link: https://covid-dashboard-pink.vercel.app/pt-BR/dashboard

## Stack

- Next.js 16 + React 19
- Emotion + Recharts
- Vitest (testes unitários)
- Playwright (testes E2E)

## Getting Started

```bash
npm install
npm run dev
```

A aplicação abre em http://localhost:3000.

## Testes

### Unitários (Vitest)

```bash
npm run test:unit
```

Modo watch:

```bash
npm run test:unit:watch
```

### E2E (Playwright)

```bash
npm run build
npx playwright install chromium
npm run test:e2e
```

## CI (GitHub Actions)

O workflow em `.github/workflows/ci.yml` roda em push/PR para `main` com as etapas:

1. `npm ci`
2. `npm run lint`
3. `npm run test:unit`
4. `npm run build`
5. `npx playwright install --with-deps chromium`
6. `npm run test:e2e`
