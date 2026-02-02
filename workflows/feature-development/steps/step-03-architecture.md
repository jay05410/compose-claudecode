# Step 03: Design Architecture

## Objective
Design the technical architecture for the feature.

## CHECKPOINT
This is a checkpoint step. After completion, wait for user approval before proceeding.

## Actions

### 1. Invoke Architect Agent
Load the architect agent to design the system:
- Review requirements from step-02
- Analyze existing codebase patterns
- Propose architecture that fits the existing system

### 2. Component Design
Document the components:

```markdown
## Architecture

### Components
| Component | Responsibility | Location |
|-----------|---------------|----------|
| {component_1} | {responsibility} | {file_path} |
| {component_2} | {responsibility} | {file_path} |

### Data Flow
{data_flow_diagram_or_description}

### API Contracts
{api_endpoints_or_graphql_schema}
```

### 3. Database Design (if applicable)
Invoke database-architect if new tables/schemas needed:
- Table definitions
- Relationships
- Indexes
- RLS policies (if multi-tenant)

### 4. Trade-off Analysis
Document key decisions:
```markdown
### Design Decisions

#### Decision 1: {title}
- **Context**: {why this decision is needed}
- **Options Considered**: {option_a}, {option_b}
- **Decision**: {chosen_option}
- **Rationale**: {why this option}
```

### 5. Implementation Plan
Create ordered implementation steps:
1. {step_1} - {file_path}
2. {step_2} - {file_path}
3. {step_3} - {file_path}

## Output
Append to feature document:
```markdown
## Architecture
{architecture_content}

## Implementation Plan
{implementation_steps}
```

Update frontmatter:
```yaml
stepsCompleted: ["step-01", "step-02", "step-03"]
currentStep: "step-04"
```

## Checkpoint Review
Present the architecture to the user for approval:
- Summary of key components
- Major design decisions
- Implementation approach

**Wait for user confirmation before proceeding.**

## Menu
- [C] Continue to implementation (approve architecture)
- [R] Request changes to architecture
- [P] Party mode - bring in multiple agents for discussion
- [H] Help
