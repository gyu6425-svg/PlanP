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

function mapImages(image) {
    const baseImage = image || fallbackImage;
    return {
        main: baseImage,
        sub1: addUrlParam(baseImage, 'planpMap', '1'),
        sub2: addUrlParam(baseImage, 'planpMap', '2'),
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
            images: detailImages(place.image),
            mapImages: mapImages(place.image),
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
            images: detailImages(place.image),
            mapImages: mapImages(place.image),
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
            images: detailImages(place.image),
            mapImages: mapImages(place.image),
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
