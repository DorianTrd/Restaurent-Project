const { Sequelize } = require('sequelize');

// Cr�er une instance Sequelize avec les bons param�tres de connexion � MySQL
const sequelize = new Sequelize('restaurent_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

// Exporter sequelize
module.exports = sequelize ;
