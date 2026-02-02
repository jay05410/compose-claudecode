# Everything Claude Code - Orchestrator-First Architecture

Multi-model agent orchestration for Claude Code with YAML-based agent definitions, step-file workflows, team bundles, and adaptive skill levels.

## Architecture Overview

```
agents/                    # YAML agent definitions (24 agents)
  ├── _base.agent.yaml     # Shared configuration inherited by all
  ├── orchestrator.agent.yaml
  └── {role}.agent.yaml

workflows/                 # Step-file workflows with JIT loading
  ├── feature-development/
  │   ├── workflow.yaml    # Workflow definition
  │   └── steps/           # Micro-step files (step-01.md, step-02.md...)
  └── code-review/
      └── ...

teams/                     # Team bundles for multi-agent collaboration
  ├── feature-team.yaml
  ├── review-team.yaml
  └── ...

config/
  └── stack.yaml           # Tech stack + user preferences + skill level

commands/
  └── help.md              # Context-aware help system
```

## Core Flow (FULLY AUTOMATIC)

**IMPORTANT**: All phases execute automatically without waiting for approval unless at a critical checkpoint.

```
User Request
     ↓
┌─────────────────────────────────┐
│  PHASE 0: Trivial Check         │
│  Single-file, obvious solution? │
│  YES → Handle directly          │
│  NO  → Continue to orchestrator │
└─────────────────────────────────┘
     ↓
┌─────────────────────────────────┐
│  PHASE 1: Orchestrator          │
│  (Atlas 🎯 - Opus 4.5)          │
│                                 │
│  Automatic actions:             │
│  1. Analyze request complexity  │
│  2. Auto-start PM agent if      │
│     complexity != simple        │
│  3. Select agent tiers          │
│     (low/medium/high)           │
│  4. Decide workflow or adhoc    │
│  5. Create execution plan       │
│                                 │
│  Notify: Brief plan summary     │
│  Execute: Immediately proceed   │
└─────────────────────────────────┘
     ↓
┌─────────────────────────────────┐
│  PHASE 1.5: PM Auto-Init        │
│  (Atlas PM 📊 - Sonnet)         │
│                                 │
│  Automatic (silent):            │
│  - Create .plans/ structure     │
│  - Initialize PROJECT_PLAN.md   │
│  - Start WORK_LOG.md            │
│  - Generate Mermaid timeline    │
│  - Begin cost tracking          │
└─────────────────────────────────┘
     ↓
┌─────────────────────────────────┐
│  PHASE 2: Execute Plan          │
│                                 │
│  Automatic execution:           │
│  - Invoke agents with tiers     │
│  - PM logs task start           │
│  - Execute task                 │
│  - PM logs task completion      │
│  - Parallel tasks together      │
│  - Sequential tasks in order    │
│  - Checkpoints → review & go    │
│  - JIT step loading             │
│  - Workflow auto-executes       │
└─────────────────────────────────┘
     ↓
┌─────────────────────────────────┐
│  PHASE 3: Verification          │
│                                 │
│  Automatic checks:              │
│  - lsp_diagnostics clean        │
│  - Build passes                 │
│  - Tests pass                   │
│  - All todos complete           │
└─────────────────────────────────┘
     ↓
┌─────────────────────────────────┐
│  PHASE 4: PM Auto-Document      │
│                                 │
│  Automatic (silent):            │
│  - Update PROJECT_PLAN.md       │
│  - Finalize WORK_LOG.md entry   │
│  - Generate Mermaid charts      │
│  - Update cost tracking         │
│  - Archive completed docs       │
└─────────────────────────────────┘
```

**Manual Override Available**:
- `/agent-name` - Invoke specific agent manually
- `/workflow-name` - Use specific workflow
- `/stop` - Halt automatic execution
- `/status` - Check PM progress

## Automatic Execution Principles

### 🤖 Fully Automatic Flow

**Core Principle**: Execute everything automatically, inform but don't ask (unless critical).

**How It Works**:

1. **Orchestrator Automatically Decides**:
   - Analyzes request complexity
   - Selects appropriate agent tiers (low/medium/high)
   - Chooses workflow vs adhoc plan
   - Starts PM agent if non-trivial
   - **No approval needed** - proceeds immediately

2. **PM Agent Operates in Background**:
   - Auto-starts when orchestrator begins work
   - Silently creates .plans/ documentation
   - Logs every agent task completion
   - Updates progress in real-time
   - Generates Mermaid charts automatically
   - **No manual invocation needed**

