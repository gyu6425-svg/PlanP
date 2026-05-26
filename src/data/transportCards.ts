import type { TransportCard } from '../components/cards/TransportProductCard';

const KLOOK_SKYLINER_ONE_WAY_URL =
    'https://www.klook.com/ko/experiences/pay/?settlement_type=1&shoppingcart_guid=exp-807ad874-2a1d-4210-692b-5165303cf476&travel_pass_unit_no=undefined&travel_pass_url=undefined&rwg_token=';
const KLOOK_SKYLINER_ROUND_TRIP_URL =
    'https://www.klook.com/ko/experiences/pay/?settlement_type=1&shoppingcart_guid=exp-8dbfe340-65a3-4ecb-4f60-aff31b5ae9f5&travel_pass_unit_no=undefined&travel_pass_url=undefined&rwg_token=';
const KLOOK_SKYLINER_PACKAGE_24_URL =
    'https://www.klook.com/ko/experiences/pay/?settlement_type=1&shoppingcart_guid=exp-e0f9c594-31d5-4b13-68bf-1d0952f4822a&travel_pass_unit_no=undefined&travel_pass_url=undefined&rwg_token=';
const KLOOK_SKYLINER_PACKAGE_48_URL =
    'https://www.klook.com/ko/experiences/pay/?settlement_type=1&shoppingcart_guid=exp-ed80ded0-8d2a-4b0c-7c6f-9c945f91340c&travel_pass_unit_no=undefined&travel_pass_url=undefined&rwg_token=';
const KLOOK_SKYLINER_PACKAGE_72_URL =
    'https://www.klook.com/ko/experiences/pay/?settlement_type=1&shoppingcart_guid=exp-20caa489-97a6-498c-7e95-02a611da89ad&travel_pass_unit_no=undefined&travel_pass_url=undefined&rwg_token=';
const KLOOK_NARITA_EXPRESS_URL =
    'https://www.klook.com/ko/activity/173165-narita-express-n-ex-round-trip-train-ticket-narita-airport-tokyo/';
const KLOOK_AIRPORT_TRANSFER_URL = 'https://www.klook.com/ko/transport/airport-trains-and-buses/';
const KLOOK_NARITA_LIMOUSINE_URL =
    'https://www.klook.com/ko/activity/2274-narita-airport-limousine-bus-tokyo/';

type TransportCardPreset = Omit<TransportCard, 'option'>;

