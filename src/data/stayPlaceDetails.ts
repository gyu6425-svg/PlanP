import type { TransportCard } from '../components/cards/TransportProductCard';
import type { DetailInfoData } from '../components/detail/DetailInfoPanel';
import type { DetailLocationData } from '../components/detail/DetailLocationSection';
import { generatedStayPlaceDetailsById } from './generated/cityPlaceDetails';

export type StayPlaceDetail = DetailInfoData &
    DetailLocationData & {
        id: string;
        city: string;
        slug: string;
        name: string;
        category: string;
        area: string;
        images: string[];
        bookingCards: TransportCard[];
    };

const granbellImageBase = '/images/stay/hotel/granbell';

const fallbackMapImages = {
    main: `${granbellImageBase}/stayDetail_granbell_map_main.png`,
    sub1: `${granbellImageBase}/stayDetail_granbell_map_sub1.png`,
    sub2: `${granbellImageBase}/stayDetail_granbell_map_sub2.png`,
};

const stayCategoryFolderByCategory: Record<string, string> = {
    호텔: 'hotel',
    호스텔: 'hostel',
    료칸: 'ryokan',
    캡슐: 'capsule',
    민슈쿠: 'minshuku',
};

const stayImageFolderBySlug: Record<string, string> = {
    rem: 'rem',
    prince: 'prince',
    granbell: 'granbell',
    domine: 'domine',
    'nui-hostel': 'nui_hostel',
    'unplan-shinjuku': 'unplan_shinjuku',
    'citan-hostel': 'citan_hostel',
    'khaosan-samurai': 'khaosan_samurai',
    'hoshinoya-tokyo': 'hoshinoya_tokyo',
    'kamogawa-asakusa': 'kamogawa_asakusa',
    'sawanoya-ryokan': 'sawanoya_ryokan',
    'ryokan-shigetsu': 'ryokan_shigetsu',
    'nine-hours-akasaka': 'nine_hours_akasaka',
    'first-cabin-akihabara': 'first_cabin_akihabara',
    'anshin-oyado-shinjuku': 'anshin_oyado_shinjuku',
    'rembrandt-cabin-shinjuku': 'rembrandt_cabin_shinjuku',
    'taito-ryokan': 'taito_ryokan',
    'andon-ryokan': 'andon_ryokan',
    homeikan: 'homeikan',
    'family-inn-saiko': 'family_inn_saiko',
};

function getStayImageBase(input: Pick<StayInput, 'category' | 'slug'>): string {
    const categoryFolder = stayCategoryFolderByCategory[input.category];
    const placeFolder = stayImageFolderBySlug[input.slug];
    return `/images/stay/tokyo/${categoryFolder}/${placeFolder}/${placeFolder}`;
}

function getStayDetailImages(input: Pick<StayInput, 'category' | 'slug'>): string[] {
    const imageBase = getStayImageBase(input);
    const extraImages = Array.from({ length: 49 }, (_, index) => `${imageBase}_${index + 2}.png`);
    return [`${imageBase}.png`, ...extraImages];
}

const hours = [
    { day: '체크인', value: '오후 03:00부터', isToday: true },
    { day: '체크아웃', value: '오전 11:00까지' },
    { day: '프런트', value: '24시간 운영' },
    { day: '조식', value: '숙소별 운영시간 확인' },
];

