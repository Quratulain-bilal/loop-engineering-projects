# Project 7 — Break it on purpose

**Observability · Concept 13 (cost) · Concept 14** · Difficulty: medium

## Masla kya tha?

Loop raat ko 3 baje fail hota hai. Aap subah uthte hain — kuch nahi hua, koi
message nahi, koi error nahi. **Chup-chaap mar gaya.**

Ab aap ko pata karna hai kya hua, magar run replay nahi kar sakte. Bas wohi hai
jo loop ne peechhe chhora.

## Hal

Teen kaam: cost maapo, jaan-boojh kar todo, phir **sirf nishaanon se** diagnose karo.

## Files

| File | Kaam |
|---|---|
| `scan.js` | Project 3 ka spine + tokens + failure note |
| `beat.ps1` | Ek beat, jaise scheduler chalata — stdout/stderr dono log mein |
| `cost.ps1` | `run.log` se tokens parh kar monthly cost |
| `run.log` | **Har beat ki ek line** — pass ho ya fail |
| `progress.md` | Spine + "needs a human" note |
| `src/*.js` | TODO comments |

## Chalane ka tareeqa

```powershell
node scan.js                  # healthy beat
node scan.js --sabotage       # toota beat
node scan.js --dry            # likhe na

.\beat.ps1                    # jaise scheduler chalata
.\beat.ps1 -Sabotage

.\cost.ps1                    # monthly cost
```

## Nateeja: cost (jo waqai maapa)

```
=== measured from 2 beat(s) in run.log ===
  avg tokens in : ~1676
  avg tokens out: ~64
  cost per beat : $0.005988   (at $3/M in, $15/M out)

=== monthly cost by cadence ===
  once a weekday (this loop)       20 beats  =  $0.1198
  hourly, 24/7                    720 beats  =  $4.3114
  every 5 min, 24/7              8640 beats  =  $51.7363
```

**Bilkul same kaam. 432 guna cost.** Sirf cadence ka farq.

## Nateeja: sabotage

```
beat 3 FAILED: ENOENT: no such file or directory,
  scandir '...\project7\src-does-not-exist'
  -> wrote a "needs a human" note to progress.md
exit code = 1
```

## Asal seekh

**1. Har beat ek line likhta hai — pass ho ya fail.** Yeh sabse ahem cheez hai.
Ek chup-chaap failure sabse buri qism hai, kyunke aap ko lagta hai sab theek hai.

**2. Missing directory throw karta hai, khali list nahi deta.** `scan.js` mein
`listJsFiles()` par `existsSync` guard **jaan-boojh kar nahi** hai. Guard hota to
scan khali list deta, aur log kehta "0 new, 0 resolved" — bilkul ek saaf run jaisa.
Aap kabhi na jante ke src folder ghayab hai.

**Silent success sabse khatarnak failure hai.**

**3. Failure "needs a human" note likhta hai** — error code, kaunsa path, kitne
tokens jal gaye, aur ke kuch record nahi hua.

**4. Cadence hi cost hai.** $0.12 vs $51.74 — same kaam.

## Diagnose karne ka tareeqa (jab aap ko run na dikhe)

```powershell
Get-Content run.log -Tail 5              # kya fail hua, kab
Get-Content progress.md -Tail 12         # "needs a human" note
```

Bas. Run replay nahi. Transcript nahi. Sirf yeh do files.

## Project 3 se kya barha

| | Project 3 | Project 7 |
|---|---|---|
| Spine | ✅ | ✅ |
| Run log | ❌ | ✅ har beat, pass ya fail |
| Token count | ❌ | ✅ har beat |
| Failure note | ❌ | ✅ "needs a human" |
| Exit code | 0 hamesha | 1 on failure — caller gate kar sakta |

Project 3 ka scheduled run **chup-chaap miss ho gaya tha** aur mujhe pata nahi
chala. Project 7 mein wahi cheez ek log line chhor jati.

## Token count ke bare mein ek honest baat

`tokens()` function `length / 4` karta hai — English ka aam estimate. Yeh **asli
tokenizer nahi** hai. Maqsad order-of-magnitude hai, na ke exact billing.

Asli billing ke liye API ka `usage` field dekhna chahiye. Magar Concept 13 ka
sabaq isi estimate se saaf ho jata hai: cadence hi asli lever hai.
