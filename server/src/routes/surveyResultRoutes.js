import { Router } from 'express';
import { requireAuth } from '../auth.js';
import { db } from '../db.js';
import { toSurveyResult } from '../serializers.js';
import { parseBody, surveyResultSchema } from '../validation.js';

export const surveyResultRouter = Router();

surveyResultRouter.get('/:cityCode', requireAuth, (req, res) => {
  const cityCode = String(req.params.cityCode ?? '').trim().toLowerCase();

  if (!cityCode) {
    return res.status(400).json({ message: '도시 정보가 필요합니다.' });
  }

  const surveyResult = db
    .prepare(
      `
        SELECT *
        FROM survey_results
        WHERE user_id = ? AND city_code = ?
      `
    )
    .get(req.user.sub, cityCode);

  return res.json({ surveyResult: surveyResult ? toSurveyResult(surveyResult) : null });
});

surveyResultRouter.post('/', requireAuth, (req, res) => {
  const body = parseBody(surveyResultSchema, req.body, res, '저장할 설문 결과 정보가 부족합니다.');

  if (!body) {
    return;
  }

  const existingSurveyResult = db
    .prepare(
      `
        SELECT id, created_at AS createdAt
        FROM survey_results
        WHERE user_id = ? AND city_code = ?
      `
    )
    .get(req.user.sub, body.cityCode);

  const id = existingSurveyResult?.id ?? crypto.randomUUID();
  const createdAt = existingSurveyResult?.createdAt ?? new Date().toISOString();
  const updatedAt = new Date().toISOString();

  db.prepare(
    `
      INSERT INTO survey_results (
        id,
        user_id,
        city_code,
        answers,
        result_type,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(user_id, city_code) DO UPDATE SET
        answers = excluded.answers,
        result_type = excluded.result_type,
        updated_at = excluded.updated_at
    `
  ).run(
    id,
    req.user.sub,
    body.cityCode,
    JSON.stringify(body.answers),
    body.resultType ?? null,
    createdAt,
    updatedAt
  );

  const surveyResult = db
    .prepare(
      `
        SELECT *
        FROM survey_results
        WHERE user_id = ? AND city_code = ?
      `
    )
    .get(req.user.sub, body.cityCode);

  return res.status(existingSurveyResult ? 200 : 201).json({
    surveyResult: toSurveyResult(surveyResult),
  });
});
