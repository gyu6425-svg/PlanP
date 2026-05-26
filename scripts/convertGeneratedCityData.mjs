import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const generatedDir = path.join(process.cwd(), 'generated');
const outputPath = path.join(process.cwd(), 'src/data/generated/cityPlaces.ts');

const normalizedCategoryByName = new Map([
    ['타코야끼', '타코야키'],
    ['SNS 명소', 'SNS명소'],
    ['근교·소도시', '소도시'],
    ['근교/소도시', '소도시'],
    ['랜드마크·역사', '역사'],
    ['료칸·전통숙소', '료칸'],
    ['전통숙소', '료칸'],
    ['캡슐·저가숙소', '캡슐'],
    ['캡슐/저가숙소', '캡슐'],
]);

function normalizeCategory(category) {
    return normalizedCategoryByName.get(category) || category;
}

function toCard(place) {
    return {
        id: place.id,
        city: place.city,
        slug: place.slug,
        category: normalizeCategory(place.category),
        area: place.area,
        name: place.name,
        price: place.price,
        rating: place.rating === '검수필요' ? '-' : place.rating,
        image: place.image,
    };
}

function addGroups(target, options, groups = []) {
    for (const group of groups) {
        const category = normalizeCategory(group.category);

        if (!options.includes(category)) {
            options.push(category);
        }

        target[category] = target[category] ?? [];
        target[category].push(...group.places.map((place) => toCard({ ...place, category })));
    }
}

async function readGeneratedCities() {
    const entries = await readdir(generatedDir, { withFileTypes: true });
    const jsonFiles = entries
        .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
        .map((entry) => entry.name)
        .sort();

    const cities = [];

    for (const fileName of jsonFiles) {
        const filePath = path.join(generatedDir, fileName);
        const data = JSON.parse(await readFile(filePath, 'utf8'));
        cities.push(data);
    }

    return cities;
}

function serializeExport(name, value) {
    return `export const ${name} = ${JSON.stringify(value, null, 4)};\n`;
}

async function main() {
    const cities = await readGeneratedCities();

    const foodCards = {};
    const tourCards = {};
    const stayCards = {};
    const foodOptions = [];
    const tourOptions = [];
    const stayOptions = [];

    for (const city of cities) {
        addGroups(foodCards, foodOptions, city.food);
        addGroups(tourCards, tourOptions, city.tour);
        addGroups(stayCards, stayOptions, city.stay);
    }

    const contents = [
        "import type { ResultImageCardData } from '../../components/cards/ResultImageCard';",
        '',
        'type CardsByCategory = Record<string, ResultImageCardData[]>;',
        '',
        serializeExport('generatedFoodCategoryOptions', foodOptions),
        serializeExport('generatedTourCategoryOptions', tourOptions),
        serializeExport('generatedStayCategoryOptions', stayOptions),
        `export const generatedFoodPlaceCardsByCategory: CardsByCategory = ${JSON.stringify(foodCards, null, 4)};`,
        '',
        `export const generatedTourPlaceCardsByCategory: CardsByCategory = ${JSON.stringify(tourCards, null, 4)};`,
        '',
        `export const generatedStayPlaceCardsByCategory: CardsByCategory = ${JSON.stringify(stayCards, null, 4)};`,
        '',
    ].join('\n');

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, contents);

    console.log(`Converted ${cities.length} generated city file(s) into ${outputPath}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
