const {Sequelize} = require('sequelize');
require('dotenv').config();

// Database connection using singleton pattern
class Database {
  constructor() {
    if (!this.instance) {
      this.sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST,
          dialect: process.env.DB_DIALECT
        }
      );
      this.instance = this;
    }
    return this.instance;
  }

  //Verify connection
    async authenticate() {
        try {
        await this.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        } catch (error) {
        console.error('Unable to connect to the database:', error);
        }
    }
}

module.exports = new Database().sequelize;