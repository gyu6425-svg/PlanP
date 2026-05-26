import { generatedFoodPlaceDetailsById } from './generated/cityPlaceDetails';

export type FoodPlaceDetail = {
    id: string;
    city: string;
    slug: string;
    name: string;
    category: string;
    area: string;
    address: string;
    mapUrl: string;
    website: string;
    reservationLabel: string;
    reservationValue: string;
    reservationNotes: string[];
    access: string;
    description: string;
    images: string[];
    mapImages: {
        main: string;
        sub1: string;
        sub2: string;
    };
    nearbyGroups: {
        title: string;
        icon: 'station' | 'camera' | 'store' | 'shopping';
        items: string[];
    }[];
    transitDirections?: {
        line: string;
        description: string;
        color?: string;
    }[];
    hours: {
        day: string;
        value: string;
        isToday?: boolean;
    }[];
};

const ginzaHachigoImageBase = '/images/food/tokyo/ramen/ramen_ginzahachigo';

const fallbackImages = [
    `${ginzaHachigoImageBase}/ramen_ginzahachigo.png`,
    `${ginzaHachigoImageBase}/ramen_ginzahachigo_2.png`,
    `${ginzaHachigoImageBase}/ramen_ginzahachigo_3.png`,
    `${ginzaHachigoImageBase}/ramen_ginzahachigo_4.png`,
    `${ginzaHachigoImageBase}/ramen_ginzahachigo_5.png`,
    `${ginzaHachigoImageBase}/ramen_ginzahachigo_6.png`,
];

const fallbackMapImages = {
    main: `${ginzaHachigoImageBase}/foodDetail_ginzahachigo_map_main.png`,
    sub1: `${ginzaHachigoImageBase}/foodDetail_ginzahachigo_map_sub1.png`,
    sub2: `${ginzaHachigoImageBase}/foodDetail_ginzahachigo_map_sub2.png`,
};

const imageByCategory: Record<string, string> = {
    스시: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
    우동: 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?auto=format&fit=crop&w=1200&q=80',
    라멘: `${ginzaHachigoImageBase}/ramen_ginzahachigo.png`,
    돈코츠: '/images/food/tokyo/tonkotsu/ichiran_shibuya/ichiran_shibuya.png',
    규카츠: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    텐동: 'https://images.unsplash.com/photo-1625938145744-e38051539911?auto=format&fit=crop&w=1200&q=80',
    와규: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80',
    '카페/베이커리':
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
};

const foodCategoryFolderByCategory: Record<string, string> = {
    스시: 'sushi',
    우동: 'udon',
    라멘: 'ramen',
    돈코츠: 'tonkotsu',
    규카츠: 'gyukatsu',
    텐동: 'tendon',
    와규: 'wagyu',
    '카페/베이커리': 'cafe-bakery',
};

const foodImageFolderBySlug: Record<string, string> = {
    'sushi-no-midori-ginza': 'sushiMedori',
    'sushi-dai': 'sushi_dai',
    'nemuro-hanamaru-ginza': 'nemuro_hanamaru_ginza',
    'kinka-sushi-shibuya': 'kinka_sushi_shibuya',
    'godaime-hanayama-udon-ginza': 'godaime_hanayama_udon_ginza',
    'udon-shin': 'udon_shin',
    'tsurutontan-shibuya': 'tsurutontan_shibuya',
    'yamashita-honki-udon': 'yamashita_honki_udon',
    'ginza-hachigo': 'ramen_ginzahachigo',
    'motenashi-kuroki': 'motenashi_kuroki',
    muginae: 'muginae',
    'kumon-halal': 'kumon_halal',
    'ichiran-shibuya': 'ichiran_shibuya',
    'ippudo-ginza': 'ippudo_ginza',
    'ramen-nagi-butao-shibuya': 'ramen_nagi_butao_shibuya',
    'hakata-furyu-shinjuku': 'hakata_furyu_shinjuku',
    'gyukatsu-motomura-shibuya': 'gyukatsu_motomura_shibuya',
    'kyoto-katsugyu-akihabara': 'kyoto_katsugyu_akihabara',
    'gyukatsu-motomura-shinjuku': 'gyukatsu_motomura_shinjuku',
    'kyoto-katsugyu-harajuku': 'kyoto_katsugyu_harajuku',
    'kaneko-hannosuke-nihonbashi': 'kaneko_hannosuke_nihonbashi',
    'kaneko-hannosuke-tsukiji': 'kaneko_hannosuke_tsukiji',
    'tempura-abe': 'tempura_abe',
    'tendon-tenya-asakusa': 'tendon_tenya_asakusa',
    imafuku: 'imafuku',
    'yakiniku-jumbo-hanare': 'yakiniku_jumbo_hanare',
    'ginza-steak': 'ginza_steak',
    'kobe-beef-511': 'kobe_beef_511',
    'aoyama-flower-market-tea-house': 'aoyama_flower_market_tea_house',
    'city-bakery-aoyama': 'city_bakery_aoyama',
    'glitch-coffee-ginza': 'glitch_coffee_ginza',
    'royal-garden-cafe-aoyama': 'royal_garden_cafe_aoyama',
};

