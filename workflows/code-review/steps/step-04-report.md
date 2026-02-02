# Step 04: Generate Report

## Objective
Compile findings into actionable review report.

## CHECKPOINT
Present report to user for final review.

## Actions

### 1. Compile Findings
Aggregate all findings from previous steps.

### 2. Generate Summary
```markdown
## Code Review Report

**Date**: {date}
**Reviewer**: {agent}
**Scope**: {files_reviewed} files

### Summary
| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| Code Quality | {n} | {n} | {n} | {n} |
| Security | {n} | {n} | {n} | {n} |
| **Total** | {n} | {n} | {n} | {n} |

### Recommendation
{APPROVE | APPROVE_WITH_NOTES | CHANGES_REQUIRED | BLOCK}

### Priority Fixes
1. {critical_issue_1}
2. {critical_issue_2}
3. {high_issue_1}
```

### 3. Actionable Items
Create checklist of fixes:
- [ ] Fix: {issue_1}
- [ ] Fix: {issue_2}
- [ ] Consider: {suggestion_1}

### 4. Final Decision
Based on findings:
- **APPROVE**: No critical/high issues
- **APPROVE WITH NOTES**: Medium issues only
- **CHANGES REQUIRED**: High issues found
- **BLOCK**: Critical issues found

## Output
Save complete review report.

## Workflow Complete

### What's Next?
1. **If APPROVE**: Merge/deploy
2. **If CHANGES REQUIRED**: Fix issues, re-review
3. **If BLOCK**: Address critical issues immediately

## Menu
- [S] Save report
- [F] Fix issues
- [N] New review
- [H] Help
