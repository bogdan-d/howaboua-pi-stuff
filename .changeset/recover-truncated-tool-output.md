---
"@howaboua/pi-codex-conversion": patch
---

Keep truncated shell and Code/Notebook output recoverable without rerunning work. Results now report retained byte ranges and page through `write_stdin` or `wait`, while Code/Notebook Mode also exposes Pi's bounded line-paged `read` tool for source files.
