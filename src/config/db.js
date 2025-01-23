require('dotenv').config();
const { Sequelize } = require('sequelize');

// Conectar usando as variáveis definidas no arquivo .env
const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`,
  {
    dialect: process.env.DB_DIALECT,  // Usando o dialect de postgres
  }
);

try {
  sequelize.authenticate();
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
} catch (error) {
  console.error('Não foi possível conectar ao banco de dados:', error);
}

module.exports = sequelize;
