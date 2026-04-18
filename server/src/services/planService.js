const planRepository = require('../repositories/planRepository');

const parsePlan = (plan) => ({
  ...plan,
  features: JSON.parse(plan.features || '[]'),
  excluded: JSON.parse(plan.excluded || '[]')
});

const listPlans = async () => {
  const plans = await planRepository.findAll();
  return plans.map(parsePlan);
};

const getPlanById = async (id) => {
  const plan = await planRepository.findById(id);
  if (!plan) {
    return { error: { status: 404, message: 'Plan not found' } };
  }

  return { plan: parsePlan(plan) };
};

const createPlan = async ({ features, excluded, ...rest }) => {
  const plan = await planRepository.create({
    ...rest,
    features: JSON.stringify(features || []),
    excluded: JSON.stringify(excluded || [])
  });

  return { plan: parsePlan(plan) };
};

module.exports = {
  listPlans,
  getPlanById,
  createPlan
};
