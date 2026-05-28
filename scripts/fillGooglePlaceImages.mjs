import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SEARCH_URL = 'https://places.googleapis.com/v1/places:searchText';
const DEFAULT_MAX_WIDTH = 1200;
const DEFAULT_PHOTO_COUNT = 6;
const REQUEST_DELAY_MS = 150;

function parseArgs(argv) {
    const city = argv.find((arg) => !arg.startsWith('--'));
    const all = argv.includes('--all');

    if (!city && !all) {
        console.error('Usage: node scripts/fillGooglePlaceImages.mjs <city-slug|--all>');
        console.error('Example: node scripts/fillGooglePlaceImages.mjs osaka');
        console.error('Example: node scripts/fillGooglePlaceImages.mjs --all');
        process.exit(1);
    }

    return { city, all };
}

async function loadEnv() {
    try {
        const envText = await readFile('.env', 'utf8');

        for (const line of envText.split('\n')) {
            const trimmed = line.trim();

            if (!trimmed || trimmed.startsWith('#')) {
                continue;
            }

            const separatorIndex = trimmed.indexOf('=');

            if (separatorIndex === -1) {
                continue;
            }

            const key = trimmed.slice(0, separatorIndex).trim();
            const value = trimmed.slice(separatorIndex + 1).trim();

            if (!process.env[key]) {
                process.env[key] = value;
            }
        }
    } catch {
        // .env is optional when env vars are already provided by the shell.
    }
}

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function isExternalImage(image) {
    return typeof image === 'string' && /^https?:\/\//.test(image);
}

function stripParenthetical(value) {
    return value.replace(/\([^)]*\)/g, '').trim();
}

function buildSearchText(place, cityName) {
    const name = stripParenthetical(place.name);
    return [name, place.area, cityName].filter(Boolean).join(' ');
}

async function searchPlacePhotos({ apiKey, searchText, languageCode }) {
    const response = await fetch(SEARCH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.id,places.displayName,places.photos',
        },
        body: JSON.stringify({
            textQuery: searchText,
            languageCode,
            maxResultCount: 1,
        }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
        const error = new Error(JSON.stringify(responseJson));
        error.status = response.status;
        error.code = responseJson.error?.code;
        error.reason = responseJson.error?.details?.find((detail) => detail.reason)?.reason;
        throw error;
    }

    return responseJson.places?.[0]?.photos?.map((photo) => photo.name).filter(Boolean) ?? [];
}

async function getPhotoUri({ apiKey, photoName, maxWidthPx }) {
    const url = new URL(`https://places.googleapis.com/v1/${photoName}/media`);
    url.searchParams.set('maxWidthPx', String(maxWidthPx));
    url.searchParams.set('skipHttpRedirect', 'true');
    url.searchParams.set('key', apiKey);

    const response = await fetch(url);
    const responseJson = await response.json();

    if (!response.ok) {
        const error = new Error(JSON.stringify(responseJson));
        error.status = response.status;
        error.code = responseJson.error?.code;
        error.reason = responseJson.error?.details?.find((detail) => detail.reason)?.reason;
        throw error;
    }

    return responseJson.photoUri;
}

function unique(values) {
    return [...new Set(values.filter(Boolean))];
}

function getAllPlaces(cityData) {
    return ['food', 'tour', 'stay'].flatMap((sectionName) =>
        (cityData[sectionName] ?? []).flatMap((group) =>
            (group.places ?? []).map((place) => ({
                sectionName,
                category: group.category,
                place,
            }))
        )
    );
}

async function fillCity({ city, apiKey, languageCode, maxWidthPx, photoCount }) {
    const dataPath = path.join(process.cwd(), 'generated', `${city}.json`);
    const cityData = JSON.parse(await readFile(dataPath, 'utf8'));
    const places = getAllPlaces(cityData);
    const cityName = cityData.destination || cityData.city || city;

    let filled = 0;
    let skipped = 0;
    let failed = 0;

    for (const { sectionName, place } of places) {
        if (Array.isArray(place.images) && place.images.length >= photoCount) {
            skipped += 1;
            continue;
        }

        const searchText = buildSearchText(place, cityName);

        try {
            const photoNames = await searchPlacePhotos({ apiKey, searchText, languageCode });
            const targetPhotoNames = unique([
                ...(Array.isArray(place.googlePhotoNames) ? place.googlePhotoNames : []),
                place.googlePhotoName,
                ...photoNames,
            ]).slice(0, photoCount);

            if (targetPhotoNames.length === 0) {
                failed += 1;
                console.warn(`No photos: ${place.name} (${searchText})`);
                await wait(REQUEST_DELAY_MS);
                continue;
            }

            const photoUris = [];

            for (const photoName of targetPhotoNames) {
                const photoUri = await getPhotoUri({ apiKey, photoName, maxWidthPx });

                if (photoUri) {
                    photoUris.push(photoUri);
                }

                await wait(REQUEST_DELAY_MS);
            }

            const images = unique([
                ...(Array.isArray(place.images) ? place.images : []),
                ...photoUris,
            ]).slice(0, photoCount);

            if (images.length === 0) {
                failed += 1;
                console.warn(`No photoUri: ${place.name}`);
                await wait(REQUEST_DELAY_MS);
                continue;
            }

            place.image = images[0];
            place.images = images;
            place.googlePhotoName = targetPhotoNames[0];
            place.googlePhotoNames = targetPhotoNames;
            place.imageSource = 'google_places';
            filled += 1;
            console.log(`Filled ${sectionName}: ${place.name} (${images.length} photos)`);
        } catch (error) {
            if (error.reason === 'SERVICE_DISABLED' || error.status === 403 || error.code === 403) {
                console.error(error.message);
                console.error('Google Places API (New) is disabled or blocked for this API key.');
                console.error('Enable it here: https://console.developers.google.com/apis/api/places.googleapis.com/overview');
                process.exit(1);
            }

            failed += 1;
            console.warn(`Failed ${place.name}: ${error.message}`);
        }

        await wait(REQUEST_DELAY_MS);
    }

    await writeFile(dataPath, `${JSON.stringify(cityData, null, 2)}\n`);

    console.log(`${city}: filled=${filled}, skipped=${skipped}, failed=${failed}`);
    console.log(`Updated ${dataPath}`);
}

async function main() {
    const { city, all } = parseArgs(process.argv.slice(2));
    await loadEnv();

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        console.error('Missing GOOGLE_MAPS_API_KEY. Add it to .env first.');
        process.exit(1);
    }

    const languageCode = process.env.GOOGLE_PLACES_LANGUAGE || 'ko';
    const maxWidthPx = Number(process.env.GOOGLE_PLACE_PHOTO_MAX_WIDTH || DEFAULT_MAX_WIDTH);
    const photoCount = Number(process.env.GOOGLE_PLACE_PHOTO_COUNT || DEFAULT_PHOTO_COUNT);
    const cities = all
        ? ['bangkok', 'fukuoka', 'osaka', 'taipei']
        : [city];

    for (const citySlug of cities) {
        await fillCity({ city: citySlug, apiKey, languageCode, maxWidthPx, photoCount });
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
