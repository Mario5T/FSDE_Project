const userRepository = require('../repositories/userRepository');

const updatePreferences = async (userId, { tastes, allergies, boxSize }) => {
  const preferences = await userRepository.upsertPreferences(
    userId,
    tastes || [],
    allergies || [],
    boxSize || 'Medium'
  );

  return {
    ...preferences,
    tastes: JSON.parse(preferences.tastes || '[]'),
    allergies: JSON.parse(preferences.allergies || '[]')
  };
};

const updateSubscription = (userId, { active, plan }) => {
  const nextDeliveryDate = active
    ? (() => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        return date;
      })()
    : null;

  return userRepository.upsertSubscription(userId, {
    active,
    plan,
    startDate: active ? new Date() : null,
    nextDeliveryDate
  });
};

const listUsers = () => userRepository.findAllUsers();

module.exports = {
  updatePreferences,
  updateSubscription,
  listUsers
};
