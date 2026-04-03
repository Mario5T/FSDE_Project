const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const request = require('supertest');

process.env.DATABASE_URL = 'file:./test.db';
process.env.JWT_SECRET = 'integration-secret';

const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const testDatabasePath = path.join(__dirname, '..', 'prisma', 'test.db');

beforeAll(async () => {
  fs.rmSync(testDatabasePath, { force: true });
  execSync('npx prisma migrate deploy', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
    env: process.env
  });
});

afterAll(async () => {
  await prisma.$disconnect();
  fs.rmSync(testDatabasePath, { force: true });
});

describe('SnackSafari API', () => {
  it('registers a user and returns the authenticated profile', async () => {
    const email = `integration-${Date.now()}@example.com`;

    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Integration User',
        email,
        password: 'secret123'
      });

    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body.user.email).toBe(email);
    expect(registerResponse.body.token).toBeTruthy();

    const meResponse = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${registerResponse.body.token}`);

    expect(meResponse.status).toBe(200);
    expect(meResponse.body.email).toBe(email);
    expect(meResponse.body.preferences.boxSize).toBe('Medium');
  });

  it('serves snacks from the database', async () => {
    await prisma.snack.create({
      data: {
        name: 'Test Crunch',
        origin: 'Testland',
        price: 4.25,
        rating: 4.9,
        category: 'Savory',
        description: 'A sample snack used by integration tests',
        available: true
      }
    });

    const snackResponse = await request(app).get('/api/snacks');

    expect(snackResponse.status).toBe(200);
    expect(snackResponse.body.some((snack) => snack.name === 'Test Crunch')).toBe(true);
  });
});