const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect, adminOnly } = require('../middleware/auth');

const prisma = new PrismaClient();

router.put('/preferences', protect, async (req, res) => {
  try {
    const { tastes, allergies, boxSize } = req.body;
    const prefs = await prisma.preferences.upsert({
      where: { userId: req.user.id },
      update: {
        tastes: JSON.stringify(tastes || []),
        allergies: JSON.stringify(allergies || []),
        boxSize: boxSize || 'Medium'
      },
      create: {
        userId: req.user.id,
        tastes: JSON.stringify(tastes || []),
        allergies: JSON.stringify(allergies || []),
        boxSize: boxSize || 'Medium'
      }
    });
    res.json({ ...prefs, tastes: JSON.parse(prefs.tastes), allergies: JSON.parse(prefs.allergies) });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/subscription', protect, async (req, res) => {
  try {
    const { active, plan } = req.body;
    const sub = await prisma.subscription.upsert({
      where: { userId: req.user.id },
      update: {
        active,
        plan,
        startDate: active ? new Date() : undefined,
        nextDeliveryDate: active ? (() => {
          const d = new Date();
          d.setMonth(d.getMonth() + 1);
          return d;
        })() : undefined
      },
      create: {
        userId: req.user.id,
        active,
        plan,
        startDate: active ? new Date() : null,
        nextDeliveryDate: active ? (() => {
          const d = new Date();
          d.setMonth(d.getMonth() + 1);
          return d;
        })() : null
      }
    });
    res.json(sub);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
