# @howaboua/pi-ask

Adds one agent-callable `ask` tool for human input. It handles free-text prompts, batched choices, review dispositions, and user-only handoffs without making the agent dump a report into chat first.

## Install

```bash
pi install npm:@howaboua/pi-ask
```

Try it for one session:

```bash
pi -e npm:@howaboua/pi-ask
```

## How it behaves

The agent can present several independently decidable prompts in one tabbed panel. Each prompt supports a short title, supporting evidence, one or more choices, free text, and an optional comment. Review findings become one prompt each, so you can fix, defer, or reject them without translating a wall of prose back into instructions.

For work only you can complete—sign-in, authorization, hardware access, or another manual step—the agent can open a handoff and wait until you mark it done or unable to complete.

`Other/rephrase` is always available. Submit it blank when the prompt needs to be rephrased, split, or followed up instead of answered as written.

## Prompt commands

- `/fold [report]` turns a long report or structured list into one interactive disposition prompt per item.
- `/grill [idea]` investigates an idea, asks successive decisions, and keeps the agreed plan in `docs/`.

## TUI controls

- `Up` / `Down` — move through choices, free text, and comments
- `Enter` — choose or edit the focused item
- `Left` / `Right` — move between prompts and the review tab
- `Tab` — advance, using `Other/rephrase` when the current prompt is unanswered
- `Esc` — dismiss the panel

The tool requires Pi's interactive TUI or RPC UI. It returns dismissal as a distinct result so the agent can stop asking rather than guessing.
