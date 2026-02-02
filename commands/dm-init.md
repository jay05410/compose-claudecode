---
name: dm-init
description: Initialize project domain files. Analyzes existing project or planning docs to generate CLAUDE.md and domain/ files.
---

# /dm-init

Generates project context files for Claude Code.

## Usage

```bash
/dm-init                      # Analyze existing project
/dm-init docs/PRD.md          # From planning document
/dm-init --config             # From project-config.yaml
```

## What It Does

1. **Analyzes** your project (code structure, dependencies, existing docs)
2. **Generates** `CLAUDE.md` (if not exists, or merges with existing)
3. **Generates** `.claude/domain/` files

## Input Sources (Priority Order)

1. **Existing `CLAUDE.md`** - Preserves user settings, extends with detected info
2. **`project-config.yaml`** - User-defined stack and structure preferences
3. **Planning docs** - PRD, specs, design docs (passed as argument)
4. **Project analysis** - Auto-detect from package.json, pyproject.toml, go.mod, etc.

## project-config.yaml

Optional file for explicit configuration:

```yaml
# .claude/project-config.yaml

project:
  name: "My Project"
  description: "Brief description"

stack:
  language: typescript
  frontend: react
  frontend_framework: nextjs
  backend: node
  database: postgresql
  
structure:
  src/app: "Next.js app router pages"
  src/components/ui: "Reusable UI primitives"
  src/components/features: "Feature-specific components"
  src/lib: "Utilities and API clients"
  src/types: "TypeScript type definitions"

references:
  - docs/PRD.md
  - docs/API-spec.md

settings:
  language: english        # Output language for domain files
  test_coverage: 80        # Minimum test coverage %
```

## Output

### CLAUDE.md (Project Root)

```markdown
# Project Name

Brief description.

## Stack
- Language: TypeScript
- Frontend: Next.js 15, React 19
- Database: Supabase (PostgreSQL)

## Structure
- `src/app/` - Pages and API routes
- `src/components/` - React components
- `src/lib/` - Utilities

## Commands
- `npm run dev` - Start dev server
- `npm test` - Run tests

## Rules
- [Project-specific rules]
```

### .claude/domain/

| File | Content |
|------|---------|
| `architecture.md` | System design, data flow, external services |
| `structure.md` | Folder conventions, file naming |
| `plan.md` | Milestones, features, decisions |
| `rules.md` | Project-specific coding rules |
| `glossary.md` | Domain terms, entities |
| `design-system.md` | UI/UX specs (if frontend exists) |

## Options

```bash
--config          # Use project-config.yaml only (no auto-detect)
--minimal         # Generate only: architecture, structure, glossary
--force           # Overwrite existing files
--lang [lang]     # Output language (english, korean, etc.)
```

## Examples

```bash
# New project with planning doc
/dm-init docs/PRD.md

# Existing project, auto-detect everything
/dm-init

# Explicit config, Korean output
/dm-init --config --lang korean

# Minimal setup for small project
/dm-init --minimal
```

## Behavior with Existing Files

| File | Exists? | Action |
|------|---------|--------|
| `CLAUDE.md` | Yes | Merge (preserve user content, add detected info) |
| `CLAUDE.md` | No | Generate new |
| `domain/*.md` | Yes | Skip (use --force to overwrite) |
| `domain/*.md` | No | Generate new |

## Agent

Invokes `domain-architect` agent.
