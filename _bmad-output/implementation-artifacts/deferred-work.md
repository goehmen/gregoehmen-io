# Deferred Work

GitHub Issues is the source of truth for all deferred findings on this project.

**View open deferred items:** https://github.com/goehmen/gregoehmen-io/issues

Each issue includes:
- The original finding and affected file
- A recommended fix
- An explicit trigger condition for when to address it

## For AI Agents

At the start of each story, pull the current open issues to check for any deferred work relevant to the files you will be touching:

```bash
gh issue list --repo goehmen/gregoehmen-io --state open
```

If a deferred item is resolved as a side effect of story work, close the corresponding issue with a reference to the commit or PR.
