# Step 04: Implement Feature

## Objective
Implement the feature according to the approved architecture.

## Actions

### 1. Setup
Before coding:
- Review implementation plan from step-03
- Identify files to create/modify
- Check existing patterns in codebase

### 2. Backend Implementation
If backend work required, invoke backend-engineer:
- Create/modify API routes
- Implement business logic
- Database operations
- Input validation

**Checklist:**
- [ ] API routes created
- [ ] Input validation implemented
- [ ] Error handling in place
- [ ] Database operations efficient
- [ ] Security considerations addressed

### 3. Frontend Implementation
If frontend work required, invoke frontend-engineer:
- Create UI components
- Implement state management
- API integration
- User interactions

**Checklist:**
- [ ] Components created
- [ ] State management setup
- [ ] API calls implemented
- [ ] Loading/error states handled
- [ ] Responsive design verified

### 4. Integration
Connect frontend and backend:
- Verify API contracts match
- Test data flow end-to-end
- Handle edge cases

### 5. Run Diagnostics
After each major change:
```
lsp_diagnostics on modified files
```

Fix any errors before proceeding.

## Output
Track implemented files:
```markdown
## Implementation

### Files Created
- {file_path_1}: {description}
- {file_path_2}: {description}

### Files Modified  
- {file_path_3}: {changes_made}
- {file_path_4}: {changes_made}

### Integration Notes
{integration_notes}
```

Update frontmatter:
```yaml
stepsCompleted: ["step-01", "step-02", "step-03", "step-04"]
currentStep: "step-05"
```

## Next Step
→ Proceed to **step-05-testing.md** to write tests.

## Menu
- [C] Continue to testing
- [D] Run diagnostics again
- [E] Edit implementation
- [H] Help
