import { Router } from 'express';
import { requireAdmin, requireAuth } from '../auth.js';
import { db } from '../db.js';

export const adminRouter = Router();

adminRouter.get('/stats', requireAuth, requireAdmin, (req, res) => {
  const cityCode = req.query.cityCode ? String(req.query.cityCode).trim().toLowerCase() : '';
  const itemType = req.query.itemType ? String(req.query.itemType).trim().toLowerCase() : '';
  const range = req.query.range ? String(req.query.range).trim() : 'all';
  const rangeWhere =
    range === '7d'
      ? "datetime(created_at) >= datetime('now', '-7 days')"
      : range === '30d'
        ? "datetime(created_at) >= datetime('now', '-30 days')"
        : '1 = 1';
  const surveyRangeWhere =
    range === '7d'
      ? "datetime(updated_at) >= datetime('now', '-7 days')"
      : range === '30d'
        ? "datetime(updated_at) >= datetime('now', '-30 days')"
        : '1 = 1';
  const cityFilter = cityCode ? 'AND city_code = @cityCode' : '';
  const itemTypeFilter = itemType ? 'AND item_type = @itemType' : '';
  const params = { cityCode, itemType };

  const selectedCities = db
    .prepare(
      `
        SELECT
          city_code AS cityCode,
          COUNT(*) AS count,
          MAX(updated_at) AS lastSelectedAt
        FROM survey_results
        WHERE ${surveyRangeWhere}
        ${cityFilter}
        GROUP BY city_code
        ORDER BY count DESC, lastSelectedAt DESC
      `
    )
    .all(params);

  const bookingClicksByCityAndType = db
    .prepare(
      `
        SELECT
          city_code AS cityCode,
          item_type AS itemType,
          COUNT(*) AS count,
          MAX(created_at) AS lastClickedAt
        FROM booking_clicks
        WHERE ${rangeWhere}
        ${cityFilter}
        ${itemTypeFilter}
        GROUP BY city_code, item_type
        ORDER BY city_code ASC, count DESC
      `
    )
    .all(params);

  const topBookingItems = db
    .prepare(
      `
        SELECT
          city_code AS cityCode,
          item_type AS itemType,
          item_title AS itemTitle,
          platform,
          COUNT(*) AS count,
          MAX(created_at) AS lastClickedAt
        FROM booking_clicks
        WHERE ${rangeWhere}
        ${cityFilter}
        ${itemTypeFilter}
        GROUP BY city_code, item_type, item_title, platform
        ORDER BY count DESC, lastClickedAt DESC
        LIMIT 12
      `
    )
    .all(params);

  return res.json({
    selectedCities,
    bookingClicksByCityAndType,
    topBookingItems,
  });
});
