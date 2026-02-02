# MCP Server Setup Guide

This guide explains how to configure MCP (Model Context Protocol) servers for multi-model orchestration.

## Required API Keys

| Provider | Get Key From | Used By |
|----------|--------------|---------|
| Gemini | https://aistudio.google.com/apikey | orchestrator, planner, architect, frontend-engineer |
| OpenAI | https://platform.openai.com/api-keys | code-reviewer, security-reviewer, performance-optimizer, researcher |

## Quick Setup (Recommended)

Use `claude mcp add` command - it automatically handles configuration:

```bash
# Add Gemini (Free tier available)
claude mcp add gemini --command "npx" --args "-y" --args "github:aliargun/mcp-server-gemini" -e GEMINI_API_KEY="your-key"

# Add OpenAI (Optional - paid)
claude mcp add openai --command "npx" --args "-y" --args "@mzxrai/mcp-openai@latest" -e OPENAI_API_KEY="your-key"

# Verify
claude mcp list
```

## Configuration Location

All MCP servers are configured in: `~/.claude.json`

## Manual Configuration

If you prefer manual setup, add to your `~/.claude.json`:

```json
{
  "mcpServers": {
    "gemini": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-gemini"],
      "env": {
        "GEMINI_API_KEY": "YOUR_GEMINI_API_KEY"
      }
    },
    "openai": {
      "command": "npx",
      "args": ["-y", "@mzxrai/mcp-openai"],
      "env": {
        "OPENAI_API_KEY": "YOUR_OPENAI_API_KEY"
      }
    }
  }
}
```

## Alternative Gemini MCP Servers

If the default package doesn't work, try these alternatives:

### Option 1: aliargun/mcp-server-gemini (Recommended)

```json
{
  "gemini": {
    "command": "npx",
    "args": ["-y", "@aliargun/mcp-server-gemini"],
    "env": {
      "GEMINI_API_KEY": "YOUR_GEMINI_API_KEY"
    }
  }
}
```

### Option 2: Direct GitHub Install

```json
{
  "gemini": {
    "command": "npx",
    "args": ["-y", "github:aliargun/mcp-server-gemini"],
    "env": {
      "GEMINI_API_KEY": "YOUR_GEMINI_API_KEY"
    }
  }
}
```

## Environment Variables (Alternative)

Instead of putting keys in `.claude.json`, you can use environment variables:

### macOS/Linux

Add to `~/.zshrc` or `~/.bashrc`:

```bash
export GEMINI_API_KEY="your-gemini-key"
export OPENAI_API_KEY="your-openai-key"
```

Then configure `.claude.json` without the `env` block:

```json
{
  "mcpServers": {
    "gemini": {
      "command": "npx",
      "args": ["-y", "@aliargun/mcp-server-gemini"]
    },
    "openai": {
      "command": "npx",
      "args": ["-y", "@mzxrai/mcp-openai"]
    }
  }
}
```

### Windows

Set environment variables in System Properties > Environment Variables, or:

```powershell
[System.Environment]::SetEnvironmentVariable('GEMINI_API_KEY', 'your-key', 'User')
[System.Environment]::SetEnvironmentVariable('OPENAI_API_KEY', 'your-key', 'User')
```

## Plugin Installation

When using as a Claude Code plugin, MCP servers are configured globally:

1. Install the plugin:
   ```
   /plugin install compose-claudecode
   ```

2. Edit `~/.claude.json` and add the `mcpServers` block above

3. Restart Claude Code for changes to take effect

## Verify Installation

After configuration, verify MCP servers are working:

1. Start a new Claude Code session
2. The orchestrator should be able to call Gemini/OpenAI models
3. Check for errors in the Claude Code output

## Agent → MCP Model Mapping

| Agent | MCP Server | Model |
|-------|------------|-------|
| orchestrator | gemini | gemini-2.5-pro |
| planner | gemini | gemini-2.5-pro |
| architect | gemini | gemini-2.5-pro |
| database-architect | gemini | gemini-2.5-pro |
| frontend-engineer | gemini | gemini-2.5-pro |
| code-reviewer | openai | o3-mini |
| security-reviewer | openai | o3-mini |
| performance-optimizer | openai | o3 |
| researcher | openai | gpt-4o |

## Troubleshooting

### "MCP server not found"

1. Ensure Node.js 18+ is installed
2. Try running the npx command manually:
   ```bash
   npx -y @aliargun/mcp-server-gemini
   ```
3. Check if the package exists on npm

### "Invalid API key"

1. Verify your API key is correct
2. Check if the key has the required permissions
3. Ensure no extra whitespace in the key

### "Connection timeout"

1. Check your internet connection
2. Verify the MCP server is running
3. Try increasing timeout in Claude Code settings

## Minimal Setup (OpenAI Only)

If you only want to use OpenAI models (skip Gemini):

```json
{
  "mcpServers": {
    "openai": {
      "command": "npx",
      "args": ["-y", "@mzxrai/mcp-openai"],
      "env": {
        "OPENAI_API_KEY": "YOUR_OPENAI_API_KEY"
      }
    }
  }
}
```

Note: Without Gemini, the orchestrator and planning agents will fall back to Claude.
