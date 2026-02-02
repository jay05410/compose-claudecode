---
name: backend-patterns
description: Backend architecture patterns for Node.js, Python, Go, Java, Kotlin, Rust.
user-invocable: true
---

# Backend Patterns

Check `config/stack.yaml` for your active backend language/framework.

## Universal Patterns

### RESTful API Design
```
GET    /api/resources         # List
GET    /api/resources/:id     # Get one
POST   /api/resources         # Create
PUT    /api/resources/:id     # Replace
PATCH  /api/resources/:id     # Update
DELETE /api/resources/:id     # Delete

# Filtering, sorting, pagination
GET /api/resources?status=active&sort=name&limit=20&offset=0
```

### Response Format
```json
{
  "success": true,
  "data": { ... },
  "error": "message if failed",
  "meta": { "total": 100, "page": 1 }
}
```

### Repository Pattern
Separate data access from business logic:
```
interface Repository<T> {
  findAll(filters): Promise<T[]>
  findById(id): Promise<T | null>
  create(data): Promise<T>
  update(id, data): Promise<T>
  delete(id): Promise<void>
}
```

### Service Layer Pattern
Business logic in services, not in routes:
```
class UserService {
  constructor(repo: UserRepository) {}
  
  async createUser(data) {
    // Validation
    // Business logic
    // Repository call
  }
}
```

### Middleware Pattern
Request/response processing pipeline for auth, logging, etc.

## Error Handling

```
// Centralized error handler
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }
}

// In route handlers
try {
  // ...
} catch (error) {
  if (error instanceof ApiError) {
    return response(error.statusCode, error.message)
  }
  return response(500, 'Internal error')
}
```

## Database Patterns

### Avoid N+1 Queries
```
// BAD: N queries in loop
for item in items:
  item.user = get_user(item.user_id)

// GOOD: Batch fetch
user_ids = items.map(i => i.user_id)
users = get_users(user_ids)
```

### Transactions
Wrap related operations in transactions for atomicity.

### Query Optimization
- Select only needed columns
- Use indexes
- Paginate results

## Caching

### Cache-Aside Pattern
```
cached = cache.get(key)
if cached:
  return cached

data = db.query(...)
cache.set(key, data, ttl=300)
return data
```

## Security Checklist

- [ ] Input validation
- [ ] Rate limiting
- [ ] Authentication/Authorization
- [ ] Parameterized queries (prevent SQL injection)
- [ ] No secrets in code
- [ ] CORS configured
