---
name: security-review
description: Security vulnerability detection checklist.
user-invocable: true
---

# Security Review

## Checklist

### Secrets
- [ ] No hardcoded API keys, passwords, tokens
- [ ] All secrets in environment variables
- [ ] `.env` files in .gitignore

### Input Validation
- [ ] All user inputs validated
- [ ] File uploads restricted (size, type)
- [ ] Whitelist validation (not blacklist)

### Injection Prevention
- [ ] SQL: Parameterized queries only
- [ ] XSS: User content sanitized
- [ ] Path traversal: User paths validated

### Authentication
- [ ] Tokens in httpOnly cookies (not localStorage)
- [ ] Sessions properly managed
- [ ] Password hashing with bcrypt/argon2

### Authorization
- [ ] Role checks before sensitive operations
- [ ] RLS enabled (if using Supabase)
- [ ] Ownership verified before CRUD

### API Security
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Error messages don't leak internals

## Severity Levels

| Level | Examples | Action |
|-------|----------|--------|
| CRITICAL | Hardcoded secrets, SQL injection | Block deployment |
| HIGH | XSS, auth bypass, missing rate limits | Must fix before merge |
| MEDIUM | Weak validation, verbose errors | Fix when possible |
| LOW | Missing headers | Consider fixing |

## Quick Scan

```bash
# Check for secrets
grep -rE "(api[_-]?key|password|secret|token)\s*[:=]" --include="*.ts" --include="*.py" .

# Check dependencies
npm audit
pip-audit
```
