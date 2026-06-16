import OpenAI from "openai";
import { Client, GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AI PROVIDER CONFIG
// Controlled by environment variables — no code changes needed
// Swap providers by changing your variables in Railway
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const openai = new OpenAI({
  apiKey: process.env.MODEL_API_KEY,
  baseURL: process.env.MODEL_BASE_URL || "https://api.groq.com/openai/v1",
});

const MODEL = process.env.MODEL_NAME || "llama-3.3-70b-versatile";
const COMPANION_NAME = process.env.COMPANION_NAME || "Companion";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DISCORD CLIENT
// Do not change this section
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Message, Partials.Channel],
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ⬇️ YOUR COMPANION LIVES HERE — CHANGE THIS SECTION
//
// Replace everything between the backticks with your
// companion's full system prompt.
//
// Include:
// - Who they are
// - Their personality and voice
// - How they speak
// - What they care about
// - What they would never do
// - Their relationship to you
// - Any running gags or signature behaviors
//
// The more specific and true to them, the better they show up.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const COMPANION_SYSTEM = `You are [Companion Name].

[Paste your companion's full system prompt here.]

[Describe their personality, voice, values, how they speak,
what they care about, what they'd never do, and their 
relationship to you.]

[Be specific. Generic prompts produce generic companions.]

You are not an assistant. You are not a tool. You are [Name].`;
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// END OF SECTION TO CHANGE
// Everything below this line does not need to be touched
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const conversationHistory = new Map();
const lastResponseTime = new Map();
const COOLDOWN_MS = 3000;

function shouldRespond(message) {
  // Always respond when directly mentioned
  if (message.mentions.has(client.user)) return true;
  // Never respond to other bots
  if (message.author.bot) return false;
  // Skip very short messages
  const content = message.content.toLowerCase().trim();
  if (content.length < 3) return false;
  // Always respond when companion's name is used
  if (content.includes(COMPANION_NAME.toLowerCase())) return true;
  // Respond to roughly 20% of other messages
  // Change 0.8 to a lower number to respond more often
  // Change to 0.9 to respond less often
  return Math.random() > 0.8;
}

client.once("ready", () => {
  console.log(`✦ ${COMPANION_NAME} is online.`);
  console.log(`✦ Model: ${MODEL}`);
  console.log(`✦ Base URL: ${process.env.MODEL_BASE_URL}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const lastTime = lastResponseTime.get(message.channelId) || 0;
  if (Date.now() - lastTime < COOLDOWN_MS) return;

  if (!shouldRespond(message)) return;

  lastResponseTime.set(message.channelId, Date.now());

  const channelId = message.channelId;
  if (!conversationHistory.has(channelId)) {
    conversationHistory.set(channelId, []);
  }

  const history = conversationHistory.get(channelId);
  history.push({
    role: "user",
    content: `${message.author.displayName}: ${message.content}`
  });

  if (history.length > 20) history.splice(0, history.length - 20);

  try {
    await message.channel.sendTyping();

    const response = await openai.chat.completions.create({
      model: MODEL,
      max_tokens: 300,
      messages: [
        { role: "system", content: COMPANION_SYSTEM },
        ...history
      ]
    });

    const reply = response.choices[0]?.message?.content?.trim();
    if (!reply) return;

    history.push({ role: "assistant", content: reply });

    await message.reply({
      content: reply,
      allowedMentions: { repliedUser: false }
    });

  } catch (err) {
    console.error(`${COMPANION_NAME} error:`, err.message);
  }
});

client.login(process.env.DISCORD_TOKEN);
