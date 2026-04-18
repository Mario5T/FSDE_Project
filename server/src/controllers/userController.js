const userService = require('../services/userService');

const updatePreferences = async (req, res) => {
  try {
    const preferences = await userService.updatePreferences(req.user.id, req.body);
    res.json(preferences);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const subscription = await userService.updateSubscription(req.user.id, req.body);
    res.json(subscription);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  updatePreferences,
  updateSubscription,
  getUsers
};
