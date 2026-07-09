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

### @howaboua/pi-auto-reasoning-tool — 0.1.8

### Changes

- [#67](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/67) [`1a4302a`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/1a4302ad02a122480aeba29deacaa6f8925571ad) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Updates Pi core package compatibility for Pi 0.80.1 and migrates summary model calls to the Pi 0.80 raw API entrypoints.

[Full changelog](./packages/pi-auto-reasoning-tool/CHANGELOG.md)

### @howaboua/pi-auto-trees — 0.1.7

### Changes

- [#67](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/67) [`1a4302a`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/1a4302ad02a122480aeba29deacaa6f8925571ad) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Updates Pi core package compatibility for Pi 0.80.1 and migrates summary model calls to the Pi 0.80 raw API entrypoints.

[Full changelog](./packages/pi-auto-trees/CHANGELOG.md)

### @howaboua/pi-codex-conversion — 2.1.6

### Changes

- [#69](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/69) [`8b8ddb4`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/8b8ddb47812a6033b01f66e5442f282b4dc84d44) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Fixes PATH-mode apply_patch previews with trailing shell commands and keeps PATH web_run/imagegen commands on the long wait path.

- [#69](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/69) [`8b8ddb4`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/8b8ddb47812a6033b01f66e5442f282b4dc84d44) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Updates the Codex provider compatibility pass for Pi 0.80.1.

[Full changelog](./packages/pi-codex-conversion/CHANGELOG.md)

### @howaboua/pi-explore-subagents — 0.1.10

### Changes

- [#67](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/67) [`1a4302a`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/1a4302ad02a122480aeba29deacaa6f8925571ad) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Updates Pi core package compatibility for Pi 0.80.1 and migrates summary model calls to the Pi 0.80 raw API entrypoints.

[Full changelog](./packages/pi-explore-subagents/CHANGELOG.md)

### @howaboua/pi-extensions — 0.0.14

### Changes

- Include bundled package updates:

  - @howaboua/pi-markdown-workflows: Refines the standalone and bundled skill creation guidance, and hardens the checker with Pi limits and supporting-file suggestions.

- Updated dependencies [[`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9)]:
  - @howaboua/pi-markdown-workflows@0.2.16

[Full changelog](./packages/pi-extensions/CHANGELOG.md)

### @howaboua/pi-markdown-workflows — 0.2.16

### Changes

- [#72](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/72) [`ff8d5cf`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/ff8d5cf9412ec07fea8b613f0aadc906c6c398f9) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Refines the standalone and bundled skill creation guidance, and hardens the checker with Pi limits and supporting-file suggestions.

[Full changelog](./packages/pi-markdown-workflows/CHANGELOG.md)

### @howaboua/pi-memories — 0.1.2

### Changes

- [#67](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/67) [`1a4302a`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/1a4302ad02a122480aeba29deacaa6f8925571ad) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Updates Pi core package compatibility for Pi 0.80.1 and migrates summary model calls to the Pi 0.80 raw API entrypoints.

[Full changelog](./packages/pi-memories/CHANGELOG.md)

### @howaboua/pi-semantic-grep — 0.1.15

### Changes

- [#67](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/67) [`1a4302a`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/1a4302ad02a122480aeba29deacaa6f8925571ad) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Updates Pi core package compatibility for Pi 0.80.1 and migrates summary model calls to the Pi 0.80 raw API entrypoints.

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

### @howaboua/pi-smart-btw — 0.2.2

### Changes

- [#67](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/67) [`1a4302a`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/1a4302ad02a122480aeba29deacaa6f8925571ad) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Updates Pi core package compatibility for Pi 0.80.1 and migrates summary model calls to the Pi 0.80 raw API entrypoints.

[Full changelog](./packages/pi-smart-btw/CHANGELOG.md)

### @howaboua/pi-stuff — 0.0.14

### Changes

- Include bundled package updates:

  - @howaboua/pi-markdown-workflows: Refines the standalone and bundled skill creation guidance, and hardens the checker with Pi limits and supporting-file suggestions.
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
  - @howaboua/pi-markdown-workflows@0.2.16
  - @howaboua/pi-skill-agent-native-hardening@0.0.3

[Full changelog](./packages/pi-stuff/CHANGELOG.md)

### @howaboua/pi-subagent-review — 0.2.5

### Changes

- [#71](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/71) [`2a4371b`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/2a4371b67bcf69f5237152e087c6998b4810ab5a) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Fixes Pi 0.80 extension loading for review summary model calls.

[Full changelog](./packages/pi-subagent-review/CHANGELOG.md)

### @howaboua/pi-vent — 0.2.8

### Changes

- [#67](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/67) [`1a4302a`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/1a4302ad02a122480aeba29deacaa6f8925571ad) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Updates Pi core package compatibility for Pi 0.80.1 and migrates summary model calls to the Pi 0.80 raw API entrypoints.

[Full changelog](./packages/pi-vent/CHANGELOG.md)

