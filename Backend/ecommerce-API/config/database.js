const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env



// Database connection using singleton pattern
class Database {
  constructor() {
    if (!this.instance) {
      // Conexión a la base de datos usando Sequelize
      this.sequelize = new Sequelize(
        process.env.DB_NAME,       // Nombre de la base de datos
        process.env.DB_USER,       // Usuario de la base de datos
        process.env.DB_PASSWORD,   // Contraseña de la base de datos
        {
          host: process.env.DB_HOST,   // Dirección del host
          dialect: process.env.DB_DIALECT,  // Tipo de base de datos (MySQL)
          port: process.env.DB_PORT,   // Puerto de la base de datos (3306)
         
        }
      );
      this.instance = this;
    }
    return this.instance;
  }

  // Método para verificar la conexión
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
