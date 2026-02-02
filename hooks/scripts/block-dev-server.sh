#!/bin/bash
# Block dev servers outside tmux - ensures you can access logs
input=$(cat)
cmd=$(echo "$input" | jq -r '.tool_input.command // ""')

echo '[Hook] BLOCKED: Dev server must run in tmux for log access' >&2
echo '[Hook] Use this command instead:' >&2
echo "[Hook] tmux new-session -d -s dev 'npm run dev'" >&2
echo '[Hook] Then: tmux attach -t dev' >&2
exit 1