function getFoodImageBase(input: Pick<FoodDetailInput, 'category' | 'slug'>): string | null {
    const categoryFolder = foodCategoryFolderByCategory[input.category];
    const placeFolder = foodImageFolderBySlug[input.slug];

    if (!categoryFolder || !placeFolder) {
        return null;
    }

    return `/images/food/tokyo/${categoryFolder}/${placeFolder}/${placeFolder}`;
}

function getFoodDetailImages(
    input: Pick<FoodDetailInput, 'category' | 'slug' | 'heroImage'>
): string[] {
    if (input.heroImage) {
        return [input.heroImage, ...fallbackImages];
    }

    const imageBase = getFoodImageBase(input);

    if (!imageBase) {
        return [imageByCategory[input.category], ...fallbackImages];
    }

    const extraImages = Array.from({ length: 49 }, (_, index) => `${imageBase}_${index + 2}.png`);
    return [`${imageBase}.png`, ...extraImages];
}

const hours = [
    { day: '월요일', value: '오전 11:00 - 오후 09:00' },
    { day: '화요일', value: '오전 11:00 - 오후 09:00', isToday: true },
    { day: '수요일', value: '오전 11:00 - 오후 09:00' },
    { day: '목요일', value: '오전 11:00 - 오후 09:00' },
    { day: '금요일', value: '오전 11:00 - 오후 10:00' },
    { day: '토요일', value: '오전 11:00 - 오후 10:00' },
    { day: '일요일', value: '오전 11:00 - 오후 09:00' },
];

