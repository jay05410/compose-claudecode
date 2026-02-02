# Performance Optimization

## MCP Model Selection

| Model | Use For | Cost |
|-------|---------|------|
| Gemini | Planning, large context, frontend/UI | Low |
| o3-mini | Code review, security analysis | Medium |
| o3 | Deep reasoning, complex debugging | High |
| GPT-4o | Research, web search | Medium |
| Claude | Code generation, implementation | Default |

## Agent → Model Mapping

```
High-volume tasks → Gemini (cheap, large context)
Analysis tasks → o3-mini (fast, good reasoning)
Complex tasks → o3 (deep reasoning)
Research tasks → GPT-4o (web search)
Implementation → Claude (coding strength)
```

## Context Window Management

Avoid last 20% of context window for:
- Large-scale refactoring
- Multi-file feature implementation
- Complex debugging

Lower context sensitivity:
- Single-file edits
- Independent utilities
- Documentation updates

## Parallel Execution

ALWAYS parallelize independent operations:

```
# GOOD
Promise.all([
  fetchUsers(),
  fetchProducts(),
  fetchOrders()
])

# BAD
users = await fetchUsers()
products = await fetchProducts()
orders = await fetchOrders()
```

## Build Troubleshooting

If build fails:
1. Use **error-resolver** agent
2. Analyze error messages
3. Fix incrementally
4. Verify after each fix
