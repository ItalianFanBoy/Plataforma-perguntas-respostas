const Sequelize = require('sequelize');


const connection = new Sequelize('guiaperguntas', 'root', 'Belluno2005',{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = connection;