const { DataTypes, STRING } = require('sequelize');
const sequelize = require('../config/db');

const Vendedor = sequelize.define('Vendedor', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  link_vendas: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  quantidade_vendas: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  link_qrcode: {
    type: DataTypes.STRING,
    allowNull: false,  // Se o link do QR code for opcional
    unique: true
  }
},
 {
    tableName: 'vendedores', // Nome da tabela definido manualmente
    timestamps: true, // Inclui 'createdAt' e 'updatedAt'
  }
);

module.exports = Vendedor;
