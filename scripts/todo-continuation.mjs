#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf-8');
}

function readJsonFile(path) {
  try {
    if (!existsSync(path)) return null;
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return null;
  }
}

function isUserAbort(context) {
  if (!context) return false;
  if (context.user_requested || context.userRequested) return true;
  
  const abortPatterns = [
    'user_cancel', 'user_interrupt', 'ctrl_c', 'manual_stop',
    'aborted', 'abort', 'cancel', 'interrupt'
  ];
  const reason = (context.stop_reason ?? context.stopReason ?? '').toLowerCase();
  return abortPatterns.some(pattern => reason.includes(pattern));
}

function getIncompleteTodos(directory) {
  const locations = [
    join(directory, '.claude', 'todos'),
    join(homedir(), '.claude', 'todos')
  ];

  const incomplete = [];
  for (const todosDir of locations) {
    if (existsSync(todosDir)) {
      try {
        const files = readdirSync(todosDir).filter(f => f.endsWith('.json'));
        for (const file of files) {
          const todos = readJsonFile(join(todosDir, file));
          if (Array.isArray(todos)) {
            incomplete.push(...todos.filter(t => 
              t.status === 'pending' || t.status === 'in_progress'
            ));
          }
        }
      } catch {}
    }
  }
  return incomplete;
}

async function main() {
  try {
    const input = await readStdin();
    let data = {};
    try { data = JSON.parse(input); } catch {}

    const directory = data.directory || process.cwd();
    const stopContext = data.stop_context || data.stopContext || {};

    if (isUserAbort(stopContext)) {
      console.log(JSON.stringify({ continue: true }));
      return;
    }

    const incomplete = getIncompleteTodos(directory);

    if (incomplete.length === 0) {
      console.log(JSON.stringify({ continue: true }));
      return;
    }

    const todoList = incomplete
      .map(t => `- [${t.status}] ${t.content}`)
      .join('\n');

    const message = `[SYSTEM REMINDER - TODO CONTINUATION]

${incomplete.length} incomplete task(s) remaining:

${todoList}

You MUST complete all tasks before stopping.
Continue working on the next pending task.`;

    console.log(JSON.stringify({ 
      continue: false, 
      message,
      reason: `${incomplete.length} incomplete todos`
    }));
  } catch (error) {
    console.log(JSON.stringify({ continue: true }));
  }
}

main();
