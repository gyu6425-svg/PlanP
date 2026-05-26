import type { AuthUser } from './authApi';

type JwtPayload = {
    sub?: string;
    email?: string;
    name?: string;
    mpti?: AuthUser['mpti'];
    exp?: number;
};

function base64UrlDecode(value: string) {
    const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    return decodeURIComponent(
        atob(padded)
            .split('')
            .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
            .join('')
    );
}

function base64UrlEncode(value: object) {
    const json = JSON.stringify(value);
    const bytes = encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, hex) =>
        String.fromCharCode(Number.parseInt(hex, 16))
    );

    return btoa(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeJwtPayload(token: string): JwtPayload | null {
    const [, payload] = token.split('.');

    if (!payload) {
        return null;
    }

    try {
        return JSON.parse(base64UrlDecode(payload)) as JwtPayload;
    } catch {
        return null;
    }
}

export function isJwtExpired(token: string) {
    const payload = decodeJwtPayload(token);

    if (!payload?.exp) {
        return true;
    }

    return payload.exp * 1000 <= Date.now();
}

export function getUserFromJwt(token: string): AuthUser | null {
    const payload = decodeJwtPayload(token);

    if (!payload?.sub || !payload.email) {
        return null;
    }

    return {
        id: payload.sub,
        email: payload.email,
        name: payload.name ?? payload.email.split('@')[0],
        mpti: payload.mpti ?? 'P',
    };
}

export function createDemoJwt(user: AuthUser) {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const header = { alg: 'none', typ: 'JWT' };
    const payload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        mpti: user.mpti,
        iat: nowInSeconds,
        exp: nowInSeconds + 60 * 60,
    };

    return `${base64UrlEncode(header)}.${base64UrlEncode(payload)}.demo-signature`;
}
