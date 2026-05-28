import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const generatedDir = path.join(process.cwd(), 'generated');
const outputPath = path.join(process.cwd(), 'src/data/generated/cityPlaceDetails.ts');

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

const fallbackImage = '/images/landing/landingPage_hero.png';

const foodHours = [
    { day: '월요일', value: '오전 11:00 - 오후 09:00' },
    { day: '화요일', value: '오전 11:00 - 오후 09:00', isToday: true },
    { day: '수요일', value: '오전 11:00 - 오후 09:00' },
    { day: '목요일', value: '오전 11:00 - 오후 09:00' },
    { day: '금요일', value: '오전 11:00 - 오후 10:00' },
    { day: '토요일', value: '오전 11:00 - 오후 10:00' },
    { day: '일요일', value: '오전 11:00 - 오후 09:00' },
];

const tourHours = [
    { day: '월요일', value: '오전 10:00 - 오후 06:00' },
    { day: '화요일', value: '오전 10:00 - 오후 06:00', isToday: true },
    { day: '수요일', value: '오전 10:00 - 오후 06:00' },
    { day: '목요일', value: '오전 10:00 - 오후 06:00' },
    { day: '금요일', value: '오전 10:00 - 오후 07:00' },
    { day: '토요일', value: '오전 09:00 - 오후 07:00' },
    { day: '일요일', value: '오전 09:00 - 오후 07:00' },
];

const stayHours = [
    { day: '체크인', value: '예약 조건 확인', isToday: true },
    { day: '체크아웃', value: '예약 조건 확인' },
    { day: '프런트', value: '숙소별 운영시간 확인' },
    { day: '조식', value: '예약 조건 확인' },
];

function normalizeCategory(category) {
    return normalizedCategoryByName.get(category) || category;
}

function foodRouteCategory(category) {
    return category === '라멘' ? 'ramen' : category;
}

function stayRouteCategory(category) {
    return category === '호텔' ? 'hotel' : category;
}

function routeKey(city, category, slug) {
    return `${city}/${category}/${slug}`;
}

function addUrlParam(url, key, value) {
    if (!url || !/^https?:\/\//.test(url)) {
        return url || fallbackImage;
    }

    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
}

function detailImages(image) {
    const baseImage = image || fallbackImage;
    return Array.from({ length: 5 }, (_, index) =>
        index === 0 ? baseImage : addUrlParam(baseImage, 'planpDetail', String(index + 1))
    );
}

function detailImagesForPlace(place) {
    const images = Array.isArray(place.images) ? place.images.filter(Boolean) : [];

    if (images.length > 0) {
        const fallback = images[0];
        return Array.from({ length: 5 }, (_, index) => images[index] || fallback);
    }

    return detailImages(place.image);
}

function mapImagesForPlace(place) {
    if (Array.isArray(place.mapImages) && place.mapImages.length >= 2) {
        return {
            main: place.mapImages[0],
            sub1: place.mapImages[0],
            sub2: place.mapImages[1],
        };
    }

    const images = Array.isArray(place.images) ? place.images.filter(Boolean) : [];
    const baseImage = place.image || images[0] || fallbackImage;

    return {
        main: baseImage,
        sub1: images[4] || images[1] || addUrlParam(baseImage, 'planpMap', '1'),
        sub2: images[5] || images[2] || addUrlParam(baseImage, 'planpMap', '2'),
    };
}

