import { ws,sendMessageToGPT } from "../openai/chat_gpt.ts";
import {Bot} from 'grammy' 
import dotenv from 'dotenv';
import {file} from '../file/file.ts'
import {primary_db,logs,type IUser} from '../model/user.model.ts'
dotenv.config();

export const bot = new Bot(process.env.BOT_TOKEN as string)


bot.command("start", (ctx) => ctx.reply(" Welcome! This is CHATGTP-4-mini"));

let send_fun:{
    reply(msg:string):void
};

bot.on("message", async (ctx) => {
    
    send_fun = ctx;
    file(ctx);
    if(!ctx.message.text){
        return;
    }
    await add_logs_to_db(ctx.from?.id,ctx.message.text);
    sendMessageToGPT(ctx.message.text)

});


async function add_logs_to_db(telegram_id:number,message:string){
    try {
        const user_logs = await logs.create({log:message})
        let user;
        user = await primary_db.findOne({name:telegram_id});
        if(!user){
            console.log("asa user nu exist")
            user = await primary_db.create({name:telegram_id});
            
        }
        user.logs.push(user_logs._id);
        user.save();
        console.log(user);

    } catch (error) {
        console.log('Error during writing to db',error);
    }
}


export function telegram_send_fun(message:string){
    if(send_fun){
        send_fun.reply(message)
    }
}
