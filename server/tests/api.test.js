import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'planp-api-test-'));
const testDbPath = path.join(tempDir, 'planp-test.db');

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'planp-test-secret';
process.env.DB_PATH = testDbPath;
process.env.CLIENT_ORIGIN = 'http://localhost:5173';

const { app } = await import('../src/index.js');
const { db } = await import('../src/db.js');

let server;
let baseUrl;

function request(pathname, options = {}) {
  return fetch(`${baseUrl}${pathname}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  });
}

async function readJson(response) {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function signupAndLogin(loginId, role = 'user') {
  const signupResponse = await request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      loginId,
      password: 'password1',
      name: loginId,
      birthYear: '2000',
      birthMonth: '01',
      birthDay: '01',
      email: `${loginId}@planp.local`,
    }),
  });

  assert.equal(signupResponse.status, 201);

  if (role !== 'user') {
    db.prepare('UPDATE users SET role = ? WHERE login_id = ?').run(role, loginId);
  }

  const loginResponse = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ loginId, password: 'password1' }),
  });
  const loginBody = await readJson(loginResponse);

  assert.equal(loginResponse.status, 200);
  assert.equal(loginBody.user.role, role);

  return loginBody.accessToken;
}

describe('PlanP API', () => {
  before(async () => {
    await new Promise((resolve) => {
      server = app.listen(0, '127.0.0.1', resolve);
    });
    const { port } = server.address();
    baseUrl = `http://127.0.0.1:${port}`;
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
    db.close();
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('signs up and logs in a user', async () => {
    const token = await signupAndLogin('user-login');
    assert.equal(typeof token, 'string');
  });

  it('saves and reads a survey result', async () => {
    const token = await signupAndLogin('survey-user');
    const surveyResponse = await request('/survey-results', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        cityCode: 'tokyo',
        resultType: 'P',
        answers: {
          city: 'tokyo',
          destination: '도쿄',
          airports: ['나리타'],
          travelTypes: ['맛집'],
          stays: ['호텔'],
          navItems: ['이동수단', '맛집', '숙소'],
        },
      }),
    });

    assert.equal(surveyResponse.status, 201);

    const readResponse = await request('/survey-results/tokyo', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const readBody = await readJson(readResponse);

    assert.equal(readResponse.status, 200);
    assert.equal(readBody.surveyResult.cityCode, 'tokyo');
    assert.deepEqual(readBody.surveyResult.answers.airports, ['나리타']);
  });

  it('rejects invalid survey result payloads', async () => {
    const token = await signupAndLogin('invalid-survey-user');
    const response = await request('/survey-results', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        cityCode: '',
        answers: [],
      }),
    });

    assert.equal(response.status, 400);
  });

  it('records booking clicks', async () => {
    const response = await request('/booking-clicks', {
      method: 'POST',
      body: JSON.stringify({
        cityCode: 'tokyo',
        itemType: 'transport',
        itemId: 'skyliner-package-72',
        itemTitle: '72시간 도쿄 메트로 + 스카이라이너 왕복',
        platform: 'Klook',
        href: 'https://www.klook.com/',
        sectionLabel: '이동수단',
      }),
    });
    const body = await readJson(response);

    assert.equal(response.status, 201);
    assert.equal(body.bookingClick.cityCode, 'tokyo');
    assert.equal(body.bookingClick.itemType, 'transport');
  });

  it('rejects invalid booking click payloads', async () => {
    const response = await request('/booking-clicks', {
      method: 'POST',
      body: JSON.stringify({
        cityCode: 'tokyo',
        itemType: 'transport',
        itemTitle: '',
        platform: 'Klook',
      }),
    });

    assert.equal(response.status, 400);
  });

  it('blocks admin stats for normal users and allows admin users', async () => {
    const userToken = await signupAndLogin('normal-admin-block');
    const adminToken = await signupAndLogin('admin-allow', 'admin');

    const blockedResponse = await request('/admin/stats', {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    assert.equal(blockedResponse.status, 403);

    const adminResponse = await request('/admin/stats', {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const adminBody = await readJson(adminResponse);

    assert.equal(adminResponse.status, 200);
    assert.ok(Array.isArray(adminBody.selectedCities));
  });

  it('saves and reads recent views', async () => {
    const token = await signupAndLogin('recent-user');
    const saveResponse = await request('/recent-views', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        itemId: 'tokyo-sns-shibuya-sky',
        itemType: 'tour',
        categoryLabel: '관광',
        title: '시부야 스카이',
        subtitle: '시부야 · SNS명소',
        price: '₩ 25,000 ~',
        policy: '예약처 확인',
        image: '/images/tour/sns/sibuyaSky/sibuyaSky.png',
        brand: 'SNS명소',
        href: '/tokyo/tour/sns/shibuya-sky',
      }),
    });

    assert.equal(saveResponse.status, 201);

    const readResponse = await request('/recent-views', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const readBody = await readJson(readResponse);

    assert.equal(readResponse.status, 200);
    assert.equal(readBody.recentViews[0].itemId, 'tokyo-sns-shibuya-sky');
  });
});
