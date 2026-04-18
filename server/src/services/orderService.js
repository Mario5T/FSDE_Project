const orderRepository = require('../repositories/orderRepository');

const listOrders = (userId) => orderRepository.findByUserId(userId);

const createOrder = async (userId, payload) => {
  const { planId, items, totalAmount, deliveryAddress } = payload;

  if (!planId || !Array.isArray(items) || items.length === 0 || typeof totalAmount !== 'number') {
    return { error: { status: 400, message: 'Invalid order payload' } };
  }

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);

  const order = await orderRepository.createOrder({
    userId,
    planId,
    totalAmount,
    deliveryDate,
    items,
    deliveryAddress
  });

  return { order };
};

module.exports = {
  listOrders,
  createOrder
};
