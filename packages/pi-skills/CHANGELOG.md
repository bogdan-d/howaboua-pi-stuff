# @howaboua/pi-skills

## 0.0.6

### Changes

- [#22](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/22) [`cf0ca88`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/cf0ca88feee5175cebda37043b0a0bfb5ad913d2) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Fix review-loop marker placement so the advisory preface remains in history instead of being pasted into the prompt during loop summarization, send review findings as custom review messages in all paths, harden smart-btw slot bounds and answer handling, improve subdirectory context discovery from shell output, and remove a missing file from the skills aggregate package manifest.

## 0.0.5

### Changes

- Include bundled package updates:

  - @howaboua/pi-skill-gh-issue-pr-flow: Keep sponsor-check status out of PR bodies and avoid reporting successful sponsor checks in final summaries.

- Updated dependencies [[`d312d81`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/d312d81f82e24645f7cc59f4b6ead1834afd19f9)]:
  - @howaboua/pi-skill-gh-issue-pr-flow@0.0.3

## 0.0.4

### Changes

- Include bundled package updates:

  - @howaboua/pi-skill-agent-native-hardening: Makes the agent native hardening skill language-agnostic and adds JavaScript/TypeScript-, Python-, Rust-, and Go-specific reference guidance.

- Updated dependencies [[`26d4e8b`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/26d4e8b89fb050463bf5cf3486ba1fa0ba84d8b3)]:
  - @howaboua/pi-skill-agent-native-hardening@0.0.2

## 0.0.3

### Changes

- `@howaboua/pi-skill-gh-issue-pr-flow` now documents safer file-based GitHub issue, PR, and comment body posting.

### Updated bundled packages

- `@howaboua/pi-skill-gh-issue-pr-flow@0.0.2`

## 0.0.2

### Changes

- [#6](https://github.com/IgorWarzocha/howaboua-pi-stuff/pull/6) [`e793612`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/e793612fb32a4f7e418f5d28772e6de75a5c26ad) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Fix aggregate package resource paths so Pi can load installed dependency extensions and skills.

## 0.0.1

### Changes

- [`3c8c222`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/3c8c2222bb8d907a85517dd2155f8ea77d2441fb) Thanks [@IgorWarzocha](https://github.com/IgorWarzocha)! - Initial public release from the Howaboua Pi Stuff monorepo.

- Updated dependencies [[`f252da3`](https://github.com/IgorWarzocha/howaboua-pi-stuff/commit/f252da342444236f06c6da3f7d92cbdab420d770)]:
  - @howaboua/pi-skill-agent-native-hardening@0.0.1
  - @howaboua/pi-skill-anti-ai-copy@0.0.1
  - @howaboua/pi-skill-chrome-cdp@0.0.1
  - @howaboua/pi-skill-gh-issue-pr-flow@0.0.1
  - @howaboua/pi-skill-project-reference-research@0.0.1
  - @howaboua/pi-skill-skill-creator@0.0.1