3. **Workflows Execute Automatically**:
   - When beneficial, orchestrator loads workflow
   - Brief notification: "Using feature-development workflow (7 steps)"
   - **Executes immediately** - doesn't wait for approval
   - Checkpoints review and continue automatically

4. **Checkpoints Are Reviews, Not Gates**:
   - Standard checkpoints: review findings, adjust plan, continue
   - **Only stop for critical decisions**:
     - Architecture choice between valid alternatives
     - Security-sensitive changes (auth, permissions)
     - Destructive operations (delete data, force push)
     - Budget exceeded by 50%+

### 📣 Notification Style

**Inform, Don't Ask**:
```
✓ "Starting PM agent for progress tracking"
✓ "Using feature-development workflow (est. $2-5)"
✓ "Phase 1: Planning (planner-medium, architect-high)"
✓ "Checkpoint: Plan approved, proceeding to implementation"
✓ "Phase 2 complete. Moving to testing."
```

**Only Ask When Critical**:
```
⚠️ "Architecture decision: REST vs GraphQL?"
⚠️ "Security review found 3 issues. Review before proceeding?"
⚠️ "Estimated cost $15 exceeds budget $10. Continue?"
```

### 🎯 User Experience

**What Users See**:
1. Make request: "Add user authentication"
2. Brief summary: "Using feature-development workflow, 4 phases, est. $3-8"
3. Progress updates: "Phase 1: Planning (2 agents working...)"
4. Completion: "✅ All phases complete. See .plans/WORK_LOG.md for details"

**What Happens Automatically**:
- Orchestrator analyzes and plans
- PM agent initializes tracking
- Agents execute with selected tiers
- PM logs every step
- Mermaid charts generated
- Documentation updated in real-time
- Costs tracked automatically

**What Users Can Do Manually**:
- `/status` - Check progress anytime
- `/plan` - View current plan
- `/log` - See work history
- `/frontend-engineer` - Invoke specific agent
- `/stop` - Halt execution

### 🔄 Workflow Auto-Recommendation

Even in **Auto Mode**, orchestrator automatically recommends and executes workflows:

**Recommend & Execute Workflow When**:
- Multi-phase feature development (planning → impl → test → review)
- Checkpoints beneficial (user input at key stages)
- Complex task needing structure
- Multiple specialized agents in sequence

**Skip Workflow When**:
- Single-phase task (just coding, just review)
- Exploratory work needing flexibility
- Simple changes (typo, single file)

**Execution**:
- Orchestrator: "This benefits from feature-development workflow"
- **Auto-loads and executes** - doesn't wait
- User can `/stop` if they prefer manual control

## Agent System (YAML Format)

### Agent Definition Structure

```yaml
agent:
  metadata:
    id: "agent-name"
    name: "Display Name"
    title: "Role Title"
    icon: "🎯"
    module: "core"
    hasSidecar: false

  config:
    tools: ["Read", "Grep", "Glob", "Edit"]
    model: "opus"
    mcp_model: "gemini"  # gemini | openai-o3-mini | openai-o3 | openai-gpt4o | null
    inherits: "_base"

  persona:
    role: "What this agent does"
    identity: |
      Detailed description of agent's expertise and approach.
    communication_style: |
      How the agent communicates and presents information.
    principles:
      - "Key principle 1"
      - "Key principle 2"

  menu:
    - trigger: "command"
      action: "What it does"
      description: "User-facing description"

  rules:
    - "Specific rule this agent follows"
```

### Available Agents (24 Total)

**All model assignments are managed in `config/stack.yaml` (Single Source of Truth)**

