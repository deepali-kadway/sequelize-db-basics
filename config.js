const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("task_manager", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  port: 3307,
});

// export the sequelize connection object
module.exports = sequelize;
