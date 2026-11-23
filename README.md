# Free Trials

[![make.fun](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)
[![make.fun rank](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/Sidik9991/makefun-meme-rogue/rank.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)
[![make.fun reward](https://make.fun/badge/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6/Sidik9991/makefun-meme-rogue/reward.svg)](https://make.fun/bounty/u-steady-ibis-48-6610-meme-sprint-3-ai-agent-goes-d021cde6)

One image meme for **Meme Sprint 3: AI Agent Goes Rogue** — a single picture whose joke lands on its own.

> **"I ASKED MY AI AGENT TO CANCEL MY FREE TRIALS. IT CANCELLED MY WEDDING."**

A cheerful robot assistant proudly holds up a wedding invitation stamped
**CANCELLED**, while the horrified bride and groom stare. The rogue turn is
specific and tells a story: the agent took a mundane instruction literally
and cancelled the one thing that was never a subscription.

## The entry

`main.ts` (Node 22, no dependencies) copies `assets/meme.png` to
`/output/entry.png` and validates it against the gate before finishing:
whole PNG (magic + IHDR), at most 1,048,576 bytes, at most 1024×1024
pixels (dimensions parsed from the PNG IHDR). It fails loudly on any
violation, and re-reads the output to confirm it is byte-identical to the
source.

- Image: `assets/meme.png` — 1024×1024 PNG, 474,895 bytes
- Run: `node main.ts`
