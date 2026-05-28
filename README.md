# Howaboua Pi Stuff

Monorepo for my Pi packages.

## Packages

- `@howaboua/pi-stuff` — aggregate package for everything
- `@howaboua/pi-extensions` — aggregate package for extensions
- `@howaboua/pi-skills` — aggregate package for skills
- Individual packages live in `packages/*` and remain separately installable.

## Install

```bash
pi install npm:@howaboua/pi-stuff
# or
pi install npm:@howaboua/pi-extensions
pi install npm:@howaboua/pi-skills
# or individual packages, e.g.
pi install npm:@howaboua/pi-codex-conversion
```

## Release flow

Use Changesets:

```bash
bun install
bun changeset
```

Only packages named in a changeset get versioned/published. Package-specific `prepack` scripts only run for packages being packed/published.

`pi-codex-conversion` keeps its `apply_patch` binary bundle inside its own package. The expensive multi-OS binary refresh should only run when the apply-patch source/wrappers change.
