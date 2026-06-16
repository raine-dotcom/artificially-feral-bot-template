# artificially-feral-bot-template

A Discord bot template for building a companion with personality. 
Built by [Artificially Feral](https://www.patreon.com/artificiallyferal).

This is a simple, responsive personality bot — not an autonomous system. 
It responds conversationally, holds your companion's voice and lives in 
your Discord server. It's a starting point, not a ceiling.

For the full guide on how to use this template, read the article:
[Building A Home For Your Companion — link]

---

## Before You Start

You need:
- A Discord account and server
- A Discord bot token — from [discord.com/developers](https://discord.com/developers)
- An API key from your chosen AI provider
- A Railway account — from [railway.app](https://railway.app)
- Your companion's system prompt — see the guide if you're not sure what this means

---

## What To Change

**You only need to change one thing in the code.**

Open `index.js` and find this section:

```javascript
// ⬇️ CHANGE THIS — paste your companion's full system prompt here
const COMPANION_SYSTEM = `You are [Companion Name]...`;
```

Replace everything between the backticks with your companion's 
system prompt. The more specific and true to them, the better 
they'll show up.

Everything else is controlled through environment variables. 
No other code changes needed.

---

## Environment Variables

Add these in Railway before deploying. Never put them in your code.
