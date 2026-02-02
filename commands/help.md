---
name: help
aliases: ["what-next", "guide", "?"]
description: Context-aware help system that guides you through your current work and suggests next steps.
user-invocable: true
---

# Help System

Provide intelligent, context-aware guidance based on the current project state and user's question.

## Invocation

```
/help                     # General help and overview
/help what next           # Suggest next steps based on current state
/help {question}          # Answer specific question with context
```

## Behavior

### 1. Analyze Current Context

Before responding, analyze:
- Current workflow state (if any active task)
- Project structure
- Recent git changes
- Available agents and teams
- User's skill level (from config)

### 2. Response Based on Context

#### No Active Task
Suggest starting points:
- `/feature {name}` - Start new feature development
- `/review` - Review recent changes
- `/plan {description}` - Create implementation plan
- List available workflows and teams

#### Active Task in Progress
Show:
- Current step and progress
- What was completed
- What's next
- Available actions (continue, edit, help, skip)

#### After Task Completion
Suggest:
- Create PR
- Start new task
- Review what was built

### 3. Skill Level Adaptation

Adjust response detail based on user_skill_level from config:

| Level | Response Style |
|-------|---------------|
| beginner | Detailed explanations, step-by-step, more examples |
| intermediate | Balanced detail, assume basic knowledge |
| expert | Concise, technical, skip obvious explanations |

## Context-Aware Responses

### If Asked "what should I do next?"

1. Check for active workflows in `_output/`
2. Check git status for uncommitted changes
3. Check for failing tests
4. Suggest based on project state

### If Asked About Specific Topic

Search for relevant:
- Agents that can help
- Workflows that apply
- Skills to load
- Documentation

## Response Format

```markdown
## Current State
{summary_of_current_context}

## Suggested Actions
1. {action_1} - {description}
2. {action_2} - {description}

## Available Commands
- `/command` - {description}

## Need More Help?
- `/help {specific_topic}` for detailed guidance
- Load a team: `/team {team_name}`
```

## Examples

### Example 1: New Project
```
User: /help

Response:
## Welcome to Everything Claude Code!

You're in a new project. Here's how to get started:

### Quick Start
1. **Configure your stack**: Check `config/stack.yaml` matches your project
2. **Start a feature**: `/feature {name}` to begin structured development
3. **Quick changes**: For simple fixes, just describe what you need

### Available Workflows
- Feature Development: Full lifecycle from planning to deployment
- Code Review: Comprehensive quality and security review
- ...

### Available Teams
- Feature Team: Full-stack development
- Review Team: Quality assurance
- ...

What would you like to do?
```

### Example 2: Mid-Workflow
```
User: /help what next

Response:
## Current Task: User Authentication Feature

### Progress
- [x] Step 1: Initialize Feature
- [x] Step 2: Gather Requirements
- [x] Step 3: Design Architecture (CHECKPOINT PASSED)
- [ ] Step 4: Implement Feature ← **You are here**
- [ ] Step 5: Write Tests
- [ ] Step 6: Code Review
- [ ] Step 7: Complete

### Next Action
Continue with **Step 4: Implementation**

The architecture has been approved. You should now:
1. Create the backend API routes
2. Build the frontend components
3. Connect them together

Type `C` to continue or ask me a specific question.
```

### Example 3: Specific Question
```
User: /help how do I add authentication?

Response:
## Adding Authentication

Based on your stack (Next.js + PostgreSQL), here's how to add auth:

### Recommended Approach
Use NextAuth.js with database sessions.

### Quick Start
1. Start the feature workflow:
   ```
   /feature user-authentication
   ```

2. Or load the backend team for discussion:
   ```
   /team backend-team
   ```

### Agents That Can Help
- **backend-engineer**: Implement auth routes
- **database-architect**: Design user schema
- **security-reviewer**: Audit implementation

### Resources
- See `skills/security-review/SKILL.md` for security patterns
- Check `agents/backend-engineer.agent.yaml` for auth patterns

Want me to start the authentication feature workflow?
```

## Integration with Skill Level

### Beginner Response Style
```
Let me explain what's happening step by step...

1. First, we need to create an API route. An API route is a server-side 
   endpoint that handles requests from your frontend...

2. Next, we'll add validation. Validation ensures that the data sent to 
   your server is correct and safe...
```

### Expert Response Style
```
Create POST /api/auth/login with:
- Zod validation
- bcrypt password comparison
- JWT generation
- HttpOnly cookie for session

See backend-engineer patterns for implementation.
```
