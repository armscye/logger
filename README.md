# @armscye/logger

> Common TypeScript types for logging.

## Install

```sh
npm install --save-dev @armscye/logger
# or
yarn add --dev @armscye/logger
# or
pnpm add -D @armscye/logger
```

Import with `import type { … }` so the import is erased from your build.

Requires Node.js 22.12 or later.

The package is ESM only. In a CommonJS file compiled with
`"module": "node16"`, add the `resolution-mode` attribute; with
`"module": "nodenext"` (TypeScript 5.8+) the plain form works.

```ts
import type { Logger } from '@armscye/logger' with {
  'resolution-mode': 'import',
};
```

> [!NOTE]
> Install it as a regular dependency instead if your package publishes
> `.d.ts` files that reference these types, or if you use inline
> `import { type … }` with `verbatimModuleSyntax`, which keeps an
> `import {} from '@armscye/logger'` at runtime.

## Usage

```ts
import type { Logger } from '@armscye/logger';
```

| Method                | Logs at the level |
| --------------------- | ----------------- |
| `trace(msg, ...args)` | TRACE             |
| `debug(msg, ...args)` | DEBUG             |
| `info(msg, ...args)`  | INFO              |
| `warn(msg, ...args)`  | WARN              |
| `error(msg, ...args)` | ERROR             |

`msg` is usually a string, but implementations must accept any value. `args`
fill placeholders such as `%s` in `msg`. How any others are handled depends on
the implementation, and some drop them, so give each argument a placeholder
and log an error as `msg`.

Depend on the interface, and let the application choose the implementation:

```ts
class OrderService {
  constructor(private readonly logger: Logger) {}

  place(order: Order): void {
    this.logger.info('Placing order %s', order.id);

    try {
      // ...
    } catch (error) {
      this.logger.error('Could not place order %s', order.id);
      this.logger.error(error);
    }
  }
}

new OrderService(console);
```

Every method returns `unknown`, so an implementation can return anything. The
global `console` is a `Logger`. How entries are formatted, where they are
written and which levels are enabled is up to the implementation.

## Contributing

Develop on the Node.js version in `.nvmrc` (`nvm use`, currently 24) and
pnpm via Corepack or a global install matching `packageManager` in
`package.json`. CI type-checks, tests and builds on Node.js 22.12, the
oldest version the package supports, and on 24 and 26. Lint and
formatting run once, on the `.nvmrc` version.

```sh
pnpm install     # also installs the Git hooks
pnpm lint        # ESLint (type-checked rules + JSDoc)
pnpm typecheck   # tsc --noEmit
pnpm test        # Vitest type tests (src/**/*.test-d.ts)
pnpm build       # emit dist/
pnpm format      # Prettier
```

| Script              | What it does                                |
| ------------------- | ------------------------------------------- |
| `build`             | Cleans and compiles `src/` to `dist/`       |
| `clean`             | Removes `dist/`                             |
| `typecheck`         | Type-checks sources, tests and config files |
| `lint`              | Runs ESLint                                 |
| `lint:fix`          | Runs ESLint and fixes what it can           |
| `format`            | Formats every file with Prettier            |
| `format:check`      | Fails if any file is not formatted          |
| `test`              | Runs the type tests                         |
| `check:package`     | Builds, then runs publint and attw          |
| `release`           | Cuts a release with release-it              |
| `prepack`           | Builds before `npm pack` or `npm publish`   |
| `renovate:validate` | Validates `renovate.json` (Node.js 24.11+)  |
| `prepare`           | Installs the Husky Git hooks                |

Every exported declaration needs JSDoc with a description; exported
interfaces and type aliases also need an `@example`.

### Commit conventions

Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
and are checked by commitlint in the `commit-msg` hook. The `pre-commit` hook
runs ESLint and Prettier on staged files.

```text
feat: add Logger type              → minor release
fix: correct Logger JSDoc          → patch release
feat!: drop Node.js 20 support     → major release
docs: clarify usage                → no version bump on its own
chore(deps): update vitest to v5   → no version bump on its own
```

Until 1.0.0 every bump is one level lower (`preMajor` in
`.release-it.json`): a breaking change is a minor release and a `feat` is a
patch release.

Renovate opens its PRs as `chore(deps): …`, so dependency updates never
appear in the changelog.

## License

This project is licensed under the **MIT license**.

See [LICENSE](./LICENSE) for more information.
