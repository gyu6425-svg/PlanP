import 'dotenv/config';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import express from 'express';
import { createAccessToken, requireAuth, toPublicUser } from './auth.js';
import { db, migrate } from './db.js';

const app = express();
const port = Number(process.env.PORT ?? 4000);
const host = process.env.HOST ?? '127.0.0.1';
const allowedOrigins = new Set(
  (process.env.CLIENT_ORIGIN ?? 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
);

migrate();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin) || /^http:\/\/localhost:517\d$/.test(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({ ok: true });
});

app.post('/auth/signup', async (req, res) => {
    const { loginId, password, name, birthYear, birthMonth, birthDay, email } = req.body ?? {};
    const normalizedLoginId = loginId ? String(loginId).trim() : '';
    const normalizedName = name ? String(name).trim() : '';

    if (!normalizedLoginId || !password || !normalizedName || !birthYear || !birthMonth || !birthDay) {
        return res.status(400).json({ message: '필수 정보를 모두 입력해 주세요.' });
    }

    if (String(password).length < 6) {
        return res.status(400).json({ message: '비밀번호는 6자 이상 입력해 주세요.' });
    }

    const existingUser = db.prepare('SELECT id FROM users WHERE login_id = ?').get(normalizedLoginId);

    if (existingUser) {
        return res.status(409).json({ message: '이미 사용 중인 아이디입니다.' });
    }

    const id = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(String(password), 12);
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
        normalizedLoginId,
        passwordHash,
        normalizedName,
        String(birthYear).trim(),
        String(birthMonth).trim(),
        String(birthDay).trim(),
        email ? String(email).trim() : null,
        createdAt
    );

    return res.status(201).json({
        user: {
            id,
            name: normalizedName,
            email: email ? String(email) : '',
            mpti: 'P',
        },
    });
});

app.post('/auth/login', async (req, res) => {
    const { loginId, password } = req.body ?? {};
    const normalizedLoginId = loginId ? String(loginId).trim() : '';

    if (!normalizedLoginId || !password) {
        return res.status(400).json({ message: '아이디와 비밀번호를 입력해 주세요.' });
    }

    const user = db
        .prepare(
            `
        SELECT
          id,
          login_id AS loginId,
          password_hash AS passwordHash,
          name,
          email
        FROM users
        WHERE login_id = ?
      `
        )
        .get(normalizedLoginId);

    if (!user) {
        return res.status(401).json({ message: '아이디 또는 비밀번호를 확인해 주세요.' });
    }

    const passwordMatches = await bcrypt.compare(String(password), user.passwordHash);

    if (!passwordMatches) {
        return res.status(401).json({ message: '아이디 또는 비밀번호를 확인해 주세요.' });
    }

    const publicUser = toPublicUser(user);

    return res.json({
        accessToken: createAccessToken(publicUser),
        user: publicUser,
    });
});

app.get('/auth/me', requireAuth, (req, res) => {
    const user = db
        .prepare(
            `
        SELECT id, name, email
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

function toFavorite(row) {
    return {
        id: row.id,
        itemId: row.item_id,
        itemType: row.item_type,
        categoryLabel: row.category_label,
        title: row.title,
        subtitle: row.subtitle ?? '',
        price: row.price ?? '',
        policy: row.policy ?? '',
        image: row.image ?? '',
        brand: row.brand ?? '',
        href: row.href ?? '',
        createdAt: row.created_at,
        payload: row.payload ? JSON.parse(row.payload) : null,
    };
}

app.get('/favorites', requireAuth, (req, res) => {
    const rows = db
        .prepare(
            `
                SELECT *
                FROM favorites
                WHERE user_id = ?
                ORDER BY created_at DESC
            `
        )
        .all(req.user.sub);

    return res.json({ favorites: rows.map(toFavorite) });
});

app.post('/favorites', requireAuth, (req, res) => {
    const {
        itemId,
        itemType,
        categoryLabel,
        title,
        subtitle,
        price,
        policy,
        image,
        brand,
        href,
        payload,
    } = req.body ?? {};

    if (!itemId || !itemType || !categoryLabel || !title) {
        return res.status(400).json({ message: '저장할 항목 정보가 부족합니다.' });
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    db.prepare(
        `
            INSERT INTO favorites (
                id,
                user_id,
                item_id,
                item_type,
                category_label,
                title,
                subtitle,
                price,
                policy,
                image,
                brand,
                href,
                payload,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(user_id, item_id, item_type) DO UPDATE SET
                category_label = excluded.category_label,
                title = excluded.title,
                subtitle = excluded.subtitle,
                price = excluded.price,
                policy = excluded.policy,
                image = excluded.image,
                brand = excluded.brand,
                href = excluded.href,
                payload = excluded.payload
        `
    ).run(
        id,
        req.user.sub,
        String(itemId),
        String(itemType),
        String(categoryLabel),
        String(title),
        subtitle ? String(subtitle) : null,
        price ? String(price) : null,
        policy ? String(policy) : null,
        image ? String(image) : null,
        brand ? String(brand) : null,
        href ? String(href) : null,
        payload ? JSON.stringify(payload) : null,
        createdAt
    );

    const favorite = db
        .prepare(
            `
                SELECT *
                FROM favorites
                WHERE user_id = ? AND item_id = ? AND item_type = ?
            `
        )
        .get(req.user.sub, String(itemId), String(itemType));

    return res.status(201).json({ favorite: toFavorite(favorite) });
});

app.delete('/favorites/:itemType/:itemId', requireAuth, (req, res) => {
    db.prepare(
        `
            DELETE FROM favorites
            WHERE user_id = ? AND item_type = ? AND item_id = ?
        `
    ).run(req.user.sub, req.params.itemType, req.params.itemId);

    return res.status(204).send();
});

app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
});

app.listen(port, host, () => {
  console.log(`PlanP API server running on http://${host}:${port}`);
});
