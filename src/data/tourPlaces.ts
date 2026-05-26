import type { ResultImageCardData } from '../components/cards/ResultImageCard';
import {
    generatedTourCategoryOptions,
    generatedTourPlaceCardsByCategory,
} from './generated/cityPlaces';
import { routes } from '../lib/routes';

const baseTourCategoryOptions = ['SNS명소', '역사', '소도시'];

const baseTourPlaceCardsByCategory: Record<string, ResultImageCardData[]> = {
    SNS명소: [
        {
            id: 'tokyo-sns-shibuya-sky',
            city: 'tokyo',
            slug: 'shibuya-sky',
            category: 'SNS명소',
            area: '시부야',
            name: '시부야 스카이',
            price: '₩ 25,000~',
            rating: '4.9',
            image: '/images/tour/tokyo/sns/shibuya_sky/shibuya_sky.png',
            href: routes.tourDetail('tokyo', 'sns', 'shibuya-sky'),
        },
        {
            id: 'tokyo-sns-omohills',
            city: 'tokyo',
            slug: 'omohills',
            category: 'SNS명소',
            area: '시부야',
            name: '오모테산도 힐스',
            price: '₩ 0~',
            rating: '4.7',
            image: '/images/tour/tokyo/sns/omotesando_hills/omotesando_hills.png',
            href: routes.tourDetail('tokyo', 'sns', 'omotesando-hills'),
        },
        {
            id: 'tokyo-sns-x',
            city: 'tokyo',
            slug: 'shibuya-scramble',
            category: 'SNS명소',
            area: '시부야',
            name: '시부야 스크램블',
            price: '₩ 0~',
            rating: '4.6',
            image: '/images/tour/tokyo/sns/shibuya_scramble/shibuya_scramble.png',
            href: routes.tourDetail('tokyo', 'sns', 'shibuya-scramble'),
        },
    ],
    역사: [
        {
            id: 'tokyo-history-meiji-jingu',
            city: 'tokyo',
            slug: 'meiji-jingu',
            category: '역사',
            area: '하라주쿠',
            name: '메이지 신궁',
            price: '₩ 0~',
            rating: '4.8',
            image: '/images/tour/tokyo/history/meiji_jingu/meiji_jingu.png',
            href: routes.tourDetail('tokyo', 'history', 'meiji-jingu'),
        },
        {
            id: 'tokyo-history-sensoji',
            city: 'tokyo',
            slug: 'sensoji',
            category: '역사',
            area: '아사쿠사',
            name: '센소지',
            price: '₩ 0~',
            rating: '4.7',
            image: '/images/tour/tokyo/history/sensoji/sensoji.png',
            href: routes.tourDetail('tokyo', 'history', 'sensoji'),
        },
        {
            id: 'tokyo-history-imperial-palace-east-gardens',
            city: 'tokyo',
            slug: 'imperial-palace-east-gardens',
            category: '역사',
            area: '마루노우치',
            name: '고쿄 히가시교엔',
            price: '₩ 0~',
            rating: '4.6',
            image: '/images/tour/tokyo/history/imperial_palace_east_gardens/imperial_palace_east_gardens.png',
            href: routes.tourDetail('tokyo', 'history', 'imperial-palace-east-gardens'),
        },
    ],
    소도시: [
        {
            id: 'tokyo-smallcity-kamakura-enoshima',
            city: 'tokyo',
            slug: 'kamakura-enoshima',
            category: '소도시',
            area: '가마쿠라',
            name: '가마쿠라·에노시마',
            price: '₩ 0~',
            rating: '4.8',
            image: '/images/tour/tokyo/smallcity/kamakura_enoshima/kamakura_enoshima.png',
            href: routes.tourDetail('tokyo', 'smallcity', 'kamakura-enoshima'),
        },
        {
            id: 'tokyo-smallcity-mount-fuji-tour',
            city: 'tokyo',
            slug: 'mount-fuji-tour',
            category: '소도시',
            area: '후지산',
            name: '후지산 5합목 투어',
            price: '₩ 70,000~',
            rating: '4.7',
            image: '/images/tour/tokyo/smallcity/mount_fuji_tour/mount_fuji_tour.png',
            href: routes.tourDetail('tokyo', 'smallcity', 'mount-fuji-tour'),
        },
    ],
};

function mergeCategoryOptions(baseOptions: string[], generatedOptions: string[]) {
    return [...baseOptions, ...generatedOptions.filter((option) => !baseOptions.includes(option))];
}

function mergeCardsByCategory(
    baseCards: Record<string, ResultImageCardData[]>,
    generatedCards: Record<string, ResultImageCardData[]>
) {
    const mergedCards = { ...baseCards };

    Object.entries(generatedCards).forEach(([category, cards]) => {
        mergedCards[category] = [...(mergedCards[category] ?? []), ...cards];
    });

    return mergedCards;
}

export const tourCategoryOptions = mergeCategoryOptions(
    baseTourCategoryOptions,
    generatedTourCategoryOptions
);

export const tourPlaceCardsByCategory = mergeCardsByCategory(
    baseTourPlaceCardsByCategory,
    generatedTourPlaceCardsByCategory
);
