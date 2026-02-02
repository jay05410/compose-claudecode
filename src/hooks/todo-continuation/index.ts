export interface Todo {
  content: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority?: string;
  id?: string;
}

export interface IncompleteTodosResult {
  count: number;
  todos: Todo[];
  total: number;
}

export interface StopContext {
  stop_reason?: string;
  stopReason?: string;
  user_requested?: boolean;
  userRequested?: boolean;
}

const ABORT_PATTERNS = [
  'user_cancel', 'user_interrupt', 'ctrl_c', 'manual_stop',
  'aborted', 'abort', 'cancel', 'interrupt'
];

export function isUserAbort(context?: StopContext): boolean {
  if (!context) return false;
  if (context.user_requested || context.userRequested) return true;
  
  const reason = (context.stop_reason ?? context.stopReason ?? '').toLowerCase();
  return ABORT_PATTERNS.some(pattern => reason.includes(pattern));
}

export async function checkIncompleteTodos(
  sessionId?: string,
  directory?: string,
  stopContext?: StopContext
): Promise<IncompleteTodosResult> {
  if (isUserAbort(stopContext)) {
    return { count: 0, todos: [], total: 0 };
  }

  const todoFile = directory 
    ? `${directory}/.claude/todos.json`
    : `${process.env.HOME}/.claude/todos.json`;

  try {
    const fs = await import('fs/promises');
    const content = await fs.readFile(todoFile, 'utf-8');
    const todos: Todo[] = JSON.parse(content);
    
    const incomplete = todos.filter(
      t => t.status === 'pending' || t.status === 'in_progress'
    );
    
    return {
      count: incomplete.length,
      todos: incomplete,
      total: todos.length
    };
  } catch {
    return { count: 0, todos: [], total: 0 };
  }
}

export function createTodoContinuationMessage(result: IncompleteTodosResult): string {
  if (result.count === 0) return '';
  
  const todoList = result.todos
    .map(t => `- [${t.status}] ${t.content}`)
    .join('\n');
  
  return `[SYSTEM REMINDER - TODO CONTINUATION]

${result.count} incomplete task(s) remaining:
${todoList}

You MUST complete all tasks before stopping. Continue working.`;
}
