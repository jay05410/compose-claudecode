# Step 01: Initialize Feature

## Objective
Initialize the feature development workflow and gather basic information.

## Actions

### 1. Greet and Explain
Welcome the user and explain the feature development workflow:
- This workflow guides through complete feature implementation
- Phases: Planning → Design → Implementation → Verification
- Checkpoints allow review and adjustment at key points

### 2. Gather Feature Information
Ask the user:
- **Feature Name**: What should this feature be called?
- **Brief Description**: In 1-2 sentences, what does this feature do?
- **User Story**: As a [user], I want [goal] so that [benefit]

### 3. Load Stack Configuration
Read and confirm the tech stack from `config/stack.yaml`:
- Language: {language}
- Frontend: {frontend}
- Backend: {backend}
- Database: {database}

### 4. Create Output Directory
Create the output directory for this feature:
```
{output_folder}/{feature_name}/
```

## Output
Update the feature document frontmatter:
```yaml
---
feature_name: "{feature_name}"
description: "{description}"
user_story: "{user_story}"
status: "in_progress"
stepsCompleted: ["step-01"]
currentStep: "step-02"
created_at: "{date}"
---
```

## Next Step
→ Proceed to **step-02-requirements.md** to gather detailed requirements.

## Menu
- [C] Continue to next step
- [E] Edit this information
- [H] Help - explain this step in more detail
