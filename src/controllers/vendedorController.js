const Vendedor = require('../models/vendedor');
const { Op } = require('sequelize'); 

// Criar novo vendedor ou retornar existente
exports.createVendedor = async (req, res) => {
  const { nome, telefone, email, cpf, link_vendas, link_qrcode } = req.body;

  try {
    // Verificar se o vendedor já existe com base no CPF, link_vendas ou link_qrcode
    const existingVendedor = await Vendedor.findOne({
      where: {
        [Op.or]: [
          { cpf },
          { link_vendas },
          { link_qrcode }
        ]
      }
    });

    if (existingVendedor) {
      // Retornar o vendedor existente
      return res.status(200).json({ vendedor: existingVendedor });
    }

    // Criar novo vendedor
    const vendedor = await Vendedor.create({ nome, telefone, email, cpf, link_vendas, link_qrcode });
    res.status(201).json({ vendedor });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const detail = error.parent?.detail || 'Erro ao criar vendedor.';
      return res.status(400).json({ message: detail });
    }
    res.status(400).json({ message: 'Erro ao criar vendedor', error });
  }
};


// Buscar todos os vendedores
exports.getVendedores = async (req, res) => {
  try {
    const vendedores = await Vendedor.findAll();
    res.status(200).json(vendedores);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar vendedores', error });
  }
};

// Editar um vendedor
exports.updateVendedor = async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, email, cpf, link_vendas, quantidade_vendas } = req.body;

  try {
    const vendedor = await Vendedor.findByPk(id);
    if (!vendedor) {
      return res.status(404).json({ message: 'Vendedor não encontrado' });
    }

    vendedor.nome = nome || vendedor.nome;
    vendedor.telefone = telefone || vendedor.telefone;
    vendedor.email = email || vendedor.email;
    vendedor.cpf = cpf || vendedor.cpf;
    vendedor.link_vendas = link_vendas || vendedor.link_vendas;
    vendedor.quantidade_vendas = quantidade_vendas || vendedor.quantidade_vendas;

    await vendedor.save();
    res.status(200).json(vendedor);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao editar vendedor', error });
  }
};

// Buscar vendedor por CPF
exports.getVendedorByCpf = async (req, res) => {
  const { cpf } = req.params;

  try {
    const vendedor = await Vendedor.findOne({ where: { cpf } });
    if (!vendedor) {
      return res.status(404).json({ message: 'Vendedor não encontrado' });
    }
    res.status(200).json(vendedor);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar vendedor', error });
  }
};


// Deletar um vendedor
exports.deleteVendedor = async (req, res) => {
  const { id } = req.params;

  try {
    const vendedor = await Vendedor.findByPk(id);
    if (!vendedor) {
      return res.status(404).json({ message: 'Vendedor não encontrado' });
    }

    await vendedor.destroy();
    res.status(200).json({ message: 'Vendedor deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao deletar vendedor', error });
  }
};
