# Project 2 — Make the tests pass, then stop

**Concept 5: conditional loop · Concept 11: maker-checker** · Difficulty: easy–medium

## Masla kya tha?

Code mein bugs hain. Aap fix karte hain, phir socha "theek lag raha hai" aur
aage barh gaye. Magar **aap ki raay saboot nahi hai.**

## Hal

Loop chalao jo tab tak koshish karta rahe jab tak tests pass na ho jayein.
Aur faisla **command** kare, aap nahi. Cap 6 tries.

## Files

| File | Kaam |
|---|---|
| `src/kit.js` | 3 functions, har ek mein bug |
| `test/kit.test.js` | Tests jo un bugs ko pakarte hain |
| `run-tests.ps1` | **Checker** — tests chalata hai, exit code deta hai (0 = pass) |
| `fix-loop.ps1` | Loop driver — attempts count karta hai, cap lagata hai |
| `.attempts` | Counter, **file mein** — meri yaad mein nahi |

## Chalane ka tareeqa

```powershell
.\run-tests.ps1              # sirf tests

.\fix-loop.ps1 -Reset        # counter 0
.\fix-loop.ps1               # ek attempt
```

Exit codes: `0` = pass ho gaya, `1` = aage barho, `2` = cap khatam.

## Nateeja (jo waqai hua)

| Attempt | Fix | Checker |
|---|---|---|
| 0 (baseline) | kuch nahi | 0 pass / 4 fail |
| 1 | `average` — extra `- 1` hataya, empty pe throw | 2 pass / 2 fail → CONTINUE |
| 2 | `titleCase` — har word, baqi lowercase | 3 pass / 1 fail → CONTINUE |
| 3 | `unique` — Set se naya array, input untouched | 4 pass / 0 fail → **STOP** |

**Attempt 3 of 6.** 3 attempts bache the. Cap pe rukna failure hota.

## Teen bugs

| Function | Bug | Fix |
|---|---|---|
| `average` | `sum / length - 1` — extra minus one. Empty list pe `NaN` deta tha. | `- 1` hataya, empty pe throw |
| `titleCase` | Sirf pehla harf, aur baqi untouched — `"gOOd"` waisa hi raha | Space pe split, har word ka pehla harf upper, baqi lower |
| `unique` | `splice` ne caller ka array badal diya, aur index skip ho gaya | Set se naya array, input kabhi chhua nahi |

## Asal seekh

**Faisla command ka tha, mera nahi.** Main sirf code badalta tha. "Ho gaya" ka
faisla `node --test` ke exit code se aata tha. Main keh hi nahi sakta tha
"mujhe lagta hai theek hai" — mere kehne ki koi ahmiyat nahi.

**Cap file mein hai, yaad mein nahi.** `.attempts` har run pe barhti hai. Session
restart ho ya main bhool jaun, cap phir bhi lagta hai.

**Cap pe rukna = fail.** Do wajah se ruk sakta hai: tests pass (exit 0) ya
attempts khatam (exit 2). Dono mein farq hai.

## Ek honest baat

**Checker khud pehli baar toota tha.** `node --test test/` ne directory ko file
samjha, aur "FAIL" aaya jo asli test failure nahi tha — infrastructure error tha.

Agar main ye pakarta nahi, to loop 6 attempts tak code fix karta rehta jab ke
code theek tha, aur cap pe mar jata.

**Isi liye pehla kaam hamesha ye hona chahiye: confirm karo ke checker asli wajah
se fail ho raha hai, kisi typo se nahi.**
