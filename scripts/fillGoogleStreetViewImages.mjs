import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SEARCH_URL = 'https://places.googleapis.com/v1/places:searchText';
const STREET_VIEW_URL = 'https://maps.googleapis.com/maps/api/streetview';
const REQUEST_DELAY_MS = 150;
const DEFAULT_SIZE = '640x360';
const DEFAULT_FOV = '80';
const DEFAULT_PITCH = '5';

function parseArgs(argv) {
    const city = argv.find((arg) => !arg.startsWith('--'));
    const all = argv.includes('--all');

    if (!city && !all) {
        console.error('Usage: node scripts/fillGoogleStreetViewImages.mjs <city-slug|--all>');
        console.error('Example: node scripts/fillGoogleStreetViewImages.mjs osaka');
        console.error('Example: node scripts/fillGoogleStreetViewImages.mjs --all');
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

function stripParenthetical(value) {
    return value.replace(/\([^)]*\)/g, '').trim();
}

function buildSearchText(place, cityName) {
    const name = stripParenthetical(place.name);
    return [name, place.area, cityName].filter(Boolean).join(' ');
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

async function searchPlaceLocation({ apiKey, searchText, languageCode }) {
    const response = await fetch(SEARCH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.id,places.displayName,places.location',
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

    return responseJson.places?.[0]?.location;
}

function streetViewUrl({ apiKey, location, heading, size }) {
    const url = new URL(STREET_VIEW_URL);
    url.searchParams.set('size', size);
    url.searchParams.set('location', `${location.latitude},${location.longitude}`);
    url.searchParams.set('heading', String(heading));
    url.searchParams.set('fov', DEFAULT_FOV);
    url.searchParams.set('pitch', DEFAULT_PITCH);
    url.searchParams.set('source', 'outdoor');
    url.searchParams.set('return_error_code', 'true');
    url.searchParams.set('key', apiKey);
    return url;
}

async function downloadStreetView({ apiKey, location, heading, size, outputPath }) {
    const response = await fetch(streetViewUrl({ apiKey, location, heading, size }));

    if (!response.ok) {
        const errorText = await response.text();
        const error = new Error(errorText || `Street View request failed: ${response.status}`);
        error.status = response.status;
        throw error;
    }

    const contentType = response.headers.get('content-type') ?? '';

    if (!contentType.includes('image/')) {
        const error = new Error(`Unexpected Street View content type: ${contentType}`);
        error.status = response.status;
        throw error;
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());
    await writeFile(outputPath, imageBuffer);
}

async function fillCity({ city, apiKey, languageCode, size }) {
    const dataPath = path.join(process.cwd(), 'generated', `${city}.json`);
    const cityData = JSON.parse(await readFile(dataPath, 'utf8'));
    const cityName = cityData.destination || cityData.city || city;
    const outputDir = path.join(process.cwd(), 'public', 'images', 'generated-streetview', city);
    await mkdir(outputDir, { recursive: true });

    let filled = 0;
    let skipped = 0;
    let failed = 0;

    for (const { sectionName, place } of getAllPlaces(cityData)) {
        if (Array.isArray(place.mapImages) && place.mapImages.length >= 2) {
            skipped += 1;
            continue;
        }

        const searchText = buildSearchText(place, cityName);

        try {
            const location =
                place.googleLocation ??
                (await searchPlaceLocation({ apiKey, searchText, languageCode }));

            if (!location?.latitude || !location?.longitude) {
                failed += 1;
                console.warn(`No location: ${place.name} (${searchText})`);
                await wait(REQUEST_DELAY_MS);
                continue;
            }

            place.googleLocation = location;

            const imagePaths = [];
            const headings = [0, 90];

            for (const [index, heading] of headings.entries()) {
                const fileName = `${place.slug}-streetview-${index + 1}.jpg`;
                const outputPath = path.join(outputDir, fileName);
                await downloadStreetView({ apiKey, location, heading, size, outputPath });
                imagePaths.push(`/images/generated-streetview/${city}/${fileName}`);
                await wait(REQUEST_DELAY_MS);
            }

            place.mapImages = imagePaths;
            place.mapImageSource = 'google_street_view_static';
            filled += 1;
            console.log(`Filled ${sectionName}: ${place.name}`);
        } catch (error) {
            if (error.reason === 'SERVICE_DISABLED' || error.status === 403 || error.code === 403) {
                console.error(error.message);
                console.error('Street View Static API or Places API is disabled or blocked for this API key.');
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
    const size = process.env.GOOGLE_STREET_VIEW_SIZE || DEFAULT_SIZE;
    const cities = all
        ? (await readdir(path.join(process.cwd(), 'generated')))
              .filter((fileName) => fileName.endsWith('.json'))
              .map((fileName) => fileName.replace(/\.json$/, ''))
              .sort()
        : [city];

    for (const citySlug of cities) {
        await fillCity({ city: citySlug, apiKey, languageCode, size });
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