const directionsByArea: Record<string, FoodPlaceDetail['transitDirections']> = {
    긴자: [
        {
            line: '도쿄메트로 긴자선',
            color: '#F39700',
            description:
                '긴자역 또는 히가시긴자역에서 내려 중앙 거리 방향으로 이동하면 가장 단순합니다.',
        },
        {
            line: '도쿄메트로 히비야선',
            color: '#B5B5AC',
            description:
                '히가시긴자역 A1/A2 출구를 이용하면 긴자 안쪽 골목까지 도보 이동이 짧습니다.',
        },
    ],
    도요스: [
        {
            line: '유리카모메',
            color: '#274A78',
            description: '시장앞역에서 내려 도요스 시장 방향 표지판을 따라가면 됩니다.',
        },
        {
            line: '도쿄메트로 유라쿠초선',
            color: '#C7A500',
            description:
                '도요스역에서 유리카모메로 환승하거나 택시로 짧게 이동하는 동선이 편합니다.',
        },
    ],
    시부야: [
        {
            line: 'JR 야마노테선',
            color: '#9ACD32',
            description: '시부야역 하치코 출구 또는 중앙 개찰구에서 나와 도보로 이동합니다.',
        },
        {
            line: '도쿄메트로 한조몬선 / 후쿠토신선',
            color: '#8F76D6',
            description:
                '지하 출구가 복잡하므로 B 출구 계열을 확인하고 지상에서 방향을 잡는 편이 쉽습니다.',
        },
    ],
    요요기: [
        {
            line: 'JR 야마노테선',
            color: '#9ACD32',
            description: '요요기역 또는 신주쿠역 남쪽 출구에서 내려 골목 안쪽으로 걸어갑니다.',
        },
        {
            line: '도에이 오에도선',
            color: '#B6007A',
            description: '요요기역 A 출구를 이용하면 지상 이동 거리가 짧습니다.',
        },
    ],
    도겐자카: [
        {
            line: 'JR 야마노테선',
            color: '#9ACD32',
            description: '시부야역 하치코 출구에서 도겐자카 방향으로 올라가면 됩니다.',
        },
        {
            line: '게이오 이노카시라선',
            color: '#003DA5',
            description: '시부야역 서쪽 출구에서 나오면 도겐자카 접근이 가장 빠릅니다.',
        },
    ],
    아사쿠사: [
        {
            line: '도쿄메트로 긴자선',
            color: '#F39700',
            description: '아사쿠사역에서 내려 카미나리몬 방향으로 나와 도보 이동합니다.',
        },
        {
            line: '도에이 아사쿠사선',
            color: '#E85298',
            description: '아사쿠사역 A4 출구를 기준으로 지상에서 위치를 확인하는 것이 쉽습니다.',
        },
    ],
    오모리: [
        {
            line: 'JR 게이힌도호쿠선',
            color: '#00B2E5',
            description: '오모리역에서 내려 상점가 방향으로 이동하면 됩니다.',
        },
    ],
    신주쿠: [
        {
            line: 'JR 야마노테선',
            color: '#9ACD32',
            description:
                '신주쿠역 동쪽 또는 남쪽 출구에서 내려 목적지 방향 출구를 먼저 확인하세요.',
        },
        {
            line: '도쿄메트로 마루노우치선',
            color: '#E60012',
            description:
                '신주쿠역 지하에서 이동 시 출구 번호를 확인하고 지상으로 올라오는 편이 덜 헷갈립니다.',
        },
    ],
    아키하바라: [
        {
            line: 'JR 야마노테선',
            color: '#9ACD32',
            description: '아키하바라역 전기상가 출구나 중앙 개찰구를 기준으로 이동합니다.',
        },
        {
            line: '도쿄메트로 히비야선',
            color: '#B5B5AC',
            description: '히비야선 아키하바라역에서 내려 JR역 방향으로 나오면 찾기 쉽습니다.',
        },
    ],
    하라주쿠: [
        {
            line: 'JR 야마노테선',
            color: '#9ACD32',
            description: '하라주쿠역에서 내려 메이지도리 또는 다케시타도리 방향으로 이동합니다.',
        },
        {
            line: '도쿄메트로 치요다선 / 후쿠토신선',
            color: '#009944',
            description: '메이지진구마에역 출구를 이용하면 하라주쿠 중심부 접근이 편합니다.',
        },
    ],
    니혼바시: [
        {
            line: '도쿄메트로 긴자선',
            color: '#F39700',
            description: '미쓰코시마에역 또는 니혼바시역에서 내려 중앙 거리 방향으로 이동합니다.',
        },
        {
            line: '도쿄메트로 한조몬선',
            color: '#8F76D6',
            description: '미쓰코시마에역 A 출구 계열을 이용하면 니혼바시 무로마치 접근이 짧습니다.',
        },
    ],
    츠키지: [
        {
            line: '도쿄메트로 히비야선',
            color: '#B5B5AC',
            description: '츠키지역에서 내려 시장 방향 표지판을 따라가면 됩니다.',
        },
        {
            line: '도에이 오에도선',
            color: '#B6007A',
            description: '츠키지시장역에서 내려 장외시장 방향으로 이동하는 동선도 좋습니다.',
        },
    ],
    시로카네: [
        {
            line: '도쿄메트로 난보쿠선',
            color: '#00ADA9',
            description:
                '시로카네타카나와역 또는 시로카네다이역에서 내려 목적지까지 도보 이동합니다.',
        },
        {
            line: '도에이 미타선',
            color: '#0079C2',
            description: '미타선 출구를 이용하면 시로카네 주택가 방향 접근이 편합니다.',
        },
    ],
    혼고: [
        {
            line: '도쿄메트로 마루노우치선',
            color: '#E60012',
            description: '혼고산초메역에서 내려 혼고도리 방향으로 이동합니다.',
        },
        {
            line: '도에이 오에도선',
            color: '#B6007A',
            description: '오에도선 혼고산초메역 출구를 이용하면 식당가 접근이 쉽습니다.',
        },
    ],
    아카사카: [
        {
            line: '도쿄메트로 치요다선',
            color: '#009944',
            description: '아카사카역에서 내려 사카스 방향으로 이동합니다.',
        },
        {
            line: '도쿄메트로 긴자선 / 마루노우치선',
            color: '#F39700',
            description: '아카사카미쓰케역을 이용하면 주변 호텔과 식당가 접근이 좋습니다.',
        },
    ],
    아오야마: [
        {
            line: '도쿄메트로 긴자선 / 한조몬선 / 치요다선',
            color: '#F39700',
            description: '오모테산도역 또는 아오야마잇초메역에서 내려 지상으로 이동합니다.',
        },
    ],
    가이엔마에: [
        {
            line: '도쿄메트로 긴자선',
            color: '#F39700',
            description: '가이엔마에역에서 내려 은행나무길 방향으로 걸으면 됩니다.',
        },
    ],
};

