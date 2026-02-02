#!/bin/bash
input=$(cat)
if [ -z "$TMUX" ]; then
  echo '[Hook] Consider running in tmux for session persistence' >&2
  echo '[Hook] tmux new -s dev  |  tmux attach -t dev' >&2
fi
echo "$input"
