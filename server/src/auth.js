import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN ?? '1d';

if (!jwtSecret) {
  throw new Error('JWT_SECRET is required. Create server/.env from server/.env.example.');
}

export function createAccessToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      name: user.name,
      email: user.email ?? '',
      mpti: 'P',
    },
    jwtSecret,
    { expiresIn: jwtExpiresIn }
  );
}

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : null;

  if (!token) {
    return res.status(401).json({ message: '로그인이 필요합니다.' });
  }

  try {
    req.user = jwt.verify(token, jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ message: '토큰이 만료되었거나 올바르지 않습니다.' });
  }
}

export function toPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email ?? '',
    mpti: 'P',
  };
}
