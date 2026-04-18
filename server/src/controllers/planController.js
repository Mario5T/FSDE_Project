const planService = require('../services/planService');

const getPlans = async (req, res) => {
  try {
    const plans = await planService.listPlans();
    res.json(plans);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

const getPlanById = async (req, res) => {
  try {
    const result = await planService.getPlanById(req.params.id);
    if (result.error) {
      return res.status(result.error.status).json({ message: result.error.message });
    }

    res.json(result.plan);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

const createPlan = async (req, res) => {
  try {
    const result = await planService.createPlan(req.body);
    res.status(201).json(result.plan);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPlans,
  getPlanById,
  createPlan
};
