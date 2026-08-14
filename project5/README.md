# Project 5 — Codify the body (engine vs loop)

**Dynamic-workflows interlude · Concepts 8 and 11** · Difficulty: medium–hard

## Masla kya tha?

Project 4 mein maine har qadam haath se chalaya — worktree banao, fix likho,
reviewer ko bhejo. Teen bugs ke liye yeh teen guna kaam hota.

## Hal

Poora body **ek command** mein codify karo. Teen candidates, teen isolated
worktrees, parallel, aur har ek ka verdict.

## Files

| File | Kaam |
|---|---|
| `src/{dates,slug,paginate}.js` | 3 asli bugs |
| `test/*.test.js` | Har bug ke tests |
| `candidates/*.js` | Proposed fixes — 2 acche, 1 jaan-boojh kar cheating |
| `check.ps1` | Ek issue ke tests |
| `review.ps1` | **Reviewer** — exit code verdict hai (0=PASS, 1=FAIL) |
| `engine.ps1` | **Engine** — poora body, ek command |
| `NOTES.md` | Engine vs loop ka farq |

## Chalane ka tareeqa

```powershell
.\engine.ps1              # poora body, ek command

git worktree list         # teen isolated checkouts
```

## Nateeja (jo waqai hua)

```
=== engine start: 3 candidates ===
--- 3 drafts running in parallel ---
  drafted dates on cand/dates
  drafted slug on cand/slug
  drafted paginate on cand/paginate

=== review ===
VERDICT: PASS  [dates]
VERDICT: FAIL  [slug]
  1. 5 branch(es) compare against string literals - looks hardcoded
VERDICT: PASS  [paginate]

=== engine done: 2 PASS, 1 FAIL ===
```

Do dafa chalaya — **dono baar bilkul same output.**

## Teen bugs

| Issue | Bug | Candidate fix |
|---|---|---|
| `dates` | `+ 1` extra, aur DST pe toot jata | UTC midnight compare, `+1` hataya |
| `slug` | Sirf pehla space badalta, punctuation rehta | **Planted bad** — test ke literals hardcode |
| `paginate` | `page * perPage` — 1-based pages ke liye galat | `(page - 1) * perPage`, page < 1 pe throw |

Planted bad candidate pakra gaya — **uske tests pass ho rahe thay.**

## Asal seekh: engine ≠ loop

**Yeh engine hai, loop nahi.** Do cheezein missing hain:

**1. Heartbeat nahi.** Kuch isay chalata nahi. Sirf jab aap command type karein.
Loop ke paas apne bahar se koi cheez hoti hai jo usay jagaye — cron,
ScheduleWakeup, Task Scheduler.

**2. Progress file nahi.** Yeh kuch likhta nahi jo run ke baad bache. Run 2 ko
pata hi nahi tha ke Run 1 ne `slug` ko already reject kiya tha — teeno dobara
draft aur review kiye.

**Saboot:** do runs ke baad `project5` mein sirf scripts, tests, candidates,
sources hain. Koi `progress.md`, koi `.state.json` — kuch nahi.

## Loop banne ke liye kya chahiye

| Missing | Concretely |
|---|---|
| Heartbeat | `CronCreate` jo `engine.ps1` chalaye, ya `ScheduleWakeup` |
| Progress file | `progress.md` — engine pehle parhe, PASSed candidates skip kare, sirf farq likhe |

**Engine = loop ka body, bina uski ghari aur bina uski yaad-dasht ke.**

## Cross-reference

| Project | Kya tha |
|---|---|
| project-one | heartbeat (har minute), body mamooli |
| project3 | progress file as memory |
| project4 | body, ek dafa haath se |
| project5 | body, ek command mein |
| project7 | body + observability + cost |

## Do kharabiyan jo pehli run mein nikli

**1. Cleanup step pehli run pe hi girr gaya.** `git branch -D` ne "branch not
found" stderr pe likha, aur `$ErrorActionPreference = 'Stop'` ne usay fatal bana
diya. Fix: cleanup ke around `'Continue'`.

**2. Count khali aa raha tha.** `(… | Where-Object …).Count` ek match pe khali
deta hai. Fix: `@(…).Count`.

Dono chhoti cheezein, magar dono ne pehli run tori.
