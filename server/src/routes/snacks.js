const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect, adminOnly } = require('../middleware/auth');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category, available: true } : { available: true };
    const snacks = await prisma.snack.findMany({ where });
    res.json(snacks);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const snack = await prisma.snack.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!snack) return res.status(404).json({ message: 'Snack not found' });
    res.json(snack);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const snack = await prisma.snack.create({ data: req.body });
    res.status(201).json(snack);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const snack = await prisma.snack.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(snack);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await prisma.snack.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Snack deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
