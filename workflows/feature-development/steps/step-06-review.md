# Step 06: Code Review

## Objective
Review code for quality, security, and best practices.

## CHECKPOINT
This is a checkpoint step. Final review before completion.

## Actions

### 1. Code Review
Invoke code-reviewer agent:
- Review all modified/created files
- Check for code quality issues
- Verify best practices followed

### 2. Security Review
Invoke security-reviewer agent:
- Check for security vulnerabilities
- Verify input validation
- Review authentication/authorization
- Scan for hardcoded secrets

### 3. Review Results

#### Code Quality
| Severity | Issue | File | Fix |
|----------|-------|------|-----|
| {severity} | {issue} | {file:line} | {fix} |

#### Security
| Severity | Issue | File | Fix |
|----------|-------|------|-----|
| {severity} | {issue} | {file:line} | {fix} |

### 4. Address Issues
For each issue found:
1. CRITICAL/HIGH: Must fix before proceeding
2. MEDIUM: Should fix
3. LOW: Consider fixing

### 5. Final Verification
Run final checks:
```bash
# Type check
tsc --noEmit

# Lint
npm run lint

# Tests
npm run test

# Build
npm run build
```

All checks must pass.

## Output
Append to feature document:
```markdown
## Review

### Code Review Summary
- **Result**: {APPROVED | APPROVED_WITH_NOTES | CHANGES_REQUIRED}
- **Issues Found**: {count} ({critical}, {high}, {medium}, {low})
- **Issues Fixed**: {count}

### Security Review Summary
- **Risk Level**: {HIGH | MEDIUM | LOW}
- **Critical Issues**: {count}
- **Recommendation**: {recommendation}

### Final Checks
- [ ] Type check passes
- [ ] Lint passes
- [ ] Tests pass
- [ ] Build succeeds
```

Update frontmatter:
```yaml
stepsCompleted: ["step-01", "step-02", "step-03", "step-04", "step-05", "step-06"]
currentStep: "step-07"
```

## Checkpoint Review
Present review results to user:
- Summary of issues found/fixed
- Any remaining concerns
- Recommendation

**Wait for user confirmation before completing.**

## Menu
- [C] Complete feature (approve)
- [F] Fix remaining issues
- [R] Request another review
- [H] Help
