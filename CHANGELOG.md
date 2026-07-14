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

### @howaboua/pi-auto-reasoning-tool — 0.1.10

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Tighten the change_reasoning agent contract and clarify responses at the user's minimum.

[Full changelog](./packages/pi-auto-reasoning-tool/CHANGELOG.md)

### @howaboua/pi-auto-trees — 0.1.9

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-auto-trees/CHANGELOG.md)

### @howaboua/pi-codex-conversion — 2.2.3

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-codex-conversion/CHANGELOG.md)

### @howaboua/pi-dynamic-tools — 0.0.6

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-dynamic-tools/CHANGELOG.md)

### @howaboua/pi-explore-subagents — 0.1.13

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-explore-subagents/CHANGELOG.md)

### @howaboua/pi-extensions — 0.0.23

### Changes

- Include bundled package updates:

  - @howaboua/pi-markdown-workflows: Load nested AGENTS.md context from successful pi-codex Code Mode tool traces.
  - @howaboua/pi-auto-reasoning-tool: Tighten the change_reasoning agent contract and clarify responses at the user's minimum.
  - @howaboua/pi-auto-trees: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-smart-btw: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-subagent-review: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-vent: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-dynamic-tools: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-memories: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-explore-subagents: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-semantic-grep: Rewrite package documentation around current installation, configuration, usage, and behavior.

- Updated dependencies [[`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d), [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d), [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d)]:
  - @howaboua/pi-markdown-workflows@0.2.19
  - @howaboua/pi-auto-trees@0.1.9
  - @howaboua/pi-dynamic-tools@0.0.6
  - @howaboua/pi-explore-subagents@0.1.13
  - @howaboua/pi-memories@0.1.4
  - @howaboua/pi-semantic-grep@0.1.18
  - @howaboua/pi-smart-btw@0.2.5
  - @howaboua/pi-subagent-review@0.2.10
  - @howaboua/pi-vent@0.2.10
  - @howaboua/pi-auto-reasoning-tool@0.1.10

[Full changelog](./packages/pi-extensions/CHANGELOG.md)

### @howaboua/pi-markdown-workflows — 0.2.19

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Load nested AGENTS.md context from successful pi-codex Code Mode tool traces.

[Full changelog](./packages/pi-markdown-workflows/CHANGELOG.md)

### @howaboua/pi-memories — 0.1.4

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-memories/CHANGELOG.md)

### @howaboua/pi-semantic-grep — 0.1.18

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-semantic-grep/CHANGELOG.md)

### @howaboua/pi-skill-agent-native-hardening — 0.0.4

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-skill-agent-native-hardening/CHANGELOG.md)

### @howaboua/pi-skill-agents-md — 0.0.3

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-skill-agents-md/CHANGELOG.md)

### @howaboua/pi-skill-anti-ai-copy — 0.0.3

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-skill-anti-ai-copy/CHANGELOG.md)

### @howaboua/pi-skill-chrome-cdp — 0.0.3

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-skill-chrome-cdp/CHANGELOG.md)

### @howaboua/pi-skill-gh-issue-pr-flow — 0.0.5

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-skill-gh-issue-pr-flow/CHANGELOG.md)

### @howaboua/pi-skill-model-facing-api-design — 0.0.3

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-skill-model-facing-api-design/CHANGELOG.md)

### @howaboua/pi-skill-omarchy-help — 0.0.3

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-skill-omarchy-help/CHANGELOG.md)

### @howaboua/pi-skill-project-reference-research — 0.0.3

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-skill-project-reference-research/CHANGELOG.md)

### @howaboua/pi-skill-skill-creator — 0.0.4

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-skill-skill-creator/CHANGELOG.md)

### @howaboua/pi-skills — 0.0.9

### Changes

- Include bundled package updates:

  - @howaboua/pi-skill-gh-issue-pr-flow: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-skill-chrome-cdp: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-skill-skill-creator: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-skill-project-reference-research: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-skill-model-facing-api-design: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-skill-agent-native-hardening: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-skill-agents-md: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-skill-anti-ai-copy: Rewrite package documentation around current installation, configuration, usage, and behavior.

- Updated dependencies [[`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d)]:
  - @howaboua/pi-skill-agent-native-hardening@0.0.4
  - @howaboua/pi-skill-agents-md@0.0.3
  - @howaboua/pi-skill-anti-ai-copy@0.0.3
  - @howaboua/pi-skill-chrome-cdp@0.0.3
  - @howaboua/pi-skill-gh-issue-pr-flow@0.0.5
  - @howaboua/pi-skill-model-facing-api-design@0.0.3
  - @howaboua/pi-skill-project-reference-research@0.0.3
  - @howaboua/pi-skill-skill-creator@0.0.4

[Full changelog](./packages/pi-skills/CHANGELOG.md)

### @howaboua/pi-smart-btw — 0.2.5

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-smart-btw/CHANGELOG.md)

### @howaboua/pi-stuff — 0.0.23

### Changes

- Include bundled package updates:

  - @howaboua/pi-markdown-workflows: Load nested AGENTS.md context from successful pi-codex Code Mode tool traces.
  - @howaboua/pi-auto-reasoning-tool: Tighten the change_reasoning agent contract and clarify responses at the user's minimum.
  - @howaboua/pi-auto-trees: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-smart-btw: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-subagent-review: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-vent: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-dynamic-tools: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-memories: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-explore-subagents: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-semantic-grep: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-skill-gh-issue-pr-flow: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-skill-chrome-cdp: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-skill-skill-creator: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-skill-project-reference-research: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-skill-model-facing-api-design: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-skill-agent-native-hardening: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-skill-agents-md: Rewrite package documentation around current installation, configuration, usage, and behavior.
  - @howaboua/pi-skill-anti-ai-copy: Rewrite package documentation around current installation, configuration, usage, and behavior.

- Updated dependencies [[`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d), [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d), [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d)]:
  - @howaboua/pi-markdown-workflows@0.2.19
  - @howaboua/pi-auto-trees@0.1.9
  - @howaboua/pi-dynamic-tools@0.0.6
  - @howaboua/pi-explore-subagents@0.1.13
  - @howaboua/pi-memories@0.1.4
  - @howaboua/pi-semantic-grep@0.1.18
  - @howaboua/pi-skill-agent-native-hardening@0.0.4
  - @howaboua/pi-skill-agents-md@0.0.3
  - @howaboua/pi-skill-anti-ai-copy@0.0.3
  - @howaboua/pi-skill-chrome-cdp@0.0.3
  - @howaboua/pi-skill-gh-issue-pr-flow@0.0.5
  - @howaboua/pi-skill-model-facing-api-design@0.0.3
  - @howaboua/pi-skill-project-reference-research@0.0.3
  - @howaboua/pi-skill-skill-creator@0.0.4
  - @howaboua/pi-smart-btw@0.2.5
  - @howaboua/pi-subagent-review@0.2.10
  - @howaboua/pi-vent@0.2.10
  - @howaboua/pi-auto-reasoning-tool@0.1.10

[Full changelog](./packages/pi-stuff/CHANGELOG.md)

### @howaboua/pi-subagent-review — 0.2.10

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-subagent-review/CHANGELOG.md)

### @howaboua/pi-vent — 0.2.10

### Changes

- [#106](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/106) [`c423031`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/c4230312f24db0e49c95eafff959109d74017c3d) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Rewrite package documentation around current installation, configuration, usage, and behavior.

[Full changelog](./packages/pi-vent/CHANGELOG.md)

