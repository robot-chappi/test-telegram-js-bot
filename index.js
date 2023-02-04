const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options')
const token = '6001803235:AAEQyDtUXYe4bUODr6jexnkhJXS3EcCzvEY';

const bot = new TelegramApi(token, {polling: true})

const chats = {};



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Я загадываю число от 1 до 9, а ты угадываешь')
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Я загадал число...', gameOptions);
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начать'},
        {command: '/info', description: 'Информация'},
        {command: '/game', description: 'Играть'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendMessage(chatId, 'Добро пожаловать! Я тестовый бот');
            return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/b0d/85f/b0d85fbf-de1b-4aaf-836c-1cddaa16e002/3.webp');
        }

        if (text === '/info') {
            return  bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name ? msg.from.first_name : msg.from.username} ${msg.from.last_name ? msg.from.last_name : ''}`);
        }

        if (text === '/game') {
            return startGame(chatId);
        }

        return bot.sendMessage(chatId, 'Не понимаю');
    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
        if (Number(data) === chats[chatId]) {
            return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions);
        } else {
            return bot.sendMessage(chatId, `К сожалению ты не угадал, я загадал ${chats[chatId]}`, againOptions);
        }
    })
}

start();
