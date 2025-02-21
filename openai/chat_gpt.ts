import WebSocket from "ws";
import dotenv from 'dotenv';
import {telegram_send_fun}  from '../telegram_bot/telegram.ts'
dotenv.config()

const CHAT_GPT_API = process.env.CHAT_GPT_API;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if(!CHAT_GPT_API){
    throw new Error('API link is missing');
}

if(!OPENAI_API_KEY){
    throw new Error('Open API key is missing');
}

const url = CHAT_GPT_API;

export const ws = new WebSocket(url, {
  headers: {
    "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
    "OpenAI-Beta": "realtime=v1",
  },
});


ws.on("open", function open() {
  console.log("Connected to gpt-4o-mini.");
});


ws.on("message", function incoming(message) {
  try {
    const response = JSON.parse(message.toString());
    if(response.text){
       telegram_send_fun(response.text)
    }
  } catch (error) {
    console.error("Error in message event handler from chatgpt ",error);
  } 
});

export function sendMessageToGPT(msg:string){
    try {
        const event = {
            type: "response.create",
            response: {
                modalities: ["text"],
                instructions: `${msg}`,
            }
          };  
        if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(event));
        } else {
            console.error("websocket not ready yet");
        }
    } catch (error) {
        console.error("Error in sendMessageToGPT function",error)
    }
}