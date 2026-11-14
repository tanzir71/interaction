# Getting started

INTRX is a zero-build library of native HTML, CSS and JavaScript interactions.
Run `python -m http.server 4173` from the checkout and open the local site.

Open a component, try its interaction, then copy its single-file source or prompt.
The source includes the stage runtime, local fonts and any photographic assets
needed by that component. External animation libraries are included only when
the component declares them.

For agent access, read [MCP setup](mcp-setup.md), use the [CLI](cli.md), or install
the [agent skill](agent-skill.md). The public index is `registry/index.json`.
Contributors should read the [stage contract](stage-contract.md).

## From inspiration to implementation

- Copy the motion brief: a component's LLM prompt specifies timing, easing,
  interaction math, accessibility and reduced motion for your coding agent.
- Copy one file: the source view includes HTML, scoped CSS and JavaScript, with
  external animation scripts only when declared by the component.
- Run it yourself: clone the repository and use any static server. There is no
  framework or build step required to browse the library.

## How the library compares

This is the original library's comparison, recorded in July 2026. It describes
general positioning; check each product for its current features.

| Library | What you browse | Runnable demo | Copyable implementation | LLM reconstruction prompt |
| --- | --- | --- | --- | --- |
| INTRX | Curated motion and interaction patterns | Every card | Single-file source | Every card |
| Codrops | Creative-development tutorials | Article-specific | Tutorial/project format | Not the format |
| CodePen | Community experiments | Usually | Varies by pen | Not the format |
| Uiverse | UI elements and components | Yes | Component snippets | Not the motion focus |
| Awwwards | Site inspiration and recognition | Live sites | No implementation registry | No |

The implementations are vanilla-first. Prompts describe a port to the host stack;
they are not prebuilt React, Vue or Svelte components. Review an interaction's
accessibility and performance in the context of your production application.

## Original roadmap

The original 236-item handoff and 56-item expansion roadmap are fully implemented.
The redesign, motion remediation and next collections are tracked separately in
the Handoff 3 implementation ledger. New patterns must meet the same interaction,
accessibility and visual-quality requirements.
