#!/usr/bin/env node

import { Command } from 'commander';
import { existsSync, mkdirSync, copyFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mcpSetup } from './mcp-setup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, '..', '..');

const program = new Command();

program
  .name('ecc')
  .description('Everything Claude Code - Multi-model agent orchestration')
  .version('1.0.0');

program
  .command('setup')
  .description('Setup Everything Claude Code in your environment')
  .option('-g, --global', 'Install globally to ~/.claude/')
  .option('-l, --local', 'Install locally to ./.claude/')
  .action((options) => {
    const targetDir = options.global 
      ? join(process.env.HOME || '~', '.claude')
      : join(process.cwd(), '.claude');

    console.log(`Setting up Everything Claude Code in: ${targetDir}`);

    const dirs = ['agents', 'commands', 'config', 'domain', 'hooks', 'rules', 'skills'];
    
    for (const dir of dirs) {
      const srcDir = join(packageRoot, dir);
      const destDir = join(targetDir, dir);
      
      if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true });
      }
      
      if (existsSync(srcDir)) {
        copyDirRecursive(srcDir, destDir);
      }
    }

    // Copy scripts folder (hooks depend on these)
    const scriptsDir = join(packageRoot, 'scripts');
    const destScriptsDir = join(targetDir, 'scripts');
    if (existsSync(scriptsDir)) {
      if (!existsSync(destScriptsDir)) {
        mkdirSync(destScriptsDir, { recursive: true });
      }
      copyDirRecursive(scriptsDir, destScriptsDir);
      console.log('Copied hook scripts to:', destScriptsDir);
    }

    console.log('Setup complete!');
    console.log('\nNext steps:');
    console.log('1. Configure your stack in ~/.claude/config/stack.yaml');
    console.log('2. Add MCP servers to ~/.claude.json');
    console.log('3. Run /dm-init in your project to generate domain files');
  });

program
  .command('init')
  .description('Initialize domain files for current project')
  .action(() => {
    const claudeDir = join(process.cwd(), '.claude');
    const domainDir = join(claudeDir, 'domain');

    if (!existsSync(domainDir)) {
      mkdirSync(domainDir, { recursive: true });
    }

    const templateDir = join(packageRoot, 'domain');
    if (existsSync(templateDir)) {
      copyDirRecursive(templateDir, domainDir);
    }

    console.log('Domain templates initialized in .claude/domain/');
    console.log('Run /dm-init to customize based on your project.');
  });

program
  .command('mcp-setup')
  .description('Configure MCP servers globally for all projects')
  .action(async () => {
    await mcpSetup();
  });

function copyDirRecursive(src: string, dest: string): void {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  
  const entries = readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

program.parse();
