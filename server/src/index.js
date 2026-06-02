import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { migrate } from './db.js';
import { adminRouter } from './routes/adminRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { bookingClickRouter } from './routes/bookingClickRoutes.js';
import { favoriteRouter } from './routes/favoriteRoutes.js';
import { recentViewRouter } from './routes/recentViewRoutes.js';
import { surveyResultRouter } from './routes/surveyResultRoutes.js';

export const app = express();
const port = Number(process.env.PORT ?? 4000);
const host = process.env.HOST ?? '0.0.0.0';
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
            if (
                !origin ||
                allowedOrigins.has(origin) ||
                /^http:\/\/localhost:517\d$/.test(origin)
            ) {
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

app.use('/auth', authRouter);
app.use('/favorites', favoriteRouter);
app.use('/survey-results', surveyResultRouter);
app.use('/booking-clicks', bookingClickRouter);
app.use('/recent-views', recentViewRouter);
app.use('/admin', adminRouter);

app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
});

export function startServer() {
    return app.listen(port, host, () => {
        console.log(`PlanP API server running on http://${host}:${port}`);
    });
}

if (process.env.NODE_ENV !== 'test') {
    startServer();
}
