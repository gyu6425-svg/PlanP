import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { createAccessToken, requireAuth, toPublicUser } from '../auth.js';
import { db } from '../db.js';
import { loginSchema, parseBody, signupSchema } from '../validation.js';

export const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
  const body = parseBody(signupSchema, req.body, res, '필수 정보를 모두 입력해 주세요.');

  if (!body) {
    return;
  }

  const existingUser = db.prepare('SELECT id FROM users WHERE login_id = ?').get(body.loginId);

  if (existingUser) {
    return res.status(409).json({ message: '이미 사용 중인 아이디입니다.' });
  }

  const id = crypto.randomUUID();
  const passwordHash = await bcrypt.hash(body.password, 12);
  const createdAt = new Date().toISOString();

  db.prepare(
    `
      INSERT INTO users (
        id,
        login_id,
        password_hash,
        name,
        birth_year,
        birth_month,
        birth_day,
        email,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
  ).run(
    id,
    body.loginId,
    passwordHash,
    body.name,
    body.birthYear,
    body.birthMonth,
    body.birthDay,
    body.email ?? null,
    createdAt
  );

  return res.status(201).json({
    user: {
      id,
      name: body.name,
      email: body.email ?? '',
      mpti: 'P',
      role: 'user',
    },
  });
});

authRouter.post('/login', async (req, res) => {
  const body = parseBody(loginSchema, req.body, res, '아이디와 비밀번호를 입력해 주세요.');

  if (!body) {
    return;
  }

  const user = db
    .prepare(
      `
        SELECT
          id,
          login_id AS loginId,
          password_hash AS passwordHash,
          name,
          email,
          role
        FROM users
        WHERE login_id = ?
      `
    )
    .get(body.loginId);

  if (!user) {
    return res.status(401).json({ message: '아이디 또는 비밀번호를 확인해 주세요.' });
  }

  const passwordMatches = await bcrypt.compare(body.password, user.passwordHash);

  if (!passwordMatches) {
    return res.status(401).json({ message: '아이디 또는 비밀번호를 확인해 주세요.' });
  }

  const publicUser = toPublicUser(user);

  return res.json({
    accessToken: createAccessToken(publicUser),
    user: publicUser,
  });
});

authRouter.get('/me', requireAuth, (req, res) => {
  const user = db
    .prepare(
      `
        SELECT id, name, email, role
        FROM users
        WHERE id = ?
      `
    )
    .get(req.user.sub);

  if (!user) {
    return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });
  }

  return res.json({ user: toPublicUser(user) });
});
