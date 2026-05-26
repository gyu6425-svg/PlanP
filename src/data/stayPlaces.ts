import type { ResultImageCardData } from '../components/cards/ResultImageCard';
import {
    generatedStayCategoryOptions,
    generatedStayPlaceCardsByCategory,
} from './generated/cityPlaces';
import { routes } from '../lib/routes';

const baseStayCategoryOptions = ['호텔', '호스텔', '료칸', '캡슐', '민슈쿠'];

const baseStayPlaceCardsByCategory: Record<string, ResultImageCardData[]> = {
    호텔: [
        {
            id: 'tokyo-hotel-rem',
            city: 'tokyo',
            slug: 'rem',
            category: '호텔',
            area: '도쿄',
            name: '렘 도쿄 교바시',
            price: '₩ 251,000~',
            rating: '4.5',
            image: '/images/stay/tokyo/hotel/rem/rem.png',
        },
        {
            id: 'tokyo-hotel-prince',
            city: 'tokyo',
            slug: 'prince',
            category: '호텔',
            area: '에비스',
            name: '프린스 스마트 인 에비스',
            price: '₩ 320,000~',
            rating: '4.7',
            image: '/images/stay/tokyo/hotel/prince/prince.png',
        },
        {
            id: 'tokyo-hotel-granbell',
            city: 'tokyo',
            slug: 'granbell',
            category: '호텔',
            area: '시부야',
            name: '시부야 그랑벨 호텔',
            price: '₩ 138,700~',
            rating: '4.9',
            image: '/images/stay/tokyo/hotel/granbell/granbell.png',
            href: routes.stayDetail('tokyo', 'hotel', 'granbell'),
        },
        {
            id: 'tokyo-hotel-domine',
            city: 'tokyo',
            slug: 'domine',
            category: '호텔',
            area: '하라주쿠',
            name: '도미인 진구마에',
            price: '₩ 358,900~',
            rating: '4.5',
            image: '/images/stay/tokyo/hotel/domine/domine.png',
        },
    ],
    호스텔: [
        {
            id: 'tokyo-hostel-nui',
            city: 'tokyo',
            slug: 'nui-hostel',
            category: '호스텔',
            area: '구라마에',
            name: 'Nui. 호스텔',
            price: '₩ 55,000~',
            rating: '4.6',
            image: '/images/stay/tokyo/hostel/nui_hostel/nui_hostel.png',
        },
        {
            id: 'tokyo-hostel-unplan-shinjuku',
            city: 'tokyo',
            slug: 'unplan-shinjuku',
            category: '호스텔',
            area: '신주쿠',
            name: 'UNPLAN 신주쿠',
            price: '₩ 62,000~',
            rating: '4.4',
            image: '/images/stay/tokyo/hostel/unplan_shinjuku/unplan_shinjuku.png',
        },
        {
            id: 'tokyo-hostel-citan',
            city: 'tokyo',
            slug: 'citan-hostel',
            category: '호스텔',
            area: '니혼바시',
            name: 'CITAN 호스텔',
            price: '₩ 58,000~',
            rating: '4.5',
            image: '/images/stay/tokyo/hostel/citan_hostel/citan_hostel.png',
        },
        {
            id: 'tokyo-hostel-khaosan-samurai',
            city: 'tokyo',
            slug: 'khaosan-samurai',
            category: '호스텔',
            area: '아사쿠사',
            name: '카오산 사무라이',
            price: '₩ 48,000~',
            rating: '4.3',
            image: '/images/stay/tokyo/hostel/khaosan_samurai/khaosan_samurai.png',
        },
    ],
    료칸: [
        {
            id: 'tokyo-ryokan-hoshinoya-tokyo',
            city: 'tokyo',
            slug: 'hoshinoya-tokyo',
            category: '료칸',
            area: '오테마치',
            name: '호시노야 도쿄',
            price: '₩ 980,000~',
            rating: '4.7',
            image: '/images/stay/tokyo/ryokan/hoshinoya_tokyo/hoshinoya_tokyo.png',
        },
        {
            id: 'tokyo-ryokan-kamogawa-asakusa',
            city: 'tokyo',
            slug: 'kamogawa-asakusa',
            category: '료칸',
            area: '아사쿠사',
            name: '카모가와 료칸',
            price: '₩ 180,000~',
            rating: '4.5',
            image: '/images/stay/tokyo/ryokan/kamogawa_asakusa/kamogawa_asakusa.png',
        },
        {
            id: 'tokyo-ryokan-sawanoya',
            city: 'tokyo',
            slug: 'sawanoya-ryokan',
            category: '료칸',
            area: '야나카',
            name: '사와노야 료칸',
            price: '₩ 120,000~',
            rating: '4.7',
            image: '/images/stay/tokyo/ryokan/sawanoya_ryokan/sawanoya_ryokan.png',
        },
        {
            id: 'tokyo-ryokan-shigetsu',
            city: 'tokyo',
            slug: 'ryokan-shigetsu',
            category: '료칸',
            area: '아사쿠사',
            name: '료칸 시게츠',
            price: '₩ 160,000~',
            rating: '4.4',
            image: '/images/stay/tokyo/ryokan/ryokan_shigetsu/ryokan_shigetsu.png',
        },
    ],
    캡슐: [
        {
            id: 'tokyo-capsule-nine-hours-akasa',
            city: 'tokyo',
            slug: 'nine-hours-akasaka',
            category: '캡슐',
            area: '아카사카',
            name: '나인아워스 아카사카',
            price: '₩ 45,000~',
            rating: '4.2',
            image: '/images/stay/tokyo/capsule/nine_hours_akasaka/nine_hours_akasaka.png',
        },
        {
            id: 'tokyo-capsule-first-cabin-akihabara',
            city: 'tokyo',
            slug: 'first-cabin-akihabara',
            category: '캡슐',
            area: '아키하바라',
            name: '퍼스트 캐빈',
            price: '₩ 65,000~',
            rating: '4.1',
            image: '/images/stay/tokyo/capsule/first_cabin_akihabara/first_cabin_akihabara.png',
        },
        {
            id: 'tokyo-capsule-anshin-oyado-shinjuku',
            city: 'tokyo',
            slug: 'anshin-oyado-shinjuku',
            category: '캡슐',
            area: '신주쿠',
            name: '안신 오야도',
            price: '₩ 70,000~',
            rating: '4.3',
            image: '/images/stay/tokyo/capsule/anshin_oyado_shinjuku/anshin_oyado_shinjuku.png',
        },
        {
            id: 'tokyo-capsule-rembrandt-shinjuku',
            city: 'tokyo',
            slug: 'rembrandt-cabin-shinjuku',
            category: '캡슐',
            area: '신주쿠',
            name: '렘브란트 캐빈',
            price: '₩ 50,000~',
            rating: '4.0',
            image: '/images/stay/tokyo/capsule/rembrandt_cabin_shinjuku/rembrandt_cabin_shinjuku.png',
        },
    ],
    민슈쿠: [
        {
            id: 'tokyo-minshuku-taito-ryokan',
            city: 'tokyo',
            slug: 'taito-ryokan',
            category: '민슈쿠',
            area: '아사쿠사',
            name: '타이토 료칸',
            price: '₩ 80,000~',
            rating: '4.3',
            image: '/images/stay/tokyo/minshuku/taito_ryokan/taito_ryokan.png',
        },
        {
            id: 'tokyo-minshuku-andon',
            city: 'tokyo',
            slug: 'andon-ryokan',
            category: '민슈쿠',
            area: '미노와',
            name: '안돈 료칸',
            price: '₩ 95,000~',
            rating: '4.4',
            image: '/images/stay/tokyo/minshuku/andon_ryokan/andon_ryokan.png',
        },
        {
            id: 'tokyo-minshuku-homeikan',
            city: 'tokyo',
            slug: 'homeikan',
            category: '민슈쿠',
            area: '혼고',
            name: '호메이칸',
            price: '₩ 130,000~',
            rating: '4.5',
            image: '/images/stay/tokyo/minshuku/homeikan/homeikan.png',
        },
        {
            id: 'tokyo-minshuku-family-inn-saiko',
            city: 'tokyo',
            slug: 'family-inn-saiko',
            category: '민슈쿠',
            area: '이케부쿠로',
            name: '패밀리 인 사이코',
            price: '₩ 110,000~',
            rating: '4.6',
            image: '/images/stay/tokyo/minshuku/family_inn_saiko/family_inn_saiko.png',
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

export const stayCategoryOptions = mergeCategoryOptions(
    baseStayCategoryOptions,
    generatedStayCategoryOptions
);

export const stayPlaceCardsByCategory = mergeCardsByCategory(
    baseStayPlaceCardsByCategory,
    generatedStayPlaceCardsByCategory
);
