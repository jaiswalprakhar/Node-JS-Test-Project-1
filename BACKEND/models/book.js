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
    bookIssueDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    bookReturnDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fine: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
});

module.exports = Book;