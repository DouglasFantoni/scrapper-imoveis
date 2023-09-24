import TelegramBot from 'node-telegram-bot-api';
import Vars from 'src/helpers/variables';



export default class TelegramMessager {

    public bot: TelegramBot;

    constructor () {

        this.bot = new TelegramBot(Vars.TELEGRAM_BOT_TOKEN, {polling: true})
    }

    public async sendMessage(sendMessage: string) {

        return this.bot.sendMessage(Vars.TELEGRAM_BOT_CHATID, sendMessage, {
					parse_mode: "HTML",
				});
    }


}