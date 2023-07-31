
export default class Vars {
    public static  TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    public static  TELEGRAM_BOT_CHATID = process.env.TELEGRAM_BOT_CHATID
    public static  PRIVATE_KEY = process.env.PRIVATE_KEY

    constructor() {
        const env = process.env;

        if ((
            !env.PRIVATE_KEY ||
            !env.TELEGRAM_BOT_TOKEN ||
            !env.TELEGRAM_BOT_CHATID
        ) ){
            throw new Error('Variaveis de ambiente não definidas!!!')
        }

    }
}
