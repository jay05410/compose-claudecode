# Step 03: Security Review

## Objective
Identify security vulnerabilities and risks.

## Actions

### 1. Invoke Security Reviewer
Load security-reviewer agent.

### 2. Run Automated Scans
```bash
npm audit
grep -rE "(api[_-]?key|password|secret|token)\s*[:=]" .
```

### 3. OWASP Top 10 Check
Review for:
- [ ] A01: Broken Access Control
- [ ] A02: Cryptographic Failures
- [ ] A03: Injection
- [ ] A04: Insecure Design
- [ ] A05: Security Misconfiguration
- [ ] A06: Vulnerable Components
- [ ] A07: Authentication Failures
- [ ] A08: Integrity Failures
- [ ] A09: Logging Failures
- [ ] A10: SSRF

### 4. Document Security Findings
```markdown
### Security Issue: {title}
**Severity**: CRITICAL | HIGH | MEDIUM | LOW
**Category**: {owasp_category}
**File**: {file_path}:{line}
**Vulnerability**: {description}
**Remediation**: {fix}
```

### 5. Risk Assessment
Overall security risk level: {HIGH | MEDIUM | LOW}

## Output
Append security findings to review document.

## Next Step
→ Proceed to **step-04-report.md**

## Menu
- [C] Continue to report
- [F] Fix security issues
- [H] Help
