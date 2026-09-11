# Update Code Mode host assets

Use this checklist when a new Codex release updates the Code Mode host.

Prerequisites: authenticated `gh` and `jq`.

1. Read `packages/pi-codex-conversion/src/tools/code-mode/host-assets.ts` and the dedicated Code Mode host changeset in `.changeset/`. Keep unrelated working-tree changes untouched.
2. Set `HOST_RELEASE` to `rust-vX.Y.Z`, where `X.Y.Z` is the new Codex release.
3. Fetch the six direct host-asset digests from the matching GitHub release. The command below prints the exact filenames and SHA-256 values; omit the `sha256:` prefix in TypeScript:

   ```sh
   gh api "repos/openai/codex/releases/tags/rust-vX.Y.Z" |
     jq -r '
       .assets[] |
       select(.name | IN(
         "codex-code-mode-host-aarch64-apple-darwin.tar.gz",
         "codex-code-mode-host-x86_64-apple-darwin.tar.gz",
         "codex-code-mode-host-aarch64-unknown-linux-musl.tar.gz",
         "codex-code-mode-host-x86_64-unknown-linux-musl.tar.gz",
         "codex-code-mode-host-aarch64-pc-windows-msvc.exe",
         "codex-code-mode-host-x86_64-pc-windows-msvc.exe"
       )) |
       "\(.name)\t\(.digest | ltrimstr("sha256:"))"
     '
   ```

4. Replace only the six hashes in `host-assets.ts`, preserving the existing platform order and asset filenames.
5. Change the changeset sentence to `Update Code Mode host to Codex rust-vX.Y.Z`. If no dedicated changeset exists, run `bun changeset -- "Update Code Mode host to Codex rust-vX.Y.Z"` and select `@howaboua/pi-codex-conversion` with a patch bump.
6. Check the result without resetting or staging anything:

   ```sh
   git diff -- packages/pi-codex-conversion/src/tools/code-mode/host-assets.ts .changeset/patch-mskuwm9o-e83e4a.md
   rg 'rust-vX\.Y\.Z|sha256:' packages/pi-codex-conversion/src/tools/code-mode/host-assets.ts
   ```

The release API digest is authoritative. Do not use the `.zst`, archive-wrapper, or signature assets; this package downloads the six filenames already listed in `host-assets.ts`.

If any of the six assets or digests is missing, stop and check the release tag. Do not guess a hash. To revert, restore only `host-assets.ts` and the dedicated changeset. Never reset the whole working tree.
