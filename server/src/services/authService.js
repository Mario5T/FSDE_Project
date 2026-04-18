const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');

const DEFAULT_JWT_SECRET = 'snacksafari_jwt_secret_key_2024';

const getJwtSecret = () => process.env.JWT_SECRET || DEFAULT_JWT_SECRET;

const generateToken = (id) => jwt.sign({ id }, getJwtSecret(), { expiresIn: '30d' });

const verifyToken = (token) => jwt.verify(token, getJwtSecret());

const registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    return { error: { status: 400, message: 'Please provide all fields' } };
  }

  if (password.length < 6) {
    return { error: { status: 400, message: 'Password must be at least 6 characters' } };
  }

  const existing = await authRepository.findByEmail(email);
  if (existing) {
    return { error: { status: 400, message: 'User already exists with that email' } };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authRepository.createUserWithDefaults({
    name,
    email,
    password: hashedPassword
  });

  return {
    user,
    token: generateToken(user.id)
  };
};

const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    return { error: { status: 400, message: 'Please provide email and password' } };
  }

  const user = await authRepository.findByEmail(email);
  if (!user) {
    return { error: { status: 401, message: 'Invalid credentials' } };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { error: { status: 401, message: 'Invalid credentials' } };
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    },
    token: generateToken(user.id)
  };
};

const getAuthenticatedProfile = async (userId) => {
  const user = await authRepository.findByIdWithProfile(userId);

  if (!user) {
    return { error: { status: 404, message: 'User not found' } };
  }

  const { password: _password, ...userWithoutPassword } = user;
  return { user: userWithoutPassword };
};

module.exports = {
  generateToken,
  verifyToken,
  registerUser,
  loginUser,
  getAuthenticatedProfile
};
