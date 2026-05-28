import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputPath = path.join(process.cwd(), 'generated', 'tokyo.json');

const manualSlugsBySection = {
    food: new Set(['ginza-hachigo', 'sushi-no-midori-ginza']),
    tour: new Set(['shibuya-sky']),
    stay: new Set(['granbell']),
};

const sourceBySection = {
    food: 'src/data/foodPlaces.ts',
    tour: 'src/data/tourPlaces.ts',
    stay: 'src/data/stayPlaces.ts',
};

function parseCardObjects(sourceText) {
    const objects = [];
    const objectPattern = /\{\n\s*id:\s*'tokyo-[\s\S]*?\n\s*\}/g;

    for (const match of sourceText.matchAll(objectPattern)) {
        const objectText = match[0];

        if (!objectText.includes("city: 'tokyo'")) {
            continue;
        }

        const card = {};

        for (const field of ['id', 'slug', 'category', 'area', 'name', 'price', 'rating', 'image']) {
            const fieldMatch = objectText.match(new RegExp(`${field}:\\s*'([^']*)'`));

            if (fieldMatch) {
                card[field] = fieldMatch[1];
            }
        }

        if (card.id && card.slug && card.category && card.name) {
            card.city = 'tokyo';
            objects.push(card);
        }
    }

    return objects;
}

function groupPlaces(cards, sectionName) {
    const groups = new Map();
    const manualSlugs = manualSlugsBySection[sectionName] ?? new Set();

    for (const card of cards) {
        if (manualSlugs.has(card.slug)) {
            continue;
        }

        const category = card.category;
        const group = groups.get(category) ?? { category, places: [] };
        group.places.push(card);
        groups.set(category, group);
    }

    return [...groups.values()];
}

async function main() {
    const result = {
        city: 'tokyo',
        destination: '도쿄',
        food: [],
        tour: [],
        stay: [],
    };

    for (const [sectionName, filePath] of Object.entries(sourceBySection)) {
        const sourceText = await readFile(filePath, 'utf8');
        result[sectionName] = groupPlaces(parseCardObjects(sourceText), sectionName);
    }

    await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);

    const counts = Object.fromEntries(
        ['food', 'tour', 'stay'].map((sectionName) => [
            sectionName,
            result[sectionName].reduce((sum, group) => sum + group.places.length, 0),
        ])
    );

    console.log(`Wrote ${outputPath}`);
    console.log(counts);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