function googleMapsSearchUrl(query) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function googleSearchUrl(query) {
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function baseNearbyGroups(place, cityName) {
    return [
        {
            title: '가까운 역',
            icon: 'station',
            items: [`${place.area} 인근 역`, `${cityName} 주요 이동 동선`],
        },
        {
            title: '주변 스팟',
            icon: 'camera',
            items: [`${place.area} 산책 코스`, `${cityName} 여행 동선`],
        },
        {
            title: '편의시설',
            icon: 'store',
            items: ['편의점', '쇼핑/식사 공간'],
        },
    ];
}

function baseTransitDirections(place, cityName) {
    const text = `${place.name} ${place.area}`;
    const includes = (...patterns) => patterns.some((pattern) => text.includes(pattern));

    if (cityName === '도쿄') {
        if (includes('시부야', '도겐자카')) {
            return [
                {
                    line: 'JR 야마노테선 / 도쿄메트로 긴자선 시부야역',
                    color: '#9ACD32',
                    description: '시부야역 하치코 출구나 미야마스자카 방면 출구에서 도보 이동이 가장 무난합니다.',
                },
                {
                    line: '도쿄메트로 한조몬선 / 후쿠토신선 시부야역',
                    color: '#8F76D6',
                    description: '지하 통로를 이용하면 비 오는 날에도 시부야 중심가까지 이동하기 편합니다.',
                },
            ];
        }

        if (includes('긴자', '아오야마', '가이엔마에')) {
            return [
                {
                    line: '도쿄메트로 긴자선',
                    color: '#F39700',
                    description: '긴자, 아오야마, 가이엔마에 권역은 긴자선 역에서 도보 접근이 가장 직관적입니다.',
                },
                {
                    line: '도쿄메트로 히비야선 / 마루노우치선',
                    color: '#B5B5AC',
                    description: '긴자 주변 일정은 히비야선이나 마루노우치선 환승을 함께 확인하면 동선이 짧아집니다.',
                },
            ];
        }

        if (includes('아사쿠사')) {
            return [
                {
                    line: '도쿄메트로 긴자선 아사쿠사역',
                    color: '#F39700',
                    description: '아사쿠사역에서 센소지, 카페, 숙소 권역까지 도보 이동이 쉽습니다.',
                },
                {
                    line: '도에이 아사쿠사선',
                    color: '#E85298',
                    description: '하네다·나리타 방면 이동과 함께 묶을 때는 도에이 아사쿠사선 연결이 편합니다.',
                },
            ];
        }

        return [
            {
                line: 'JR 야마노테선',
                color: '#9ACD32',
                description: '도쿄 주요 권역은 야마노테선 역을 기준으로 잡으면 환승과 도보 동선이 단순해집니다.',
            },
            {
                line: '도쿄메트로 주요 노선',
                color: '#6B8A59',
                description: '목적지 이름을 지도에 입력해 가장 가까운 도쿄메트로 역 출구를 함께 확인하세요.',
            },
        ];
    }

    if (cityName === '오사카') {
        if (includes('난바', '도톤보리', '신사이바시', '구로몬', '센니치마에')) {
            return [
                {
                    line: '오사카 메트로 미도스지선 난바역',
                    color: '#E5171F',
                    description: '난바역에서 도톤보리, 구로몬시장, 신사이바시 권역까지 도보로 이어가기 좋습니다.',
                },
                {
                    line: '오사카 메트로 사카이스지선 닛폰바시역',
                    color: '#814721',
                    description: '구로몬시장이나 도톤보리 동쪽은 닛폰바시역 기준으로 잡으면 걷는 거리가 짧습니다.',
                },
            ];
        }

        if (includes('우메다', '오사카역')) {
            return [
                {
                    line: '오사카 메트로 미도스지선 우메다역',
                    color: '#E5171F',
                    description: '우메다역과 JR 오사카역을 기준으로 잡으면 쇼핑몰, 전망대, 호텔 접근이 편합니다.',
                },
                {
                    line: 'JR 오사카 순환선',
                    color: '#E80000',
                    description: 'JR 오사카역을 함께 확인하면 교토, 고베, 간사이공항 방면 환승도 수월합니다.',
                },
            ];
        }

        return [
            {
                line: '오사카 메트로 미도스지선',
                color: '#E5171F',
                description: '오사카 시내 주요 관광지는 미도스지선을 중심으로 동선을 잡으면 이동이 단순합니다.',
            },
            {
                line: 'JR 오사카 순환선',
                color: '#E80000',
                description: '성 주변이나 텐노지 방면은 JR 순환선과 지하철 환승을 함께 비교하세요.',
            },
        ];
    }

    if (cityName === '후쿠오카') {
        if (includes('하카타', '텐진', '나카스', '오호리', '후쿠오카 타워')) {
            return [
                {
                    line: '후쿠오카 지하철 공항선',
                    color: '#E87722',
                    description: '공항, 하카타, 텐진, 오호리공원을 한 번에 잇는 노선이라 여행 동선의 기준으로 쓰기 좋습니다.',
                },
                {
                    line: '니시테츠 버스',
                    color: '#00A650',
                    description: '야타이, 시장, 해변 쪽은 지하철 역에서 버스를 한 번 더 연결하면 걷는 거리가 줄어듭니다.',
                },
            ];
        }

        return [
            {
                line: '후쿠오카 지하철 공항선',
                color: '#E87722',
                description: '하카타역이나 텐진역을 기준으로 잡고 버스 환승을 더하면 대부분의 일정이 연결됩니다.',
            },
            {
                line: '니시테츠 전철 / 버스',
                color: '#00A650',
                description: '다자이후나 근교 이동은 니시테츠 노선과 버스 시간을 함께 확인하세요.',
            },
        ];
    }

    if (cityName === '타이베이') {
        if (includes('신이', '타이베이 101', '상산', 'W 타이베이', '그랜드 하얏트')) {
            return [
                {
                    line: '타이베이 MRT 단수이신이선',
                    color: '#E3002C',
                    description: '타이베이 101/세계무역센터역이나 샹산역을 기준으로 잡으면 신이구 관광 동선이 짧습니다.',
                },
                {
                    line: '타이베이 MRT 반난선',
                    color: '#0070BD',
                    description: '시청역, 국부기념관역을 함께 확인하면 쇼핑몰과 호텔 접근이 편합니다.',
                },
            ];
        }

        if (includes('시먼', '중정', '용산', '룽산', '중정기념당')) {
            return [
                {
                    line: '타이베이 MRT 반난선',
                    color: '#0070BD',
                    description: '시먼역과 룽산쓰역을 기준으로 잡으면 시먼딩, 보피랴오, 룽산사 이동이 쉽습니다.',
                },
                {
                    line: '타이베이 MRT 단수이신이선 / 쑹산신뎬선',
                    color: '#E3002C',
                    description: '중정기념당역은 두 노선 환승이 가능해 박물관, 광장, 시내 숙소 동선에 좋습니다.',
                },
            ];
        }

        return [
            {
                line: '타이베이 MRT 반난선',
                color: '#0070BD',
                description: '타이베이 도심 동서 이동은 반난선을 먼저 확인하면 주요 상권 접근이 쉽습니다.',
            },
            {
                line: '타이베이 MRT 단수이신이선',
                color: '#E3002C',
                description: '101, 중정기념당, 타이베이역 방향은 단수이신이선 환승을 기준으로 잡으면 편합니다.',
            },
        ];
    }

    if (cityName === '방콕') {
        if (includes('시암', '수쿰윗', '아속', '통로')) {
            return [
                {
                    line: 'BTS 수쿰윗선',
                    color: '#7AC143',
                    description: '시암, 아속, 통로 권역은 BTS 수쿰윗선 역에서 도보나 짧은 택시 이동으로 접근하기 좋습니다.',
                },
                {
                    line: 'MRT 블루라인',
                    color: '#1E4FA1',
                    description: '수쿰윗역이나 실롬역 환승을 이용하면 강변, 차이나타운, 구시가지 이동이 쉬워집니다.',
                },
            ];
        }

        if (includes('실롬', '사톤', '루프탑', '리버사이드', '차오프라야')) {
            return [
                {
                    line: 'BTS 실롬선',
                    color: '#00843D',
                    description: '실롬, 사톤, 강변 호텔은 BTS 실롬선과 사판탁신 선착장 동선을 함께 보면 좋습니다.',
                },
                {
                    line: '차오프라야 익스프레스 보트',
                    color: '#1E88E5',
                    description: '왕궁, 왓포, 왓아룬, 리버사이드 일정은 보트 이동이 도로 정체를 피하기 좋습니다.',
                },
            ];
        }

        return [
            {
                line: 'BTS 스카이트레인',
                color: '#7AC143',
                description: '방콕 도심 이동은 BTS 역 기준으로 숙소와 관광지를 잡으면 교통 체증 영향을 줄일 수 있습니다.',
            },
            {
                line: 'MRT 블루라인',
                color: '#1E4FA1',
                description: '차이나타운, 왕궁 근처, 쇼핑몰 이동은 MRT와 택시를 조합하면 효율적입니다.',
            },
        ];
    }

    return [
        {
            line: `${place.area} 주요 대중교통`,
            color: '#6B8A59',
            description: `${cityName} ${place.area} 권역에서 지도 앱으로 최단 동선을 확인하는 것을 권장합니다.`,
        },
        {
            line: '택시 / 도보 이동',
            color: '#111111',
            description: '짐이 많거나 야간 이동이라면 숙소나 현재 위치 기준으로 택시 이동도 함께 비교하세요.',
        },
    ];
}

function foodTips(place, cityName, category) {
    return [
        `${place.area} 일정에 넣을 때는 점심 피크보다 오픈 직후나 늦은 오후가 비교적 여유롭습니다.`,
        `${category} 특성상 대표 메뉴와 세트 메뉴 가격 차이가 있으니 주문 전 메뉴판 사진을 먼저 확인해 보세요.`,
        `${cityName} 인기 상권은 대기 줄이 빠르게 생길 수 있어 주변 일정과 30분 정도 여유를 두는 편이 좋습니다.`,
    ];
}

function tourTips(place, cityName, category) {
    return [
        `${place.area} 주변 동선과 묶기 좋은 ${category} 코스라, 이동 전후 식사 장소를 같이 잡으면 시간이 덜 낭비됩니다.`,
        `사진을 남기려면 오전 이른 시간이나 해 질 무렵이 비교적 덜 붐비고 분위기도 좋습니다.`,
        `${cityName} 현지 휴일이나 날씨에 따라 운영 시간이 달라질 수 있으니 출발 전에 지도 정보를 한 번 확인하세요.`,
    ];
}

function stayTips(place, cityName, category) {
    return [
        `${place.area} 중심 동선을 쓰는 일정이면 체크인 전후 짐 보관 가능 여부를 먼저 확인하는 게 좋습니다.`,
        `${category} 숙소는 객실 타입에 따라 가격과 공간감 차이가 커서 사진과 객실명을 같이 보는 편이 안전합니다.`,
        `${cityName} 숙소 예약 전에는 역 출구, 엘리베이터 유무, 심야 이동 동선을 함께 확인해 주세요.`,
    ];
}

function generatedFoodDetail(place, cityName) {
    const category = normalizeCategory(place.category);
    const routeCategory = foodRouteCategory(category);
    const query = `${place.name} ${place.area} ${cityName}`;

    return [
        routeKey(place.city, routeCategory, place.slug),
        {
            id: place.id,
            city: place.city,
            slug: place.slug,
            name: place.name,
            category,
            area: place.area,
            address: `${place.area}, ${cityName}`,
            mapUrl: googleMapsSearchUrl(query),
            website: googleSearchUrl(query),
            reservationLabel: '방문 전 확인 권장',
            reservationValue: 'Google Map',
            reservationNotes: foodTips(place, cityName, category),
            access: category.includes('카페') ? '카페 좌석, 테이블석' : '카운터석, 테이블석',
            description: `${cityName} ${place.area} 권역에서 ${category} 일정에 넣기 좋은 ${place.name}입니다. 카드 데이터 기준 가격대는 ${place.price}이며, 실제 메뉴와 운영 정보는 방문 전 검수하는 것을 권장합니다.`,
            images: detailImagesForPlace(place),
            mapImages: mapImagesForPlace(place),
            nearbyGroups: baseNearbyGroups(place, cityName),
            transitDirections: baseTransitDirections(place, cityName),
            hours: foodHours,
        },
    ];
}

function generatedTourBookingCards(place) {
    return [
        {
            id: `${place.id}-klook`,
            option: 'tour-booking',
            brand: 'Klook',
            route: place.area,
            title: `${place.name} 입장권/투어`,
            price: place.price,
            rating: place.rating,
            cancelLabel: '상품 확인',
            image: place.image || fallbackImage,
            href: 'https://www.klook.com/',
        },
        {
            id: `${place.id}-kkday`,
            option: 'tour-booking',
            brand: 'KKday',
            route: place.area,
            title: `${place.name} 투어`,
            price: place.price,
            rating: place.rating,
            cancelLabel: '예약 가능',
            image: place.image || fallbackImage,
            href: 'https://www.kkday.com/',
        },
    ];
}

function generatedTourDetail(place, cityName) {
    const category = normalizeCategory(place.category);
    const query = `${place.name} ${place.area} ${cityName}`;

    return [
        routeKey(place.city, category, place.slug),
        {
            id: place.id,
            city: place.city,
            slug: place.slug,
            name: place.name,
            category,
            area: place.area,
            address: `${place.area}, ${cityName}`,
            mapUrl: googleMapsSearchUrl(query),
            website: googleSearchUrl(query),
            reservationLabel: place.price.includes('0') || place.price.includes('무료') ? '입장 정보 확인' : '예약/입장권 확인 권장',
            reservationValue: 'Google Map',
            reservationNotes: tourTips(place, cityName, category),
            access: `${category} 명소, 도보 관광`,
            description: `${cityName} ${place.area} 권역에서 ${category} 일정에 넣기 좋은 ${place.name}입니다. 사진, 산책, 주변 식사 동선과 함께 묶어 검토하기 좋은 후보입니다.`,
            images: detailImagesForPlace(place),
            mapImages: mapImagesForPlace(place),
            nearbyGroups: baseNearbyGroups(place, cityName),
            transitDirections: baseTransitDirections(place, cityName),
            hours: tourHours,
            bookingCards: generatedTourBookingCards(place),
        },
    ];
}

function generatedStayBookingCards(place) {
    return [
        {
            id: `${place.id}-agoda`,
            option: 'hotel-booking',
            brand: 'Agoda',
            route: place.area,
            title: place.name,
            price: place.price,
            rating: place.rating,
            cancelLabel: '객실 확인',
            image: place.image || fallbackImage,
            href: 'https://www.agoda.com/',
        },
        {
            id: `${place.id}-booking`,
            option: 'hotel-booking',
            brand: 'Booking.com',
            route: place.area,
            title: place.name,
            price: place.price,
            rating: place.rating,
            cancelLabel: '예약 조건 확인',
            image: place.image || fallbackImage,
            href: 'https://www.booking.com/',
        },
        {
            id: `${place.id}-trip`,
            option: 'hotel-booking',
            brand: 'Trip.com',
            route: place.area,
            title: place.name,
            price: place.price,
            rating: place.rating,
            cancelLabel: '즉시 확인',
            image: place.image || fallbackImage,
            href: 'https://kr.trip.com/',
        },
    ];
}

function generatedStayDetail(place, cityName) {
    const category = normalizeCategory(place.category);
    const routeCategory = stayRouteCategory(category);
    const query = `${place.name} ${place.area} ${cityName}`;

    return [
        routeKey(place.city, routeCategory, place.slug),
        {
            id: place.id,
            city: place.city,
            slug: place.slug,
            name: place.name,
            category,
            area: place.area,
            address: `${place.area}, ${cityName}`,
            mapUrl: googleMapsSearchUrl(query),
            website: googleSearchUrl(query),
            reservationLabel: '예약 조건 확인',
            reservationValue: '숙박 플랫폼',
            reservationNotes: stayTips(place, cityName, category),
            access: `${category} 객실, 예약 조건별 상이`,
            description: `${cityName} ${place.area} 권역에서 ${category} 숙소를 찾을 때 검토하기 좋은 ${place.name}입니다. 카드 데이터 기준 가격대는 ${place.price}이며, 실제 객실 조건은 예약 전 확인이 필요합니다.`,
            images: detailImagesForPlace(place),
            mapImages: mapImagesForPlace(place),
            nearbyGroups: baseNearbyGroups(place, cityName),
            transitDirections: baseTransitDirections(place, cityName),
            hours: stayHours,
            bookingCards: generatedStayBookingCards(place),
        },
    ];
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
        cities.push(JSON.parse(await readFile(filePath, 'utf8')));
    }

    return cities;
}

