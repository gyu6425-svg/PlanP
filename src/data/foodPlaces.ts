import type { ResultImageCardData } from '../components/cards/ResultImageCard';
import {
    generatedFoodCategoryOptions,
    generatedFoodPlaceCardsByCategory,
} from './generated/cityPlaces';
import { routes } from '../lib/routes';

const baseFoodCategoryOptions = [
    '스시',
    '우동',
    '라멘',
    '돈코츠',
    '규카츠',
    '텐동',
    '와규',
    '카페/베이커리',
];

const baseFoodPlaceCardsByCategory: Record<string, ResultImageCardData[]> = {
    스시: [
        {
            id: 'tokyo-sushi-midori-ginza',
            city: 'tokyo',
            slug: 'sushi-no-midori-ginza',
            category: '스시',
            area: '시부야',
            name: '스시노 미도리',
            price: '¥2,000~4,000',
            rating: '4.3',
            image: '/images/food/tokyo/sushi/sushiMedori/sushiMedori.png',
        },
        {
            id: 'tokyo-sushi-dai',
            city: 'tokyo',
            slug: 'sushi-dai',
            category: '스시',
            area: '도요스',
            name: '스시 다이',
            price: '¥5,000~8,000',
            rating: '4.5',
            image: '/images/food/tokyo/sushi/sushi_dai/sushi_dai.png',
        },
        {
            id: 'tokyo-sushi-nemuro-hanamaru-ginza',
            city: 'tokyo',
            slug: 'nemuro-hanamaru-ginza',
            category: '스시',
            area: '긴자',
            name: '네무로 하나마루',
            price: '¥2,000~4,000',
            rating: '4.1',
            image: '/images/food/tokyo/sushi/nemuro_hanamaru_ginza/nemuro_hanamaru_ginza.png',
        },
        {
            id: 'tokyo-sushi-kinka-shibuya',
            city: 'tokyo',
            slug: 'kinka-sushi-shibuya',
            category: '스시',
            area: '시부야',
            name: 'KINKA 스시 바',
            price: '¥3,000~5,000',
            rating: '4.5',
            image: '/images/food/tokyo/sushi/kinka_sushi_shibuya/kinka_sushi_shibuya.png',
        },
    ],
    우동: [
        {
            id: 'tokyo-udon-hanayama-ginza',
            city: 'tokyo',
            slug: 'godaime-hanayama-udon-ginza',
            category: '우동',
            area: '긴자',
            name: '하나야마 우동',
            price: '¥1,000~2,000',
            rating: '4.2',
            image: '/images/food/tokyo/udon/godaime_hanayama_udon_ginza/godaime_hanayama_udon_ginza.png',
        },
        {
            id: 'tokyo-udon-shin',
            city: 'tokyo',
            slug: 'udon-shin',
            category: '우동',
            area: '요요기',
            name: '우동 신',
            price: '¥1,000~2,000',
            rating: '4.4',
            image: '/images/food/tokyo/udon/udon_shin/udon_shin.png',
        },
        {
            id: 'tokyo-udon-tsurutontan-shibuya',
            city: 'tokyo',
            slug: 'tsurutontan-shibuya',
            category: '우동',
            area: '시부야',
            name: '츠루톤탄',
            price: '¥1,000~2,000',
            rating: '4.1',
            image: '/images/food/tokyo/udon/tsurutontan_shibuya/tsurutontan_shibuya.png',
        },
        {
            id: 'tokyo-udon-yamashita-honki',
            city: 'tokyo',
            slug: 'yamashita-honki-udon',
            category: '우동',
            area: '도겐자카',
            name: '야마시타 혼키 우동',
            price: '¥1,000~2,000',
            rating: '4.0',
            image: '/images/food/tokyo/udon/yamashita_honki_udon/yamashita_honki_udon.png',
        },
    ],
    라멘: [
        {
            id: 'tokyo-ramen-ginza-hachigo',
            city: 'tokyo',
            slug: 'ginza-hachigo',
            category: '라멘',
            area: '긴자',
            name: '긴자 하치고',
            price: '¥1,000~2,000',
            rating: '4.9',
            image: '/images/food/tokyo/ramen/ramen_ginzahachigo/ramen_ginzahachigo.png',
            href: routes.foodDetail('tokyo', 'ramen', 'ginza-hachigo'),
        },
        {
            id: 'tokyo-ramen-motenashi-kuroki',
            city: 'tokyo',
            slug: 'motenashi-kuroki',
            category: '라멘',
            area: '아사쿠사',
            name: '모테나시 쿠로키',
            price: '¥1,000~2,000',
            rating: '4.6',
            image: '/images/food/tokyo/ramen/motenashi_kuroki/motenashi_kuroki.png',
        },
        {
            id: 'tokyo-ramen-muginae',
            city: 'tokyo',
            slug: 'muginae',
            category: '라멘',
            area: '오모리',
            name: '무기나에',
            price: '¥1,000~2,000',
            rating: '4.4',
            image: '/images/food/tokyo/ramen/muginae/muginae.png',
        },
        {
            id: 'tokyo-ramen-kumon-halal',
            city: 'tokyo',
            slug: 'kumon-halal',
            category: '라멘',
            area: '시부야',
            name: '규몬 할랄 라멘',
            price: '¥1,000~2,000',
            rating: '4.0',
            image: '/images/food/tokyo/ramen/kumon_halal/kumon_halal.png',
        },
    ],
    돈코츠: [
        {
            id: 'tokyo-tonkotsu-ichiran-shibuya',
            city: 'tokyo',
            slug: 'ichiran-shibuya',
            category: '돈코츠',
            area: '시부야',
            name: '이치란',
            price: '¥1,000~2,000',
            rating: '4.0',
            image: '/images/food/tokyo/tonkotsu/ichiran_shibuya/ichiran_shibuya.png',
        },
        {
            id: 'tokyo-tonkotsu-ippudo-ginza',
            city: 'tokyo',
            slug: 'ippudo-ginza',
            category: '돈코츠',
            area: '긴자',
            name: '잇푸도',
            price: '¥1,000~2,000',
            rating: '4.2',
            image: '/images/food/tokyo/tonkotsu/ippudo_ginza/ippudo_ginza.png',
        },
        {
            id: 'tokyo-tonkotsu-ramen-nagi-butao',
            city: 'tokyo',
            slug: 'ramen-nagi-butao-shibuya',
            category: '돈코츠',
            area: '시부야',
            name: '라멘 나기 BUTAO',
            price: '¥1,000~2,000',
            rating: '4.3',
            image: '/images/food/tokyo/tonkotsu/ramen_nagi_butao_shibuya/ramen_nagi_butao_shibuya.png',
        },
        {
            id: 'tokyo-tonkotsu-hakata-furyu',
            city: 'tokyo',
            slug: 'hakata-furyu-shinjuku',
            category: '돈코츠',
            area: '신주쿠',
            name: '하카타 후류',
            price: '¥1,000~2,000',
            rating: '4.0',
            image: '/images/food/tokyo/tonkotsu/hakata_furyu_shinjuku/hakata_furyu_shinjuku.png',
        },
    ],
    규카츠: [
        {
            id: 'tokyo-gyukatsu-motomura-shibuya',
            city: 'tokyo',
            slug: 'gyukatsu-motomura-shibuya',
            category: '규카츠',
            area: '시부야',
            name: '규카츠 모토무라',
            price: '¥2,000~3,000',
            rating: '4.7',
            image: '/images/food/tokyo/gyukatsu/gyukatsu_motomura_shibuya/gyukatsu_motomura_shibuya.png',
        },
        {
            id: 'tokyo-gyukatsu-kyoto-katsugyu-akihabara',
            city: 'tokyo',
            slug: 'kyoto-katsugyu-akihabara',
            category: '규카츠',
            area: '아키하바라',
            name: '교토 카츠규',
            price: '¥2,000~3,000',
            rating: '4.8',
            image: '/images/food/tokyo/gyukatsu/kyoto_katsugyu_akihabara/kyoto_katsugyu_akihabara.png',
        },
        {
            id: 'tokyo-gyukatsu-motomura-shinjuku',
            city: 'tokyo',
            slug: 'gyukatsu-motomura-shinjuku',
            category: '규카츠',
            area: '신주쿠',
            name: '모토무라 신주쿠',
            price: '¥2,000~3,000',
            rating: '4.5',
            image: '/images/food/tokyo/gyukatsu/gyukatsu_motomura_shinjuku/gyukatsu_motomura_shibuya.png',
        },
        {
            id: 'tokyo-gyukatsu-kyoto-katsugyu-harajuku',
            city: 'tokyo',
            slug: 'kyoto-katsugyu-harajuku',
            category: '규카츠',
            area: '하라주쿠',
            name: '카츠규 하라주쿠',
            price: '¥2,000~3,000',
            rating: '4.4',
            image: '/images/food/tokyo/gyukatsu/kyoto_katsugyu_harajuku/gyukatsu_motomura_shibuya.png',
        },
    ],
    텐동: [
        {
            id: 'tokyo-tendon-kaneko-hannosuke',
            city: 'tokyo',
            slug: 'kaneko-hannosuke-nihonbashi',
            category: '텐동',
            area: '니혼바시',
            name: '카네코 한노스케',
            price: '¥1,000~2,000',
            rating: '4.3',
            image: '/images/food/tokyo/tendon/kaneko_hannosuke_nihonbashi/kaneko_hannosuke_nihonbashi.png',
        },
        {
            id: 'tokyo-tendon-kaneko-hannosuke-tsukiji',
            city: 'tokyo',
            slug: 'kaneko-hannosuke-tsukiji',
            category: '텐동',
            area: '츠키지',
            name: '한노스케 츠키지',
            price: '¥1,000~2,000',
            rating: '5.0',
            image: '/images/food/tokyo/tendon/kaneko_hannosuke_tsukiji/kaneko_hannosuke_nihonbashi.png',
        },
        {
            id: 'tokyo-tendon-tempura-abe',
            city: 'tokyo',
            slug: 'tempura-abe',
            category: '텐동',
            area: '긴자',
            name: '텐푸라 아베',
            price: '¥1,000~4,000',
            rating: '4.4',
            image: '/images/food/tokyo/tendon/tempura_abe/tempura_abe.png',
        },
        {
            id: 'tokyo-tendon-tenya-asakusa',
            city: 'tokyo',
            slug: 'tendon-tenya-asakusa',
            category: '텐동',
            area: '아사쿠사',
            name: '텐동 텐야',
            price: '¥1,000 이하',
            rating: '4.0',
            image: '/images/food/tokyo/tendon/tendon_tenya_asakusa/tendon_tenya_asakusa.png',
        },
    ],
    와규: [
        {
            id: 'tokyo-wagyu-imafuku',
            city: 'tokyo',
            slug: 'imafuku',
            category: '와규',
            area: '시로카네',
            name: '이마후쿠',
            price: '¥10,000~20,000',
            rating: '4.3',
            image: '/images/food/tokyo/wagyu/imafuku/imafuku.png',
        },
        {
            id: 'tokyo-wagyu-yakiniku-jumbo-hanare',
            city: 'tokyo',
            slug: 'yakiniku-jumbo-hanare',
            category: '와규',
            area: '혼고',
            name: '야키니쿠 점보 하나레',
            price: '¥10,000~20,000',
            rating: '4.5',
            image: '/images/food/tokyo/wagyu/yakiniku_jumbo_hanare/yakiniku_jumbo_hanare.png',
        },
        {
            id: 'tokyo-wagyu-ginza-steak',
            city: 'tokyo',
            slug: 'ginza-steak',
            category: '와규',
            area: '긴자',
            name: '긴자 스테이크',
            price: '¥8,000~15,000',
            rating: '4.4',
            image: '/images/food/tokyo/wagyu/ginza_steak/ginza_steak.png',
        },
        {
            id: 'tokyo-wagyu-kobe-beef-511',
            city: 'tokyo',
            slug: 'kobe-beef-511',
            category: '와규',
            area: '아카사카',
            name: '고베 비프 511',
            price: '¥10,000~20,000',
            rating: '4.6',
            image: '/images/food/tokyo/wagyu/kobe_beef_511/kobe_beef_511.png',
        },
    ],
    '카페/베이커리': [
        {
            id: 'tokyo-cafe-aoyama-flower-market',
            city: 'tokyo',
            slug: 'aoyama-flower-market-tea-house',
            category: '카페/베이커리',
            area: '아오야마',
            name: '플라워 마켓 티하우스',
            price: '¥1,000~2,000',
            rating: '4.2',
            image: '/images/food/tokyo/cafe-bakery/aoyama_flower_market_tea_house/aoyama_flower_market_tea_house.png',
        },
        {
            id: 'tokyo-cafe-city-bakery-aoyama',
            city: 'tokyo',
            slug: 'city-bakery-aoyama',
            category: '카페/베이커리',
            area: '아오야마',
            name: '더 시티 베이커리',
            price: '¥1,000~2,000',
            rating: '4.1',
            image: '/images/food/tokyo/cafe-bakery/city_bakery_aoyama/city_bakery_aoyama.png',
        },
        {
            id: 'tokyo-cafe-glitch-ginza',
            city: 'tokyo',
            slug: 'glitch-coffee-ginza',
            category: '카페/베이커리',
            area: '긴자',
            name: '글리치 커피',
            price: '¥1,000~2,000',
            rating: '4.5',
            image: '/images/food/tokyo/cafe-bakery/glitch_coffee_ginza/glitch_coffee_ginza.png',
        },
        {
            id: 'tokyo-cafe-royal-garden-aoyama',
            city: 'tokyo',
            slug: 'royal-garden-cafe-aoyama',
            category: '카페/베이커리',
            area: '가이엔마에',
            name: '로열 가든 카페',
            price: '¥1,000~3,000',
            rating: '4.0',
            image: '/images/food/tokyo/cafe-bakery/royal_garden_cafe_aoyama/royal_garden_cafe_aoyama.png',
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

export const foodCategoryOptions = mergeCategoryOptions(
    baseFoodCategoryOptions,
    generatedFoodCategoryOptions
);

export const foodPlaceCardsByCategory = mergeCardsByCategory(
    baseFoodPlaceCardsByCategory,
    generatedFoodPlaceCardsByCategory
);
