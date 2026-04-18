const prisma = require('../lib/prisma');

const findByUserId = (userId) =>
  prisma.order.findMany({
    where: { userId },
    include: {
      plan: true,
      items: { include: { snack: true } },
      delivery: true
    },
    orderBy: { orderDate: 'desc' }
  });

const createOrder = ({ userId, planId, totalAmount, deliveryDate, items, deliveryAddress }) =>
  prisma.order.create({
    data: {
      userId,
      planId,
      totalAmount,
      deliveryDate,
      items: {
        create: items.map((item) => ({
          snackId: item.snackId,
          quantity: item.quantity,
          unitPrice: item.unitPrice
        }))
      },
      delivery: deliveryAddress
        ? {
            create: {
              address: deliveryAddress,
              status: 'processing'
            }
          }
        : undefined
    },
    include: {
      plan: true,
      items: { include: { snack: true } },
      delivery: true
    }
  });

module.exports = {
  findByUserId,
  createOrder
};
