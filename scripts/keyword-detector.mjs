#!/usr/bin/env node

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf-8');
}

function extractPrompt(input) {
  try {
    const data = JSON.parse(input);
    if (data.prompt) return data.prompt;
    if (data.message?.content) return data.message.content;
    if (Array.isArray(data.parts)) {
      return data.parts.filter(p => p.type === 'text').map(p => p.text).join(' ');
    }
    return '';
  } catch {
    const match = input.match(/"(?:prompt|content|text)"\s*:\s*"([^"]+)"/);
    return match ? match[1] : '';
  }
}

function removeCodeBlocks(text) {
  let result = text.replace(/```[\s\S]*?```/g, '');
  result = result.replace(/~~~[\s\S]*?~~~/g, '');
  result = result.replace(/`[^`]+`/g, '');
  return result;
}

const MESSAGES = {
  plan: `[MODE: PLANNING]
Create a detailed implementation plan before writing any code.
1. Restate requirements clearly
2. Break down into phases with specific tasks
3. Identify risks and dependencies
4. Wait for user confirmation before implementing`,

  tdd: `[MODE: TDD]
Test-Driven Development enforced:
1. Write failing tests FIRST
2. Implement minimal code to pass
3. Refactor while keeping tests green
4. Maintain 80%+ coverage`,

  security: `[MODE: SECURITY REVIEW]
Security checklist activated:
- Check for hardcoded secrets
- Validate all user inputs
- Use parameterized queries
- Verify auth/authz
- Check dependencies for vulnerabilities`,

  search: `[MODE: THOROUGH SEARCH]
Exhaustive codebase exploration:
- Fire multiple explore agents in parallel
- Check all related files
- Don't stop at first result
- Report comprehensive findings`,

  analyze: `[MODE: DEEP ANALYSIS]
Investigation mode activated:
- Understand root cause, not just symptoms
- Check related components
- Verify assumptions
- Provide detailed reasoning`,

  ultrawork: `[MODE: ULTRAWORK]
Maximum parallelism enabled:
- Launch multiple agents concurrently
- Batch independent operations
- Don't wait unnecessarily
- Complete all tasks before stopping`
};

function activateState(directory, mode, prompt) {
  const state = {
    active: true,
    mode,
    started_at: new Date().toISOString(),
    original_prompt: prompt
  };

  const localDir = join(directory, '.claude', '.ecc');
  if (!existsSync(localDir)) {
    try { mkdirSync(localDir, { recursive: true }); } catch {}
  }
  try { writeFileSync(join(localDir, 'mode-state.json'), JSON.stringify(state, null, 2)); } catch {}

  const globalDir = join(homedir(), '.claude', '.ecc');
  if (!existsSync(globalDir)) {
    try { mkdirSync(globalDir, { recursive: true }); } catch {}
  }
  try { writeFileSync(join(globalDir, 'mode-state.json'), JSON.stringify(state, null, 2)); } catch {}
}

async function main() {
  try {
    const input = await readStdin();
    if (!input.trim()) {
      console.log(JSON.stringify({ continue: true }));
      return;
    }

    let data = {};
    try { data = JSON.parse(input); } catch {}
    const directory = data.directory || process.cwd();

    const prompt = extractPrompt(input);
    if (!prompt) {
      console.log(JSON.stringify({ continue: true }));
      return;
    }

    const cleanPrompt = removeCodeBlocks(prompt).toLowerCase();

    if (/\b(ultrawork|ulw|parallel|concurrent)\b/.test(cleanPrompt)) {
      activateState(directory, 'ultrawork', prompt);
      console.log(JSON.stringify({ continue: true, message: MESSAGES.ultrawork }));
      return;
    }

    if (/\b(plan|planning|breakdown|roadmap|phase)\b/.test(cleanPrompt)) {
      activateState(directory, 'plan', prompt);
      console.log(JSON.stringify({ continue: true, message: MESSAGES.plan }));
      return;
    }

    if (/\b(tdd|test.?driven|write\s+tests?\s+first)\b/.test(cleanPrompt)) {
      activateState(directory, 'tdd', prompt);
      console.log(JSON.stringify({ continue: true, message: MESSAGES.tdd }));
      return;
    }

    if (/\b(security|vulnerab|auth|injection|xss|csrf|secret|credential)\b/.test(cleanPrompt)) {
      console.log(JSON.stringify({ continue: true, message: MESSAGES.security }));
      return;
    }

    if (/\b(search|find|locate|explore|discover|grep|where)\b|where\s+is|show\s+me/.test(cleanPrompt)) {
      console.log(JSON.stringify({ continue: true, message: MESSAGES.search }));
      return;
    }

    if (/\b(analyze|analyse|investigate|examine|research|deep.?dive|debug|understand)\b|why\s+is|how\s+does/.test(cleanPrompt)) {
      console.log(JSON.stringify({ continue: true, message: MESSAGES.analyze }));
      return;
    }

    console.log(JSON.stringify({ continue: true }));
  } catch (error) {
    console.log(JSON.stringify({ continue: true }));
  }
}

main();
