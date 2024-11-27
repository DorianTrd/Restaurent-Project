const { Sequelize } = require('sequelize');

// Créer une instance Sequelize avec les bons paramètres de connexion à MySQL
const sequelize = new Sequelize('restaurent_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

// Exporter sequelize
module.exports = sequelize ;
