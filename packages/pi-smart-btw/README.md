# pi-smart-btw

`@howaboua/pi-smart-btw` adds `/btw <question>` to Pi: an async, ephemeral side session for questions you do not want to derail the main conversation. It starts a fresh no-session Pi RPC subprocess, renders side answers in the transcript, lets you ask follow-ups with more `/btw ...`, and injects the side-session result only when you choose.

- Fresh context: child starts with `pi --mode rpc --no-session`.
- Full tools/extensions/skills: no `--no-skills`; installed extensions load normally except this extension disables itself in the child to avoid nesting UI.
- Async main session: the command starts work in the background and returns immediately.
- Compose: press `alt+z` to prefill `/btw ` in the prompt editor.
- Injection: press `alt+c` from the UI while the btw block is visible.
- Dismiss: press `alt+x` from the UI while the btw block is visible.
- Only one slash command is registered: `/btw`.
- Side answers are rendered as display-only custom transcript messages and filtered from the LLM context with Pi's `context` hook. They are only sent to the main agent when you explicitly inject them. The widget shows status/actions only.

## Install

```bash
pi install npm:@howaboua/pi-smart-btw
```

Or try it for one session without adding it permanently:

```bash
pi -e npm:@howaboua/pi-smart-btw
```

## Usage

```text
/btw explain this error without interrupting the current task
```

While the side session is open:

- run another `/btw ...` to ask a follow-up in the same child session
- press `alt+c` to inject all completed side-session turns into the main chat
- press `alt+x` to dismiss and stop the child session
- press `alt+z` to prefill `/btw ` in the editor

Injection format for one turn:

```text
The user asked the following question in a separate session:
[Q]
The answer was:
[A]
Take it into account while executing the current task.
```

For multiple completed turns, injection includes every question/answer pair in order.

## Configuration

Config is created at `~/.pi/agent/pi-smart-btw.json`:

```json
{
  "model": "openai-codex/gpt-5.4-mini",
  "provider": "",
  "thinking": "low",
  "command": "pi",
  "injectShortcut": "alt+c",
  "dismissShortcut": "alt+x",
  "composeShortcut": "alt+z"
}
```

## Development

```bash
npm install
npm run check
npm run pack:dry-run
```

