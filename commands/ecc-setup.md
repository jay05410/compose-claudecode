---
description: Setup Everything Claude Code in your environment
---

# /ecc-setup

Interactive setup for Everything Claude Code plugin.

## Usage

```
/ecc-setup
```

## Process

1. **Ask scope**: Local (project) or Global (~/.claude/)?
2. **Copy files**: Agents, commands, skills, hooks, rules, domain templates
3. **Configure stack**: Auto-detect or manual selection
4. **Setup MCP**: Guide for MCP server configuration

## Local Setup

Creates `.claude/` in current project:
```
.claude/
├── domain/         # Project-specific context
├── project-config.yaml
└── CLAUDE.md
```

## Global Setup

Installs to `~/.claude/`:
```
~/.claude/
├── agents/
├── commands/
├── skills/
├── hooks/
├── rules/
├── config/
└── domain/
```

## After Setup

1. Configure `~/.claude/config/stack.yaml` with your preferred stack
2. Add MCP servers to `~/.claude.json` (see mcp-configs/)
3. Run `/dm-init` in your project to generate domain files

## CLI Alternative

```bash
# Global setup
ecc setup --global

# Local setup
ecc setup --local

# Initialize domain files
ecc init
```
