require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const vendedorRoutes = require('./routes/vendedorRoutes');
const sequelize = require('./config/db');


const app = express();
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(vendedorRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});
