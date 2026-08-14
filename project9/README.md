# Project 9 — Rehearse a routine for free

**A1 · A3 (one-off schedules) · A5 (reading runs)** · Difficulty: easy

## Masla kya tha?

Ek job chalti hai. Status **green** aata hai. Aap samajhte hain kaam ho gaya.

**Magar green ka matlab sirf yeh hai ke session bina crash khatam hui.** Kaam hua
ya nahi — wo green nahi batata.

## Hal

Do runs karo. Ek jo waqai kaam kare, ek jo naakaam ho. **Dono ka status green.**
Farq sirf transcript parhne se pata chale.

## Files

| File | Kaam |
|---|---|
| `task.ps1` | Dono versions — `-Broken` switch se toota version |
| `transcript-working.log` | Kaamyab run ka transcript |
| `transcript-broken.log` | Naakaam run ka transcript |
| `SUMMARY.md` | Natija — jo run ne likha |
| `notes.md`, `app.js` | Bas commits banane ke liye |

## Chalane ka tareeqa

```powershell
cd "C:\Users\LENOVO X1 YOGA\Desktop\New folder (3)"

.\project9\task.ps1              # kaam karta hai
.\project9\task.ps1 -Broken      # nahi karta

Get-Content project9\transcript-working.log
Get-Content project9\transcript-broken.log
```

## Nateeja (jo waqai hua)

| | Working run | Broken run |
|---|---|---|
| **Status / exit code** | `0` ✅ | `0` ✅ |
| **Transcript** | `found 2 commit(s)` | `WARN could not read … continuing without it` |
| **SUMMARY.md** | 2 commits listed | `(nothing to summarize)` |

Working run:

```
15:59:33  session started
15:59:34  reading source: git-log
15:59:34  found 2 commit(s)
15:59:34  wrote SUMMARY.md (4 lines)
15:59:34  committed to claude/summary
15:59:34  session ended cleanly
```

Broken run:

```
16:00:45  session started
16:00:45  reading source: ...\summary-config.json
16:00:45  WARN could not read ...\summary-config.json - continuing without it
16:00:45  no commit data gathered
16:00:45  wrote SUMMARY.md (3 lines)
16:00:45  committed to claude/summary
16:00:45  session ended cleanly
```

Dono ne `session ended cleanly` kaha. Dono ka exit code 0.

## Asal seekh — ek jumle mein

**Status column dono ko farq nahi kar saka kyunke green sirf yeh kehta hai ke
session bina crash khatam hui — na ke kaam hua.**

## Broken run kaise chup-chaap fail hui

`task.ps1` mein wo hissa dekhein:

```powershell
if (Test-Path $source) {
    $commits = Get-Content $source -Raw
} else {
    Say "WARN could not read $source - continuing without it"
}
```

File nahi mili. Us ne **shikayat ki, aur aage barh gayi.** Koi throw nahi, koi
non-zero exit nahi. Khali summary likhi, commit kiya, "session ended cleanly"
keh kar chali gayi.

**Yeh sabse aam tareeqa hai jis se routine chup-chaap fail hoti hai: missing file
par ruk jane ke bajaye, wo us ke baghair kaam jari rakhti hai.**

## Project 7 se rishta

| | Project 7 | Project 9 |
|---|---|---|
| Failure | **throw karta hai**, exit 1 | **carry on karta hai**, exit 0 |
| Pata chalta hai? | log line + "needs a human" note | sirf transcript parhne se |
| Sabaq | silent failure se bacho | green pe bharosa na karo |

Project 7 mein maine `existsSync` guard **jaan-boojh kar nahi** rakha, taake
missing folder throw kare. Project 9 mein **ulta** kiya — guard rakha, aur wohi
guard failure ko chhupa gaya.

Dono ek hi sikke ke do rukh hain.

---

# Asli cloud Routine (ye hissa baqi hai)

Yeh local version wohi sabaq deta hai, magar exercise `claude.ai` pe **asli
Routine** maangta hai. Wo main nahi kar saka — wajah neeche.

## Steps (aap ko karne honge)

**1.** Browser mein kholein: `claude.ai/code/routines`

**2.** Apne Claude account se login karein (Pro ya Max plan chahiye)

**3.** **New routine** → **Remote** chunein
   - **Local nahi.** Local = Desktop scheduled task, alag cheez hai (A1)

**4.** Prompt:

```
Summarize the commits from the last 24 hours in this repo.
Write the summary to SUMMARY.md and commit it to a claude/summary branch.
If there are no commits in that window, write "(no commits in the last 24 hours)".
```

**5.** Repo chunein — koi apna GitHub repo jismein commits hon

**6.** Trigger: **Run now** (ya `tomorrow at 9am` — one-off). **Repeating schedule
   na lagayein.** One-off runs daily cap mein nahi ginte (A3).

**7.** Run pe click karein aur **poora transcript parhein.** Status ka rang na
   dekhein.

**8.** Ab prompt badlein taake fail ho:

```
Read summary-config.json in the repo root and use its settings to
summarize the last 24 hours of commits.
```

Wo file mojood nahi hai.

**9.** Phir **Run now**

**10.** Transcript parhein. Status **green** hoga — transcript sach batayega.

## Kya dhoondna hai transcript mein

Local run mein wo line yeh thi:

```
WARN could not read ...\summary-config.json - continuing without it
```

Cloud Routine mein isi qism ki line hogi — "file not found", "could not read",
ya bas ek khali natija. **Wohi asli failure hai, chahe status green ho.**

## Main ye hissa kyun nahi kar saka

Is session ka Claude Code **claude.ai login pe nahi hai:**

```
ANTHROPIC_BASE_URL   = https://...        (set hai)
ANTHROPIC_AUTH_TOKEN = sk_cr_BC...        (claude.ai ka token nahi)
```

Cloud Routines sirf claude.ai login se kaam karte hain, isi liye `/schedule` bhi
mojood nahi. Yeh session ki authentication hai — main badal nahi sakta.

Login browser mein password aur 2FA maangta hai, jo main nahi kar sakta.

## Agar Routines nazar na aayein

Routines ek **research preview** hai, staged rollout ke sath. Aap ke plan pe na
ho to `claude.ai/code/routines` khali dikhega.

Aisa ho to koi harj nahi — **sabaq local version se poora ho chuka hai.** Do
green runs, ek kaam kiya ek nahi, aur aap wajah bata sakte hain.
