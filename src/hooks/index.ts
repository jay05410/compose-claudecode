/**
 * Hooks Module for Everything Claude Code
 *
 * TypeScript bridge for Claude Code's native shell hook system.
 * Shell scripts invoke these functions for complex processing.
 */

export { checkIncompleteTodos, isUserAbort } from './todo-continuation/index.js';
export type { Todo, IncompleteTodosResult, StopContext } from './todo-continuation/index.js';

export { detectKeywords, removeCodeBlocks } from './keyword-detector/index.js';
export type { KeywordType, DetectedKeyword } from './keyword-detector/index.js';

export { processHook } from './bridge.js';
export type { HookType, HookInput, HookOutput } from './bridge.js';
