---
name: orchestrate
description: Execute orchestrator-generated plans with checkpoint handling.
user-invocable: true
---

# Orchestrate Skill

Execute multi-agent plans from the orchestrator.

## Execution Protocol

1. **Receive plan** from orchestrator (JSON with phases, agents, tasks)
2. **Execute phases** in order
   - `parallel: true` → run tasks simultaneously
   - `parallel: false` → run tasks sequentially
3. **At checkpoints** → re-invoke orchestrator for review
4. **On error** → ask orchestrator how to proceed

## Agent → MCP Mapping

| Agent | MCP | Invoke With |
|-------|-----|-------------|
| orchestrator, planner, architect, database-architect, frontend-engineer | Gemini | `mcp__gemini__generateContent` |
| code-reviewer, security-reviewer | o3-mini | `mcp__openai__chat` (model: "o3-mini") |
| performance-optimizer | o3 | `mcp__openai__chat` (model: "o3") |
| researcher | GPT-4o | `mcp__openai__chat` (model: "gpt-4o") |
| backend-engineer, test-engineer, devops-engineer | Claude | Direct task invocation |

## Checkpoint Handling

```typescript
if (phase.checkpoint) {
  const review = await task({
    agent: "orchestrator",
    prompt: `CHECKPOINT: Phase ${phase.name} complete. Issues: ${issues}. Adjust plan?`
  })
  applyAdjustments(review)
}
```

## Verification

Before completion:
- All todos done
- `lsp_diagnostics` clean
- Build passes
- Tests pass
