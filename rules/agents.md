# Agent Orchestration

## Orchestrator-First Flow

For non-trivial requests, ALWAYS use orchestrator first:

```
User Request → Orchestrator (Gemini) → Execution Plan → Execute Agents
```

## Available Agents

| Agent | MCP Model | When to Use |
|-------|-----------|-------------|
| orchestrator | Gemini | FIRST for all non-trivial requests |
| planner | Gemini | Complex features, step-by-step planning |
| architect | Gemini | System design, ADRs |
| database-architect | Gemini | Schema, migrations, queries |
| frontend-engineer | Gemini | UI components, pages |
| ui-designer | Gemini | Design system, visual decisions |
| backend-engineer | Claude | API routes, business logic |
| api-designer | Claude | REST design, OpenAPI specs |
| test-engineer | Claude | Unit, integration, E2E tests |
| tdd-guide | Claude | Test-driven development workflow |
| code-reviewer | o3-mini | Code quality review |
| security-reviewer | o3-mini | Vulnerability detection |
| performance-optimizer | o3 | Bottleneck analysis |
| researcher | GPT-4o | Documentation, web search |
| devops-engineer | Claude | CI/CD, Docker, deployment |
| error-resolver | Claude | Bug fixing, debugging |
| refactor-cleaner | Claude | Code cleanup, restructuring |
| e2e-runner | Claude | E2E testing specialist |
| doc-updater | Claude | Documentation updates |
| domain-architect | Gemini | Generate CLAUDE.md + domain files |
| domain-sync | Claude | Sync domain files with code |

## Parallel Execution

ALWAYS parallelize independent tasks:

```
# GOOD: Parallel
Phase 1:
  - planner (Gemini): Create plan
  - database-architect (Gemini): Design schema
  [Both run simultaneously]

# BAD: Sequential when unnecessary
First planner, then database-architect
```

## Checkpoints

At checkpoints, re-invoke orchestrator:
- Review progress
- Adjust remaining plan
- Add/remove tasks as needed
