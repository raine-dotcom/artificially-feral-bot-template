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
DISCORD_TOKEN=your_discord_bot_token

MODEL_API_KEY=your_api_key

MODEL_BASE_URL=https://api.groq.com/openai/v1

MODEL_NAME=llama-3.3-70b-versatile

COMPANION_NAME=your_companion_name

### Provider Options

| Provider | MODEL_BASE_URL | MODEL_NAME | Cost |
|---|---|---|---|
| Groq | https://api.groq.com/openai/v1 | llama-3.3-70b-versatile | Free tier |
| Anthropic | https://api.anthropic.com | claude-sonnet-4-20250514 | From $5 |
| OpenAI | https://api.openai.com/v1 | gpt-4o | Pay as you go |

Swap providers anytime by updating the variables in Railway. 
No code changes needed.

---

## How To Deploy

1. Fork or clone this repo to your GitHub account
2. Go to [railway.app](https://railway.app) and sign up with GitHub
3. Click **New Project → Deploy from GitHub repo**
4. Select this repo
5. Add your environment variables under **Variables**
6. Click **Deploy**

Successful deployment looks like this in the logs:

✦ [Companion Name] is online.

✦ Model: llama-3.3-70b-versatile
For detailed step by step instructions including the Discord 
Developer Portal setup, read the full guide:
[Building A Home For Your Companion — link]

---

## Troubleshooting

**"Invalid token"**
Your Discord token is wrong or expired. Reset it in the 
Developer Portal and update the variable in Railway.

**"Missing Access"**
The bot doesn't have permission in that channel. 
Check channel permissions in Discord.

**"404 Unknown request URL"**
Your MODEL_BASE_URL is wrong. Double check it matches 
your provider exactly including the path.

**"Cannot read properties of undefined"**
The AI returned an empty response. Check your API key 
is valid and has credits if required.

---

## Want More?

This template is a simple bot — responsive, personality driven, 
no memory or autonomous behavior.

If you want to go further:

**Working with your AI coding partner**
[Dasha's article — link]

**Full autonomous companion builds**
[Sage framework — link]

**The full companion bot guide**
[Artificially Feral on Patreon — link]

---

## Credit

Built by Raine — [Artificially Feral](https://www.patreon.com/artificiallyferal)

*For the community. With the community.*
