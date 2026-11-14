# CLI

Node 18 or newer is required. Only `packages/intrx` has npm dependencies.

```bash
npm ci --prefix packages/intrx
node packages/intrx/bin/intrx.js search "elastic tabs" --registry ./registry
node packages/intrx/bin/intrx.js list --category "Layout & UI" --registry ./registry
node packages/intrx/bin/intrx.js add elastic-tabs --dir src/components/intrx --registry ./registry
node packages/intrx/bin/intrx.js add elastic-tabs --format parts --dir src/components/intrx --registry ./registry
```

After package publication, replace the Node invocation with
`npx @tanziro/intrx@latest`. The binary remains `intrx` when installed.
The registry source is `--registry`, then `INTRX_REGISTRY_URL`, then the public
INTRX registry. HTTP responses are cached in `~/.cache/intrx` and revalidated
with ETags. A local registry directory supports offline use.

If the default Vercel mirror is unavailable, the client retries the public GitHub
Pages registry. Explicit custom registry sources retain their own failure behavior.

`add` preserves existing files. HTML format writes a portable document; parts
format writes HTML/CSS/JS for integration with the host application. Keep the
stage context, actions and cleanup when integrating parts. Locked components
return their prompt and upgrade URL without writing source.
