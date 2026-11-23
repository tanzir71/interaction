# Pro source scaffolding

The published catalog keeps all 520 components free. `js/shell/access.js`
contains the disabled owner launch flag and the two Figma Pro candidates:
`fx-liquid-glass` and `fx-plasma-orb`. Pricing remains **SOON**. The handoff
prepares the source interfaces; payment and account services belong to launch.

The shell reads the effective tier before displaying or copying source. A Pro
detail keeps its live preview, controls, notes and complete prompt available.
Single file, HTML, CSS and JS tabs show the neutral locked panel; the prompt tab
remains readable and copyable. The original Figma crown is unchanged. A lock
returned by the source registry overrides stale free metadata, and an obsolete
route cannot update the next page. Demo implementations contain no entitlement
checks. The runnable preview modules remain public.

The registry builder redacts Pro `files`, `parts` and source previews. The MCP
returns `{ id, locked, prompt, upgradeUrl }` for locked component tools and
resources, including requests for framework ports. `get_prompt` remains free.
The CLI prints the upgrade URL and creates no destination or source files.

Create an isolated Pro catalog for local verification:

```sh
node tools/build-registry.js --pro-preview --output .artifacts/pro-preview
```

The preview option requires an output directory inside the workspace's
`.artifacts` directory. It cannot overwrite the published registry. A default
build follows the owner flag; activating that flag and regenerating published
output is a separate owner launch decision.

Run the current verification locally:

```sh
node --test tools/pro-policy.test.js tools/shell.test.js
node tools/verify-pro-registry.js
node tools/verify-pro.js http://127.0.0.1:4173
node tools/verify-pro-access.js http://127.0.0.1:4173
npm test --prefix packages/intrx
```

The browser verifier uses the isolated catalog with actual production shell
code. It covers both candidates at 1440, 390 and 360px in both page themes.
Separate stories exercise actual free export, complete prompts, pending
clipboard intents, stale metadata and late route responses. GitHub Actions
remain disabled; these commands run locally.
