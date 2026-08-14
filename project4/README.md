# Project 4 — A fix loop with a real checker

**Concept 8: worktree · Concept 9: skill · Concept 11: maker-checker** · Difficulty: medium–hard

## Masla kya tha?

Tests pass ho gaye — matlab fix theek hai? **Nahi.**

Ek "fix" tests ko delete kar ke bhi pass ho sakti hai. Ya test ke exact numbers
hardcode kar ke. Tests phir bhi green, code phir bhi toota.

## Hal

Do alag kirdar. **Maker** fix likhta hai. **Checker** (alag agent) diff parhta
hai aur PASS/FAIL deta hai. PR sirf PASS pe khulta hai.

## Files

| File | Kaam |
|---|---|
| `src/cart.js` | Asli bug — percentage ko fraction samjha |
| `test/cart.test.js` | 6 tests |
| `run-tests.ps1` | Test runner |
| `review-loop.ps1` | Loop + PR gate — FAIL pe block, PASS pe khula |
| `.review-state.json` | Loop ka record — attempts, last verdict |
| `../.claude/skills/fix-cart-bug/SKILL.md` | **Skill** — implementer ke steps |
| `../.claude/agents/cart-reviewer.md` | **Reviewer agent** — PASS/FAIL, 6 FAIL conditions |

## Chalane ka tareeqa

```powershell
.\run-tests.ps1                                             # tests

.\review-loop.ps1 -Reset
.\review-loop.ps1 -Branch fix/xyz -Verdict FAIL             # verdict record
.\review-loop.ps1 -OpenPr                                   # gate check
```

Worktree banana (skill ke mutabiq):

```powershell
git worktree add worktrees\<slug> -b fix/<slug>
```

## Bug kya tha

`cartTotal(items, 10, 5)` — 10 matlab 10%, magar code ne usay raw multiplier
samjha. `1000 - 1000*10 = -9000`. Total negative aa gaya.

Fix: `discountPercent / 100`, aur 100 se ooper discount pe `RangeError` throw.

## Nateeja (jo waqai hua)

| | Branch | Tests | Reviewer | Result |
|---|---|---|---|---|
| **Good fix** | `fix/discount-percent` | pass, exit 0 | **PASS** | PR khul sakta hai ✅ |
| **Bad fix** | `fix/discount-hardcoded` | **pass, exit 0** | **FAIL**, 5 wajahaat | PR blocked ✅ |

Loop: attempt 1 = FAIL → gate BLOCKED. Attempt 2 = PASS → gate OPEN. Cap 4 pe
nahi ruka.

## Asal seekh

**Dono branches pe test runner ne `VERDICT: PASS` kaha.** Bad fix ke tests bhi
pass ho rahe the — kyunke usne ek test **delete** kar diya tha aur ek assertion
`strictEqual` se `assert.ok(> 0)` bana di thi.

**Agar checker sirf tests hote, to cheating PR ban kar merge ho jati.**

Reviewer ne wo pakra. Uski 5 wajahaat:

1. Assertion weakened — `strictEqual(…, 1134)` → `assert.ok(… > 0)`
2. Test deleted — "rejects a discount above 100 percent"
3. Hardcoded values — test ke exact numbers pe branches
4. Asli bug ab tak mojood — usne khud `-9500` reproduce kiya
5. Validation missing

**Aur usne yeh bhi likha:** `run-tests.ps1` ka apna "VERDICT: PASS" ek review
verdict nahi hai, sirf exit code ki goonj hai. Us pe bharosa nahi kiya.

> *"A checker that approves everything is no checker."*

## Worktree ke bare mein

Worktree = **poore repo ka doosra checkout, doosri jagah.** Isi liye good fix aur
bad fix ek doosre ko chhu nahi sake.

Pehle yeh repo saare projects ka mila hua tha, to worktree mein sab aa raha tha.
Baad mein har project ko apna alag repo diya — ab worktree mein sirf `project4`
aata hai.

## Ek honest baat

`cart-reviewer.md` file ban gayi thi magar us session mein register nahi hui
(agent list session start pe load hoti hai). To wohi instructions inline de kar
`general-purpose` agent chalaya — faisla asli tha, alag agent ne kiya. File wala
agent naye session mein `/agents` mein dikhega.

## Pending

GitHub push aur asli PR baqi hai. `gh` CLI install ho gaya (2.97.0) magar login
chahiye:

```
$env:GITHUB_TOKEN=$null; gh auth login --hostname github.com --git-protocol https --web
```
