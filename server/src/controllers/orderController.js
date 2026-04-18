const orderService = require('../services/orderService');

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.listOrders(req.user.id);
    res.json(orders);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

const createOrder = async (req, res) => {
  try {
    const result = await orderService.createOrder(req.user.id, req.body);
    if (result.error) {
      return res.status(result.error.status).json({ message: result.error.message });
    }

    res.status(201).json(result.order);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getOrders,
  createOrder
};
