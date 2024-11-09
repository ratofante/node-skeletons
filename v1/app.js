require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const app = express();

async function startServer() {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Sync database
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully.");

    app.listen(process.env.APP_PORT, () => {
      console.log(`Example app listening on port ${process.env.APP_PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

startServer();
