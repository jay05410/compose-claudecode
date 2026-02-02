import { checkIncompleteTodos, createTodoContinuationMessage, StopContext } from './todo-continuation/index.js';
import { detectKeywords, getKeywordMessage } from './keyword-detector/index.js';

export type HookType =
  | 'keyword-detector'
  | 'stop-continuation'
  | 'session-start'
  | 'pre-tool-use'
  | 'post-tool-use';

export interface HookInput {
  prompt?: string;
  tool_name?: string;
  tool_input?: Record<string, unknown>;
  tool_output?: Record<string, unknown>;
  session_id?: string;
  directory?: string;
  stop_context?: StopContext;
}

export interface HookOutput {
  continue: boolean;
  message?: string;
  modified_input?: Record<string, unknown>;
}

export async function processHook(
  hookType: HookType,
  input: HookInput
): Promise<HookOutput> {
  try {
    switch (hookType) {
      case 'keyword-detector':
        return processKeywordDetector(input);
      case 'stop-continuation':
        return await processStopContinuation(input);
      case 'session-start':
        return processSessionStart(input);
      case 'pre-tool-use':
        return processPreToolUse(input);
      case 'post-tool-use':
        return processPostToolUse(input);
      default:
        return { continue: true };
    }
  } catch (error) {
    console.error(`[hook-bridge] Error in ${hookType}:`, error);
    return { continue: true };
  }
}

function processKeywordDetector(input: HookInput): HookOutput {
  if (!input.prompt) return { continue: true };
  
  const keywords = detectKeywords(input.prompt);
  if (keywords.length === 0) return { continue: true };
  
  const messages = keywords.map(k => getKeywordMessage(k)).filter(Boolean);
  
  return {
    continue: true,
    message: messages.join('\n')
  };
}

async function processStopContinuation(input: HookInput): Promise<HookOutput> {
  const result = await checkIncompleteTodos(
    input.session_id,
    input.directory,
    input.stop_context
  );
  
  if (result.count === 0) {
    return { continue: true };
  }
  
  return {
    continue: false,
    message: createTodoContinuationMessage(result)
  };
}

function processSessionStart(_input: HookInput): HookOutput {
  return { continue: true };
}

function processPreToolUse(_input: HookInput): HookOutput {
  return { continue: true };
}

function processPostToolUse(_input: HookInput): HookOutput {
  return { continue: true };
}
