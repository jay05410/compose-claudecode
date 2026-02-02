# Step 01: Define Review Scope

## Objective
Determine what code to review and set expectations.

## Actions

### 1. Identify Review Scope
Ask user or determine automatically:
- **Recent changes**: `git diff HEAD~{n}` or `git diff main`
- **Specific files**: User-provided file paths
- **Entire feature**: All files related to a feature

### 2. Run Initial Scan
```bash
git diff --stat HEAD~1
```

### 3. Categorize Files
Group files by type:
- **High Risk**: Auth, payments, user input handling
- **Medium Risk**: Business logic, data processing
- **Low Risk**: UI components, utilities, configs

### 4. Set Review Focus
Based on changes, determine focus areas:
- [ ] Code quality
- [ ] Security
- [ ] Performance
- [ ] Accessibility

## Output
```yaml
review_scope:
  files: [{file_list}]
  focus_areas: [{focus_list}]
  risk_level: "{overall_risk}"
```

## Next Step
→ Proceed to **step-02-code-quality.md**

## Menu
- [C] Continue
- [E] Edit scope
- [H] Help
