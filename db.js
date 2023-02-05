const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'telegram_bot_db',
    'root',
    'root',
    {
        host: '5.188.129.19',
        port: '6432',
        dialect: 'postgres'
    }
)