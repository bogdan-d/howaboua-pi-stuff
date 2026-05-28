# Howaboua Pi Stuff

This is my Pi toolbox: the extensions and skills I use to keep agent sessions moving without building a whole fake operating system around them.

Everything here is still published as separate npm packages. Install the full bundle if you want my setup, or pick the one package you actually need. Revolutionary stuff. A table.

Pi packages run with your local permissions. You can obviously trust me, a stranger on the internet with a folder called `pi-stuff`, but maybe read the package before installing it anyway.

## Packages

Install any package by prefixing its package name with `pi install npm:@howaboua/`. For example:

```bash
pi install npm:@howaboua/pi-codex-conversion
```

<table>
<thead><tr><th>Install</th><th>Type</th><th>What it does</th></tr></thead>
<tbody>
<tr>
<td><strong>Bundles</strong><br><code>pi-stuff</code></td>
<td>bundle</td>
<td>General setup: extensions plus shareable skills. Excludes Codex conversion and Omarchy because those depend on your model/workstation setup.</td>
</tr>
<tr>
<td><code>pi-extensions</code></td>
<td>bundle</td>
<td>General extension packages. Excludes <code>pi-codex-conversion</code>; install that separately if you run Codex/GPT models and want native-tool adaptation.</td>
</tr>
<tr>
<td><code>pi-skills</code></td>
<td>bundle</td>
<td>Shareable skill packages. Excludes <code>omarchy-help</code> because not everyone is running my kind of desktop setup.</td>
</tr>
<tr>
<td><strong>Extensions</strong><br><code>pi-codex-conversion</code></td>
<td>extension, separate</td>
<td>Codex-style tools for Pi: <code>exec_command</code>, <code>write_stdin</code>, <code>apply_patch</code>, image tools, native Codex web search, and prompt/tool adaptation.</td>
</tr>
<tr>
<td><code>pi-auto-reasoning-tool</code></td>
<td>extension</td>
<td>Gives the agent a <code>change_reasoning</code> tool so it can raise/lower reasoning level when the work changes shape.</td>
</tr>
<tr>
<td><code>pi-auto-trees</code></td>
<td>extension</td>
<td>Adds <code>/marker</code> and <code>/end</code> for long sessions. Set a useful return point, summarize what was accomplished, then keep going.</td>
</tr>
<tr>
<td><code>pi-subagent-review</code></td>
<td>extension</td>
<td>Adds <code>/review</code>, an isolated review subagent that checks the right branch/range and returns findings for the main agent to address.</td>
</tr>
<tr>
<td><code>pi-semantic-grep</code></td>
<td>extension</td>
<td>Adds <code>semantic_grep</code>, a meaning-based code/docs search tool backed by local SQLite indexes and OpenAI-compatible embeddings.</td>
</tr>
<tr>
<td><code>pi-vent</code></td>
<td>extension</td>
<td>Adds <code>vent</code>, a small tool for logging repeated workflow friction into <code>VENT.md</code>.</td>
</tr>
<tr>
<td><code>pi-explore-subagents</code></td>
<td>extension</td>
<td>Adds <code>explore_subagent</code>, discovery-only shallow/deep subagents for reading and summarizing code without editing files.</td>
</tr>
<tr>
<td><code>pi-markdown-workflows</code></td>
<td>extension</td>
<td>Adds <code>/skills</code>, <code>/workflows</code>, workflow capture, <code>/learn</code>, and nested <code>AGENTS.md</code> context loading.</td>
</tr>
<tr>
<td><code>pi-smart-btw</code></td>
<td>extension</td>
<td>Side-session questions with explicit injection back into the main chat. Useful when you want a tangent without derailing the main thread.</td>
</tr>
<tr>
<td><code>pi-memories</code></td>
<td>extension</td>
<td>KISS local memory for Pi based on global <code>AGENTS.md</code>.</td>
</tr>
<tr>
<td><strong>Skills</strong><br><code>pi-skill-agent-native-hardening</code></td>
<td>skill</td>
<td>Refactor/audit posture for agent-built code: fewer godfiles, clearer ownership, less duplication, better traversability.</td>
</tr>
<tr>
<td><code>pi-skill-anti-ai-copy</code></td>
<td>skill</td>
<td>Rewrites text so it sounds specific, human, and less like a polite SaaS brochure.</td>
</tr>
<tr>
<td><code>pi-skill-chrome-cdp</code></td>
<td>skill</td>
<td>Browser inspection/control through Chrome DevTools Protocol. Based on <a href="https://github.com/pasky/chrome-cdp-skill"><code>pasky/chrome-cdp-skill</code></a>, with local Pi packaging changes.</td>
</tr>
<tr>
<td><code>pi-skill-gh-issue-pr-flow</code></td>
<td>skill</td>
<td>A generic GitHub issue/PR workflow with <code>gh</code>, branches, validation, PR bodies, and review triage.</td>
</tr>
<tr>
<td><code>pi-skill-project-reference-research</code></td>
<td>skill</td>
<td>Looks up external or local repos as reference context, then returns evidence-backed findings.</td>
</tr>
<tr>
<td><code>pi-skill-skill-creator</code></td>
<td>skill</td>
<td>Helps design, write, package, and tighten reusable agent skills.</td>
</tr>
<tr>
<td><code>pi-skill-omarchy-help</code></td>
<td>skill, separate</td>
<td>Generic Arch + Omarchy workstation maintenance. Install separately and customize it for your own machine.</td>
</tr>
</tbody>
</table>

