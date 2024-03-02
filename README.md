# CURRENCY EXCHANGE DEMO

A simple application that allows the user to convert between currencies.

# Catalogs

```bash
.
├── app          # routes
├── components   # universal components 
├── fragments    # specific components, used once
├── hooks
├── utils
└── tests
```

## Getting Started

First, set exchange api serwer url as the `API_URL` environment variable.

```bash
# .env.local
API_URL=https://api.exchangerate-api.com/v4/latest/USD
```

Next, install dependencies.

```bash
pnpm i
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Quality assurance

There are several tools to check quality of the code.

### Linters

```bash
pnpm lint
```

### Tests

Run `pnpm build` and `pnpm start`, then run `npx playwright test` in another terminal window to run the Playwright tests.

Check [NextJS Docs](https://nextjs.org/docs/pages/building-your-application/testing/playwright#running-your-playwright-tests) for more information.

To update snapshots use a `--update-snapshots` argument in the `npx` command.

```bash
npx playwright test --update-snapshots
```

#### Mutation testing

[stryker mutator](https://stryker-mutator.io/docs/stryker-js/getting-started/)

```bash
npx stryker run
```