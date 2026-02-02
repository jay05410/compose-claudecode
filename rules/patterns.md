# Common Patterns

## API Response Format

Consistent structure across all endpoints:

```json
{
  "success": true,
  "data": { },
  "error": "message if failed",
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

## Repository Pattern

Abstract data access from business logic:

```
interface Repository<T> {
  findAll(filters?): T[]
  findById(id): T | null
  create(data): T
  update(id, data): T
  delete(id): void
}
```

## Service Layer Pattern

Business logic in services, not in routes/controllers:

```
class UserService {
  constructor(repo: UserRepository) {}
  
  createUser(data) {
    // Validation
    // Business logic
    // Repository call
  }
}
```

## Custom Hook/Composable Pattern

Extract reusable stateful logic:

| Pattern | Framework |
|---------|-----------|
| `useDebounce` | React |
| `useDebouncedRef` | Vue |
| Runes with `$state` | Svelte 5 |
| Signals | Angular |

## Error Handling Pattern

```
try {
  result = await operation()
  return { success: true, data: result }
} catch (error) {
  log("context:", error)
  return { success: false, error: "User-friendly message" }
}
```

## Skeleton Projects

When implementing new functionality:
1. Search for battle-tested skeleton projects
2. Evaluate: security, extensibility, relevance
3. Clone best match as foundation
4. Iterate within proven structure
