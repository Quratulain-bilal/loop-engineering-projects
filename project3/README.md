# Project 3 — The morning brief with a memory

**Concept 6: unattended schedule · Concept 12: the spine** · Difficulty: medium

## Masla kya tha?

Model har run ke beech sab bhool jata hai. To agar loop har subah chale magar
kuch yaad na rakhe, to wo **wohi pehla qadam roz dobara** karta rahega. Wo loop
nahi — wo ek hi cheez ka repeat hai.

## Hal

Ek file jo memory ka kaam kare. Loop **pehle wo file parhta hai**, phir sirf
**naya** likhta hai. Isay **spine** kehte hain.

## Files

| File | Kaam |
|---|---|
| `scan.js` | Spine — `progress.md` parhta hai, TODO scan karta hai, sirf naya likhta hai |
| `progress.md` | **Memory.** Sirf output nahi — script isay wapas parhti hai |
| `src/*.js` | TODO/FIXME comments jo scan karne ke liye hain |

## Chalane ka tareeqa

```powershell
node scan.js          # ek run
node scan.js --dry    # dikhaye kya likhta, likhe na
Get-Content progress.md

# Scratch se dikhana ho:
Remove-Item progress.md; node scan.js; node scan.js
```

## Nateeja (jo waqai hua)

| Run | Repo mein kya hua | Script ne kya likha |
|---|---|---|
| 1 | kuch nahi (pehli baar) | `3 new, 0 resolved` |
| 2 | **kuch nahi badla** | `0 new, 0 resolved` — "3 already on record" |
| 3 | 1 TODO hataya, 1 naya add kiya | `1 new, 1 resolved` — sirf farq |
| 4 | kuch nahi (scheduled run) | `0 new, 1 resolved` |

**Run 2 hi asli saboot hai.** Spine na hota to teeno TODOs dobara likh deta.
Us ne kaha "3 already on record. No change since the last run." — usay yaad tha.

## Asal seekh

**`progress.md` sirf output nahi — wo memory hai.** Script pehla kaam yeh karti
hai ke apni purani likhi hui file **wapas parhti hai**, aur us mein se saare
`file.js:LINE` keys nikaal leti hai. Wo keys "mujhe yeh pata hai" ka set ban jate
hain. Phir sirf wo cheezein likhti hai jo us set mein nahi.

Ek line jo sab kuch karti hai (`scan.js:75`):

```js
const fresh = current.filter((t) => !recorded.has(t.key));
```

`recorded` file se aaya, `current` scan se. **Farq hi likha jata hai.**

## Project 1 se farq

| | Signal ki shakal |
|---|---|
| Project 1 | ek **file** — kaam chhupa hua tha, jaan-ne ka koi zariya chahiye tha |
| Project 3 | ek **file** — magar memory ke liye, na ke "khatam hua" batane ke liye |
| Project 2 | ek **number** (exit code) — command saamne chali, file ki zaroorat nahi |

Jo cheez yaad rakhni ho wo file mein jati hai. Jo foran mil jaye wo nahi.

## Do kharabiyan jo aap ko pata honi chahiye

**1. Key mein line number hai.** Agar file ke upar ek khali line daal dein, TODO
line 4 se 5 ho jayega — aur script usay "resolved" **plus** "new" dono keh degi,
jab ke kuch hua hi nahi. Isi liye heading `"Resolved or moved"` likhi hai. Asli
kaam mein key line number ke bajaye TODO ke text ka hash honi chahiye.

**2. Resolved keys memory mein reh jate hain.** `readRecordedKeys()` saare keys
uthata hai — including "Resolved" section wale. To ek dafa koi TODO resolve ho
jaye, wo hamesha "recorded" mein rehta hai aur file se ghayab bhi — matlab
**har agli run usay dobara "resolved" batati rahegi.** Run 4 mein yeh dikha:
`src/report.js:4` dobara report hua, jab ke Run 3 mein already record tha.

Fix: keys sirf "New since last run" sections se parho, "Resolved" se nahi.

## Scheduled run ka sabaq

Cron `3 18 14 8 *` lagaya tha — 18:03 pe fire hona tha. **Miss ho gaya**, kyunke
us waqt session busy tha. One-shot job dobara koshish karne ke bajaye khud delete
ho gaya. Chup-chaap.

**Yeh asli lesson hai:** in-session cron sirf tab fire hota hai jab session idle
ho. Asli unattended kaam ke liye cloud `/schedule` ya Windows Task Scheduler
chahiye — wo aap ke chat karne ka intezaar nahi karta.

(Run 4 baad mein chala jab session idle hua.)