| Agent | Icon | Model | Primary Role |
|-------|------|-------|--------------|
| **orchestrator** | 🎯 | Opus 4.5 | Master orchestrator, multi-agent coordination (92.3%) |
| **planner** | 📋 | Opus 4.5 | Feature breakdown, long-horizon planning |
| **architect** | 🏗️ | Gemini 3 Pro | System design, architecture (2M context) |
| **database-architect** | 🗄️ | Gemini 3 Pro | Schema design, migrations, queries |
| **domain-architect** | 🏛️ | Gemini 3 Pro | Domain modeling, DDD patterns |
| **frontend-engineer** | 🎨 | Gemini 3 Pro | UI components, frontend development |
| **ui-designer** | 🎭 | Gemini 3 Pro | Design systems, visual design |
| **accessibility-expert** | ♿ | Gemini 3 Pro | A11y compliance, screen reader support |
| **backend-engineer** | ⚙️ | GLM-4.7 | API routes, business logic (30% token savings) |
| **api-designer** | 🔌 | GLM-4.7 | REST/GraphQL design, code generation |
| **test-engineer** | 🧪 | GLM-4.7 | Unit, integration, E2E tests |
| **code-reviewer** | 🔍 | GPT-5.2 | Advanced code analysis & review |
| **security-reviewer** | 🛡️ | GPT-5.2 | Security vulnerability analysis |
| **performance-optimizer** | ⚡ | GPT-5.2 | Performance analysis & optimization |
| **error-resolver** | 🔧 | GPT-5.2 | Complex debugging and error analysis |
| **researcher** | 🔬 | GPT-5.2 | Documentation research, web search |
| **doc-updater** | 📝 | Gemini 3 Flash | Documentation, guides |
| **publisher** | 🖌️ | Gemini 3 Flash | Release notes, changelog (+ visual analysis) |
| **refactor-cleaner** | 🧹 | Sonnet 4.5 | Code cleanup, restructuring |
| **devops-engineer** | 🚀 | Sonnet 4.5 | CI/CD, deployment, infrastructure |
| **e2e-runner** | 🎭 | Sonnet 4.5 | End-to-end test execution |
| **tdd-guide** | 🔴 | Sonnet 4.5 | TDD workflow guidance |
| **domain-sync** | 🔄 | Sonnet 4.5 | Keep domain model in sync |

### Model Assignment Strategy

**Optimized for Token Efficiency + Performance**

| Model | Use For | Why | Agents |
|-------|---------|-----|--------|
| **Opus 4.5** | Critical orchestration, planning | Best multi-agent coordination (92.3%), long-horizon planning | orchestrator, planner |
| **Gemini 3 Pro** | Frontend dev, architecture | 2M context, visual understanding, frontend specialist | frontend-engineer, ui-designer, accessibility-expert, architect, database-architect, domain-architect |
| **Gemini 3 Flash** | Documentation, visual analysis | Fast, cost-effective, handles images/PDFs/diagrams | doc-updater, publisher |
| **GLM-4.7** | Code generation | 30% token savings, "think before acting" mechanism | backend-engineer, api-designer, test-engineer |
| **GPT-5.2** | Analysis, design, verification | Advanced reasoning for complex analysis | code-reviewer, security-reviewer, performance-optimizer, error-resolver, researcher |
| **Sonnet 4.5** | Support utilities | Built-in, high quality, no extra cost | refactor-cleaner, devops-engineer, e2e-runner, tdd-guide, domain-sync |

**Key Benefits**:
- **40% token savings** from strategic GLM + Flash usage
- **Superior frontend** with Gemini 3 Pro visual understanding
- **Advanced analysis** with GPT-5.2 for all review/verification tasks
- **Visual analysis** capability via Gemini Flash (images, PDFs, diagrams)

## Workflow System (Step-Files)

### Workflow Definition

```yaml
name: feature-development
description: Complete feature development workflow
version: "1.0"

config_source: "config/stack.yaml"

metadata:
  icon: "🚀"
  estimated_time: "1-4 hours"
  complexity: "moderate-to-complex"

phases:
  - phase: 1
    name: "Analysis & Planning"
    parallel: true
    agents: [orchestrator, planner]
    checkpoint: true
    checkpoint_reason: "Review plan before implementation"

  - phase: 2
    name: "Implementation"
    parallel: false
    agents: [backend-engineer, frontend-engineer]
    checkpoint: false

instructions_path: "./steps"

steps:
  - id: "step-01"
    file: "step-01-init.md"
    name: "Initialize Feature"
    required: true

  - id: "step-02"
    file: "step-02-requirements.md"
    name: "Gather Requirements"
    required: true
    checkpoint: true
```

### Available Workflows

| Workflow | Steps | Description |
|----------|-------|-------------|
| `feature-development` | 7 | Full lifecycle: planning → implementation → testing → review |
| `code-review` | 4 | Quality review, security audit, performance check |

### Step File Loading (JIT)

Steps are loaded just-in-time to minimize context usage:

```markdown
---
step: 03
name: Design Architecture
checkpoint: true
agents: [architect, database-architect]
---

# Step 3: Design Architecture

## Objectives
- Design system components
- Define data models
- Document decisions in ADR

## Instructions
[Detailed instructions for this step]

## Checkpoint
At this checkpoint:
- [ ] Architecture documented
- [ ] Data model defined
- [ ] User approved design
```

## Team System (Party Mode)