export const transportCardPresetsByOption: Record<string, TransportCardPreset[]> = {
    스카이라이너: [
        {
            id: 'narita-skyliner-one-way',
            brand: 'Klook',
            route: '나리타 출발',
            title: '나리타 공항 스카이라이너 티켓(편도)',
            price: '₩ 20,000 ~',
            rating: '4.9',
            cancelLabel: '취소 불가',
            image: '/images/airport/skyliner.png',
            href: KLOOK_SKYLINER_ONE_WAY_URL,
        },
        {
            id: 'narita-skyliner-round-trip',
            brand: 'Klook',
            route: '나리타 출발',
            title: '나리타 공항 스카이라이너 티켓(왕복)',
            price: '₩ 43,000',
            rating: '4.9',
            cancelLabel: '취소 불가',
            image: '/images/airport/skyliner.png',
            href: KLOOK_SKYLINER_ROUND_TRIP_URL,
        },
        {
            id: 'narita-skyliner-kkday-one-way',
            brand: 'KKday',
            route: '나리타 출발',
            title: '나리타 공항 스카이라이너 티켓(편도)',
            price: '₩ 21,500',
            rating: '4.8',
            cancelLabel: '취소 불가',
            image: '/images/airport/skyliner.png',
        },
        {
            id: 'narita-skyliner-kkday-round-trip',
            brand: 'KKday',
            route: '나리타 출발',
            title: '나리타 공항 스카이라이너 티켓(왕복)',
            price: '₩ 42,600',
            rating: '4.8',
            cancelLabel: '취소 불가',
            image: '/images/airport/skyliner.png',
        },
        {
            id: 'narita-skyliner-myrealtrip-one-way',
            brand: '마이리얼트립',
            route: '나리타 출발',
            title: '나리타 공항 스카이라이너 티켓(편도)',
            price: '₩ 21,800',
            rating: '4.8',
            cancelLabel: '취소 불가',
            image: '/images/airport/skyliner.png',
        },
        {
            id: 'narita-skyliner-myrealtrip-round-trip',
            brand: '마이리얼트립',
            route: '나리타 출발',
            title: '나리타 공항 스카이라이너 티켓(왕복)',
            price: '₩ 43,600',
            rating: '4.8',
            cancelLabel: '취소 불가',
            image: '/images/airport/skyliner.png',
        },
    ],
    'JR 익스프레스': [
        {
            id: 'narita-jr-express-one-way',
            brand: 'Klook',
            route: '나리타 출발',
            title: '나리타 공항 JR 익스프레스 티켓(편도)',
            price: '₩ 29,000',
            rating: '4.7',
            cancelLabel: '취소 불가',
            image: '/images/airport/JRexpress.png',
            href: KLOOK_NARITA_EXPRESS_URL,
        },
        {
            id: 'narita-jr-express-kkday-one-way',
            brand: 'KKday',
            route: '나리타 출발',
            title: '나리타 공항 JR 익스프레스 티켓(편도)',
            price: '₩ 29,000',
            rating: '4.7',
            cancelLabel: '취소 불가',
            image: '/images/airport/JRexpress.png',
        },
    ],
    '엑세스 특급': [
        {
            id: 'narita-access-train',
            brand: '현장구매',
            route: '나리타 출발',
            title: '나리타 공항 엑세스 특급',
            price: '현장구매만 가능',
            rating: '4.6',
            cancelLabel: '온라인 예매 불가',
            image: '/images/airport/accesstrain.png',
        },
    ],
    '공항 리무진': [
        {
            id: 'airport-limousine-one-way',
            brand: 'Klook',
            route: '공항 출발',
            title: '공항 리무진 버스 티켓(편도)',
            price: '₩ 29,500',
            rating: '4.5',
            cancelLabel: '취소 불가',
            image: '/images/airport/airportbus.png',
            href: KLOOK_NARITA_LIMOUSINE_URL,
        },
        {
            id: 'airport-limousine-round-trip',
            brand: 'Klook',
            route: '공항 출발',
            title: '공항 리무진 버스 티켓(왕복)',
            price: '₩ 59,000',
            rating: '4.5',
            cancelLabel: '취소 불가',
            image: '/images/airport/airportbus.png',
            href: KLOOK_NARITA_LIMOUSINE_URL,
        },
        {
            id: 'airport-limousine-myrealtrip-one-way',
            brand: '마이리얼트립',
            route: '공항 출발',
            title: '공항 리무진 버스 티켓(편도)',
            price: '₩ 31,000',
            rating: '4.5',
            cancelLabel: '취소 불가',
            image: '/images/airport/airportbus.png',
        },
        {
            id: 'airport-limousine-myrealtrip-round-trip',
            brand: '마이리얼트립',
            route: '공항 출발',
            title: '공항 리무진 버스 티켓(왕복)',
            price: '₩ 62,000',
            rating: '4.5',
            cancelLabel: '취소 불가',
            image: '/images/airport/airportbus.png',
        },
    ],
};

const packageCards: TransportCard[] = [
    {
        id: 'package-24',
        option: '패키지',
        brand: 'Klook',
        route: '나리타 ⇄ 우에노',
        title: '나리타 공항 스카이라이너 티켓(왕복) + 도쿄 메트로 패스 24시간',
        price: '₩ 46,500 ~',
        rating: '4.9',
        cancelLabel: '취소 불가',
        image: '/images/airport/skyliner_subway.png',
        href: KLOOK_SKYLINER_PACKAGE_24_URL,
    },
    {
        id: 'package-48',
        option: '패키지',
        brand: 'Klook',
        route: '나리타 ⇄ 우에노',
        title: '나리타 공항 스카이라이너 티켓(왕복) + 도쿄 메트로 패스 48시간',
        price: '₩ 51,100 ~',
        rating: '4.9',
        cancelLabel: '취소 불가',
        image: '/images/airport/skyliner_subway.png',
        href: KLOOK_SKYLINER_PACKAGE_48_URL,
    },
    {
        id: 'package-72',
        option: '패키지',
        brand: 'Klook',
        route: '나리타 ⇄ 우에노',
        title: '나리타 공항 스카이라이너 티켓(왕복) + 도쿄 메트로 패스 72시간',
        price: '₩ 55,600 ~',
        rating: '4.9',
        cancelLabel: '취소 불가',
        image: '/images/airport/skyliner_subway.png',
        href: KLOOK_SKYLINER_PACKAGE_72_URL,
    },
];

export function getPackageCardsByTransport(option: string): TransportCard[] {
    if (option === '스카이라이너') {
        return packageCards;
    }

    if (option === '공항 리무진') {
        return packageCards.map((card) => ({
            ...card,
            id: card.id.replace('package-', 'airport-limousine-package-'),
            option,
            image: '/images/airport/airportbus_subway.png',
        }));
    }

    return [];
}

export function createFallbackTransportCard(option: string, airport: string): TransportCard {
    return {
        id: `${option}-${airport}`,
        option,
        brand: 'Klook',
        route: `${airport} 출발`,
        title: `${airport} ${option} 티켓`,
        price: '₩ 20,000 ~',
        rating: '4.5',
        cancelLabel: '취소 불가',
        image: '/images/airport/skyliner.png',
        href: KLOOK_AIRPORT_TRANSFER_URL,
    };
}
