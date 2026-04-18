const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  updatePreferences,
  updateSubscription,
  getUsers
} = require('../controllers/userController');

router.put('/preferences', protect, updatePreferences);
router.put('/subscription', protect, updateSubscription);
router.get('/', protect, adminOnly, getUsers);

module.exports = router;
