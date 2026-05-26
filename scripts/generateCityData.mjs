import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const API_URL = 'https://api.openai.com/v1/responses';
const DEFAULT_MODEL = 'gpt-5-mini';

function parseArgs(argv) {
    const [city, destination] = argv;

    if (!city || !destination) {
        console.error('Usage: node scripts/generateCityData.mjs <city-slug> <korean-city-name>');
        console.error('Example: node scripts/generateCityData.mjs osaka 오사카');
        process.exit(1);
    }

    return { city, destination };
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

function getOutputText(responseJson) {
    if (typeof responseJson.output_text === 'string') {
        return responseJson.output_text;
    }

    const textParts = [];

    for (const item of responseJson.output ?? []) {
        for (const content of item.content ?? []) {
            if (typeof content.text === 'string') {
                textParts.push(content.text);
            }
        }
    }

    return textParts.join('\n').trim();
}

const placeSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        id: { type: 'string' },
        city: { type: 'string' },
        slug: { type: 'string' },
        category: { type: 'string' },
        area: { type: 'string' },
        name: { type: 'string' },
        price: { type: 'string' },
        rating: { type: 'string' },
        image: { type: 'string' },
        verificationStatus: { type: 'string', enum: ['needs_review'] },
        sourceNote: { type: 'string' },
    },
    required: [
        'id',
        'city',
        'slug',
        'category',
        'area',
        'name',
        'price',
        'rating',
        'image',
        'verificationStatus',
        'sourceNote',
    ],
};

const categorySchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        category: { type: 'string' },
        places: {
            type: 'array',
            minItems: 3,
            maxItems: 4,
            items: placeSchema,
        },
    },
    required: ['category', 'places'],
};

const responseSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        city: { type: 'string' },
        destination: { type: 'string' },
        food: {
            type: 'array',
            minItems: 4,
            maxItems: 8,
            items: categorySchema,
        },
        tour: {
            type: 'array',
            minItems: 3,
            maxItems: 5,
            items: categorySchema,
        },
        stay: {
            type: 'array',
            minItems: 4,
            maxItems: 5,
            items: categorySchema,
        },
        reviewChecklist: {
            type: 'array',
            items: { type: 'string' },
        },
    },
    required: ['city', 'destination', 'food', 'tour', 'stay', 'reviewChecklist'],
};

const categorySlugByName = new Map([
    ['스시', 'sushi'],
    ['우동', 'udon'],
    ['라멘', 'ramen'],
    ['돈코츠', 'tonkotsu'],
    ['규카츠', 'gyukatsu'],
    ['텐동', 'tendon'],
    ['와규', 'wagyu'],
    ['카페/베이커리', 'cafe-bakery'],
    ['오코노미야키', 'okonomiyaki'],
    ['타코야키', 'takoyaki'],
    ['타코야끼', 'takoyaki'],
    ['쿠시카츠', 'kushikatsu'],
    ['SNS명소', 'sns'],
    ['역사', 'history'],
    ['소도시', 'smallcity'],
    ['근교/소도시', 'smallcity'],
    ['쇼핑', 'shopping'],
    ['전망대', 'observatory'],
    ['테마파크', 'themepark'],
    ['호텔', 'hotel'],
    ['호스텔', 'hostel'],
    ['료칸', 'ryokan'],
    ['전통숙소', 'traditional-stay'],
    ['캡슐', 'capsule'],
    ['캡슐/저가숙소', 'capsule-budget'],
    ['민슈쿠', 'minshuku'],
]);

function toAsciiSlug(value, fallback) {
    const slug = String(value)
        .normalize('NFKD')
        .toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return slug || fallback;
}

function getCategorySlug(category, index) {
    return categorySlugByName.get(category) || toAsciiSlug(category, `category-${index + 1}`);
}

function normalizeGeneratedData(data, args) {
    const normalized = {
        ...data,
        city: args.city,
        destination: args.destination,
    };

    for (const sectionName of ['food', 'tour', 'stay']) {
        const section = normalized[sectionName] ?? [];

        section.forEach((categoryGroup, categoryIndex) => {
            const categorySlug = getCategorySlug(categoryGroup.category, categoryIndex);

            categoryGroup.places = categoryGroup.places.map((place, placeIndex) => {
                const slug = toAsciiSlug(place.slug || place.name, `place-${placeIndex + 1}`);

                return {
                    ...place,
                    city: args.city,
                    slug,
                    id: `${args.city}-${categorySlug}-${slug}`,
                    image: `/images/${sectionName}/${args.city}/${categorySlug}/${slug}/${slug}.png`,
                    verificationStatus: 'needs_review',
                };
            });
        });
    }

    return normalized;
}

function buildPrompt({ city, destination }) {
    return `
너는 한국인 자유여행자를 위한 여행 데이터 큐레이터다.

목표:
- "${destination}" 도시의 맛집, 관광, 숙소 추천 데이터 초안을 만든다.
- 결과는 앱에 바로 넣기 전 검수할 JSON 초안이다.

프로젝트 카드 필드:
- id: "${city}-카테고리-slug" 형태의 kebab-case
- city: 반드시 "${city}"
- slug: 장소 영문 kebab-case
- category: 한국어 카테고리
- area: 한국어 지역명
- name: 한국어 표시명
- price: 대략 가격 범위. 예: "¥1,000~2,000", "₩ 120,000~", "무료"
- rating: 확실하지 않으면 "검수필요"
- image: "/images/<type>/${city}/<category-folder>/<slug>/<slug>.png" 형태의 placeholder
- verificationStatus: 항상 "needs_review"
- sourceNote: 검수할 때 확인해야 할 핵심 사실 1문장

카테고리 가이드:
- food: 현지 대표 음식, 라멘/스시처럼 도시 특성에 맞는 카테고리 4~8개, 카테고리당 3~4곳
- tour: SNS명소, 역사, 근교/소도시 등 3~5개, 카테고리당 3~4곳
- stay: 호텔, 호스텔, 료칸/전통숙소, 캡슐/저가숙소 등 4~5개, 카테고리당 3~4곳

주의:
- 실제 존재하는 장소 위주로 작성한다.
- 폐업 여부, 가격, 평점, 예약 가능 여부는 단정하지 말고 검수 대상으로 남긴다.
- 설명문을 길게 쓰지 말고 데이터 생성에 필요한 값만 채운다.
`.trim();
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    await loadEnv();

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;

    if (!apiKey) {
        console.error('Missing OPENAI_API_KEY. Create .env from .env.example and put your new API key there.');
        process.exit(1);
    }

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model,
            input: buildPrompt(args),
            text: {
                format: {
                    type: 'json_schema',
                    name: 'planp_city_data',
                    strict: true,
                    schema: responseSchema,
                },
            },
        }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
        console.error(JSON.stringify(responseJson, null, 2));
        process.exit(1);
    }

    const outputText = getOutputText(responseJson);
const parsed = JSON.parse(outputText);
    const normalized = normalizeGeneratedData(parsed, args);
    const outputDir = path.join(process.cwd(), 'generated');
    const outputPath = path.join(outputDir, `${args.city}.json`);

    await mkdir(outputDir, { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(normalized, null, 2)}\n`);

    console.log(`Generated ${outputPath}`);
    console.log('Review this JSON before converting it into src/data/*.ts files.');
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
