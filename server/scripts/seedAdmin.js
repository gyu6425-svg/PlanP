import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { db, migrate } from '../src/db.js';

const loginId = process.env.ADMIN_LOGIN_ID ?? 'admin01';
const password = process.env.ADMIN_PASSWORD ?? 'admin01';
const name = process.env.ADMIN_NAME ?? '관리자';
const email = process.env.ADMIN_EMAIL ?? 'admin01@planp.local';

if (password.length < 6) {
    throw new Error('ADMIN_PASSWORD must be at least 6 characters.');
}

migrate();

const passwordHash = await bcrypt.hash(password, 12);
const existingUser = db.prepare('SELECT id FROM users WHERE login_id = ?').get(loginId);

if (existingUser) {
    db.prepare(
        `
      UPDATE users
      SET password_hash = ?,
          name = ?,
          email = ?,
          role = 'admin'
      WHERE login_id = ?
    `
    ).run(passwordHash, name, email, loginId);

    console.log(`Updated admin user: ${loginId}`);
} else {
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
        role,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    ).run(
        crypto.randomUUID(),
        loginId,
        passwordHash,
        name,
        '2000',
        '01',
        '01',
        email,
        'admin',
        new Date().toISOString()
    );

    console.log(`Created admin user: ${loginId}`);
}

db.close();