function addDetails(target, groups, cityName, createDetail) {
    for (const group of groups ?? []) {
        for (const place of group.places ?? []) {
            const [key, detail] = createDetail(
                { ...place, category: normalizeCategory(group.category) },
                cityName
            );
            target[key] = detail;
        }
    }
}

async function main() {
    const cities = await readGeneratedCities();
    const foodDetails = {};
    const tourDetails = {};
    const stayDetails = {};

    for (const city of cities) {
        const cityName = city.destination || city.city;
        addDetails(foodDetails, city.food, cityName, generatedFoodDetail);
        addDetails(tourDetails, city.tour, cityName, generatedTourDetail);
        addDetails(stayDetails, city.stay, cityName, generatedStayDetail);
    }

    const contents = [
        "import type { FoodPlaceDetail } from '../foodPlaceDetails';",
        "import type { StayPlaceDetail } from '../stayPlaceDetails';",
        "import type { TourPlaceDetail } from '../tourPlaceDetails';",
        '',
        `export const generatedFoodPlaceDetailsById: Record<string, FoodPlaceDetail> = ${JSON.stringify(foodDetails, null, 4)};`,
        '',
        `export const generatedTourPlaceDetailsById: Record<string, TourPlaceDetail> = ${JSON.stringify(tourDetails, null, 4)};`,
        '',
        `export const generatedStayPlaceDetailsById: Record<string, StayPlaceDetail> = ${JSON.stringify(stayDetails, null, 4)};`,
        '',
    ].join('\n');

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, contents);

    console.log(`Converted ${cities.length} generated city file(s) into ${outputPath}`);
    console.log(
        `Details: food=${Object.keys(foodDetails).length}, tour=${Object.keys(tourDetails).length}, stay=${Object.keys(stayDetails).length}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
