# Step 02: Code Quality Review

## Objective
Review code for quality, maintainability, and best practices.

## Actions

### 1. Invoke Code Reviewer
Load code-reviewer agent with files from step-01.

### 2. Check Categories

#### Critical (Must Fix)
- Hardcoded secrets
- Missing error handling
- Security vulnerabilities
- Type safety violations

#### High (Should Fix)
- Large functions (>50 lines)
- Deep nesting (>4 levels)
- Missing tests for new code
- console.log statements

#### Medium (Consider Fixing)
- Magic numbers
- Poor naming
- Missing documentation
- Inconsistent formatting

#### Low (Nice to Have)
- Minor style issues
- Optimization opportunities
- Additional test cases

### 3. Document Findings
For each issue:
```markdown
### [{SEVERITY}] {Title}
**File**: {file_path}:{line}
**Issue**: {description}
**Fix**: {suggestion}
```

### 4. Calculate Metrics
- Total issues: {count}
- By severity: Critical({n}), High({n}), Medium({n}), Low({n})

## Output
Append findings to review document.

## Next Step
→ Proceed to **step-03-security.md**

## Menu
- [C] Continue to security review
- [F] Fix issues now
- [H] Help
