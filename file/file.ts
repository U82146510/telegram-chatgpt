import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {bot} from '../telegram_bot/telegram.ts';


export const storedFileContent: { [userId: number]: string } = {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function get_file_link(bot,fileId:string) {
    const file = await bot.api.getFile(fileId);
    return `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
};


async function downloadFile(file_link:string, save_path:string) {
    const writer = fs.createWriteStream(save_path);

    const response = await axios({
        url: file_link,
        method: "GET",
        responseType: "stream",
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on("finish", () => {
            resolve(save_path);
        });
        writer.on("error", reject);
    });
};

export const file = async(ctx)=>{
    const userId = ctx.from?.id;
    let incoming_file;
    if(ctx.message.document){
        incoming_file = ctx.message.document.file_id;
    }else{
        return;
    };

    if(incoming_file){
        const file_url = await get_file_link(bot,incoming_file);
        const save_path = path.join(__dirname, "downloads", path.basename(file_url));
        if(!fs.existsSync(path.dirname(save_path))){
            fs.mkdirSync(path.dirname(save_path), { recursive: true });
        }
        await downloadFile(file_url, save_path);
        const fileContent = fs.readFileSync(save_path, "utf-8");
        storedFileContent[userId]=fileContent;
        ctx.reply('File was uploaded,you can ask now questions');
    }

}

