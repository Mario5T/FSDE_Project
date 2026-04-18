const authService = require('../services/authService');
const authRepository = require('../repositories/authRepository');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = authService.verifyToken(token);
    req.user = await authRepository.findPublicById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    next();
  } catch {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};

module.exports = { protect, adminOnly };
