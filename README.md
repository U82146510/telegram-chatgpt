Telegram Bot with GPT-4o-mini and Prompt Logging

This is a Node.js Telegram bot that integrates with OpenAI's GPT-4o-mini and logs user prompts for later analysis.

📌 Features

🤖 AI-Powered Responses using OpenAI's GPT-4o-mini.

📜 User Prompt Logging for future analysis.

🛠️ MongoDB Integration for storing prompts.

✅ Easy Deployment with .env configuration.

🚀 Setup and Installation

1️⃣ Prerequisites

Ensure you have the following installed:

Node.js (v18+ recommended)

MongoDB (Local or Atlas instance)

Telegram Bot Token (via @BotFather)

OpenAI API Key

2️⃣ Clone the Repository
git clone https://github.com/your-repo/telegram-gpt4o-bot.git
cd telegram-gpt4o-bot
3️⃣ Install Dependencies
 npm install
4️⃣ Configure Environment Variables

Create a .env file in the root directory:

5️⃣ Start the Bot
npm start

📖 Usage

Basic Commands

/start → Start the bot.

/help → Show available commands.

Your Message → The bot responds using GPT-4o-mini.
Example Conversation
User: What is the capital of France?
Bot: The capital of France is Paris 🇫🇷.