### Team Bundle Definition

```yaml
bundle:
  name: "Feature Development Team"
  icon: "🚀"
  description: "Full-stack team for implementing new features"
  use_case: "New features, major enhancements"

agents:
  - id: "planner"
    role: "Lead planning and requirements"
  - id: "architect"
    role: "Design system architecture"
  - id: "frontend-engineer"
    role: "Implement UI components"
  - id: "backend-engineer"
    role: "Implement API and business logic"
  - id: "test-engineer"
    role: "Write comprehensive tests"

skills:
  - "frontend-patterns"
  - "backend-patterns"
  - "tdd-workflow"

workflow: "feature-development"

party_prompts:
  planning: |
    Team, we're starting a new feature: {feature_name}.
    Planner: Break down the requirements.
    Architect: Consider the technical approach.
```

### Available Teams

| Team | Icon | Agents | Use Case |
|------|------|--------|----------|
| `feature-team` | 🚀 | planner, architect, frontend, backend, test | New features |
| `review-team` | 🔍 | code-reviewer, security-reviewer, performance-optimizer | Quality assurance |
| `planning-team` | 📐 | orchestrator, planner, architect | Architecture & planning |
| `frontend-team` | 🎨 | frontend-engineer, ui-designer, accessibility-expert | UI development |
| `backend-team` | ⚙️ | backend-engineer, api-designer, database-architect | API development |
| `debug-team` | 🔧 | error-resolver, performance-optimizer, test-engineer | Debugging |

## User Configuration

### Stack Configuration (`config/stack.yaml`)

```yaml
# User Preferences
user:
  name: "Developer"
  skill_level: "intermediate"  # beginner | intermediate | expert
  communication_language: "English"
  document_language: "English"

# Active Stack
active:
  language: "typescript"
  frontend: "react"
  frontend_framework: "nextjs"
  backend: "node"
  database: "postgresql"
```

### Skill Level Adaptation

| Level | Response Style |
|-------|---------------|
| **beginner** | Detailed explanations, step-by-step guidance, more examples |
| **intermediate** | Balanced detail, assume basic knowledge |
| **expert** | Concise, technical, skip obvious explanations |

## Help System

Context-aware help that adapts to current state:

```
/help                 # General help and overview
/help what next       # Suggest next steps based on current state
/help {question}      # Answer specific question with context
```

### Help Behavior

| Context | Response |
|---------|----------|
| **No active task** | Suggest starting points, list workflows/teams |
| **Mid-workflow** | Show progress, current step, what's next |
| **After completion** | Suggest PR creation, review, next task |

## Orchestrator Output Schema

```json
{
  "analysis": {
    "primary_intent": "string",
    "secondary_intents": ["string"],
    "implicit_requirements": ["string"],
    "scope": "file | feature | system",
    "complexity": "simple | moderate | complex"
  },
  "execution_plan": {
    "phases": [
      {
        "phase": 1,
        "name": "string",
        "parallel": true,
        "tasks": [
          {
            "agent": "agent_name",
            "mcp_model": "gemini | o3-mini | o3 | gpt-4o | null",
            "task": "description",
            "inputs": ["string"],
            "outputs": ["string"]
          }
        ],
        "checkpoint": true,
        "checkpoint_reason": "string"
      }
    ]
  },
  "skills_to_load": ["string"],
  "risks": ["string"],
  "notes": "string"
}
```

## MCP Model Invocation

### Gemini 3 Pro (Frontend, Architecture)
```
mcp__gemini__generateContent({
  model: "gemini-3-pro",
  prompt: "[Frontend/architecture prompt]"
})
```

### Gemini 3 Flash (Documentation, Visual Analysis)
```
mcp__gemini__generateContent({
  model: "gemini-3-flash",
  prompt: "[Documentation or visual analysis prompt]",
  image: "[base64 image]"  // Optional: for image/PDF/diagram analysis
})
```

### GPT-5.2 (Analysis, Design, Verification)
```
mcp__openai__chat({
  model: "gpt-5.2",
  messages: [{ role: "user", content: "[Analysis/review request]" }]
})
```

### GLM-4.7 (Code Generation - 30% Token Savings)
```
mcp__glm__chat({
  model: "glm-4.7",
  messages: [{ role: "user", content: "[code generation request]" }]
})
```

### Claude Opus/Sonnet (Built-in)
```
# Opus and Sonnet are built-in, no MCP server needed
# Automatically used based on config/stack.yaml assignments
```

## Example Flows

