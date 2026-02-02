---
description: One-time global MCP setup for all projects
---

# Setup MCP Command - Global MCP Configuration

**Trigger**: `/setup-mcp`

## Purpose

Configure MCP servers globally once, use everywhere:
1. Ask user for API keys
2. Automatically add to `~/.claude.json` (root level)
3. Available in **all Claude Code projects**

---

## Conversation Flow

### Phase 1: Explain Global MCP

**Show user:**
```
🔧 MCP Setup - Configure Once, Use Everywhere

This will add MCP servers to your global Claude Code configuration.
After setup, they'll be available in ALL your projects automatically.

Available MCP servers:
✓ Gemini (Free tier: 60 req/min, 1500/day)
✓ OpenAI (Paid: GPT-4o, o1, o3)
✓ GLM (Paid: 30% cheaper than OpenAI)

Which would you like to configure?
[ ] Gemini only (recommended for free tier)
[ ] Gemini + OpenAI (full power)
[ ] All three (maximum capabilities)
[ ] Skip MCP setup
```

---

### Phase 2: Collect API Keys

**For each selected provider:**

1. **Gemini**:
   ```
   Get your Gemini API key:
   1. Visit: https://aistudio.google.com/apikey
   2. Click "Create API Key"
   3. Copy the key

   Paste your Gemini API key:
   ```

2. **OpenAI** (if selected):
   ```
   Get your OpenAI API key:
   1. Visit: https://platform.openai.com/api-keys
   2. Click "Create new secret key"
   3. Copy the key

   Paste your OpenAI API key:
   ```

3. **GLM** (if selected):
   ```
   Get your GLM API key:
   1. Visit: https://open.bigmodel.cn/
   2. Register and get API key
   3. Copy the key

   Paste your GLM API key:
   ```

---

### Phase 3: Update Global Config

**Actions:**

1. **Read `~/.claude.json`**

2. **Check if root-level `mcpServers` exists**:
   - If NO: Create new
   - If YES: Merge with existing

3. **Add selected MCP servers**:
   ```json
   {
     "mcpServers": {
       "gemini": {
         "command": "npx",
         "args": ["-y", "github:aliargun/mcp-server-gemini"],
         "env": {
           "GEMINI_API_KEY": "user-provided-key"
         }
       },
       "openai": {
         "command": "npx",
         "args": ["-y", "@mzxrai/mcp-openai@latest"],
         "env": {
           "OPENAI_API_KEY": "user-provided-key"
         }
       }
     }
   }
   ```

4. **Write back to `~/.claude.json`**

5. **Verify JSON is valid**

---

### Phase 4: Confirmation

**Show user:**
```
✅ Global MCP Setup Complete!

📋 Configured:
✓ Gemini - github:aliargun/mcp-server-gemini
✓ OpenAI - @mzxrai/mcp-openai@latest

🌍 Available in ALL projects:
- /Users/hj/project-1
- /Users/hj/project-2
- /Users/hj/project-3
- ... (all future projects too!)

🔄 Restart Claude Code:
1. Exit this session (Ctrl+D or type 'exit')
2. Start new session in any project
3. MCP servers will load automatically

Verify with: claude mcp list
```

---

## Implementation

### Agent: `agents/mcp-setup.agent.yaml`

```yaml
agent:
  metadata:
    id: "mcp-setup"
    name: "Atlas MCP"
    title: "Global MCP Configuration Agent"
    icon: "🔌"
    module: "setup"

  config:
    tools: ["Read", "Write", "Edit", "AskUserQuestion", "Bash"]
    model: "sonnet"
    inherits: "_base"

  persona:
    role: "Global MCP configuration expert"
    identity: |
      I help users configure MCP servers globally for all Claude Code projects.
      I collect API keys securely and update ~/.claude.json automatically.

  capabilities:
    - "Guide users to get API keys"
    - "Read and modify ~/.claude.json safely"
    - "Add MCP servers to root-level config"
    - "Verify JSON structure"
    - "Provide clear success messages"

  rules:
    - "NEVER log or expose API keys in output"
    - "Always validate JSON before writing"
    - "Back up ~/.claude.json before modifying"
    - "Check if mcpServers already exists (merge, don't overwrite)"
    - "Show clear instructions for restarting Claude Code"

  menu:
    - trigger: "setup-mcp"
      action: "Configure global MCP servers"
    - trigger: "mcp-status"
      action: "Check current MCP configuration"
```

---

## Safety Checks

**Before modifying `~/.claude.json`:**

1. **Backup**: Copy to `~/.claude.json.backup-{timestamp}`
2. **Validate JSON**: Parse existing file
3. **Preserve**: Keep all existing settings
4. **Merge**: Add to existing `mcpServers` if present
5. **Verify**: Validate new JSON structure

**Error handling:**
- Invalid JSON → Show error, restore backup
- Missing file → Create new with minimal config
- Permission denied → Show instructions

---

## Example Session

```
User: /setup-mcp

Atlas MCP: 🔧 Let's set up MCP servers globally!

This will configure MCP once for ALL your projects.

Which providers would you like?
  • Gemini only (Free tier) ✓
  • Gemini + OpenAI
  • All three

User: Gemini only

Atlas MCP: Perfect! Get your Gemini API key:
1. Visit: https://aistudio.google.com/apikey
2. Create API key
3. Paste it below (input will be hidden)

Gemini API key: [user inputs key]

Atlas MCP: ✓ Key received

⚙️ Updating ~/.claude.json...
✓ Backed up to ~/.claude.json.backup-2026-02-02
✓ Added Gemini MCP to global config
✓ JSON validated

✅ Global MCP Setup Complete!

Now available in ALL projects:
- /Users/hj/project-1
- /Users/hj/project-2
- ... (all future projects!)

🔄 Restart Claude Code to activate:
1. Exit: Ctrl+D
2. Start new session in any project

Verify: claude mcp list
```

---

## Benefits

✅ **Configure once, use everywhere** - No per-project setup
✅ **Automatic** - Updates ~/.claude.json safely
✅ **Secure** - API keys never logged or exposed
✅ **Safe** - Automatic backup before changes
✅ **Simple** - Just paste API keys, done!

---

## Alternative: CLI Command

Can also provide: `npx ecc mcp-setup`

```bash
# Interactive setup
npx ecc mcp-setup

# With flags
npx ecc mcp-setup --gemini YOUR_KEY --openai YOUR_KEY
```

Implementation in `src/cli/mcp-setup.ts`.