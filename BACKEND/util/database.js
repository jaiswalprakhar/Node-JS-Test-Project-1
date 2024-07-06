const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs-test-project-1', 'root', 'Anmol$98', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;