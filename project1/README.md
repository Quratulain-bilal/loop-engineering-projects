# Project 1 — A watch loop

**Concept 4: in-session loop** · Difficulty: easy

## Masla kya tha?

Aap ek lamba kaam chalate hain — build, test, download. 5-10 minute lagta hai.
Aap terminal ke samne baith kar ghoortay rehte hain: "ho gaya? nahi... ho gaya?"
Waqt zaya.

## Hal

Kaam background mein daal do. Ek chhota watcher har minute check karta rahe.
Jab kaam khatam ho, wo aap ko bata de. Aap tab tak kuch aur karein.

## Files

| File | Kaam |
|---|---|
| `long-task.js` | Lamba kaam — 5 steps, har step 60 second. Khatam hone pe `output/result.json` banata hai. |
| `check-task.ps1` | Checker — ek dafa dekhta hai `result.json` bani ya nahi. `DONE` ya `RUNNING`. |
| `output/progress.log` | Task khud likhta hai, live. Har line 60 second ke faasle pe. |
| `output/result.json` | **Jhanda** — sirf khatam hone pe banti hai. |

## Chalane ka tareeqa

```powershell
# 1. Kaam background mein shuru karo (detached — terminal phansta nahi)
Start-Process node -ArgumentList "long-task.js 5 60000" -WindowStyle Hidden

# 2. Loop lagao
#    /loop 1m Run check-task.ps1. RUNNING pe chup raho, DONE pe batao aur ruk jao.

# 3. Chhor dein. DONE pe loop khud batayega aur band ho jayega.
```

Jaldi test: `long-task.js 3 10000` (3 steps × 10 sec = 30 second).

## Asal seekh

**Kaam khatam hote hi ek file likh do.** Wo file jhanda hai. Checker ko kaam ke
andar ka kuch samajhne ki zaroorat nahi — bas wo ek file dhoondta rahe.

`Start-Process` zaroori hai. Seedha `node long-task.js` chalayein to terminal
phans jayega, aur poora point khatam.

## Ek kharabi jo aap ko pata honi chahiye

Checker sirf jhanda-file dhoondta hai. **Agar kaam beech mein crash kar jaye, to
file kabhi nahi banegi aur checker hamesha `RUNNING` kehta rahega** — aap ek
murda process ka intezaar karte rah jayenge.

Asli kaam mein checker ko yeh bhi dekhna chahiye ke process zinda hai
(`Get-Process -Id <pid>`), ya task ko `error.json` likhna chahiye jab wo fail ho.

## Nateeja (jo waqai hua)

Task 12:11:56 UTC pe shuru, 12:16:56 pe khatam — theek 5 minute.
Loop ne 5 baar check kiya: 4 baar RUNNING, 5vi baar DONE. Phir khud ruk gaya.

Aap ne terminal nahi ghoora — yehi shart thi.
