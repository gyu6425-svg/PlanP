import type { TransportCard } from '../components/cards/TransportProductCard';
import type { DetailInfoData } from '../components/detail/DetailInfoPanel';
import type { DetailLocationData } from '../components/detail/DetailLocationSection';
import { generatedTourPlaceDetailsById } from './generated/cityPlaceDetails';

export type TourPlaceDetail = DetailInfoData &
    DetailLocationData & {
        id: string;
        city: string;
        slug: string;
        name: string;
        category: string;
        area?: string;
        images: string[];
        bookingCards: TransportCard[];
    };

const shibuyaSkyImageBase = '/images/tour/sns/sibuyaSky';
const shibuyaSkyDetailImageBase = '/images/tour/tokyo/sns/shibuya_sky/shibuya_sky';
const fallbackTourImages = {
    main: `${shibuyaSkyDetailImageBase}.png`,
    sub1: `${shibuyaSkyDetailImageBase}_2.png`,
    sub2: `${shibuyaSkyDetailImageBase}_3.png`,
    sub3: `${shibuyaSkyDetailImageBase}_4.png`,
    sub4: `${shibuyaSkyDetailImageBase}_5.png`,
    tour: `${shibuyaSkyDetailImageBase}_6.png`,
    mapMain: `${shibuyaSkyImageBase}/tourDetail_sibuyaSky_map_main.png`,
    mapSub1: `${shibuyaSkyImageBase}/tourDetail_sibuyaSky_map_sub1.png`,
    mapSub2: `${shibuyaSkyImageBase}/tourDetail_sibuyaSky_map_sub2.png`,
};

const tourCategoryFolderByCategory: Record<string, string> = {
    SNS명소: 'sns',
    역사: 'history',
    소도시: 'smallcity',
};

const tourImageFolderBySlug: Record<string, string> = {
    'shibuya-sky': 'shibuya_sky',
    'omotesando-hills': 'omotesando_hills',
    'shibuya-scramble': 'shibuya_scramble',
    'meiji-jingu': 'meiji_jingu',
    sensoji: 'sensoji',
    'imperial-palace-east-gardens': 'imperial_palace_east_gardens',
    'kamakura-enoshima': 'kamakura_enoshima',
    'mount-fuji-tour': 'mount_fuji_tour',
};

function getTourImageBase(category: string, slug: string): string {
    const categoryFolder = tourCategoryFolderByCategory[category];
    const placeFolder = tourImageFolderBySlug[slug];
    return `/images/tour/tokyo/${categoryFolder}/${placeFolder}/${placeFolder}`;
}

function getTourHeroImage(category: string, slug: string): string {
    return `${getTourImageBase(category, slug)}.png`;
}

function getTourDetailImages(category: string, slug: string): string[] {
    if (slug === 'mount-fuji-tour') {
        const imageBase = '/images/tour/tokyo/smallcity/mount_fuji_tour';

        return [
            `${imageBase}/mount_fuji_tour.png`,
            `${imageBase}/a3ab9f8aa860ddd6f0dd89290876b19e.jpg`,
            `${imageBase}/892a227755e5bc3427d0f873fab6cc68.jpg`,
            `${imageBase}/a2288e4cd6094d549e7437c8c284e856.jpg`,
            `${imageBase}/37fc520c691c96afb1c25747d89383dd.jpg`,
            `${imageBase}/511a39715c3aaabe15145fddf5ba0d11.jpg`,
            `${imageBase}/2c6db7b3f7009e2cb2292f3d826d3bd0.jpg`,
        ];
    }

    const imageBase = getTourImageBase(category, slug);
    const extraImages = Array.from({ length: 49 }, (_, index) => `${imageBase}_${index + 2}.png`);
    return [`${imageBase}.png`, ...extraImages];
}

function createFallbackMapImages() {
    return {
        main: fallbackTourImages.mapMain,
        sub1: fallbackTourImages.mapSub1,
        sub2: fallbackTourImages.mapSub2,
    };
}

