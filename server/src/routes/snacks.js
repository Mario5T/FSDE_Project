const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
  getSnacks,
  getSnackById,
  createSnack,
  updateSnack,
  deleteSnack
} = require('../controllers/snackController');

router.get('/', getSnacks);
router.get('/:id', getSnackById);
router.post('/', protect, adminOnly, createSnack);
router.put('/:id', protect, adminOnly, updateSnack);
router.delete('/:id', protect, adminOnly, deleteSnack);

module.exports = router;
