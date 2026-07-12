# Changelog

## 0.0.1

Initial monorepo release for the Howaboua Pi package collection.

This repository brings the previously separate Pi packages into one Bun workspace while keeping every package separately installable. It also adds aggregate packages for installing everything, extensions only, or skills only:

- `@howaboua/pi-stuff`
- `@howaboua/pi-extensions`
- `@howaboua/pi-skills`

Legacy package history remains in the original package changelogs where available:

- [`@howaboua/pi-auto-reasoning-tool`](./packages/pi-auto-reasoning-tool/CHANGELOG.md)
- [`@howaboua/pi-codex-conversion`](./packages/pi-codex-conversion/CHANGELOG.md)

Going forward, package-level changelogs remain the source of truth for each package, and this top-level changelog summarizes monorepo-wide releases.

<!-- package-changelog-summary -->

## Latest package changelogs

### @howaboua/pi-auto-reasoning-tool — 0.1.9

### Changes

- [#77](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/77) [`4be919f`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/4be919fea3c8ef6aba79f4a66907bc80d30908d4) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Preserves the user's reasoning floor through Pi 0.80.6 retries, compaction, and queued continuations while keeping autonomous choices capped at high.

[Full changelog](./packages/pi-auto-reasoning-tool/CHANGELOG.md)

### @howaboua/pi-auto-trees — 0.1.8

### Changes

- [#77](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/77) [`4be919f`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/4be919fea3c8ef6aba79f4a66907bc80d30908d4) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Pins compatibility checks to Pi 0.80.6 and verifies current session, TUI, tool, and file-mutation APIs.

[Full changelog](./packages/pi-auto-trees/CHANGELOG.md)

### @howaboua/pi-codex-conversion — 2.2.0

### Changes

- [#94](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/94) [`a820d16`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/a820d161749acfa010b1212cef40cb51efa5e023) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Add GPT-5.6 Code Mode with the Responses Lite transport, a freeform `exec` and `wait` surface, Codex-compatible nested patch/web/image tools, schema-free PATH tools, deferred custom TOML tools with bundled opt-in templates, and configurable Codex-style or detailed nested-tool rendering.

[Full changelog](./packages/pi-codex-conversion/CHANGELOG.md)

### @howaboua/pi-dynamic-tools — 0.0.5

### Changes

- [#92](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/92) [`68ceda7`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/68ceda7ee01203df93d181cd940dc1b64d93739d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Adds bundled promoted examples for subagents, vent logging, workflow creation, and semantic grep. Subagent prompts now explicitly require each subagent to perform its assigned role without further delegation.

[Full changelog](./packages/pi-dynamic-tools/CHANGELOG.md)

### @howaboua/pi-explore-subagents — 0.1.12

### Changes

- [#79](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/79) [`dc0d253`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/dc0d25382e1b650e024cc235e23ea62117784e23) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Uses GPT-5.6 Luna for shallow discovery and GPT-5.6 Terra for deep discovery by default.

[Full changelog](./packages/pi-explore-subagents/CHANGELOG.md)

### @howaboua/pi-extensions — 0.0.21

### Changes

- Include bundled package updates:

  - @howaboua/pi-markdown-workflows: Add a JSON `toolRegistration` setting that can hide the agent tool while keeping the rest of each extension active.
  - @howaboua/pi-subagent-review: Adds bundled promoted examples for subagents, vent logging, workflow creation, and semantic grep. Subagent prompts now explicitly require each subagent to perform its assigned role without further delegation.
  - @howaboua/pi-dynamic-tools: Adds bundled promoted examples for subagents, vent logging, workflow creation, and semantic grep. Subagent prompts now explicitly require each subagent to perform its assigned role without further delegation.
  - @howaboua/pi-semantic-grep: Add a JSON `toolRegistration` setting that can hide the agent tool while keeping the rest of each extension active.

- Updated dependencies [[`68ceda7`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/68ceda7ee01203df93d181cd940dc1b64d93739d), [`68ceda7`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/68ceda7ee01203df93d181cd940dc1b64d93739d)]:
  - @howaboua/pi-dynamic-tools@0.0.5
  - @howaboua/pi-subagent-review@0.2.8
  - @howaboua/pi-semantic-grep@0.1.17
  - @howaboua/pi-markdown-workflows@0.2.18

[Full changelog](./packages/pi-extensions/CHANGELOG.md)

### @howaboua/pi-markdown-workflows — 0.2.18

### Changes

- [#92](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/92) [`68ceda7`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/68ceda7ee01203df93d181cd940dc1b64d93739d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Add a JSON `toolRegistration` setting that can hide the agent tool while keeping the rest of each extension active.

[Full changelog](./packages/pi-markdown-workflows/CHANGELOG.md)

### @howaboua/pi-memories — 0.1.3

### Changes

- [#77](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/77) [`4be919f`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/4be919fea3c8ef6aba79f4a66907bc80d30908d4) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Runs memory distillation only when Pi quits and accepts the Pi 0.80.6 max thinking level.

[Full changelog](./packages/pi-memories/CHANGELOG.md)

### @howaboua/pi-semantic-grep — 0.1.17

### Changes

- [#92](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/92) [`68ceda7`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/68ceda7ee01203df93d181cd940dc1b64d93739d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Add a JSON `toolRegistration` setting that can hide the agent tool while keeping the rest of each extension active.

[Full changelog](./packages/pi-semantic-grep/CHANGELOG.md)

### @howaboua/pi-skill-agent-native-hardening — 0.0.3

### Changes

- [#72](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/72) [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Makes scorecards and work lanes conditional, sharpens evidence-based architecture guidance, adds focused dependency safety guidance, and documents TypeScript 7 migration constraints.

[Full changelog](./packages/pi-skill-agent-native-hardening/CHANGELOG.md)

### @howaboua/pi-skill-agents-md — 0.0.2

### Changes

- [#72](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/72) [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Refines AGENTS.md authoring around terse scoped instructions, README separation, and proactive nested maintenance.

[Full changelog](./packages/pi-skill-agents-md/CHANGELOG.md)

### @howaboua/pi-skill-anti-ai-copy — 0.0.2

### Changes

- [#72](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/72) [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Expands the skill from copy editing into universal drafting, rewriting, and prose review, with genre-aware guidance and a broader AI writing trope reference.

[Full changelog](./packages/pi-skill-anti-ai-copy/CHANGELOG.md)

### @howaboua/pi-skill-chrome-cdp — 0.0.2

### Changes

- [#72](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/72) [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Clarifies practical browser authorization, rejects ambiguous or non-interactable targets, verifies editable focus and text insertion, improves CDP timeout guidance, and makes new-tab startup deterministic.

[Full changelog](./packages/pi-skill-chrome-cdp/CHANGELOG.md)

### @howaboua/pi-skill-gh-issue-pr-flow — 0.0.4

### Changes

- [#72](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/72) [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Refines the GitHub workflow into a concise, mode-routed SOP while preserving release hygiene and exhaustive Codex review guidance.

[Full changelog](./packages/pi-skill-gh-issue-pr-flow/CHANGELOG.md)

### @howaboua/pi-skill-model-facing-api-design — 0.0.2

### Changes

- [#72](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/72) [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Expands Pi tool API guidance to cover current-API migration gates, model-facing results, errors, truncation, and prompt metadata, and improves the token helper's detection and reporting.

[Full changelog](./packages/pi-skill-model-facing-api-design/CHANGELOG.md)

### @howaboua/pi-skill-omarchy-help — 0.0.2

### Changes

- [#72](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/72) [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Expands Omarchy workstation help with command discovery, config ownership, and safe restart, refresh, update, theme, package, and recovery guidance.

[Full changelog](./packages/pi-skill-omarchy-help/CHANGELOG.md)

### @howaboua/pi-skill-project-reference-research — 0.0.2

### Changes

- [#72](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/72) [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Makes subagent delegation optional in project reference research, choosing direct or delegated inspection based on repository size, task scope, and context needs.

[Full changelog](./packages/pi-skill-project-reference-research/CHANGELOG.md)

### @howaboua/pi-skill-skill-creator — 0.0.3

### Changes

- [#72](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/72) [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Refines the standalone and bundled skill creation guidance, and hardens the checker with Pi limits and supporting-file suggestions.

[Full changelog](./packages/pi-skill-skill-creator/CHANGELOG.md)

### @howaboua/pi-skills — 0.0.8

### Changes

- Include bundled package updates:

  - @howaboua/pi-skill-gh-issue-pr-flow: Refines the GitHub workflow into a concise, mode-routed SOP while preserving release hygiene and exhaustive Codex review guidance.
  - @howaboua/pi-skill-chrome-cdp: Clarifies practical browser authorization, rejects ambiguous or non-interactable targets, verifies editable focus and text insertion, improves CDP timeout guidance, and makes new-tab startup deterministic.
  - @howaboua/pi-skill-skill-creator: Refines the standalone and bundled skill creation guidance, and hardens the checker with Pi limits and supporting-file suggestions.
  - @howaboua/pi-skill-project-reference-research: Makes subagent delegation optional in project reference research, choosing direct or delegated inspection based on repository size, task scope, and context needs.
  - @howaboua/pi-skill-model-facing-api-design: Expands Pi tool API guidance to cover current-API migration gates, model-facing results, errors, truncation, and prompt metadata, and improves the token helper's detection and reporting.
  - @howaboua/pi-skill-agent-native-hardening: Makes scorecards and work lanes conditional, sharpens evidence-based architecture guidance, adds focused dependency safety guidance, and documents TypeScript 7 migration constraints.
  - @howaboua/pi-skill-agents-md: Refines AGENTS.md authoring around terse scoped instructions, README separation, and proactive nested maintenance.
  - @howaboua/pi-skill-anti-ai-copy: Expands the skill from copy editing into universal drafting, rewriting, and prose review, with genre-aware guidance and a broader AI writing trope reference.

- Updated dependencies [[`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9), [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9), [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9), [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9), [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9), [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9), [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9), [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9)]:
  - @howaboua/pi-skill-chrome-cdp@0.0.2
  - @howaboua/pi-skill-project-reference-research@0.0.2
  - @howaboua/pi-skill-gh-issue-pr-flow@0.0.4
  - @howaboua/pi-skill-anti-ai-copy@0.0.2
  - @howaboua/pi-skill-model-facing-api-design@0.0.2
  - @howaboua/pi-skill-agents-md@0.0.2
  - @howaboua/pi-skill-skill-creator@0.0.3
  - @howaboua/pi-skill-agent-native-hardening@0.0.3

[Full changelog](./packages/pi-skills/CHANGELOG.md)

### @howaboua/pi-smart-btw — 0.2.4

### Changes

- [#79](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/79) [`dc0d253`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/dc0d25382e1b650e024cc235e23ea62117784e23) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Uses GPT-5.6 Luna for side-session questions by default.

[Full changelog](./packages/pi-smart-btw/CHANGELOG.md)

### @howaboua/pi-stuff — 0.0.21

### Changes

- Include bundled package updates:

  - @howaboua/pi-markdown-workflows: Add a JSON `toolRegistration` setting that can hide the agent tool while keeping the rest of each extension active.
  - @howaboua/pi-subagent-review: Adds bundled promoted examples for subagents, vent logging, workflow creation, and semantic grep. Subagent prompts now explicitly require each subagent to perform its assigned role without further delegation.
  - @howaboua/pi-dynamic-tools: Adds bundled promoted examples for subagents, vent logging, workflow creation, and semantic grep. Subagent prompts now explicitly require each subagent to perform its assigned role without further delegation.
  - @howaboua/pi-semantic-grep: Add a JSON `toolRegistration` setting that can hide the agent tool while keeping the rest of each extension active.

- Updated dependencies [[`68ceda7`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/68ceda7ee01203df93d181cd940dc1b64d93739d), [`68ceda7`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/68ceda7ee01203df93d181cd940dc1b64d93739d)]:
  - @howaboua/pi-dynamic-tools@0.0.5
  - @howaboua/pi-subagent-review@0.2.8
  - @howaboua/pi-semantic-grep@0.1.17
  - @howaboua/pi-markdown-workflows@0.2.18

[Full changelog](./packages/pi-stuff/CHANGELOG.md)

### @howaboua/pi-subagent-review — 0.2.8

### Changes

- [#92](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/92) [`68ceda7`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/68ceda7ee01203df93d181cd940dc1b64d93739d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Adds bundled promoted examples for subagents, vent logging, workflow creation, and semantic grep. Subagent prompts now explicitly require each subagent to perform its assigned role without further delegation.

[Full changelog](./packages/pi-subagent-review/CHANGELOG.md)

### @howaboua/pi-vent — 0.2.9

### Changes

- [#77](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/77) [`4be919f`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/4be919fea3c8ef6aba79f4a66907bc80d30908d4) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Pins compatibility checks to Pi 0.80.6 and verifies current session, TUI, tool, and file-mutation APIs.

[Full changelog](./packages/pi-vent/CHANGELOG.md)

