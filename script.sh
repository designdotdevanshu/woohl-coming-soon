#!/bin/bash
set -e

# Ensure we are on main
git checkout main

# Start a rebase for the last 2 commits
# We'll override the dates for each commit as they're replayed
GIT_SEQUENCE_EDITOR="true" git rebase -i HEAD~2

# Rewrite the older commit (refactor: comment out About link)
GIT_COMMITTER_DATE="2025-08-19 23:26:15 +0530" \
git commit --amend --no-edit --date "2025-08-19 23:26:15 +0530"

# Continue rebase to next commit
git rebase --continue

# Rewrite the newer commit (feat: add loading skeleton)
GIT_COMMITTER_DATE="2025-08-19 23:56:21 +0530" \
git commit --amend --no-edit --date "2025-08-19 23:56:21 +0530"

# Finish rebase
git rebase --continue || true

echo "✅ Both commits updated to 19 Aug 2025"
echo "⚠️  Run: git push origin main --force   to update remote"

