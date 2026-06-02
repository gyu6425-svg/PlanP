import { Router } from 'express';
import { requireAuth } from '../auth.js';
import { db } from '../db.js';
import { toFavorite } from '../serializers.js';
import { favoriteSchema, parseBody } from '../validation.js';

export const favoriteRouter = Router();

favoriteRouter.get('/', requireAuth, (req, res) => {
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

favoriteRouter.post('/', requireAuth, (req, res) => {
  const body = parseBody(favoriteSchema, req.body, res, '저장할 항목 정보가 부족합니다.');

  if (!body) {
    return;
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
    body.itemId,
    body.itemType,
    body.categoryLabel,
    body.title,
    body.subtitle ?? null,
    body.price ?? null,
    body.policy ?? null,
    body.image ?? null,
    body.brand ?? null,
    body.href ?? null,
    body.payload ? JSON.stringify(body.payload) : null,
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
    .get(req.user.sub, body.itemId, body.itemType);

  return res.status(201).json({ favorite: toFavorite(favorite) });
});

favoriteRouter.delete('/:itemType/:itemId', requireAuth, (req, res) => {
  db.prepare(
    `
      DELETE FROM favorites
      WHERE user_id = ? AND item_type = ? AND item_id = ?
    `
  ).run(req.user.sub, req.params.itemType, req.params.itemId);

  return res.status(204).send();
});
