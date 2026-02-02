# Coding Standards

Universal coding standards. Check `config/stack.yaml` for your active language and framework.

## Core Principles

| Principle | Meaning |
|-----------|---------|
| **KISS** | Simplest solution that works. No over-engineering. |
| **DRY** | Extract common logic. No copy-paste. |
| **YAGNI** | Don't build features before needed. |
| **Readability** | Clear names > clever code. Self-documenting preferred. |

## Immutability (CRITICAL)

ALWAYS create new objects, NEVER mutate:

```
// CORRECT - Create new
updated = { ...original, field: newValue }
newArray = [...items, newItem]

// WRONG - Mutation
original.field = newValue
items.push(newItem)
```

## File Organization

- **Many small files > few large files**
- 200-400 lines typical, 800 max
- Organize by feature/domain, not by type
- Functions < 50 lines, nesting < 4 levels

## Naming Conventions

```
// Variables: descriptive camelCase (or snake_case per language convention)
isUserAuthenticated = true
total_revenue = 1000  // Python style

// Functions: verb-noun pattern
fetchMarketData(id)
is_valid_email(email)  // Python style

// Components/Classes: PascalCase
class UserProfile { }
```

## Type Safety

Use your language's type system. Avoid escape hatches:

| Language | Avoid | Use Instead |
|----------|-------|-------------|
| TypeScript | `any`, `@ts-ignore` | Proper types, generics |
| Python | `# type: ignore` | Type hints, TypedDict |
| Go | `interface{}` everywhere | Concrete types |
| Java/Kotlin | Raw types | Generics |
| Rust | Excessive `.unwrap()` | Proper error handling |

## Error Handling

```
// Pattern: Try-catch with context
try {
    result = operation()
    return { success: true, data: result }
} catch (error) {
    log("Context:", error)
    return { success: false, error: "User-friendly message" }
}
```

## Input Validation

Always validate at boundaries (API endpoints, user input):

```
// Use validation libraries per stack:
// TypeScript: zod, yup
// Python: pydantic
// Go: validator
// Java: jakarta-validation
// Rust: validator crate
```

## Async Best Practices

```
// CORRECT: Parallel when independent
[users, markets] = await Promise.all([
    fetchUsers(),
    fetchMarkets()
])

// WRONG: Sequential when unnecessary
users = await fetchUsers()
markets = await fetchMarkets()  // Could run in parallel
```

## API Response Format

Consistent structure across all endpoints:

```json
{
    "success": true,
    "data": { },
    "error": "message if failed",
    "meta": { "total": 100, "page": 1, "limit": 10 }
}
```

## Comments

```
// GOOD: Explain WHY
// Exponential backoff to avoid overwhelming API during outages
delay = min(1000 * pow(2, retryCount), 30000)

// BAD: Stating the obvious
// Increment counter
count++
```

## Anti-Patterns to Avoid

| Pattern | Problem |
|---------|---------|
| Type escape hatches | Defeats type system benefits |
| Empty catch blocks | Swallows errors silently |
| Magic numbers | Use named constants |
| Deep nesting (5+) | Use early returns |
| Long functions (50+) | Split into smaller functions |
| Debug logs in production | Use proper logging |
| Hardcoded values | Use constants/config |

## Code Quality Checklist

Before marking work complete:
- [ ] Code is readable and well-named
- [ ] Functions < 50 lines, files < 800 lines
- [ ] No deep nesting (> 4 levels)
- [ ] Proper error handling
- [ ] No debug logs, hardcoded values, or mutation
- [ ] Types are explicit (no escape hatches)
- [ ] Tests written (see `/tdd` command)
