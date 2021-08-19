const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL || "postgres://localhost:5432/messenger", {
  // TODO turn logging back off before pull request
  logging: true
});

module.exports = db;