const directionsByArea: Record<string, NonNullable<StayPlaceDetail['transitDirections']>> = {
    시부야: [
        {
            line: 'JR 야마노테선',
            color: '#9ACD32',
            description: '시부야역 서쪽 또는 남쪽 출구에서 나와 사쿠라가오카 방향으로 이동하면 됩니다.',
        },
        {
            line: '도쿄메트로 한조몬선 / 후쿠토신선',
            color: '#8F76D6',
            description: '지하 출구가 많으므로 하치코 광장 또는 B 출구 계열을 기준으로 지상 이동하세요.',
        },
    ],
    도쿄: [
        {
            line: '도쿄메트로 긴자선',
            color: '#F39700',
            description: '교바시역 또는 긴자선 출구를 이용하면 도쿄역 동쪽 숙소 접근이 편합니다.',
        },
        {
            line: 'JR 야마노테선',
            color: '#9ACD32',
            description: '도쿄역 야에스 출구에서 도보 또는 택시로 짧게 이동할 수 있습니다.',
        },
    ],
    에비스: [
        {
            line: 'JR 야마노테선',
            color: '#9ACD32',
            description: '에비스역 동쪽 출구를 기준으로 호텔 방향 표지판을 확인하며 이동합니다.',
        },
        {
            line: '도쿄메트로 히비야선',
            color: '#B5B5AC',
            description: '히비야선 에비스역에서 JR역 방향으로 나와 지상 이동하면 됩니다.',
        },
    ],
    하라주쿠: [
        {
            line: 'JR 야마노테선',
            color: '#9ACD32',
            description: '하라주쿠역 또는 메이지진구마에역에서 내려 진구마에 골목 방향으로 이동합니다.',
        },
        {
            line: '도쿄메트로 치요다선 / 후쿠토신선',
            color: '#009944',
            description: '메이지진구마에역 출구를 이용하면 오모테산도와 하라주쿠 사이 이동이 편합니다.',
        },
    ],
    구라마에: [
        {
            line: '도에이 아사쿠사선',
            color: '#E85298',
            description: '구라마에역에서 내려 스미다강 방향 골목으로 이동하면 됩니다.',
        },
        {
            line: '도에이 오에도선',
            color: '#B6007A',
            description: '오에도선 출구를 이용하면 구라마에 카페 거리 접근이 좋습니다.',
        },
    ],
    신주쿠: [
        {
            line: 'JR 야마노테선',
            color: '#9ACD32',
            description: '신주쿠역 동쪽 출구 또는 신주쿠산초메역을 기준으로 이동하면 됩니다.',
        },
        {
            line: '도쿄메트로 마루노우치선',
            color: '#E60012',
            description: '신주쿠산초메역 출구를 이용하면 번화가 안쪽 숙소 접근이 짧습니다.',
        },
    ],
    니혼바시: [
        {
            line: '도쿄메트로 긴자선',
            color: '#F39700',
            description: '미쓰코시마에역 또는 니혼바시역에서 내려 중앙 거리 방향으로 이동합니다.',
        },
        {
            line: '도에이 아사쿠사선',
            color: '#E85298',
            description: '히가시니혼바시역과 바쿠로초 주변은 지하철 출구 번호를 확인하는 편이 좋습니다.',
        },
    ],
    아사쿠사: [
        {
            line: '도쿄메트로 긴자선',
            color: '#F39700',
            description: '아사쿠사역에서 내려 카미나리몬과 센소지 방향으로 이동합니다.',
        },
        {
            line: '도에이 아사쿠사선',
            color: '#E85298',
            description: '아사쿠사선 출구를 이용하면 짐을 들고 이동하기 비교적 단순합니다.',
        },
    ],
    오테마치: [
        {
            line: '도쿄메트로 마루노우치선',
            color: '#E60012',
            description: '오테마치역 지하 통로를 이용해 출구 번호를 확인하고 이동하세요.',
        },
        {
            line: '도쿄메트로 한조몬선 / 치요다선',
            color: '#8F76D6',
            description: '오테마치역은 노선이 많아 숙소에서 안내하는 가장 가까운 출구를 확인하는 것이 좋습니다.',
        },
    ],
    야나카: [
        {
            line: 'JR 야마노테선',
            color: '#9ACD32',
            description: '닛포리역에서 내려 야나카긴자 방향으로 천천히 걸어가면 됩니다.',
        },
        {
            line: '도쿄메트로 치요다선',
            color: '#009944',
            description: '센다기역을 이용하면 야나카 산책 동선과 함께 묶기 좋습니다.',
        },
    ],
    아카사카: [
        {
            line: '도쿄메트로 치요다선',
            color: '#009944',
            description: '아카사카역에서 내려 사카스 방향으로 이동하면 숙소 접근이 쉽습니다.',
        },
        {
            line: '도쿄메트로 긴자선 / 마루노우치선',
            color: '#F39700',
            description: '아카사카미쓰케역을 이용하면 주변 식당가와 호텔 접근성이 좋습니다.',
        },
    ],
    아키하바라: [
        {
            line: 'JR 야마노테선',
            color: '#9ACD32',
            description: '아키하바라역 중앙 개찰구 또는 전기상가 출구를 기준으로 이동합니다.',
        },
        {
            line: '도쿄메트로 히비야선',
            color: '#B5B5AC',
            description: '히비야선 아키하바라역에서 내려 JR역 방향으로 나와 이동하면 됩니다.',
        },
    ],
    미노와: [
        {
            line: '도쿄메트로 히비야선',
            color: '#B5B5AC',
            description: '미노와역에서 내려 조용한 주택가 방향으로 이동합니다.',
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
            description: '오에도선 출구를 이용하면 언덕길을 줄일 수 있습니다.',
        },
    ],
    이케부쿠로: [
        {
            line: 'JR 야마노테선',
            color: '#9ACD32',
            description: '이케부쿠로역 서쪽 출구를 기준으로 숙소 방향 버스나 도보 동선을 확인하세요.',
        },
        {
            line: '도쿄메트로 유라쿠초선 / 후쿠토신선',
            color: '#C7A500',
            description: '가나메초역이나 이케부쿠로역 지하 출구를 이용하면 서쪽 주택가 접근이 좋습니다.',
        },
    ],
};

