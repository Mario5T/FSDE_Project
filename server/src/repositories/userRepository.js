const prisma = require('../lib/prisma');

const upsertPreferences = (userId, tastes, allergies, boxSize) =>
  prisma.preferences.upsert({
    where: { userId },
    update: {
      tastes: JSON.stringify(tastes),
      allergies: JSON.stringify(allergies),
      boxSize
    },
    create: {
      userId,
      tastes: JSON.stringify(tastes),
      allergies: JSON.stringify(allergies),
      boxSize
    }
  });

const upsertSubscription = (userId, { active, plan, startDate, nextDeliveryDate }) =>
  prisma.subscription.upsert({
    where: { userId },
    update: {
      active,
      plan,
      startDate,
      nextDeliveryDate
    },
    create: {
      userId,
      active,
      plan,
      startDate,
      nextDeliveryDate
    }
  });

const findAllUsers = () =>
  prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: 'desc' }
  });

module.exports = {
  upsertPreferences,
  upsertSubscription,
  findAllUsers
};
