# MCP setup

The package is named `@tanziro/intrx` because the unscoped npm name is occupied.
It is implemented in this repository; npm publication is a separate owner action.
Until publication, install its dependencies with `npm ci --prefix packages/intrx`
and configure clients to run the local `packages/intrx/bin/intrx.js` with Node.
Use absolute paths for both the script and `--registry` directory.

## Codex

Add this to `~/.codex/config.toml`, substituting your checkout paths:

```toml
[mcp_servers.intrx]
command = "node"
args = ["/absolute/path/interaction/packages/intrx/bin/intrx.js", "mcp", "--registry", "/absolute/path/interaction/registry"]
```

After npm publication, use `command = "npx"` and
`args = ["-y", "@tanziro/intrx@latest", "mcp"]`.
See the [official MCP configuration guide](https://learn.chatgpt.com/docs/extend/mcp?surface=cli).

## Claude Code

```bash
claude mcp add intrx -- node /absolute/path/interaction/packages/intrx/bin/intrx.js mcp --registry /absolute/path/interaction/registry
```

After npm publication:

```bash
claude mcp add intrx -- npx -y @tanziro/intrx@latest mcp
```

## Cursor

Use the client's `mcp.json` with this entry under `mcpServers`:

```json
{"intrx":{"command":"node","args":["/absolute/path/interaction/packages/intrx/bin/intrx.js","mcp","--registry","/absolute/path/interaction/registry"]}}
```

## VS Code

Use `.vscode/mcp.json` with this entry under `servers`:

```json
{"intrx":{"type":"stdio","command":"node","args":["/absolute/path/interaction/packages/intrx/bin/intrx.js","mcp","--registry","/absolute/path/interaction/registry"]}}
```

On Windows, JSON paths use forward slashes or escaped backslashes. The server
speaks stdio JSON-RPC and never writes startup messages to stdout. Ask your agent
to search INTRX for an interaction, fetch it, and adapt it to your project's tokens.
