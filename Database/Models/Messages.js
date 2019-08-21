const Sequelize = require("sequelize");
const db = require("../db");

const Messages = db.define("Messages", {
    message: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    sender: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    timestamp: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

module.exports = Messages;