type StayInput = {
    slug: string;
    routeCategory: string;
    category: string;
    area: string;
    name: string;
    price: string;
    rating: string;
    address: string;
    website?: string;
    access: string;
    description: string;
    image: string;
};

function createBookingCards(input: StayInput): TransportCard[] {
    return [
        {
            id: `${input.slug}-agoda`,
            option: 'hotel-booking',
            brand: 'Agoda',
            route: input.area,
            title: input.name,
            price: input.price,
            rating: input.rating,
            cancelLabel: '전액 환불 가능',
            image: input.image,
            href: 'https://www.agoda.com/',
        },
        {
            id: `${input.slug}-trip`,
            option: 'hotel-booking',
            brand: 'Trip.com',
            route: input.area,
            title: input.name,
            price: input.price,
            rating: input.rating,
            cancelLabel: '즉시 확정',
            image: input.image,
            href: 'https://kr.trip.com/',
        },
        {
            id: `${input.slug}-hotels`,
            option: 'hotel-booking',
            brand: 'Hotels.com',
            route: input.area,
            title: input.name,
            price: input.price,
            rating: input.rating,
            cancelLabel: '예약 가능',
            image: input.image,
            href: 'https://kr.hotels.com/',
        },
        {
            id: `${input.slug}-booking`,
            option: 'hotel-booking',
            brand: 'Booking.com',
            route: input.area,
            title: input.name,
            price: input.price,
            rating: input.rating,
            cancelLabel: '숙소 조건 확인',
            image: input.image,
            href: 'https://www.booking.com/',
        },
    ];
}

function createStayDetail(input: StayInput): [string, StayPlaceDetail] {
    const detail: StayPlaceDetail = {
        id: `tokyo-${input.routeCategory}-${input.slug}`,
        city: 'tokyo',
        slug: input.slug,
        name: input.name,
        category: input.category,
        area: input.area,
        address: input.address,
        mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${input.name} ${input.area} Tokyo`)}`,
        website:
            input.website ??
            `https://www.google.com/search?q=${encodeURIComponent(`${input.name} Tokyo`)}`,
        reservationLabel: '체크인 15:00',
        reservationValue: '체크아웃 11:00',
        reservationNotes: [
            `${input.area} 일정에 맞춰 잡기 좋은 ${input.category} 숙소입니다.`,
            '예약 플랫폼별 객실 조건, 취소 가능 여부, 조식 포함 여부가 다를 수 있습니다.',
            '숙박세, 보증금, 심야 체크인 규정은 예약 전 다시 확인해 주세요.',
        ],
        access: input.access,
        description: input.description,
        images: getStayDetailImages(input),
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
                items: [`${input.area} 산책 코스`, '주변 쇼핑/관광 거리'],
            },
            {
                title: '편의점,드럭스토어',
                icon: 'store',
                items: ['편의점', '드럭스토어'],
            },
        ],
        transitDirections: directionsByArea[input.area] ?? directionsByArea.시부야,
        hours,
        bookingCards: createBookingCards(input),
    };

    return [`tokyo/${input.routeCategory}/${input.slug}`, detail];
}

