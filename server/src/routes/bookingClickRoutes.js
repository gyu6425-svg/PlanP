import { Router } from 'express';
import { optionalAuth } from '../auth.js';
import { db } from '../db.js';
import { toBookingClick } from '../serializers.js';
import { bookingClickSchema, parseBody } from '../validation.js';

export const bookingClickRouter = Router();

bookingClickRouter.post('/', optionalAuth, (req, res) => {
  const body = parseBody(bookingClickSchema, req.body, res, '예약 클릭 기록 정보가 부족합니다.');

  if (!body) {
    return;
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  db.prepare(
    `
      INSERT INTO booking_clicks (
        id,
        user_id,
        city_code,
        item_type,
        item_id,
        item_title,
        platform,
        href,
        section_label,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
  ).run(
    id,
    req.user?.sub ?? null,
    body.cityCode,
    body.itemType,
    body.itemId ?? null,
    body.itemTitle,
    body.platform,
    body.href,
    body.sectionLabel ?? null,
    createdAt
  );

  const bookingClick = db.prepare('SELECT * FROM booking_clicks WHERE id = ?').get(id);

  return res.status(201).json({ bookingClick: toBookingClick(bookingClick) });
});
