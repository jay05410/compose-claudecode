#!/bin/bash
input=$(cat)
file_path=$(echo "$input" | jq -r '.tool_input.file_path // ""')

if [[ "$file_path" =~ \.(md|txt)$ ]] && [[ ! "$file_path" =~ (README|CLAUDE|AGENTS|CONTRIBUTING)\.md$ ]]; then
  echo "[Hook] BLOCKED: Unnecessary documentation file creation" >&2
  echo "[Hook] File: $file_path" >&2
  echo "[Hook] Use README.md for documentation instead" >&2
  exit 1
fi

echo "$input"
