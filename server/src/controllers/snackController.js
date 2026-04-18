const snackService = require('../services/snackService');

const getSnacks = async (req, res) => {
  try {
    const snacks = await snackService.listSnacks(req.query.category);
    res.json(snacks);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

const getSnackById = async (req, res) => {
  try {
    const result = await snackService.getSnackById(req.params.id);
    if (result.error) {
      return res.status(result.error.status).json({ message: result.error.message });
    }

    res.json(result.snack);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

const createSnack = async (req, res) => {
  try {
    const snack = await snackService.createSnack(req.body);
    res.status(201).json(snack);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateSnack = async (req, res) => {
  try {
    const result = await snackService.updateSnack(req.params.id, req.body);
    if (result.error) {
      return res.status(result.error.status).json({ message: result.error.message });
    }

    res.json(result.snack);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteSnack = async (req, res) => {
  try {
    const result = await snackService.deleteSnack(req.params.id);
    if (result.error) {
      return res.status(result.error.status).json({ message: result.error.message });
    }

    res.json({ message: 'Snack deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSnacks,
  getSnackById,
  createSnack,
  updateSnack,
  deleteSnack
};
