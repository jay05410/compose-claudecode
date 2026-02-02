---
description: Enforce test-driven development workflow. Write tests FIRST, then implement minimal code to pass. Ensure 80%+ coverage.
---

# /tdd Command

Invokes the **tdd-guide** agent to enforce test-driven development.

## TDD Cycle

```
RED    → Write failing test
GREEN  → Write minimal code to pass
REFACTOR → Improve code, keep tests green
REPEAT
```

## When to Use

- Implementing new features
- Fixing bugs (write test that reproduces bug first)
- Refactoring existing code
- Adding API endpoints or components

## Usage

```
/tdd [description of what to implement]
```

**Example:**
```
/tdd I need a function to calculate market liquidity score
```

## What the Agent Does

1. **Define interfaces** for inputs/outputs
2. **Write failing tests** (RED phase)
3. **Run tests** to verify they fail correctly
4. **Implement minimal code** to pass (GREEN phase)
5. **Run tests** to verify they pass
6. **Refactor** while keeping tests green
7. **Check coverage** - must be 80%+

## Coverage Requirements

- **80% minimum** for all code
- **100% required** for:
  - Financial calculations
  - Authentication logic
  - Security-critical code

## Test Commands

Check `config/stack.yaml` for your stack's test runner:

| Stack | Command |
|-------|---------|
| TypeScript/JS | `npm test`, `npm run test:coverage` |
| Python | `pytest`, `pytest --cov=src` |
| Go | `go test ./...`, `go test -cover ./...` |
| Java/Kotlin | `./gradlew test` |
| Rust | `cargo test` |

## Related Resources

- **Agent:** `~/.claude/agents/tdd-guide.md`
- **Skill:** `~/.claude/skills/tdd-workflow/SKILL.md` (detailed patterns, examples, mocking strategies)

## Integration

After TDD implementation:
- `/build-fix` - If build errors occur
- `/code-review` - Review completed implementation
- `/test-coverage` - Verify coverage metrics
