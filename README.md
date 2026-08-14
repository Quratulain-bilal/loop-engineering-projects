# Loop Engineering Projects

A collection of projects from the Loop Engineering crash course, demonstrating all four heartbeats and the six parts of a loop.

## Projects

### Project 6: PR Review Test
**Heartbeat: Event-driven**
- Automated PR review using GitHub Actions
- Plants bugs, watches review catch them
- Demonstrates event-driven heartbeat

### Project 9: Daily Lint Loop
**Heartbeat: Scheduled**
- Complete loop with all 6 parts
- Runs every weekday at 9am
- Demonstrates: heartbeat, worktree, skill, maker-checker, connector, spine

### Project 10: Secrets Drill
**Concepts: A4 (secrets), A2 (environment)**
- Learn where secrets live: .env vs environment variables
- Demonstrates why .env fails in cloud

### Project 11: Two-Routine Gate
**Concepts: A3 (API trigger), A4 (gate), A6 (checklist)**
- Routine A drafts, human reviews, Routine B executes
- Demonstrates the human gate pattern

### Project 12: Dreaming Loop
**Concepts: Concept 12 (spine), improvement loop**
- Weekly loop that reads logs and proposes rules
- Demonstrates the improvement loop

## The Four Heartbeats

| Project | Heartbeat | Description |
|---------|-----------|-------------|
| 6 | Event-driven | Reacts to PR events |
| 9 | Scheduled | Runs on a clock |
| 10 | (Drill) | Learn secrets placement |
| 11 | API-triggered | Fires when human calls |
| 12 | Weekly schedule | Improves other loops |

## The Six Parts

Each complete project (9, 12) includes:

1. **Heartbeat** - When the loop starts
2. **Worktree** - Isolation for parallel work
3. **Skill** - Project knowledge written down
4. **Maker-Checker** - Separate agent grades the work
5. **Connector** - Action in real tools (GitHub, Slack)
6. **Spine** - Memory between runs (progress.md)

## Getting Started

1. Clone this repo
2. Pick a project folder
3. Follow the README in that project
4. Push to your own GitHub
5. Watch the loop run!

## Requirements

- Node.js 18+
- GitHub account
- Anthropic API key (for Claude Code)
- OpenCode (for OpenCode approach)

## Resources

- [Loop Engineering Crash Course](https://agentfactory.panaversity.org/docs/loop-engineering-crash-course)
- [Claude Code Docs](https://code.claude.com/docs)
- [OpenCode Docs](https://opencode.ai/docs)

## License

ISC