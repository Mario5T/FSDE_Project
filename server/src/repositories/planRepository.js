const prisma = require('../lib/prisma');

const findAll = () => prisma.subscriptionPlan.findMany();

const findById = (id) => prisma.subscriptionPlan.findUnique({ where: { id } });

const create = (data) => prisma.subscriptionPlan.create({ data });

module.exports = {
  findAll,
  findById,
  create
};