type FoodDetailInput = {
    slug: string;
    routeCategory: string;
    category: string;
    area: string;
    name: string;
    address: string;
    website?: string;
    reservationLabel?: string;
    reservationValue?: string;
    access?: string;
    description: string;
    heroImage?: string;
};

function createFoodDetail(input: FoodDetailInput): [string, FoodPlaceDetail] {
    const website =
        input.website ??
        `https://www.google.com/search?q=${encodeURIComponent(`${input.name} Tokyo`)}`;
    const detail: FoodPlaceDetail = {
        id: `tokyo-${input.routeCategory}-${input.slug}`,
        city: 'tokyo',
        slug: input.slug,
        name: input.name,
        category: input.category,
        area: input.area,
        address: input.address,
        mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${input.name} ${input.area} Tokyo`)}`,
        website,
        reservationLabel: input.reservationLabel ?? '방문 전 운영시간 확인 권장',
        reservationValue: input.reservationValue ?? 'Google Map',
        reservationNotes: [
            '인기 시간대에는 웨이팅이 생길 수 있어 오픈 직후나 늦은 점심 시간이 비교적 편합니다.',
            '예약 가능 여부와 휴무일은 시즌, 지점, 현장 사정에 따라 바뀔 수 있습니다.',
            '메뉴 가격과 영업시간은 방문 전 공식 채널 또는 지도에서 다시 확인해 주세요.',
        ],
        access: input.access ?? '카운터석, 테이블석',
        description: input.description,
        images: getFoodDetailImages(input),
        mapImages: fallbackMapImages,
        nearbyGroups: [
            {
                title: '가까운 역',
                icon: 'station',
                items: [`${input.area} 인근 역`, '도쿄 주요 환승역 연결'],
            },
            {
                title: '유명사진스팟',
                icon: 'camera',
                items: [`${input.area} 산책 코스`, '도쿄 도심 거리'],
            },
            {
                title: '편의점,드럭스토어',
                icon: 'store',
                items: ['편의점', '드럭스토어'],
            },
        ],
        transitDirections: directionsByArea[input.area] ?? directionsByArea.긴자,
        hours,
    };

    return [`tokyo/${input.routeCategory}/${input.slug}`, detail];
}

