# Security Guidelines

## Mandatory Checks Before Commit

- [ ] No hardcoded secrets (API keys, passwords, tokens)
- [ ] All user inputs validated
- [ ] SQL injection prevention (parameterized queries only)
- [ ] XSS prevention (sanitized HTML output)
- [ ] CSRF protection enabled
- [ ] Authentication/authorization verified
- [ ] Rate limiting on endpoints
- [ ] Error messages don't leak internals

## Secret Management

```
# NEVER
api_key = "sk-proj-xxxxx"
password = "secret123"

# ALWAYS
api_key = env.get("API_KEY")
password = env.get("DB_PASSWORD")

# Verify at startup
if not api_key:
    raise Error("API_KEY not configured")
```

## Input Validation

Always validate at boundaries using your language's validation library:

| Language | Library |
|----------|---------|
| TypeScript | zod, yup |
| Python | pydantic |
| Go | validator |
| Java | jakarta-validation |
| Kotlin | konform |
| Rust | validator |

## SQL Injection Prevention

```
# NEVER - String concatenation
query = "SELECT * FROM users WHERE id = " + user_id

# ALWAYS - Parameterized queries
query = "SELECT * FROM users WHERE id = ?"
execute(query, [user_id])
```

## If Security Issue Found

1. STOP immediately
2. Fix CRITICAL issues before continuing
3. Rotate any exposed secrets
4. Review codebase for similar issues
