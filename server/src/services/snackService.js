const snackRepository = require('../repositories/snackRepository');

const parseSnackId = (value) => {
  const id = Number.parseInt(value, 10);
  return Number.isNaN(id) ? null : id;
};

const listSnacks = (category) => snackRepository.findAvailable(category);

const getSnackById = async (idParam) => {
  const id = parseSnackId(idParam);
  if (id === null) {
    return { error: { status: 400, message: 'Invalid snack id' } };
  }

  const snack = await snackRepository.findById(id);
  if (!snack) {
    return { error: { status: 404, message: 'Snack not found' } };
  }

  return { snack };
};

const createSnack = (payload) => snackRepository.create(payload);

const updateSnack = async (idParam, payload) => {
  const id = parseSnackId(idParam);
  if (id === null) {
    return { error: { status: 400, message: 'Invalid snack id' } };
  }

  try {
    const snack = await snackRepository.update(id, payload);
    return { snack };
  } catch {
    return { error: { status: 404, message: 'Snack not found' } };
  }
};

const deleteSnack = async (idParam) => {
  const id = parseSnackId(idParam);
  if (id === null) {
    return { error: { status: 400, message: 'Invalid snack id' } };
  }

  try {
    await snackRepository.remove(id);
    return { deleted: true };
  } catch {
    return { error: { status: 404, message: 'Snack not found' } };
  }
};

module.exports = {
  listSnacks,
  getSnackById,
  createSnack,
  updateSnack,
  deleteSnack
};
