import { Router } from 'express';
import { requireAuth } from '../auth.js';
import { db } from '../db.js';
import { toRecentView } from '../serializers.js';
import { favoriteSchema, parseBody } from '../validation.js';

export const recentViewRouter = Router();

recentViewRouter.get('/', requireAuth, (req, res) => {
  const rows = db
    .prepare(
      `
        SELECT *
        FROM recent_views
        WHERE user_id = ?
        ORDER BY viewed_at DESC
        LIMIT 12
      `
    )
    .all(req.user.sub);

  return res.json({ recentViews: rows.map(toRecentView) });
});

recentViewRouter.post('/', requireAuth, (req, res) => {
  const body = parseBody(favoriteSchema, req.body, res, '최근 본 항목 정보가 부족합니다.');

  if (!body) {
    return;
  }

  const id = crypto.randomUUID();
  const viewedAt = new Date().toISOString();

  db.prepare(
    `
      INSERT INTO recent_views (
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
        viewed_at
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
        payload = excluded.payload,
        viewed_at = excluded.viewed_at
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
    viewedAt
  );

  const recentView = db
    .prepare(
      `
        SELECT *
        FROM recent_views
        WHERE user_id = ? AND item_id = ? AND item_type = ?
      `
    )
    .get(req.user.sub, body.itemId, body.itemType);

  return res.status(201).json({ recentView: toRecentView(recentView) });
});
