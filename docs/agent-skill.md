# Agent skill

The repository's `skills/intrx` folder contains a portable `SKILL.md` plus stage
and motion references. Install that folder in your agent's skill directory.

The skill finds components through MCP or the public JSON registry, chooses by
gesture and use case, and ports to the host stack while preserving timing,
interaction math, keyboard access and reduced motion. It maps appearance to the
host project's tokens and avoids adding undeclared animation libraries.
