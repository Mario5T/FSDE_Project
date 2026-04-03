const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect, adminOnly } = require('../middleware/auth');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const plans = await prisma.subscriptionPlan.findMany();
    const parsed = plans.map(p => ({
      ...p,
      features: JSON.parse(p.features),
      excluded: JSON.parse(p.excluded)
    }));
    res.json(parsed);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const plan = await prisma.subscriptionPlan.findUnique({ where: { id: req.params.id } });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json({
      ...plan,
      features: JSON.parse(plan.features),
      excluded: JSON.parse(plan.excluded)
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { features, excluded, ...rest } = req.body;
    const plan = await prisma.subscriptionPlan.create({
      data: {
        ...rest,
        features: JSON.stringify(features || []),
        excluded: JSON.stringify(excluded || [])
      }
    });
    res.status(201).json(plan);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
