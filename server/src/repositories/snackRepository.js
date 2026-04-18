const prisma = require('../lib/prisma');

const findAvailable = (category) => {
  const where = category ? { category, available: true } : { available: true };
  return prisma.snack.findMany({ where });
};

const findById = (id) => prisma.snack.findUnique({ where: { id } });

const create = (data) => prisma.snack.create({ data });

const update = (id, data) => prisma.snack.update({ where: { id }, data });

const remove = (id) => prisma.snack.delete({ where: { id } });

module.exports = {
  findAvailable,
  findById,
  create,
  update,
  remove
};