const stayInputs: StayInput[] = [
    {
        slug: 'rem',
        routeCategory: 'hotel',
        category: '호텔',
        area: '도쿄',
        name: '렘 도쿄 교바시',
        price: '₩ 251,000 ~',
        rating: '4.5',
        address: '2 Chome-6-21 Kyobashi, Chuo City, Tokyo 일본',
        access: '더블룸, 트윈룸',
        image: '/images/stay/tokyo/hotel/rem/rem.png',
        description: '도쿄역과 긴자 사이 이동이 편하고, 수면 컨디션을 강조한 깔끔한 비즈니스 호텔',
    },
    {
        slug: 'prince',
        routeCategory: 'hotel',
        category: '호텔',
        area: '에비스',
        name: '프린스 스마트 인 에비스',
        price: '₩ 320,000 ~',
        rating: '4.7',
        address: 'Ebisuminami, Shibuya City, Tokyo 일본',
        access: '스탠다드룸, 스마트 체크인',
        image: '/images/stay/tokyo/hotel/prince/prince.png',
        description: '에비스역 도보권에 있어 시부야, 다이칸야마, 나카메구로 동선을 묶기 좋은 스마트 호텔',
    },
    {
        slug: 'granbell',
        routeCategory: 'hotel',
        category: '호텔',
        area: '시부야',
        name: '시부야 그랑벨 호텔',
        price: '₩ 217,086 ~',
        rating: '4.9',
        address: '15-17 Sakuragaokacho, Shibuya City, Tokyo 150-0031 일본',
        website: 'https://www.granbellhotel.jp/shibuya/',
        access: '더블룸, 트윈룸, 스위트',
        image: '/images/stay/tokyo/hotel/granbell/granbell.png',
        description:
            '시부야역과 가까워 이동이 편하고, 감각적인 객실 디자인과 합리적인 접근성이 장점인 도쿄 시부야 숙소',
    },
    {
        slug: 'domine',
        routeCategory: 'hotel',
        category: '호텔',
        area: '하라주쿠',
        name: '도미인 진구마에',
        price: '₩ 358,900 ~',
        rating: '4.5',
        address: 'Jingumae, Shibuya City, Tokyo 일본',
        access: '더블룸, 대욕장, 사우나',
        image: '/images/stay/tokyo/hotel/domine/domine.png',
        description: '하라주쿠와 오모테산도 사이에 있어 쇼핑 동선과 대욕장 휴식을 함께 챙기기 좋은 호텔',
    },
    {
        slug: 'nui-hostel',
        routeCategory: '호스텔',
        category: '호스텔',
        area: '구라마에',
        name: 'Nui. 호스텔',
        price: '₩ 55,000 ~',
        rating: '4.6',
        address: '2 Chome-14-13 Kuramae, Taito City, Tokyo 일본',
        access: '도미토리, 개인실, 라운지 바',
        image: '/images/stay/tokyo/hostel/nui_hostel/nui_hostel.png',
        description: '구라마에 카페 거리와 스미다강 산책을 함께 즐기기 좋은 감각적인 호스텔',
    },
    {
        slug: 'unplan-shinjuku',
        routeCategory: '호스텔',
        category: '호스텔',
        area: '신주쿠',
        name: 'UNPLAN 신주쿠',
        price: '₩ 62,000 ~',
        rating: '4.4',
        address: '5 Chome-3-15 Shinjuku, Shinjuku City, Tokyo 일본',
        access: '도미토리, 프라이빗룸, 공용 라운지',
        image: '/images/stay/tokyo/hostel/unplan_shinjuku/unplan_shinjuku.png',
        description: '신주쿠 중심부에서 합리적인 숙박과 라운지 분위기를 같이 원하는 여행자에게 맞는 호스텔',
    },
    {
        slug: 'citan-hostel',
        routeCategory: '호스텔',
        category: '호스텔',
        area: '니혼바시',
        name: 'CITAN 호스텔',
        price: '₩ 58,000 ~',
        rating: '4.5',
        address: '15-2 Nihonbashi Odenmacho, Chuo City, Tokyo 일본',
        access: '도미토리, 개인실, 카페 바',
        image: '/images/stay/tokyo/hostel/citan_hostel/citan_hostel.png',
        description: '동쪽 도쿄와 도쿄역 접근성이 좋고 지하 카페 바 분위기가 좋은 디자인 호스텔',
    },
    {
        slug: 'khaosan-samurai',
        routeCategory: '호스텔',
        category: '호스텔',
        area: '아사쿠사',
        name: '카오산 사무라이',
        price: '₩ 48,000 ~',
        rating: '4.3',
        address: 'Asakusa, Taito City, Tokyo 일본',
        access: '도미토리, 캡슐형 침대',
        image: '/images/stay/tokyo/hostel/khaosan_samurai/khaosan_samurai.png',
        description: '아사쿠사 관광과 저렴한 숙박을 같이 잡기 좋은 캐주얼 호스텔',
    },
    {
        slug: 'hoshinoya-tokyo',
        routeCategory: '료칸',
        category: '료칸',
        area: '오테마치',
        name: '호시노야 도쿄',
        price: '₩ 980,000 ~',
        rating: '4.7',
        address: '1 Chome-9-1 Otemachi, Chiyoda City, Tokyo 일본',
        access: '다다미 객실, 온천, 료칸 서비스',
        image: '/images/stay/tokyo/ryokan/hoshinoya_tokyo/hoshinoya_tokyo.png',
        description: '도쿄 도심 고층 건물 안에서 료칸식 서비스와 온천 분위기를 경험할 수 있는 럭셔리 숙소',
    },
    {
        slug: 'kamogawa-asakusa',
        routeCategory: '료칸',
        category: '료칸',
        area: '아사쿠사',
        name: '카모가와 료칸',
        price: '₩ 180,000 ~',
        rating: '4.5',
        address: 'Asakusa, Taito City, Tokyo 일본',
        access: '다다미룸, 가족 객실',
        image: '/images/stay/tokyo/ryokan/kamogawa_asakusa/kamogawa_asakusa.png',
        description: '센소지와 아사쿠사 골목을 가까이 두고 일본식 객실을 경험하기 좋은 도심 료칸',
    },
    {
        slug: 'sawanoya-ryokan',
        routeCategory: '료칸',
        category: '료칸',
        area: '야나카',
        name: '사와노야 료칸',
        price: '₩ 120,000 ~',
        rating: '4.7',
        address: '2 Chome-3-11 Yanaka, Taito City, Tokyo 일본',
        access: '다다미룸, 가족탕',
        image: '/images/stay/tokyo/ryokan/sawanoya_ryokan/sawanoya_ryokan.png',
        description: '야나카의 조용한 동네 분위기 속에서 소박한 일본식 숙박을 즐길 수 있는 전통 료칸',
    },
    {
        slug: 'ryokan-shigetsu',
        routeCategory: '료칸',
        category: '료칸',
        area: '아사쿠사',
        name: '료칸 시게츠',
        price: '₩ 160,000 ~',
        rating: '4.4',
        address: 'Asakusa, Taito City, Tokyo 일본',
        access: '다다미 객실, 대욕장',
        image: '/images/stay/tokyo/ryokan/ryokan_shigetsu/ryokan_shigetsu.png',
        description: '아사쿠사 중심에서 전통 객실과 대욕장 감성을 함께 느끼기 좋은 료칸',
    },
    {
        slug: 'nine-hours-akasaka',
        routeCategory: '캡슐',
        category: '캡슐',
        area: '아카사카',
        name: '나인아워스 아카사카',
        price: '₩ 45,000 ~',
        rating: '4.2',
        address: 'Akasaka, Minato City, Tokyo 일본',
        access: '캡슐 베드, 라커, 샤워',
        image: '/images/stay/tokyo/capsule/nine_hours_akasaka/nine_hours_akasaka.png',
        description: '깔끔한 캡슐 구조와 짧은 숙박에 맞춘 동선으로 혼자 여행자에게 적합한 숙소',
    },
    {
        slug: 'first-cabin-akihabara',
        routeCategory: '캡슐',
        category: '캡슐',
        area: '아키하바라',
        name: '퍼스트 캐빈',
        price: '₩ 65,000 ~',
        rating: '4.1',
        address: 'Akihabara, Chiyoda City, Tokyo 일본',
        access: '캐빈형 객실, 라커',
        image: '/images/stay/tokyo/capsule/first_cabin_akihabara/first_cabin_akihabara.png',
        description: '일반 캡슐보다 넓은 캐빈형 구조로 아키하바라 일정에 넣기 좋은 실용 숙소',
    },
    {
        slug: 'anshin-oyado-shinjuku',
        routeCategory: '캡슐',
        category: '캡슐',
        area: '신주쿠',
        name: '안신 오야도',
        price: '₩ 70,000 ~',
        rating: '4.3',
        address: 'Shinjuku, Shinjuku City, Tokyo 일본',
        access: '캡슐 베드, 대욕장, 라운지',
        image: '/images/stay/tokyo/capsule/anshin_oyado_shinjuku/anshin_oyado_shinjuku.png',
        description: '신주쿠 중심에서 대욕장과 라운지를 함께 쓰기 좋은 남성 여행자 중심 캡슐 숙소',
    },
    {
        slug: 'rembrandt-cabin-shinjuku',
        routeCategory: '캡슐',
        category: '캡슐',
        area: '신주쿠',
        name: '렘브란트 캐빈',
        price: '₩ 50,000 ~',
        rating: '4.0',
        address: 'Shinjuku, Shinjuku City, Tokyo 일본',
        access: '캡슐 베드, 공용 샤워',
        image: '/images/stay/tokyo/capsule/rembrandt_cabin_shinjuku/rembrandt_cabin_shinjuku.png',
        description: '신주쿠 이동성을 우선할 때 선택하기 쉬운 심플한 캡슐 호텔',
    },
    {
        slug: 'taito-ryokan',
        routeCategory: '민슈쿠',
        category: '민슈쿠',
        area: '아사쿠사',
        name: '타이토 료칸',
        price: '₩ 80,000 ~',
        rating: '4.3',
        address: 'Asakusa, Taito City, Tokyo 일본',
        access: '일본식 객실, 공용 시설',
        image: '/images/stay/tokyo/minshuku/taito_ryokan/taito_ryokan.png',
        description: '아사쿠사의 오래된 동네 분위기와 저렴한 일본식 숙박을 함께 느끼기 좋은 민슈쿠형 숙소',
    },
    {
        slug: 'andon-ryokan',
        routeCategory: '민슈쿠',
        category: '민슈쿠',
        area: '미노와',
        name: '안돈 료칸',
        price: '₩ 95,000 ~',
        rating: '4.4',
        address: 'Minowa, Taito City, Tokyo 일본',
        access: '컴팩트 객실, 공용 라운지',
        image: '/images/stay/tokyo/minshuku/andon_ryokan/andon_ryokan.png',
        description: '전통 숙소 감성과 디자인 호스텔 분위기를 섞은 조용한 동쪽 도쿄 숙소',
    },
    {
        slug: 'homeikan',
        routeCategory: '민슈쿠',
        category: '민슈쿠',
        area: '혼고',
        name: '호메이칸',
        price: '₩ 130,000 ~',
        rating: '4.5',
        address: 'Hongo, Bunkyo City, Tokyo 일본',
        access: '일본식 객실, 목조 건물',
        image: '/images/stay/tokyo/minshuku/homeikan/homeikan.png',
        description: '혼고의 조용한 골목에서 오래된 목조 일본식 숙소 분위기를 느끼기 좋은 곳',
    },
    {
        slug: 'family-inn-saiko',
        routeCategory: '민슈쿠',
        category: '민슈쿠',
        area: '이케부쿠로',
        name: '패밀리 인 사이코',
        price: '₩ 110,000 ~',
        rating: '4.6',
        address: 'Ikebukuro area, Tokyo 일본',
        access: '가족 객실, 일본식 객실',
        image: '/images/stay/tokyo/minshuku/family_inn_saiko/family_inn_saiko.png',
        description: '가족 여행자에게 맞는 일본식 객실과 조용한 주택가 분위기를 갖춘 민슈쿠형 숙소',
    },
];

const baseStayPlaceDetailsById: Record<string, StayPlaceDetail> = Object.fromEntries(
    stayInputs.map(createStayDetail)
) as Record<string, StayPlaceDetail>;

export const stayPlaceDetailsById: Record<string, StayPlaceDetail> = {
    ...baseStayPlaceDetailsById,
    ...generatedStayPlaceDetailsById,
};
