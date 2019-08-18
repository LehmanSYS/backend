const Sequelize = require('sequelize');
const databaseName = "d5j4ki5vrt09jh";
const Joi = require("joi");

console.log("Opening database connection");

const db = new Sequelize(
    databaseName,
    "tukckcoafyflzo",
    "c1a37cb14c8d21bddf4dc74fa51a351fcca8a7da9c80f29bfa81034fb5ac153c",
    {
        host: "ec2-54-221-198-156.compute-1.amazonaws.com",
        dialect: "postgres",
        dialectOptions: {
            ssl: true
        },
        define: {
            timestamps: false
        },
        logging: false
    }
);

const Users = db.define("Users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

function validateUser(user) {
    const schema = {
        name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(5)
            .max(1024)
            .required()
    };
    return Joi.validate(user, schema);
}

const Groups = db.define("Groups", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    longitude: {
        type: Sequelize.DECIMAL,
        allowNull: false
        // unique: true
    },
    latitude: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
});

Groups.belongsToMany(Users, { through: 'GroupUsers' });
Users.belongsToMany(Groups, { through: 'GroupUsers' });

module.exports = db;