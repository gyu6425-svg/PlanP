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
            image: 'https://lh3.googleusercontent.com/place-photos/AJRVUZNVg_Wkjql3qYgwJfIKCsIVvYLd_QY9FiPYoBk8jGX5fBjgJ74B-ZILqRyc-moU9Qs2CMvmgMLRjDRT_98Fq8kSp7MiSl-kuXwrrTNUuVlsQWD_3wWHrdIe_b3cW2an1KbGH3ic8OlDrRKtyQ=s4800-w1200',
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
            image: 'https://lh3.googleusercontent.com/place-photos/AJRVUZNUhl32BWLy0ZJvh8ABvitx-pn_xhMowa8-s10HPb57iWSlfTlOz5gn1NDGsT8ioEu29fkTJ3-wknfV-R5OfTHWftVTq0YGZjYwpD68sjj9TySuCKr4ZZMZbxwRrLfow1ntbnP9RpuVrMWM_4I=s4800-w1200',
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
            image: 'https://lh3.googleusercontent.com/place-photos/AJRVUZPlO0hB4kq4NaqL7pzl5qsVYT7UjcyudrPoO2Nn0HWG40iWIjCQsxCNwM7KATD7ATyUloRY8YZhr6FnxKRkDgXAZlU1fAM0qG3LFBFpG0H2reQlTAAU9zp3xRL0M2Pbf80Yv363jWo8JB7SQg=s4800-w1200',
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
            image: 'https://lh3.googleusercontent.com/places/ANXAkqHCi5AcsHoFsM60_fRTA7PFJkw2OOaNjtxxl3vvfM9Jrms5Q_k0UE20z9dU5UZKQPT6qQoxVoFSt60DRKbpKId7A41S-ZTFSZA=s4800-w567',
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
            image: 'https://lh3.googleusercontent.com/place-photos/AJRVUZNgd3HmFBRdb_s9w7X7DEmPfjjYSgbOUyyVVt8Qaeg8D1gG8x2eVfmgN4kqFmpUILeSe1MswOkOz9uOaXILsaw4aC28KLQNgGR9s9TTCTieKKzfdilmsa0NC2GmJl5sF6-4dAGAdbnI_G7t20Q=s4800-w1200',
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
            image: 'https://lh3.googleusercontent.com/places/ANXAkqEnLOsPlzhGQoQZo2HFSTIhu187E_KUSQJ9qgcLDz3tt40qfhl7vTD5h7ajUUtp8kc8eJI6NG7YZkpxcfIB35BraDGAyg4rcyg=s4800-w1199',
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
            image: 'https://lh3.googleusercontent.com/places/ANXAkqE3NJeWvchihEA1-_E_Mgwe3Goj2cfxVAPNcmDOq-vlPYOtl_Up1JzKCgYAKriMLMVe3BJp3yg3miGpiYXo2icTD-PMhQE9nNM=s4800-w1200',
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
            image: 'https://lh3.googleusercontent.com/place-photos/AJRVUZOPU4yb1CHbFVBBLZdT2o8aAZxkxFIyF6D7DCnxqEiX3osXazmHgmB3Kj4YocvxDvorwxXeIKKBpd4i9pCoa3N6M_smELnALl_qelnUXmKoHABRgaTGIFJjxsmJqciVmLexIYar14qvDCuU2yE=s4800-w1200',
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
            image: 'https://lh3.googleusercontent.com/place-photos/AJRVUZNMS0KiimXh74631YrsvqVHRnQDLSJX5fy7O96Sdojc0L458JlqO1hxmXBIPgZWtRHJDkZEYDgDGNyRMBbw1VAdFgYnY0zgrEicdbFr-NeMVJ_Z-ICbhnAXjJJA9o_K6ML9TnNjH4uDOV3q0yxQPes=s4800-w1200',
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
            image: 'https://lh3.googleusercontent.com/places/ANXAkqGtkZTVMq1RM2o4Woa7mpGDUA94UCzGUwo7DaTEk0nPmoqbYTJrsVP7Ehmpcw7MmQvPlyj7p5X8ivv7KsX2rmIB1cPcrwYm4p8=s4800-w667',
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
            image: 'https://lh3.googleusercontent.com/place-photos/AJRVUZO0AWUYPYzhnFpPu9EPgVff7uucs4JTMK5HmdQZEC1VIX8BPAxwnpciCqmlf39HfWb9kv8FCJ7Z5YhMSnZ6TUoQS1G6mpppyRIpwRg4We6hHdi1XPkiaWWnkFWIYY8d9o8H9PqrfloNgnPHgg=s4800-w1200',
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
            image: 'https://lh3.googleusercontent.com/place-photos/AJRVUZNMS0KiimXh74631YrsvqVHRnQDLSJX5fy7O96Sdojc0L458JlqO1hxmXBIPgZWtRHJDkZEYDgDGNyRMBbw1VAdFgYnY0zgrEicdbFr-NeMVJ_Z-ICbhnAXjJJA9o_K6ML9TnNjH4uDOV3q0yxQPes=s4800-w1200',
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
        const currentCards = mergedCards[category] ?? [];
        const currentIds = new Set(currentCards.map((card) => card.id));
        const currentKeys = new Set(
            currentCards.map((card) => `${card.city ?? ''}/${card.category}/${card.slug ?? card.name}`)
        );
        const nextCards = cards.filter(
            (card) =>
                !currentIds.has(card.id) &&
                !currentKeys.has(`${card.city ?? ''}/${card.category}/${card.slug ?? card.name}`)
        );

        mergedCards[category] = [...currentCards, ...nextCards];
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
