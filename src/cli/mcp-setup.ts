#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import * as readline from 'readline';

interface McpServerConfig {
  command: string;
  args: string[];
  env?: Record<string, string>;
}

interface ClaudeConfig {
  mcpServers?: Record<string, McpServerConfig>;
  [key: string]: any;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

function hideInput(query: string): Promise<string> {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    const stdout = process.stdout;

    stdout.write(query);

    // Hide input
    if (stdin.isTTY) {
      (stdin as any).setRawMode(true);
    }

    let input = '';
    stdin.once('data', function onData(char: Buffer) {
      const key = char.toString();

      if (key === '\n' || key === '\r' || key === '\r\n') {
        if (stdin.isTTY) {
          (stdin as any).setRawMode(false);
        }
        stdout.write('\n');
        resolve(input);
      } else if (key === '\u0003') { // Ctrl+C
        process.exit();
      } else if (key === '\u007f' || key === '\b') { // Backspace
        if (input.length > 0) {
          input = input.slice(0, -1);
          stdout.write('\b \b');
        }
        stdin.once('data', onData);
      } else {
        input += key;
        stdout.write('*');
        stdin.once('data', onData);
      }
    });
  });
}

export async function mcpSetup(): Promise<void> {
  console.log('');
  console.log('🔧 Global MCP Setup - Configure Once, Use Everywhere');
  console.log('');
  console.log('This will add MCP servers to your global Claude Code configuration.');
  console.log('After setup, they\'ll be available in ALL your projects automatically.');
  console.log('');
  console.log('Available MCP servers:');
  console.log('  ✓ Gemini (Free tier: 60 req/min, 1500/day)');
  console.log('  ✓ OpenAI (Paid: GPT-4o, o1, o3)');
  console.log('  ✓ GLM (Paid: 30% cheaper)');
  console.log('');

  const choice = await question(
    'Which would you like to configure?\n' +
    '  1) Gemini only (recommended for free tier)\n' +
    '  2) Gemini + OpenAI (full power)\n' +
    '  3) All three (maximum capabilities)\n' +
    '  4) Skip MCP setup\n' +
    'Enter choice (1-4): '
  );

  if (choice === '4') {
    console.log('Skipped MCP setup.');
    rl.close();
    return;
  }

  const mcpServers: Record<string, McpServerConfig> = {};

  // Gemini (for choices 1, 2, 3)
  if (['1', '2', '3'].includes(choice)) {
    console.log('');
    console.log('📝 Gemini Setup');
    console.log('Get your API key: https://aistudio.google.com/apikey');
    console.log('');
    const geminiKey = await hideInput('Paste your Gemini API key: ');

    if (geminiKey.trim()) {
      mcpServers.gemini = {
        command: 'npx',
        args: ['-y', 'github:aliargun/mcp-server-gemini'],
        env: {
          GEMINI_API_KEY: geminiKey.trim()
        }
      };
      console.log('✓ Gemini configured');
    }
  }

  // OpenAI (for choices 2, 3)
  if (['2', '3'].includes(choice)) {
    console.log('');
    console.log('📝 OpenAI Setup');
    console.log('Get your API key: https://platform.openai.com/api-keys');
    console.log('');
    const openaiKey = await hideInput('Paste your OpenAI API key: ');

    if (openaiKey.trim()) {
      mcpServers.openai = {
        command: 'npx',
        args: ['-y', '@mzxrai/mcp-openai@latest'],
        env: {
          OPENAI_API_KEY: openaiKey.trim()
        }
      };
      console.log('✓ OpenAI configured');
    }
  }

  // GLM (for choice 3)
  if (choice === '3') {
    console.log('');
    console.log('📝 GLM Setup');
    console.log('Get your API key: https://open.bigmodel.cn/');
    console.log('');
    const glmKey = await hideInput('Paste your GLM API key: ');

    if (glmKey.trim()) {
      mcpServers.glm = {
        command: 'npx',
        args: ['-y', '@zhipuai/mcp-server'],
        env: {
          ZHIPUAI_API_KEY: glmKey.trim()
        }
      };
      console.log('✓ GLM configured');
    }
  }

  if (Object.keys(mcpServers).length === 0) {
    console.log('');
    console.log('❌ No API keys provided. Setup cancelled.');
    rl.close();
    return;
  }

  // Update ~/.claude.json
  console.log('');
  console.log('⚙️  Updating ~/.claude.json...');

  const claudeConfigPath = join(process.env.HOME || '~', '.claude.json');
  let config: ClaudeConfig = {};

  // Read existing config
  if (existsSync(claudeConfigPath)) {
    try {
      const content = readFileSync(claudeConfigPath, 'utf-8');
      config = JSON.parse(content);

      // Backup
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = `${claudeConfigPath}.backup-${timestamp}`;
      writeFileSync(backupPath, content, 'utf-8');
      console.log(`✓ Backed up to ${backupPath}`);
    } catch (error) {
      console.error('❌ Error reading existing config:', error);
      rl.close();
      return;
    }
  }

  // Merge mcpServers (root level for global)
  if (!config.mcpServers) {
    config.mcpServers = {};
  }

  Object.assign(config.mcpServers, mcpServers);

  // Write config
  try {
    writeFileSync(claudeConfigPath, JSON.stringify(config, null, 2), 'utf-8');
    console.log('✓ Added MCP servers to global config');
    console.log('✓ JSON validated');
  } catch (error) {
    console.error('❌ Error writing config:', error);
    rl.close();
    return;
  }

  // Success message
  console.log('');
  console.log('✅ Global MCP Setup Complete!');
  console.log('');
  console.log('📋 Configured:');
  Object.keys(mcpServers).forEach(name => {
    const config = mcpServers[name];
    console.log(`  ✓ ${name} - ${config.args[config.args.length - 1]}`);
  });
  console.log('');
  console.log('🌍 Available in ALL projects:');
  console.log('  - Current project');
  console.log('  - All future projects');
  console.log('  - No per-project configuration needed!');
  console.log('');
  console.log('🔄 Next steps:');
  console.log('  1. Restart Claude Code (exit and start new session)');
  console.log('  2. Verify with: claude mcp list');
  console.log('  3. Start building in any project!');
  console.log('');

  rl.close();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  mcpSetup().catch(console.error);
}