## The workflow

A normal session is not fancy:

1. Start Pi and ask the agent to familiarise itself with the repo, usually with discovery subagents. (`pi-explore-subagents`, `pi-semantic-grep`)
2. Pull in GitHub issues, or ask the agent to group open issues into something PR-sized. (`pi-skill-gh-issue-pr-flow`)
3. Use `/marker` once the agent has enough baseline context. (`pi-auto-trees`)
4. Work on one issue or feature. (`pi-codex-conversion`, `pi-auto-reasoning-tool`)
5. Run `/review`, fix what is actually worth fixing, then review again if needed. (`pi-subagent-review`)
6. Open a PR and use external review feedback as another pass. (`pi-skill-gh-issue-pr-flow`)
7. Do manual QA and try to break the feature. (your eyes, sadly still required)
8. Use `/end` to summarize what changed and advance the marker. (`pi-auto-trees`)
9. Continue from the new marker for the next feature. (`pi-auto-trees`)
10. After larger changes, ask for a hardening pass to modularise the result and remove obvious slop. (`pi-skill-agent-native-hardening`)

The point is not loops, worker swarms, or pretending the agent is magic. It is a few raw Pi sessions, clear context boundaries, review passes, and enough tooling to stop long sessions from turning into archaeology.

For UI work, I usually give the agent a reference frame first: apps to inspect, screenshots, bits of interface I like. The agent builds a mock, then I iterate with browser control, screenshots, and human taste. One-shotting a good frontend is mostly a party trick.

## Other skills I use

A few useful skills are intentionally not in the bundles because they are either very taste-specific, UI/design-specific, or better installed from their own source:

- [`impeccable`](https://github.com/pbakaus/impeccable) by Peter Bakaus: high-quality frontend/interface generation.
- [`make-interfaces-feel-better`](https://github.com/jakubkrehel/make-interfaces-feel-better) by Jakub Krehel: UI microdetails, interaction polish, spacing, shadows, motion, all the fiddly bits.
- [`design-md`](https://github.com/google-labs-code/design.md): useful when working with Google Labs’ `DESIGN.md` spec and `@google/design.md` CLI.
- [`agent-pages`](https://github.com/IgorWarzocha/agent-pages): useful for rich local proposal/report/mockup surfaces, but not something I want to force into the default bundle.
- [React Grab](https://github.com/aidenybai/react-grab) by Aiden Bai is not a Pi skill here, but it is extremely useful for React UI iteration.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md). Package-level changelogs remain next to their packages where they exist.

## License

Individual packages keep their own license files. Current packages are MIT-licensed unless noted in the package directory.
