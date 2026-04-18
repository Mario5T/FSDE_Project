const prisma = require('../lib/prisma');

const findByEmail = (email) => prisma.user.findUnique({ where: { email } });

const createUserWithDefaults = ({ name, email, password }) =>
  prisma.user.create({
    data: {
      name,
      email,
      password,
      preferences: {
        create: {
          tastes: '[]',
          allergies: '[]',
          boxSize: 'Medium'
        }
      },
      subscription: {
        create: {
          active: false
        }
      }
    },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });

const findByIdWithProfile = (id) =>
  prisma.user.findUnique({
    where: { id },
    include: {
      preferences: true,
      subscription: true
    }
  });

const findPublicById = (id) =>
  prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true }
  });

module.exports = {
  findByEmail,
  createUserWithDefaults,
  findByIdWithProfile,
  findPublicById
};
