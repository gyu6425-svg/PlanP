import type { ResultImageCardData } from '../../components/cards/ResultImageCard';
import type { FoodPlaceDetail } from '../foodPlaceDetails';
import type { StayPlaceDetail } from '../stayPlaceDetails';
import type { TourPlaceDetail } from '../tourPlaceDetails';
import { foodPlaceCardsByCategory } from '../foodPlaces';
import { tourPlaceCardsByCategory } from '../tourPlaces';
import { buildStreetViewImages } from '../streetView';

const foodDetailModules = import.meta.glob<{
    generatedFoodPlaceDetailsById: Record<string, FoodPlaceDetail>;
}>('./details/*/foodPlaceDetails.ts');

const tourDetailModules = import.meta.glob<{
    generatedTourPlaceDetailsById: Record<string, TourPlaceDetail>;
}>('./details/*/tourPlaceDetails.ts');

const stayDetailModules = import.meta.glob<{
    generatedStayPlaceDetailsById: Record<string, StayPlaceDetail>;
}>('./details/*/stayPlaceDetails.ts');

type DetailImageRecord = {
    id: string;
    slug: string;
    category: string;
    city: string;
    name: string;
    address: string;
    images: string[];
    streetViewImages?: string[];
    mapImages: {
        main: string;
        sub1: string;
        sub2: string;
    };
};

type CardLookup = {
    byId: Map<string, ResultImageCardData>;
    bySlug: Map<string, ResultImageCardData>;
    byCategory: Map<string, ResultImageCardData[]>;
};

function buildCardLookup(cardsByCategory: Record<string, ResultImageCardData[]>): CardLookup {
    const byId = new Map<string, ResultImageCardData>();
    const bySlug = new Map<string, ResultImageCardData>();
    const byCategory = new Map<string, ResultImageCardData[]>();

    Object.entries(cardsByCategory).forEach(([category, cards]) => {
        const nextCards: ResultImageCardData[] = [];

        cards.forEach((card) => {
            if (card.id) {
                byId.set(card.id, card);
            }

            if (card.slug) {
                bySlug.set(card.slug, card);
            }

            nextCards.push(card);
        });

        byCategory.set(category, nextCards);
    });

    return { byId, bySlug, byCategory };
}

function dedupeImages(images: string[]) {
    return Array.from(new Set(images.filter(Boolean)));
}

function normalizeTokyoDetailImages(
    detail: DetailImageRecord,
    lookup: CardLookup
): DetailImageRecord {
    if (detail.city !== 'tokyo') {
        return detail;
    }

    const card =
        lookup.byId.get(detail.id) ??
        lookup.bySlug.get(detail.slug) ??
        lookup.byCategory.get(detail.category)?.find((entry) => entry.city === 'tokyo');

    if (!card) {
        return detail;
    }

    const categoryCards = lookup.byCategory.get(detail.category) ?? [];
    const imagePool = dedupeImages([
        card.image,
        ...categoryCards.map((entry) => entry.image),
        ...detail.images,
        detail.mapImages.main,
        detail.mapImages.sub1,
        detail.mapImages.sub2,
    ]);

    if (imagePool.length === 0) {
        return detail;
    }

    const normalizedImages = imagePool.slice(0, 6);
    const [main, sub1 = main, sub2 = sub1] = normalizedImages;

    return {
        ...detail,
        images: normalizedImages,
        mapImages: {
            main,
            sub1,
            sub2,
        },
    };
}

function injectStreetViewImages(detail: DetailImageRecord): DetailImageRecord {
    return {
        ...detail,
        streetViewImages: buildStreetViewImages(`${detail.name} ${detail.address}`, [
            detail.images[0],
            detail.mapImages.main,
            detail.mapImages.sub1,
        ]),
    };
}

const foodCardLookup = buildCardLookup(foodPlaceCardsByCategory);
const tourCardLookup = buildCardLookup(tourPlaceCardsByCategory);

export async function loadGeneratedFoodPlaceDetails(city: string) {
    const loader = foodDetailModules[`./details/${city}/foodPlaceDetails.ts`];
    const module = loader ? await loader() : undefined;
    const details = module?.generatedFoodPlaceDetailsById ?? {};

    if (city !== 'tokyo') {
        return details;
    }

    return Object.fromEntries(
        Object.entries(details).map(([id, detail]) => [
            id,
            injectStreetViewImages(
                normalizeTokyoDetailImages(detail as DetailImageRecord, foodCardLookup)
            ) as FoodPlaceDetail,
        ])
    );
}

export async function loadGeneratedTourPlaceDetails(city: string) {
    const loader = tourDetailModules[`./details/${city}/tourPlaceDetails.ts`];
    const module = loader ? await loader() : undefined;
    const details = module?.generatedTourPlaceDetailsById ?? {};

    if (city !== 'tokyo') {
        return details;
    }

    return Object.fromEntries(
        Object.entries(details).map(([id, detail]) => [
            id,
            injectStreetViewImages(
                normalizeTokyoDetailImages(detail as DetailImageRecord, tourCardLookup)
            ) as TourPlaceDetail,
        ])
    );
}

export async function loadGeneratedStayPlaceDetails(city: string) {
    const loader = stayDetailModules[`./details/${city}/stayPlaceDetails.ts`];
    const module = loader ? await loader() : undefined;
    const details = module?.generatedStayPlaceDetailsById ?? {};

    return Object.fromEntries(
        Object.entries(details).map(([id, detail]) => [
            id,
            injectStreetViewImages(detail as DetailImageRecord) as StayPlaceDetail,
        ])
    );
}