const detailInputs: FoodDetailInput[] = [
    {
        slug: 'ginza-hachigo',
        routeCategory: 'ramen',
        category: '라멘',
        area: '긴자',
        name: '긴자 하치고',
        address: '3 Chome-14-2 Ginza, Chuo City, Tokyo 104-0061 일본',
        website: 'https://katsumoto-japan.com/ginza_hachigou.html',
        reservationLabel: '사전 예약 권장',
        reservationValue: 'TableCheck',
        access: '카운터 6석',
        description:
            '간장이나 소스 타레를 강하게 쓰지 않고 프렌치 콘소메처럼 맑고 깊은 감칠맛을 낸 긴자의 인기 라멘집',
    },
    {
        slug: 'motenashi-kuroki',
        routeCategory: 'ramen',
        category: '라멘',
        area: '아사쿠사',
        name: '모테나시 쿠로키',
        address: 'Tokyo, Taito City, Asakusa area',
        description: '정갈한 국물과 계절감 있는 토핑으로 알려진 도쿄 동쪽 라멘 후보',
    },
    {
        slug: 'muginae',
        routeCategory: 'ramen',
        category: '라멘',
        area: '오모리',
        name: '무기나에',
        address: 'Tokyo, Ota City, Omori area',
        description:
            '깔끔한 쇼유 계열과 섬세한 면 식감으로 라멘 팬들에게 자주 언급되는 오모리 맛집',
    },
    {
        slug: 'kumon-halal',
        routeCategory: 'ramen',
        category: '라멘',
        area: '시부야',
        name: '규몬 할랄 라멘',
        address: 'Tokyo, Shibuya City, Shibuya area',
        description: '돼지고기를 피하는 여행자도 선택하기 쉬운 할랄 라멘 콘셉트의 시부야 라멘집',
    },
    {
        slug: 'sushi-no-midori-ginza',
        routeCategory: '스시',
        category: '스시',
        area: '긴자',
        name: '스시노 미도리',
        address: 'Ginza, Chuo City, Tokyo 일본',
        access: '카운터석, 테이블석',
        description:
            '합리적인 가격대와 큼직한 네타로 관광객과 현지인 모두 줄 서는 캐주얼 스시 명소',
    },
    {
        slug: 'sushi-dai',
        routeCategory: '스시',
        category: '스시',
        area: '도요스',
        name: '스시 다이',
        address: 'Toyosu Market, Koto City, Tokyo 일본',
        reservationLabel: '이른 시간 방문 권장',
        reservationValue: '현장 대기',
        description:
            '도요스 시장을 대표하는 스시집으로 신선한 시장 재료를 쓰는 오마카세 스타일이 유명합니다.',
    },
    {
        slug: 'nemuro-hanamaru-ginza',
        routeCategory: '스시',
        category: '스시',
        area: '긴자',
        name: '네무로 하나마루',
        address: 'Ginza, Chuo City, Tokyo 일본',
        description: '홋카이도 네무로 스타일 해산물을 도쿄 긴자에서 즐길 수 있는 인기 회전스시집',
    },
    {
        slug: 'kinka-sushi-shibuya',
        routeCategory: '스시',
        category: '스시',
        area: '시부야',
        name: 'KINKA 스시 바',
        address: 'Shibuya, Shibuya City, Tokyo 일본',
        description: '아부리 스시와 이자카야 메뉴를 함께 즐기기 좋은 시부야의 캐주얼 스시 바',
    },
    {
        slug: 'godaime-hanayama-udon-ginza',
        routeCategory: '우동',
        category: '우동',
        area: '긴자',
        name: '하나야마 우동',
        address: '3 Chome-14-13 Ginza, Chuo City, Tokyo 104-0061 일본',
        description: '폭이 넓은 히모카와 우동과 덴푸라 조합으로 줄이 긴 긴자의 대표 우동 맛집',
    },
    {
        slug: 'udon-shin',
        routeCategory: '우동',
        category: '우동',
        area: '요요기',
        name: '우동 신',
        address: 'Yoyogi, Shibuya City, Tokyo 일본',
        reservationLabel: '대기표 확인 권장',
        reservationValue: '현장 접수',
        description: '쫄깃한 수타 우동과 카르보나라 우동 등 개성 있는 메뉴로 유명한 요요기 우동집',
    },
    {
        slug: 'tsurutontan-shibuya',
        routeCategory: '우동',
        category: '우동',
        area: '시부야',
        name: '츠루톤탄',
        address: 'Shibuya Scramble Square, Shibuya City, Tokyo 일본',
        description:
            '큰 그릇에 나오는 다양한 창작 우동과 시부야 전망으로 찾는 사람이 많은 우동 브라세리',
    },
    {
        slug: 'yamashita-honki-udon',
        routeCategory: '우동',
        category: '우동',
        area: '도겐자카',
        name: '야마시타 혼키 우동',
        address: 'Dogenzaka, Shibuya City, Tokyo 일본',
        description: '시부야 도겐자카에서 늦은 시간까지 찾기 좋은 진한 국물과 면발 중심의 우동집',
    },
    {
        slug: 'ichiran-shibuya',
        routeCategory: '돈코츠',
        category: '돈코츠',
        area: '시부야',
        name: '이치란',
        address: 'Shibuya, Shibuya City, Tokyo 일본',
        access: '1인 집중 좌석',
        description:
            '혼밥 부스와 커스터마이즈 주문지로 처음 돈코츠 라멘을 먹는 여행자도 접근하기 쉬운 체인',
    },
    {
        slug: 'ippudo-ginza',
        routeCategory: '돈코츠',
        category: '돈코츠',
        area: '긴자',
        name: '잇푸도',
        address: 'Ginza, Chuo City, Tokyo 일본',
        description: '하카타식 돈코츠 라멘을 안정적인 퀄리티로 즐길 수 있는 유명 라멘 브랜드',
    },
    {
        slug: 'ramen-nagi-butao-shibuya',
        routeCategory: '돈코츠',
        category: '돈코츠',
        area: '시부야',
        name: '라멘 나기 BUTAO',
        address: 'Higashi, Shibuya City, Tokyo 일본',
        description: '진한 돈코츠 육수와 좁은 카운터 분위기가 특징인 시부야의 라멘 나기 지점',
    },
    {
        slug: 'hakata-furyu-shinjuku',
        routeCategory: '돈코츠',
        category: '돈코츠',
        area: '신주쿠',
        name: '하카타 후류',
        address: 'Shinjuku, Shinjuku City, Tokyo 일본',
        description:
            '가성비 좋은 하카타 돈코츠와 면 리필 문화로 부담 없이 들르기 좋은 신주쿠 라멘집',
    },
    {
        slug: 'gyukatsu-motomura-shibuya',
        routeCategory: '규카츠',
        category: '규카츠',
        area: '시부야',
        name: '규카츠 모토무라',
        address: 'Shibuya, Shibuya City, Tokyo 일본',
        description: '얇게 튀긴 소고기를 개인 화로에 원하는 만큼 익혀 먹는 도쿄 대표 규카츠 맛집',
    },
    {
        slug: 'kyoto-katsugyu-akihabara',
        routeCategory: '규카츠',
        category: '규카츠',
        area: '아키하바라',
        name: '교토 카츠규',
        address: 'Akihabara, Chiyoda City, Tokyo 일본',
        description:
            '여러 부위의 소고기 카츠를 정식으로 즐길 수 있어 쇼핑 동선에 넣기 좋은 규카츠 체인',
    },
    {
        slug: 'gyukatsu-motomura-shinjuku',
        routeCategory: '규카츠',
        category: '규카츠',
        area: '신주쿠',
        name: '모토무라 신주쿠',
        address: 'Shinjuku, Shinjuku City, Tokyo 일본',
        description: '신주쿠 중심에서 규카츠 모토무라의 대표 정식을 먹기 좋은 인기 지점',
    },
    {
        slug: 'kyoto-katsugyu-harajuku',
        routeCategory: '규카츠',
        category: '규카츠',
        area: '하라주쿠',
        name: '카츠규 하라주쿠',
        address: 'Harajuku, Shibuya City, Tokyo 일본',
        description:
            '하라주쿠 산책과 함께 넣기 좋은 규카츠 지점으로 바삭한 튀김과 와사비 조합이 잘 맞습니다.',
    },
    {
        slug: 'kaneko-hannosuke-nihonbashi',
        routeCategory: '텐동',
        category: '텐동',
        area: '니혼바시',
        name: '카네코 한노스케',
        address: '1 Chome-11-15 Nihonbashi Muromachi, Chuo City, Tokyo 일본',
        description:
            '장어와 새우, 반숙 달걀 튀김이 올라가는 에도마에 텐동으로 긴 줄이 생기는 니혼바시 명점',
    },
    {
        slug: 'kaneko-hannosuke-tsukiji',
        routeCategory: '텐동',
        category: '텐동',
        area: '츠키지',
        name: '한노스케 츠키지',
        address: 'Tsukiji, Chuo City, Tokyo 일본',
        description: '츠키지 일정 중 들르기 좋은 카네코 한노스케 계열 텐동 지점',
    },
    {
        slug: 'tempura-abe',
        routeCategory: '텐동',
        category: '텐동',
        area: '긴자',
        name: '텐푸라 아베',
        address: 'Ginza, Chuo City, Tokyo 일본',
        description:
            '긴자에서 비교적 합리적인 점심 텐동과 정통 텐푸라 코스를 즐길 수 있는 Bib Gourmand급 후보',
    },
    {
        slug: 'tendon-tenya-asakusa',
        routeCategory: '텐동',
        category: '텐동',
        area: '아사쿠사',
        name: '텐동 텐야',
        address: 'Asakusa, Taito City, Tokyo 일본',
        description:
            '가볍고 빠르게 텐동을 먹기 좋은 대중적인 텐동 체인으로 아사쿠사 관광 동선에 맞습니다.',
    },
    {
        slug: 'imafuku',
        routeCategory: '와규',
        category: '와규',
        area: '시로카네',
        name: '이마후쿠',
        address: '1 Chome-12-19 Shirokane, Minato City, Tokyo 일본',
        description: '고급 와규 샤브샤브와 스키야키로 알려진 시로카네의 차분한 와규 레스토랑',
    },
    {
        slug: 'yakiniku-jumbo-hanare',
        routeCategory: '와규',
        category: '와규',
        area: '혼고',
        name: '야키니쿠 점보 하나레',
        address: 'Hongo, Bunkyo City, Tokyo 일본',
        description: '희소 부위와 두툼한 와규 야키니쿠로 예약 난도가 높은 도쿄 대표 야키니쿠 후보',
    },
    {
        slug: 'ginza-steak',
        routeCategory: '와규',
        category: '와규',
        area: '긴자',
        name: '긴자 스테이크',
        address: 'Ginza, Chuo City, Tokyo 일본',
        description: '긴자에서 와규 스테이크 코스를 비교적 명확한 가격대로 즐길 수 있는 레스토랑',
    },
    {
        slug: 'kobe-beef-511',
        routeCategory: '와규',
        category: '와규',
        area: '아카사카',
        name: '고베 비프 511',
        address: 'Akasaka, Minato City, Tokyo 일본',
        description: '고베규와 와규 스테이크를 중심으로 한 아카사카의 프리미엄 고기 레스토랑',
    },
    {
        slug: 'aoyama-flower-market-tea-house',
        routeCategory: '카페/베이커리',
        category: '카페/베이커리',
        area: '아오야마',
        name: '플라워 마켓 티하우스',
        address: 'Minamiaoyama, Minato City, Tokyo 일본',
        description: '꽃시장 안쪽 온실 같은 공간에서 허브티와 디저트를 즐기는 아오야마 인기 카페',
    },
    {
        slug: 'city-bakery-aoyama',
        routeCategory: '카페/베이커리',
        category: '카페/베이커리',
        area: '아오야마',
        name: '더 시티 베이커리',
        address: 'Aoyama, Minato City, Tokyo 일본',
        description:
            '크루아상과 프레첼 크루아상, 커피를 함께 즐기기 좋은 뉴욕 스타일 베이커리 카페',
    },
    {
        slug: 'glitch-coffee-ginza',
        routeCategory: '카페/베이커리',
        category: '카페/베이커리',
        area: '긴자',
        name: '글리치 커피',
        address: 'Ginza, Chuo City, Tokyo 일본',
        description:
            '싱글 오리진 핸드드립과 깔끔한 공간감으로 커피 애호가들이 많이 찾는 스페셜티 카페',
    },
    {
        slug: 'royal-garden-cafe-aoyama',
        routeCategory: '카페/베이커리',
        category: '카페/베이커리',
        area: '가이엔마에',
        name: '로열 가든 카페',
        address: '2 Chome-1-19 Kita-Aoyama, Minato City, Tokyo 일본',
        description:
            '가이엔 은행나무길 옆 테라스와 베이커리 메뉴가 있어 산책 중 쉬어가기 좋은 카페',
    },
];

const baseFoodPlaceDetailsById: Record<string, FoodPlaceDetail> = Object.fromEntries(
    detailInputs.map(createFoodDetail)
) as Record<string, FoodPlaceDetail>;

export const foodPlaceDetailsById: Record<string, FoodPlaceDetail> = {
    ...baseFoodPlaceDetailsById,
    ...generatedFoodPlaceDetailsById,
};
