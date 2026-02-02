# Step 02: Gather Requirements

## Objective
Elicit comprehensive requirements through collaborative discussion.

## Actions

### 1. Functional Requirements
Ask and document:
- **Core Functionality**: What are the must-have features?
- **User Interactions**: How do users interact with this feature?
- **Data Requirements**: What data does this feature need/produce?
- **Integrations**: Does it integrate with existing features?

### 2. Non-Functional Requirements
Discuss and document:
- **Performance**: Response time expectations? Load expectations?
- **Security**: Authentication required? Sensitive data involved?
- **Scalability**: Expected growth? Peak usage patterns?
- **Accessibility**: WCAG compliance level?

### 3. Edge Cases
Identify potential edge cases:
- What happens with empty/null data?
- What happens with very large data sets?
- Error scenarios and how to handle them
- Concurrent user scenarios

### 4. Success Criteria
Define measurable success criteria:
- [ ] Criterion 1: {description}
- [ ] Criterion 2: {description}
- [ ] Criterion 3: {description}

### 5. Out of Scope
Explicitly list what is NOT included:
- {out_of_scope_item_1}
- {out_of_scope_item_2}

## Output
Append to feature document:
```markdown
## Requirements

### Functional
{functional_requirements}

### Non-Functional
{non_functional_requirements}

### Edge Cases
{edge_cases}

### Success Criteria
{success_criteria}

### Out of Scope
{out_of_scope}
```

Update frontmatter:
```yaml
stepsCompleted: ["step-01", "step-02"]
currentStep: "step-03"
```

## Next Step
→ Proceed to **step-03-architecture.md** to design the architecture.

## Menu
- [C] Continue to next step
- [A] Advanced elicitation - deeper requirements discussion
- [E] Edit requirements
- [H] Help
