const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect } = require('../middleware/auth');

const prisma = new PrismaClient();

router.get('/', protect, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: { plan: true, items: { include: { snack: true } }, delivery: true },
      orderBy: { orderDate: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { planId, items, totalAmount, deliveryAddress } = req.body;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);

    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        planId,
        totalAmount,
        deliveryDate,
        items: {
          create: items.map(item => ({
            snackId: item.snackId,
            quantity: item.quantity,
            unitPrice: item.unitPrice
          }))
        },
        delivery: deliveryAddress ? {
          create: {
            address: deliveryAddress,
            status: 'processing'
          }
        } : undefined
      },
      include: { plan: true, items: { include: { snack: true } }, delivery: true }
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
