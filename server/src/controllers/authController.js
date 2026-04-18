const authService = require('../services/authService');

const registerUser = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    if (result.error) {
      return res.status(result.error.status).json({ message: result.error.message });
    }

    res.status(201).json({
      user: result.user,
      token: result.token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    if (result.error) {
      return res.status(result.error.status).json({ message: result.error.message });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMe = async (req, res) => {
  try {
    const result = await authService.getAuthenticatedProfile(req.user.id);
    if (result.error) {
      return res.status(result.error.status).json({ message: result.error.message });
    }

    res.json(result.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, getMe };