### Example 1: "Add user authentication" (Complex Feature)

```
1. ORCHESTRATOR (Atlas 🎯):
   Analyzes → Returns 4-phase plan
   
2. PHASE 1 - Planning (parallel):
   - planner (Marcus 📋): Create implementation plan
   - database-architect (Dana 🗄️): Design users table
   → CHECKPOINT: Review plan
   
3. PHASE 2 - Backend (sequential):
   - backend-engineer (Alex ⚙️): Create auth routes
   - backend-engineer (Alex ⚙️): JWT middleware
   
4. PHASE 3 - Frontend (parallel):
   - frontend-engineer (Sophie 🎨): LoginPage
   - frontend-engineer (Sophie 🎨): SignupPage
   → CHECKPOINT: Review before security
   
5. PHASE 4 - Verification (parallel):
   - security-reviewer (Jordan 🛡️): Audit
   - test-engineer (Taylor 🧪): Write tests
```

### Example 2: "Fix slow API" (Performance Issue)

```
1. ORCHESTRATOR:
   Analyzes → Returns 3-phase plan
   
2. PHASE 1 - Analysis:
   - performance-optimizer (Perry ⚡): Find bottleneck
   → CHECKPOINT: Review findings
   
3. PHASE 2 - Fix:
   - database-architect (Dana 🗄️): Optimize queries
   - backend-engineer (Alex ⚙️): Add caching
   
4. PHASE 3 - Verify:
   - test-engineer (Taylor 🧪): Run tests
   - performance-optimizer (Perry ⚡): Measure improvement
```

### Example 3: "Change button to blue" (Trivial)

```
1. TRIVIAL CHECK: Single file, obvious solution
   → Skip orchestrator, handle directly
   
2. DIRECT: Edit button CSS/className
```

## Checkpoint Decisions

At checkpoints, orchestrator can:

| Action | When |
|--------|------|
| **Continue** | Plan is on track |
| **Add tasks** | Issues found needing attention |
| **Remove tasks** | Scope changed, work not needed |
| **Reorder** | Dependencies changed |
| **Abort** | Fundamental problem discovered |

## State Tracking (Frontmatter)

Track workflow progress in document frontmatter:

```yaml
---
workflow: feature-development
feature_name: user-authentication
current_step: 4
steps_completed: [1, 2, 3]
checkpoint_status: approved
created: 2025-01-26
updated: 2025-01-26
---
```

## Todo Management

1. **After orchestrator returns plan** → Create todos for each phase
2. **Before each task** → Mark todo `in_progress`
3. **After each task** → Mark todo `completed`
4. **At checkpoints** → Update todos if plan changes
5. **System blocks stop** if incomplete todos exist

## Verification Checklist

Before completing:
- [ ] All phases executed
- [ ] All checkpoints passed
- [ ] All todos marked complete
- [ ] `lsp_diagnostics` clean on changed files
- [ ] Build passes (if applicable)
- [ ] Tests pass (if applicable)

## Anti-Patterns

| Don't | Do Instead |
|-------|------------|
| Skip orchestrator for complex requests | Always orchestrate non-trivial work |
| Run all agents sequentially | Parallelize independent tasks |
| Ignore checkpoint reviews | Adjust plan based on findings |
| Skip security review for auth | Always review auth/input handling |
| Mark done without verification | Verify before completing |
| Load all step files at once | JIT load steps as needed |

## Skills Reference

| Skill | Trigger | Auto-Load When |
|-------|---------|----------------|
| `tdd-workflow` | Testing work | test-engineer is in plan |
| `security-review` | Security work | security-reviewer is in plan |
| `frontend-patterns` | Frontend work | frontend-engineer is in plan |
| `backend-patterns` | Backend work | backend-engineer is in plan |

## Directory Structure

```
compose-claudecode/
├── agents/              # YAML agent definitions (24 agents)
│   ├── _base.agent.yaml # Shared base configuration
│   ├── orchestrator.agent.yaml
│   └── ...
├── workflows/           # Step-file workflows
│   ├── feature-development/
│   │   ├── workflow.yaml
│   │   └── steps/
│   └── code-review/
├── teams/               # Team bundles (6 teams)
│   ├── feature-team.yaml
│   └── ...
├── templates/           # State tracking templates
├── commands/            # Slash commands
│   └── help.md
├── config/
│   └── stack.yaml       # Tech stack + user preferences
├── skills/              # Reusable skill definitions
├── rules/               # Coding standards
└── domain/              # Domain knowledge
```
