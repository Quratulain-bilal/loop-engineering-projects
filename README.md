# Loop Engineering Projects

A collection of all 12 projects from the Loop Engineering crash course, demonstrating all four heartbeats and the six parts of a loop.

## All Projects

### Project 1: Watch Loop
**Heartbeat: In-session**
- Watch a long task and get notified when it finishes
- Simplest loop - stops when session closes

### Project 2: Fix Loop
**Heartbeat: Conditional (run-until-done)**
- Keep fixing until tests pass, then stop
- Loop stops when command proves success

### Project 3: Morning Brief
**Heartbeat: Scheduled**
- Daily summary with memory between runs
- Demonstrates the spine (progress.md)

### Project 4: Fix Loop with Checker
**Heartbeat: Conditional + Maker-Checker**
- Implementer drafts, reviewer grades PASS/FAIL
- Only PASS opens a PR

### Project 5: Codify the Body
**Heartbeat: Dynamic Workflow**
- Turn orchestration into re-runnable unit
- Prove it's not a loop (no heartbeat, no spine)

### Project 6: PR Review Test
**Heartbeat: Event-driven**
- Automated PR review using GitHub Actions
- Plants bugs, watches review catch them
- Demonstrates event-driven heartbeat

### Project 7: Sabotage Loop
**Heartbeat: Scheduled + Observability**
- Break your own loop, diagnose from spine alone
- Measure cost, add budget guards

### Project 8: Daily Lint Loop
**Heartbeat: Scheduled**
- Complete loop with all 6 parts
- Runs every weekday at 9am
- Demonstrates: heartbeat, worktree, skill, maker-checker, connector, spine

### Project 9: Rehearse Routine
**Concepts: A1, A3 (one-off schedules), A5 (reading runs)**
- Prove a prompt with one-off runs before committing to schedule
- Learn that green status ≠ success

### Project 10: Secrets Drill
**Concepts: A4 (secrets), A2 (environment)**
- Learn where secrets live: .env vs environment variables
- Demonstrates why .env fails in cloud

### Project 11: Two-Routine Gate
**Concepts: A3 (API trigger), A4 (gate), A6 (checklist)**
- Routine A drafts, human reviews, Routine B executes
- Demonstrates the human gate pattern

### Project 13: Dreaming Loop
**Concepts: Concept 12 (spine), improvement loop**
- Weekly loop that reads logs and proposes rules
- Demonstrates the improvement loop

## The Four Heartbeats

| Heartbeat | Projects | Description |
|-----------|----------|-------------|
| In-session | 1 | Runs while you watch, stops when session closes |
| Conditional | 2, 4 | Runs until command proves success |
| Scheduled | 3, 7, 8, 13 | Runs on a clock, even with laptop closed |
| Event-driven | 6 | Reacts to something happening (PR, message) |

## The Six Parts

Each complete project includes:

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