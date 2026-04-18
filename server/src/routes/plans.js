const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const { getPlans, getPlanById, createPlan } = require('../controllers/planController');

router.get('/', getPlans);
router.get('/:id', getPlanById);
router.post('/', protect, adminOnly, createPlan);

module.exports = router;
