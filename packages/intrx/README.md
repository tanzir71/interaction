# INTRX CLI and MCP

Local package: `@tanziro/intrx`; binary: `intrx`; Node ≥18.
The unscoped `intrx` name belongs to another package. This package has not been
published to npm by this implementation task.

From the repository root:

```bash
npm ci --prefix packages/intrx
node packages/intrx/bin/intrx.js search "elastic tabs" --registry ./registry
node packages/intrx/bin/intrx.js add elastic-tabs --registry ./registry
node packages/intrx/bin/intrx.js mcp --registry ./registry
```

The MCP server exposes seven read-only tools, component/category/token resources,
and `add-interaction` / `audit-motion` prompts. Source writing happens through the
CLI or the host agent. HTTP registries use ETag cache revalidation; local registry
paths work offline. See `docs/mcp-setup.md` and `docs/cli.md` in the repository.
The default Vercel registry falls back to GitHub Pages when unavailable.

Run tests with `npm test` in this package. The stdio test launches the actual
binary and verifies its initialization, tools, resources and prompts.
