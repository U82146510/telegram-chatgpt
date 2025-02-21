import {bot} from './telegram_bot/telegram.ts';
import {connect_to_mongo} from './config/config.ts';
connect_to_mongo();
bot.start()