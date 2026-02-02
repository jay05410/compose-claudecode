# Step 07: Complete Feature

## Objective
Finalize the feature and prepare for merge/deployment.

## Actions

### 1. Documentation
Ensure documentation is complete:
- [ ] Code comments for complex logic
- [ ] JSDoc/docstrings for public APIs
- [ ] README updated if needed
- [ ] API documentation (if new endpoints)

### 2. Commit Summary
Prepare commit information:

**Commit Message:**
```
feat({scope}): {description}

{body}

Closes #{issue_number}
```

**Files Changed:**
- {file_1}: {change_type} - {description}
- {file_2}: {change_type} - {description}

### 3. Feature Summary
Generate final summary:

```markdown
## Feature Complete: {feature_name}

### What was built
{summary_of_feature}

### Key Components
- {component_1}: {purpose}
- {component_2}: {purpose}

### Testing
- {test_count} tests added
- {coverage}% coverage

### Documentation
- {doc_updates}

### Known Limitations
- {limitation_1}
- {limitation_2}

### Future Improvements
- {improvement_1}
- {improvement_2}
```

### 4. Cleanup
Remove any temporary files or debug code:
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] No TODO without ticket reference
- [ ] No temporary test data

## Output
Finalize feature document:
```markdown
## Completion

**Status**: COMPLETE
**Completed At**: {date}
**Duration**: {duration}

### Summary
{feature_summary}

### Ready for
- [ ] Code review (if not done via workflow)
- [ ] QA testing
- [ ] Merge to main
- [ ] Deployment
```

Update frontmatter:
```yaml
status: "complete"
stepsCompleted: ["step-01", "step-02", "step-03", "step-04", "step-05", "step-06", "step-07"]
completed_at: "{date}"
```

## Workflow Complete

Feature development workflow is complete.

### What's Next?
1. **If ready**: Create PR and merge
2. **If needs more work**: Document what's needed
3. **If blocked**: Document blockers

Thank you for using the feature development workflow!

## Menu
- [P] Create PR
- [D] Download feature document
- [N] Start new feature
- [H] Help