const baseTourPlaceDetailsById: Record<string, TourPlaceDetail> = {
    'tokyo/sns/shibuya-sky': {
        id: 'tokyo-sns-shibuya-sky',
        city: 'tokyo',
        slug: 'shibuya-sky',
        name: '시부야 스카이',
        category: 'SNS명소',
        address: '2 Chome-24-12 Shibuya, Shibuya City, Tokyo 150-6145 일본',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Shibuya+Sky+Tokyo',
        website: 'https://www.shibuya-scramble-square.com/sky/',
        reservationLabel: '사전 예약 권장',
        reservationValue: '공식 예매',
        reservationNotes: [
            '일몰 시간대는 빠르게 매진될 수 있어 미리 예매하는 편이 좋습니다.',
            '입장 시간과 옥상 개방 여부는 날씨에 따라 달라질 수 있습니다.',
            '현장 상황에 따라 수하물 보관이나 입장 동선이 변경될 수 있습니다.',
        ],
        access: '전망대, 루프탑, 실내 전망 공간',
        description:
            '시부야 중심에서 도쿄 도심을 넓게 내려다볼 수 있는 전망 명소로, 일몰과 야경 사진을 남기기 좋은 스팟',
        images: getTourDetailImages('SNS명소', 'shibuya-sky'),
        mapImages: {
            main: `${shibuyaSkyImageBase}/tourDetail_sibuyaSky_map_main.png`,
            sub1: `${shibuyaSkyImageBase}/tourDetail_sibuyaSky_map_sub1.png`,
            sub2: `${shibuyaSkyImageBase}/tourDetail_sibuyaSky_map_sub2.png`,
        },
        nearbyGroups: [
            {
                title: '가까운 역',
                icon: 'station',
                items: ['시부야역 (도보 1분)', '메이지진구마에역 (도보 15분)'],
            },
            {
                title: '유명사진스팟',
                icon: 'camera',
                items: ['시부야 스크램블 교차로 (도보 4분)', '하치코 동상 (도보 5분)'],
            },
            {
                title: '쇼핑센터',
                icon: 'shopping',
                items: ['시부야 스크램블 스퀘어 (건물 내)', '시부야 히카리에 (도보 3분)'],
            },
        ],
        transitDirections: [
            {
                line: 'JR선 (야마노테선/사이쿄선 등)',
                color: '#111111',
                description: '남쪽 개찰구(South Gate) 또는 동쪽 개찰구(East Gate)로 나와서 도보 1~2분',
            },
            {
                line: '도쿄메트로 한조몬선 / 부토신선 / 도큐 덴엔토시선·도요코선',
                color: '#8F76D6',
                description: '지하에서 이동 시 B6번 출구 방향으로 오시면 건물 지하와 바로 연결됩니다.',
            },
            {
                line: '도쿄메트로 긴자선',
                color: '#F39700',
                description:
                    '3층 개찰구(Scramble Square 방향)로 나오시면 건물 3층 엘리베이터 홀로 바로 진입할 수 있습니다.',
            },
        ],
        hours: [
            { day: '월요일', value: '오전 10:00 - 오후 10:30' },
            { day: '화요일', value: '오전 10:00 - 오후 10:30', isToday: true },
            { day: '수요일', value: '오전 10:00 - 오후 10:30' },
            { day: '목요일', value: '오전 10:00 - 오후 10:30' },
            { day: '금요일', value: '오전 10:00 - 오후 10:30' },
            { day: '토요일', value: '오전 10:00 - 오후 10:30' },
            { day: '일요일', value: '오전 10:00 - 오후 10:30' },
        ],
        bookingCards: [
            {
                id: 'shibuya-sky-klook',
                option: 'tour-booking',
                brand: 'Klook',
                route: '시부야',
                title: '시부야 스카이 전망대 입장권',
                price: '₩ 25,000 ~',
                rating: '4.9',
                cancelLabel: '모바일 티켓',
                image: getTourHeroImage('SNS명소', 'shibuya-sky'),
                href: 'https://www.klook.com/',
            },
            {
                id: 'shibuya-sky-trip',
                option: 'tour-booking',
                brand: 'Trip.com',
                route: '시부야',
                title: '시부야 스카이 입장권',
                price: '₩ 26,100 ~',
                rating: '4.8',
                cancelLabel: '즉시 확정',
                image: getTourHeroImage('SNS명소', 'shibuya-sky'),
                href: 'https://kr.trip.com/',
            },
            {
                id: 'shibuya-sky-myrealtrip',
                option: 'tour-booking',
                brand: '마이리얼트립',
                route: '시부야',
                title: '도쿄 시부야 스카이 티켓',
                price: '₩ 25,900 ~',
                rating: '4.8',
                cancelLabel: '예약 가능',
                image: getTourHeroImage('SNS명소', 'shibuya-sky'),
                href: 'https://www.myrealtrip.com/',
            },
            {
                id: 'shibuya-sky-official',
                option: 'tour-booking',
                brand: 'Official',
                route: '시부야',
                title: 'SHIBUYA SKY Ticket',
                price: '¥ 2,500 ~',
                rating: '4.9',
                cancelLabel: '공식 예매',
                image: getTourHeroImage('SNS명소', 'shibuya-sky'),
                href: 'https://www.shibuya-scramble-square.com/sky/ticket/',
            },
        ],
    },
    'tokyo/sns/omotesando-hills': {
        id: 'tokyo-sns-omohills',
        city: 'tokyo',
        slug: 'omotesando-hills',
        name: '오모테산도 힐스',
        category: 'SNS명소',
        address: '4 Chome-12-10 Jingumae, Shibuya City, Tokyo 150-0001 일본',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Omotesando+Hills+Tokyo',
        website: 'https://www.omotesandohills.com/',
        reservationLabel: '입장료 무료',
        reservationValue: '매장별 운영시간 확인',
        reservationNotes: [
            '안도 다다오가 설계한 쇼핑 복합공간으로 내부 경사 동선과 노출 콘크리트 분위기가 특징입니다.',
            '패션, 라이프스타일, 카페 매장이 함께 있어 오모테산도 산책 중 들르기 좋습니다.',
            '전시와 이벤트, 매장 운영 시간은 시즌에 따라 달라질 수 있습니다.',
        ],
        access: '쇼핑몰, 카페, 갤러리, 내부 스파이럴 램프',
        description:
            '오모테산도 중심에 있는 감각적인 쇼핑 복합공간으로, 건축적인 내부 동선과 브랜드 매장, 카페를 함께 둘러보기 좋은 SNS 명소',
        images: getTourDetailImages('SNS명소', 'omotesando-hills'),
        mapImages: createFallbackMapImages(),
        nearbyGroups: [],
        transitDirections: [
            {
                line: '도쿄메트로 긴자선 / 한조몬선 / 치요다선',
                color: '#F39700',
                description: '오모테산도역 A2 출구로 나와 오모테산도 거리 방향으로 약 2~3분 걸으면 도착합니다.',
            },
            {
                line: '도쿄메트로 치요다선 / 후쿠토신선',
                color: '#009944',
                description:
                    '메이지진구마에〈하라주쿠〉역에서 내려 오모테산도 방향으로 걸으면 약 7~8분 정도 소요됩니다.',
            },
            {
                line: 'JR 야마노테선',
                color: '#9ACD32',
                description: '하라주쿠역에서 다케시타도리 반대편으로 나와 오모테산도 거리 방향으로 이동합니다.',
            },
        ],
        hours: [
            { day: '월요일', value: '오전 11:00 - 오후 08:00' },
            { day: '화요일', value: '오전 11:00 - 오후 08:00', isToday: true },
            { day: '수요일', value: '오전 11:00 - 오후 08:00' },
            { day: '목요일', value: '오전 11:00 - 오후 08:00' },
            { day: '금요일', value: '오전 11:00 - 오후 08:00' },
            { day: '토요일', value: '오전 11:00 - 오후 08:00' },
            { day: '일요일', value: '오전 11:00 - 오후 08:00' },
        ],
        bookingCards: [
            {
                id: 'omotesando-walking-tour-klook',
                option: 'tour-booking',
                brand: 'Klook',
                route: '오모테산도',
                title: '하라주쿠·오모테산도 워킹 투어',
                price: '₩ 38,000 ~',
                rating: '4.7',
                cancelLabel: '가이드 투어',
                image: getTourHeroImage('SNS명소', 'omotesando-hills'),
                href: 'https://www.klook.com/',
            },
            {
                id: 'omotesando-private-tour',
                option: 'tour-booking',
                brand: '마이리얼트립',
                route: '오모테산도',
                title: '도쿄 감성 거리 산책 투어',
                price: '₩ 45,000 ~',
                rating: '4.7',
                cancelLabel: '예약 가능',
                image: getTourHeroImage('SNS명소', 'omotesando-hills'),
                href: 'https://www.myrealtrip.com/',
            },
        ],
    },
    'tokyo/sns/shibuya-scramble': {
        id: 'tokyo-sns-x',
        city: 'tokyo',
        slug: 'shibuya-scramble',
        name: '시부야 스크램블',
        category: 'SNS명소',
        address: '2 Chome-2-1 Dogenzaka, Shibuya City, Tokyo 150-0043 일본',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Shibuya+Scramble+Crossing',
        website: 'https://www.gotokyo.org/en/spot/78/index.html',
        reservationLabel: '상시 방문 가능',
        reservationValue: '무료',
        reservationNotes: [
            '시부야역 앞의 대표적인 횡단보도로, 도쿄를 상징하는 도시 풍경을 볼 수 있습니다.',
            '사람이 많은 시간대에는 사진 촬영 시 보행 흐름을 방해하지 않도록 주의가 필요합니다.',
            '야경과 네온사인을 함께 담으려면 해 질 무렵 이후 방문이 좋습니다.',
        ],
        access: '스크램블 교차로, 하치코 동상, 시부야역 앞 광장',
        description:
            '수많은 보행자가 한 번에 교차하는 도쿄 대표 도시 풍경으로, 시부야의 에너지와 네온사인을 가장 직관적으로 느낄 수 있는 장소',
        images: getTourDetailImages('SNS명소', 'shibuya-scramble'),
        mapImages: createFallbackMapImages(),
        nearbyGroups: [],
        transitDirections: [
            {
                line: 'JR 야마노테선 / 사이쿄선 / 쇼난신주쿠라인',
                color: '#111111',
                description: '시부야역 하치코 출구로 나오면 바로 스크램블 교차로와 하치코 광장이 보입니다.',
            },
            {
                line: '도쿄메트로 긴자선 / 한조몬선 / 후쿠토신선',
                color: '#F39700',
                description: '지하에서 이동할 경우 A8 또는 하치코 광장 방향 출구를 따라 나오면 교차로와 연결됩니다.',
            },
            {
                line: '도큐 도요코선 / 덴엔토시선',
                color: '#DA0442',
                description: '지하 개찰구에서 하치코 광장 방면 표지판을 따라 올라오면 교차로 북서쪽으로 나옵니다.',
            },
        ],
        hours: [
            { day: '월요일', value: '24시간' },
            { day: '화요일', value: '24시간', isToday: true },
            { day: '수요일', value: '24시간' },
            { day: '목요일', value: '24시간' },
            { day: '금요일', value: '24시간' },
            { day: '토요일', value: '24시간' },
            { day: '일요일', value: '24시간' },
        ],
        bookingCards: [
            {
                id: 'shibuya-night-tour-klook',
                option: 'tour-booking',
                brand: 'Klook',
                route: '시부야',
                title: '시부야 야경·포토 스팟 투어',
                price: '₩ 36,000 ~',
                rating: '4.7',
                cancelLabel: '가이드 투어',
                image: getTourHeroImage('SNS명소', 'shibuya-scramble'),
                href: 'https://www.klook.com/',
            },
            {
                id: 'shibuya-photo-tour-myrealtrip',
                option: 'tour-booking',
                brand: '마이리얼트립',
                route: '시부야',
                title: '시부야 사진 명소 워킹 투어',
                price: '₩ 42,000 ~',
                rating: '4.8',
                cancelLabel: '예약 가능',
                image: getTourHeroImage('SNS명소', 'shibuya-scramble'),
                href: 'https://www.myrealtrip.com/',
            },
        ],
    },
    'tokyo/history/meiji-jingu': {
        id: 'tokyo-history-meiji-jingu',
        city: 'tokyo',
        slug: 'meiji-jingu',
        name: '메이지 신궁',
        category: '역사',
        address: '1-1 Yoyogi Kamizono-cho, Shibuya-ku, Tokyo 151-8557 일본',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Meiji+Jingu+Tokyo',
        website: 'https://www.meijijingu.or.jp/en/',
        reservationLabel: '입장료 무료',
        reservationValue: '연중무휴',
        reservationNotes: [
            '메이지 천황과 쇼켄 황태후를 모신 도쿄 대표 신사입니다.',
            '숲길을 따라 걸어 들어가는 동선이라 도심 안에서도 조용한 분위기를 느끼기 좋습니다.',
            '신사 운영 시간은 월별로 달라질 수 있어 방문 전 공식 안내를 확인하는 편이 좋습니다.',
        ],
        access: '본전, 도리이, 신궁 숲길, 보물전 일대',
        description:
            '하라주쿠와 요요기 사이의 울창한 숲 안에 자리한 신사로, 도쿄 도심에서 일본 근대사의 상징적인 공간을 차분하게 둘러보기 좋은 명소',
        images: getTourDetailImages('역사', 'meiji-jingu'),
        mapImages: createFallbackMapImages(),
        nearbyGroups: [],
        transitDirections: [
            {
                line: 'JR 야마노테선',
                color: '#9ACD32',
                description: '하라주쿠역 오모테산도 출구로 나와 신궁 입구까지 도보 1~2분 이동합니다.',
            },
            {
                line: '도쿄메트로 치요다선 / 후쿠토신선',
                color: '#009944',
                description:
                    '메이지진구마에〈하라주쿠〉역에서 내려 2번 출구 방향으로 나오면 신궁 남쪽 입구와 가깝습니다.',
            },
            {
                line: '오다큐선',
                color: '#2288CC',
                description: '산구바시역에서 하차하면 서쪽 참배로 방향으로 걸어 들어갈 수 있습니다.',
            },
        ],
        hours: [
            { day: '월요일', value: '일출 - 일몰' },
            { day: '화요일', value: '일출 - 일몰', isToday: true },
            { day: '수요일', value: '일출 - 일몰' },
            { day: '목요일', value: '일출 - 일몰' },
            { day: '금요일', value: '일출 - 일몰' },
            { day: '토요일', value: '일출 - 일몰' },
            { day: '일요일', value: '일출 - 일몰' },
        ],
        bookingCards: [
            {
                id: 'meiji-jingu-guided-tour-klook',
                option: 'tour-booking',
                brand: 'Klook',
                route: '하라주쿠',
                title: '메이지 신궁·하라주쿠 워킹 투어',
                price: '₩ 35,000 ~',
                rating: '4.8',
                cancelLabel: '가이드 투어',
                image: getTourHeroImage('역사', 'meiji-jingu'),
                href: 'https://www.klook.com/',
            },
            {
                id: 'meiji-jingu-myrealtrip',
                option: 'tour-booking',
                brand: '마이리얼트립',
                route: '하라주쿠',
                title: '도쿄 역사 산책 투어',
                price: '₩ 42,000 ~',
                rating: '4.7',
                cancelLabel: '예약 가능',
                image: getTourHeroImage('역사', 'meiji-jingu'),
                href: 'https://www.myrealtrip.com/',
            },
        ],
    },
    'tokyo/history/sensoji': {
        id: 'tokyo-history-sensoji',
        city: 'tokyo',
        slug: 'sensoji',
        name: '센소지',
        category: '역사',
        address: '2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032 일본',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sensoji+Temple+Tokyo',
        website: 'https://www.senso-ji.jp/english/',
        reservationLabel: '입장료 무료',
        reservationValue: '본당 시간 확인',
        reservationNotes: [
            '도쿄에서 가장 잘 알려진 사찰 중 하나로 아사쿠사 대표 코스입니다.',
            '나카미세도리 상점가는 낮 시간대에 특히 붐빌 수 있습니다.',
            '본당과 경내 시설 운영 시간은 계절과 행사에 따라 달라질 수 있습니다.',
        ],
        access: '가미나리몬, 나카미세도리, 본당, 오층탑',
        description:
            '가미나리몬부터 나카미세도리까지 이어지는 전통적인 분위기와 도쿄 서민 문화가 함께 남아 있는 아사쿠사의 대표 역사 명소',
        images: getTourDetailImages('역사', 'sensoji'),
        mapImages: createFallbackMapImages(),
        nearbyGroups: [],
        transitDirections: [
            {
                line: '도쿄메트로 긴자선',
                color: '#F39700',
                description: '아사쿠사역에서 내려 1번 출구 방향으로 나오면 가미나리몬까지 도보 약 5분입니다.',
            },
            {
                line: '도에이 아사쿠사선',
                color: '#E85298',
                description: '아사쿠사역 A4 출구를 이용하면 나카미세도리 입구 방향으로 접근하기 쉽습니다.',
            },
            {
                line: '도부 스카이트리 라인',
                color: '#0F6CC3',
                description: '도부 아사쿠사역에서 내려 가미나리몬 방향으로 강변 도로를 따라 이동합니다.',
            },
        ],
        hours: [
            { day: '월요일', value: '오전 06:00 - 오후 05:00' },
            { day: '화요일', value: '오전 06:00 - 오후 05:00', isToday: true },
            { day: '수요일', value: '오전 06:00 - 오후 05:00' },
            { day: '목요일', value: '오전 06:00 - 오후 05:00' },
            { day: '금요일', value: '오전 06:00 - 오후 05:00' },
            { day: '토요일', value: '오전 06:00 - 오후 05:00' },
            { day: '일요일', value: '오전 06:00 - 오후 05:00' },
        ],
        bookingCards: [
            {
                id: 'sensoji-asakusa-tour-klook',
                option: 'tour-booking',
                brand: 'Klook',
                route: '아사쿠사',
                title: '아사쿠사·센소지 워킹 투어',
                price: '₩ 32,000 ~',
                rating: '4.8',
                cancelLabel: '가이드 투어',
                image: getTourHeroImage('역사', 'sensoji'),
                href: 'https://www.klook.com/',
            },
        ],
    },
    'tokyo/history/imperial-palace-east-gardens': {
        id: 'tokyo-history-imperial-palace-east-gardens',
        city: 'tokyo',
        slug: 'imperial-palace-east-gardens',
        name: '고쿄 히가시교엔',
        category: '역사',
        address: '1-1 Chiyoda, Chiyoda City, Tokyo 100-8111 일본',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Imperial+Palace+East+Gardens+Tokyo',
        website: 'https://www.kunaicho.go.jp/e-event/higashigyoen02.html',
        reservationLabel: '입장료 무료',
        reservationValue: '휴원일 확인',
        reservationNotes: [
            '에도성 유적과 정원을 함께 볼 수 있는 고쿄 동쪽 정원입니다.',
            '월요일과 금요일 등 정기 휴원일이 있을 수 있어 방문 전 확인이 필요합니다.',
            '보안과 행사 상황에 따라 일부 구역 동선이 제한될 수 있습니다.',
        ],
        access: '오테몬, 에도성 터, 니노마루 정원',
        description:
            '도쿄역과 마루노우치에서 접근하기 좋은 역사 산책 코스로, 에도성 유구와 넓은 정원을 함께 둘러볼 수 있는 장소',
        images: getTourDetailImages('역사', 'imperial-palace-east-gardens'),
        mapImages: createFallbackMapImages(),
        nearbyGroups: [],
        transitDirections: [
            {
                line: '도쿄메트로 오테마치역',
                color: '#009944',
                description: '오테마치역 C13a 출구에서 오테몬 방향으로 이동하면 동쪽 정원 입구와 가깝습니다.',
            },
            {
                line: '도쿄메트로 도자이선',
                color: '#00A7DB',
                description: '다케바시역 1a 출구에서 기타하네바시몬 방향으로 이동할 수 있습니다.',
            },
            {
                line: 'JR선',
                color: '#111111',
                description: '도쿄역 마루노우치 북쪽 출구에서 황거 방향으로 걸어 약 15분 정도 이동합니다.',
            },
        ],
        hours: [
            { day: '월요일', value: '휴원' },
            { day: '화요일', value: '오전 09:00 - 오후 04:30', isToday: true },
            { day: '수요일', value: '오전 09:00 - 오후 04:30' },
            { day: '목요일', value: '오전 09:00 - 오후 04:30' },
            { day: '금요일', value: '휴원' },
            { day: '토요일', value: '오전 09:00 - 오후 04:30' },
            { day: '일요일', value: '오전 09:00 - 오후 04:30' },
        ],
        bookingCards: [
            {
                id: 'imperial-palace-walking-tour',
                option: 'tour-booking',
                brand: 'Trip.com',
                route: '마루노우치',
                title: '고쿄·마루노우치 워킹 투어',
                price: '₩ 39,000 ~',
                rating: '4.6',
                cancelLabel: '예약 가능',
                image: getTourHeroImage('역사', 'imperial-palace-east-gardens'),
                href: 'https://kr.trip.com/',
            },
        ],
    },
    'tokyo/smallcity/kamakura-enoshima': {
        id: 'tokyo-smallcity-kamakura-enoshima',
        city: 'tokyo',
        slug: 'kamakura-enoshima',
        name: '가마쿠라·에노시마',
        category: '소도시',
        address: 'Kamakura, Kanagawa, Japan',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kamakura+Enoshima+Japan',
        website: 'https://www.trip-kamakura.com/',
        reservationLabel: '도쿄 근교 당일치기',
        reservationValue: '열차 이동 가능',
        reservationNotes: [
            '가마쿠라는 쓰루가오카 하치만구, 고토쿠인 대불, 하세데라를 함께 묶기 좋습니다.',
            '에노덴을 이용하면 하세, 가마쿠라코코마에, 에노시마를 해안 동선으로 연결할 수 있습니다.',
            '주말과 공휴일은 고마치도리와 주요 사찰 주변이 붐빌 수 있습니다.',
        ],
        access: '쓰루가오카 하치만구, 고토쿠인 대불, 하세데라, 에노시마',
        description:
            '도쿄에서 열차로 다녀오기 좋은 해안 소도시 코스로, 사찰과 골목 산책, 바다 전망을 하루 일정 안에 함께 즐기기 좋은 지역',
        images: getTourDetailImages('소도시', 'kamakura-enoshima'),
        mapImages: createFallbackMapImages(),
        nearbyGroups: [],
        transitDirections: [
            {
                line: 'JR 요코스카선',
                color: '#007AC0',
                description: '도쿄역 또는 시나가와역에서 가마쿠라역까지 환승 없이 이동한 뒤 고마치도리 방향으로 시작합니다.',
            },
            {
                line: '쇼난신주쿠라인',
                color: '#E21F26',
                description: '신주쿠·시부야 쪽 숙소라면 쇼난신주쿠라인으로 가마쿠라역까지 이동하는 동선이 편합니다.',
            },
            {
                line: '에노덴',
                color: '#0B8F6A',
                description: '가마쿠라역에서 하세·가마쿠라코코마에·에노시마를 잇는 해안 구간을 천천히 둘러볼 수 있습니다.',
            },
        ],
        hours: [
            { day: '추천', value: '오전 출발 - 저녁 복귀', isToday: true },
            { day: '소요', value: '반나절 - 하루' },
            { day: '이동', value: '도쿄 기준 약 1시간' },
        ],
        bookingCards: [
            {
                id: 'kamakura-enoshima-klook',
                option: 'tour-booking',
                brand: 'Klook',
                route: '가마쿠라',
                title: '가마쿠라·에노시마 일일 투어',
                price: '₩ 58,000 ~',
                rating: '4.7',
                cancelLabel: '일일 투어',
                image: getTourHeroImage('소도시', 'kamakura-enoshima'),
                href: 'https://www.klook.com/',
            },
            {
                id: 'kamakura-enoshima-myrealtrip',
                option: 'tour-booking',
                brand: '마이리얼트립',
                route: '가마쿠라',
                title: '도쿄 근교 가마쿠라 투어',
                price: '₩ 69,000 ~',
                rating: '4.8',
                cancelLabel: '예약 가능',
                image: getTourHeroImage('소도시', 'kamakura-enoshima'),
                href: 'https://www.myrealtrip.com/',
            },
        ],
    },
    'tokyo/smallcity/mount-fuji-tour': {
        id: 'tokyo-smallcity-mount-fuji-tour',
        city: 'tokyo',
        slug: 'mount-fuji-tour',
        name: '후지산 5합목 투어',
        category: '소도시',
        address: 'Fuji Subaru Line 5th Station, Narusawa, Yamanashi, Japan',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Fuji+Subaru+Line+5th+Station',
        website: 'https://www.fujisan-climb.jp/en/',
        reservationLabel: '투어 예약 권장',
        reservationValue: '날씨 확인 필수',
        reservationNotes: [
            '도쿄 출발 당일 투어는 후지산 5합목, 가와구치코, 오시노핫카이를 함께 묶는 경우가 많습니다.',
            '5합목 접근 도로와 등산로는 계절과 날씨에 따라 운영 상황이 달라질 수 있습니다.',
            '고도가 높아 여름에도 바람이 차가울 수 있어 얇은 겉옷을 준비하는 편이 좋습니다.',
        ],
        access: '후지 스바루라인 5합목, 가와구치코, 오시노핫카이',
        description:
            '도쿄에서 버스 투어로 다녀오기 좋은 후지산 대표 근교 일정으로, 직접 등산하지 않아도 5합목과 호수 전망을 함께 경험할 수 있는 코스',
        images: getTourDetailImages('소도시', 'mount-fuji-tour'),
        mapImages: createFallbackMapImages(),
        nearbyGroups: [],
        transitDirections: [
            {
                line: '고속버스',
                color: '#111111',
                description: '신주쿠 또는 도쿄 출발 고속버스·투어버스를 이용하면 후지산 5합목이나 가와구치코까지 이동할 수 있습니다.',
            },
            {
                line: '후지큐코선',
                color: '#004EA2',
                description: '오쓰키역에서 후지큐코선으로 환승해 가와구치코역까지 이동한 뒤 현지 버스를 이용합니다.',
            },
            {
                line: '투어버스',
                color: '#6B8A59',
                description: '초행이라면 투어버스가 편하며, 도로·날씨 상황에 따라 방문 순서가 조정될 수 있습니다.',
            },
        ],
        hours: [
            { day: '추천', value: '아침 출발 - 저녁 복귀', isToday: true },
            { day: '소요', value: '하루' },
            { day: '주의', value: '날씨·도로 상황 확인' },
        ],
        bookingCards: [
            {
                id: 'mount-fuji-klook',
                option: 'tour-booking',
                brand: 'Klook',
                route: '후지산',
                title: '후지산 5합목·가와구치코 일일 투어',
                price: '₩ 70,000 ~',
                rating: '4.7',
                cancelLabel: '일일 투어',
                image: getTourHeroImage('소도시', 'mount-fuji-tour'),
                href: 'https://www.klook.com/',
            },
            {
                id: 'mount-fuji-trip',
                option: 'tour-booking',
                brand: 'Trip.com',
                route: '후지산',
                title: '도쿄 출발 후지산 버스 투어',
                price: '₩ 76,000 ~',
                rating: '4.7',
                cancelLabel: '예약 가능',
                image: getTourHeroImage('소도시', 'mount-fuji-tour'),
                href: 'https://kr.trip.com/',
            },
            {
                id: 'mount-fuji-myrealtrip',
                option: 'tour-booking',
                brand: '마이리얼트립',
                route: '후지산',
                title: '후지산·오시노핫카이 투어',
                price: '₩ 89,000 ~',
                rating: '4.8',
                cancelLabel: '가이드 투어',
                image: getTourHeroImage('소도시', 'mount-fuji-tour'),
                href: 'https://www.myrealtrip.com/',
            },
        ],
    },
};

export const tourPlaceDetailsById: Record<string, TourPlaceDetail> = {
    ...baseTourPlaceDetailsById,
    ...generatedTourPlaceDetailsById,
    ...Object.fromEntries(
        Object.entries(generatedTourPlaceDetailsById)
            .filter(([key]) => key.startsWith('tokyo/'))
            .map(([key, detail]) => {
                const routeKey = key
                    .replace('tokyo/SNS명소/', 'tokyo/sns/')
                    .replace('tokyo/역사/', 'tokyo/history/')
                    .replace('tokyo/소도시/', 'tokyo/smallcity/');
                return [routeKey, detail];
            })
    ),
};
