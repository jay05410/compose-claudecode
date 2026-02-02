#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    return '';
  } catch {
    return '';
  }
}

function removeCodeBlocks(text) {
  let result = text.replace(/```[\s\S]*?```/g, '');
  result = result.replace(/`[^`]+`/g, '');
  return result;
}

function findSkillsDir() {
  const locations = [
    join(__dirname, '..', 'skills'),
    join(homedir(), '.claude', 'skills'),
    join(process.cwd(), '.claude', 'skills')
  ];
  
  for (const loc of locations) {
    if (existsSync(loc)) return loc;
  }
  return null;
}

function getAvailableSkills(skillsDir) {
  if (!skillsDir || !existsSync(skillsDir)) return [];
  
  const skills = [];
  try {
    const entries = readdirSync(skillsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const skillFile = join(skillsDir, entry.name, 'SKILL.md');
        if (existsSync(skillFile)) {
          const content = readFileSync(skillFile, 'utf-8');
          const nameMatch = content.match(/^name:\s*(.+)$/m);
          const descMatch = content.match(/^description:\s*(.+)$/m);
          if (nameMatch) {
            skills.push({
              name: nameMatch[1].trim(),
              description: descMatch ? descMatch[1].trim() : '',
              path: skillFile
            });
          }
        }
      }
    }
  } catch {}
  return skills;
}

const SKILL_TRIGGERS = {
  'orchestrate': /\b(orchestrat|delegat|multi.?agent|parallel\s+agent)\b/i,
  'tdd-workflow': /\b(tdd|test.?driven|write\s+test|unit\s+test|coverage)\b/i,
  'security-review': /\b(security|vulnerab|auth|xss|csrf|injection|secret)\b/i,
  'frontend-patterns': /\b(react|vue|svelte|angular|component|ui|frontend|css|tailwind)\b/i,
  'backend-patterns': /\b(api|endpoint|database|query|backend|server|rest|graphql)\b/i
};

async function main() {
  try {
    const input = await readStdin();
    if (!input.trim()) {
      console.log(JSON.stringify({ continue: true }));
      return;
    }

    const prompt = extractPrompt(input);
    if (!prompt) {
      console.log(JSON.stringify({ continue: true }));
      return;
    }

    const cleanPrompt = removeCodeBlocks(prompt).toLowerCase();
    const skillsDir = findSkillsDir();
    const availableSkills = getAvailableSkills(skillsDir);

    const matchedSkills = [];
    for (const [skillName, pattern] of Object.entries(SKILL_TRIGGERS)) {
      if (pattern.test(cleanPrompt)) {
        const skill = availableSkills.find(s => s.name === skillName);
        if (skill) {
          matchedSkills.push(skill);
        }
      }
    }

    if (matchedSkills.length > 0) {
      const skillList = matchedSkills
        .map(s => `- ${s.name}: ${s.description}`)
        .join('\n');

      const message = `[SKILLS DETECTED]

Relevant skills for this request:
${skillList}

These skills are available via the skill tool. Consider invoking them for specialized guidance.`;

      console.log(JSON.stringify({ continue: true, message }));
      return;
    }

    console.log(JSON.stringify({ continue: true }));
  } catch (error) {
    console.log(JSON.stringify({ continue: true }));
  }
}

main();
