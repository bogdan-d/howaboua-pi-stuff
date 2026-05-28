---
name: omarchy-help
description: Helps maintain an Arch + Omarchy workstation. Use for Hyprland, Waybar, Walker, Mako, Ghostty/Kitty, themes, keybindings, window rules, screenshots, updates, diagnostics, Bluetooth, audio, reminders, or user-level Omarchy config. Do not use for upstream Omarchy source development.
---

# Omarchy Help

## Purpose

Help maintain a user's Arch + Omarchy desktop from the user-owned configuration layer. Prefer safe inspection, clear backups, and the official `omarchy` CLI where available.

## Boundaries

- Do not edit the Omarchy install directory, usually `~/.local/share/omarchy/`; treat it as read-only upstream-managed state.
- User-level config usually lives in `~/.config/`, `~/.local/bin/`, and other user-owned paths.
- Ask before destructive operations, package removals, broad resets, or service restarts that may disrupt the desktop.
- Do not assume machine-specific device names, mount points, usernames, themes, or hardware.

## Workflow

1. Clarify the symptom or requested desktop change.
2. Inspect current state with read-only commands first.
3. Prefer `omarchy --help`, `omarchy commands --json`, or relevant `omarchy <group> <action>` commands when available.
4. For config edits, modify user-owned files only and keep changes small.
5. For generated or migrated files, make a timestamped backup before editing.
6. Reload only the affected component when possible: Hyprland, Waybar, Mako, Walker, terminal config, or theme assets.
7. Report what changed, how to revert, and any follow-up commands the user should run manually.

## Useful areas

- Hyprland: keybindings, window rules, displays, workspace behavior.
- Waybar: modules, styling, restart/reload issues.
- Walker: launcher config and search behavior.
- Mako: notification styling and behavior.
- Ghostty/Kitty: terminal config and theme integration.
- Themes: user-owned theme overrides and copied stock theme patterns.
- Hardware: Bluetooth, audio, screenshots, screen recording, display helpers.

## Validation

- Prefer read-only status commands before edits.
- After config edits, run format/lint commands only when the relevant tool provides them.
- Reload the smallest relevant service or ask the user to reload if the command may interrupt the session.
- If a command is distro/version-specific, inspect local help output before using it.
