---
name: dm-sync
description: Sync domain files with actual code. Reviews changes and updates architecture, structure, and other domain docs.
---

# /dm-sync

Syncs `.claude/domain/` files to match current code state.

## Usage

```
/dm-sync              # Review only (suggest changes)
/dm-sync --apply      # Auto update
/dm-sync --diff       # Preview changes
```

## Process

1. **Analyze Changes**
   - Check recent code changes
   - Identify affected domain files

2. **Compare**
   - Current domain files vs actual code
   - List mismatches

3. **Update**
   - Auto-modify with `--apply`
   - Otherwise just output suggestions

## Output

```markdown
## Domain Sync Report

### Updates Required

#### architecture.md
- Add new service: Redis cache

#### structure.md  
- Add folder: src/lib/cache/

### No Updates Needed
- design-system.md
- glossary.md
```

## When to Use

- After major refactoring
- After adding new features
- Before creating PR
- Periodic review

## Agent

This command invokes the `domain-sync` agent.
