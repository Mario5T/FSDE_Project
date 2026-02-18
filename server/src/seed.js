const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt(10);
  const adminPassword = await bcrypt.hash('admin123', salt);

  await prisma.user.upsert({
    where: { email: 'admin@snacksafari.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@snacksafari.com',
      password: adminPassword,
      role: 'admin',
      preferences: { create: { tastes: '[]', allergies: '[]', boxSize: 'Large' } },
      subscription: { create: { active: false } }
    }
  });

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      monthlyPrice: 19,
      features: JSON.stringify(['5-7 snacks per month', 'Standard variety', 'Snack info cards', 'Free shipping']),
      excluded: JSON.stringify(['Premium brands', 'Personalization', 'Priority support']),
      highlight: false
    },
    {
      id: 'premium',
      name: 'Premium',
      monthlyPrice: 34,
      features: JSON.stringify(['10-12 snacks per month', 'Premium brands included', 'Full personalization', 'Priority support', 'Free shipping']),
      excluded: JSON.stringify(['Deluxe exclusive snacks']),
      highlight: true
    },
    {
      id: 'deluxe',
      name: 'Deluxe',
      monthlyPrice: 54,
      features: JSON.stringify(['15-20 snacks per month', 'Exclusive & limited edition', 'Full personalization', 'Priority support', 'Free express shipping', 'Bonus surprise snacks']),
      excluded: JSON.stringify([]),
      highlight: false
    }
  ];

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { id: plan.id },
      update: plan,
      create: plan
    });
  }

  const snacks = [
    { name: 'Takis Fuego', origin: 'Mexico', price: 3.99, rating: 4.8, category: 'Spicy', description: 'Intensely spicy rolled tortilla chips', available: true },
    { name: 'Pocky Chocolate', origin: 'Japan', price: 2.49, rating: 4.5, category: 'Sweet', description: 'Classic Japanese chocolate biscuit sticks', available: true },
    { name: 'Bamba Peanut Puffs', origin: 'Israel', price: 2.99, rating: 4.3, category: 'Savory', description: 'Light and crunchy peanut butter puffs', available: true },
    { name: 'KitKat Matcha', origin: 'Japan', price: 3.49, rating: 4.6, category: 'Sweet', description: 'Green tea flavored KitKat wafer bars', available: true },
    { name: 'Lay\'s Paprika', origin: 'Netherlands', price: 2.79, rating: 4.2, category: 'Savory', description: 'Smoky paprika flavored potato chips', available: true },
    { name: 'Pepero Almond', origin: 'South Korea', price: 2.99, rating: 4.4, category: 'Sweet', description: 'Chocolate sticks with almond coating', available: true },
    { name: 'Calbee Shrimp Chips', origin: 'Japan', price: 3.29, rating: 4.1, category: 'Savory', description: 'Light and airy shrimp flavored chips', available: true },
    { name: 'Haribo Gold Bears', origin: 'Germany', price: 2.49, rating: 4.7, category: 'Sweet', description: 'Classic fruity gummy bears', available: true },
    { name: 'Flamin Hot Cheetos', origin: 'USA', price: 3.49, rating: 4.6, category: 'Spicy', description: 'Crunchy cheese puffs with fiery hot seasoning', available: true },
    { name: 'Orion Turtle Chips', origin: 'South Korea', price: 3.79, rating: 4.5, category: 'Savory', description: 'Unique shaped corn chips with savory flavor', available: true },
    { name: 'Maaza Mango Drink', origin: 'India', price: 1.99, rating: 4.3, category: 'Drinks', description: 'Refreshing mango fruit drink', available: true },
    { name: 'Vegan Kale Chips', origin: 'USA', price: 4.99, rating: 4.0, category: 'Savory', description: 'Crispy kale chips, organic and vegan', available: true }
  ];

  for (const snack of snacks) {
    const existing = await prisma.snack.findFirst({ where: { name: snack.name } });
    if (!existing) {
      await prisma.snack.create({ data: snack });
    }
  }

  console.log('Database seeded successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
