const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Book = sequelize.define('book', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    bookName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            customValidator(value) {
                if(value === "") {
                  throw new Error('Book Name can not be empty');
                }
            }
        }
    },
    bookIssuingDateTime: {
        type: Sequelize.DATE,
        allowNull: false
    },
    bookIssuingDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    bookIssuingTime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bookReturningDateTime: {
        type: Sequelize.DATE,
        allowNull: false
    },
    bookReturningDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    bookReturningTime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bookReturnStatus: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bookReturnedDateTime: {
        type: Sequelize.DATE
    },
    bookReturnedDate: {
        type: Sequelize.DATEONLY
    },
    bookReturnedTime: {
        type: Sequelize.STRING
    },
    fine: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
});

module.exports = Book;