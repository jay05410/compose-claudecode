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

function countIncompleteTodos(directory) {
  const locations = [
    join(directory, '.claude', 'todos'),
    join(homedir(), '.claude', 'todos')
  ];

  let count = 0;
  for (const todosDir of locations) {
    if (existsSync(todosDir)) {
      try {
        const files = readdirSync(todosDir).filter(f => f.endsWith('.json'));
        for (const file of files) {
          const todos = readJsonFile(join(todosDir, file));
          if (Array.isArray(todos)) {
            count += todos.filter(t => 
              t.status === 'pending' || t.status === 'in_progress'
            ).length;
          }
        }
      } catch {}
    }
  }
  return count;
}

async function main() {
  try {
    const input = await readStdin();
    let data = {};
    try { data = JSON.parse(input); } catch {}

    const directory = data.directory || process.cwd();
    const messages = [];

    const modeState = readJsonFile(join(directory, '.claude', '.ecc', 'mode-state.json'))
      || readJsonFile(join(homedir(), '.claude', '.ecc', 'mode-state.json'));

    if (modeState?.active) {
      messages.push(`[SESSION RESTORE]

Active mode from previous session: ${modeState.mode?.toUpperCase()}
Started: ${modeState.started_at}
Original task: ${modeState.original_prompt}

Continue working in ${modeState.mode} mode until complete.

---`);
    }

    const incompleteCount = countIncompleteTodos(directory);

    if (incompleteCount > 0) {
      messages.push(`[PENDING TASKS]

${incompleteCount} incomplete task(s) from previous session.
Continue working on these tasks before starting new work.

---`);
    }

    if (messages.length > 0) {
      console.log(JSON.stringify({ continue: true, message: messages.join('\n\n') }));
    } else {
      console.log(JSON.stringify({ continue: true }));
    }
  } catch (error) {
    console.log(JSON.stringify({ continue: true }));
  }
}

main();
