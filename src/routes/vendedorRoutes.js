const express = require('express');
const vendedorController = require('../controllers/vendedorController');
const router = express.Router();

router.post('/vendedores', vendedorController.createVendedor);
router.get('/vendedores', vendedorController.getVendedores);
router.get('/vendedores/cpf/:cpf', vendedorController.getVendedorByCpf); // Nova rota
router.put('/vendedores/:id', vendedorController.updateVendedor);
router.delete('/vendedores/:id', vendedorController.deleteVendedor);

module.exports = router;
