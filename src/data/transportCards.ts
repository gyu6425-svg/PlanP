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
            price: '¥2,580',
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
            price: '¥5,160',
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
            price: '¥2,580',
            rating: '4.8',
            cancelLabel: '취소 불가',
            image: '/images/airport/skyliner.png',
        },
        {
            id: 'narita-skyliner-kkday-round-trip',
            brand: 'KKday',
            route: '나리타 출발',
            title: '나리타 공항 스카이라이너 티켓(왕복)',
            price: '¥5,160',
            rating: '4.8',
            cancelLabel: '취소 불가',
            image: '/images/airport/skyliner.png',
        },
        {
            id: 'narita-skyliner-myrealtrip-one-way',
            brand: '마이리얼트립',
            route: '나리타 출발',
            title: '나리타 공항 스카이라이너 티켓(편도)',
            price: '¥2,580',
            rating: '4.8',
            cancelLabel: '취소 불가',
            image: '/images/airport/skyliner.png',
        },
        {
            id: 'narita-skyliner-myrealtrip-round-trip',
            brand: '마이리얼트립',
            route: '나리타 출발',
            title: '나리타 공항 스카이라이너 티켓(왕복)',
            price: '¥5,160',
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
            price: '¥3,250',
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
            price: '¥3,250',
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
            price: '약 ¥1,370',
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
            price: '¥3,600 ~',
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
            price: '¥7,200 ~',
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
            price: '¥3,600 ~',
            rating: '4.5',
            cancelLabel: '취소 불가',
            image: '/images/airport/airportbus.png',
        },
        {
            id: 'airport-limousine-myrealtrip-round-trip',
            brand: '마이리얼트립',
            route: '공항 출발',
            title: '공항 리무진 버스 티켓(왕복)',
            price: '¥7,200 ~',
            rating: '4.5',
            cancelLabel: '취소 불가',
            image: '/images/airport/airportbus.png',
        },
    ],
};

const transportCardPresetsByCity: Record<string, Record<string, TransportCardPreset[]>> = {
    tokyo: {
        '도쿄 모노레일': [
            {
                id: 'haneda-tokyo-monorail',
                brand: '현장구매',
                route: '하네다 출발',
                title: '하네다 공항 도쿄 모노레일(하마마쓰초)',
                price: '¥520',
                rating: '4.7',
                cancelLabel: 'IC/현장구매',
                image: '/images/airport/accesstrain.png',
            },
        ],
        케이큐선: [
            {
                id: 'haneda-keikyu-shinagawa',
                brand: '현장구매',
                route: '하네다 출발',
                title: '하네다 공항 케이큐선(시나가와 방면)',
                price: '약 ¥330',
                rating: '4.7',
                cancelLabel: 'IC/현장구매',
                image: '/images/airport/accesstrain.png',
            },
        ],
    },
    osaka: {
        '난카이 라피트': [
            {
                id: 'kix-nankai-rapit',
                brand: 'Klook',
                route: '간사이 출발',
                title: '간사이 공항 난카이 라피트(난바)',
                price: '¥1,490',
                rating: '4.8',
                cancelLabel: '취소 불가',
                image: '/images/airport/skyliner.png',
            },
            {
                id: 'kix-nankai-airport-express',
                brand: '현장구매',
                route: '간사이 출발',
                title: '난카이 공항급행(난바)',
                price: '¥970',
                rating: '4.6',
                cancelLabel: 'IC/현장구매',
                image: '/images/airport/accesstrain.png',
            },
        ],
        'JR 하루카': [
            {
                id: 'kix-jr-haruka-tennoji',
                brand: 'Klook',
                route: '간사이 출발',
                title: 'JR 하루카 편도 티켓(텐노지)',
                price: '¥1,800 ~',
                rating: '4.8',
                cancelLabel: '예약 가능',
                image: '/images/airport/JRexpress.png',
            },
            {
                id: 'kix-jr-haruka-shinosaka',
                brand: 'Klook',
                route: '간사이 출발',
                title: 'JR 하루카 편도 티켓(신오사카)',
                price: '¥2,200 ~',
                rating: '4.8',
                cancelLabel: '예약 가능',
                image: '/images/airport/JRexpress.png',
            },
        ],
        '공항 리무진': [
            {
                id: 'kix-limousine-osaka',
                brand: 'Klook',
                route: '간사이 출발',
                title: '간사이 공항 리무진 버스(오사카 시내)',
                price: '약 ¥1,800 ~',
                rating: '4.6',
                cancelLabel: '예약 가능',
                image: '/images/airport/airportbus.png',
            },
        ],
    },
    fukuoka: {
        '지하철 공항선': [
            {
                id: 'fuk-subway-hakata',
                brand: '현장구매',
                route: '후쿠오카 공항 출발',
                title: '후쿠오카 지하철 공항선(하카타/텐진)',
                price: '¥260 ~',
                rating: '4.8',
                cancelLabel: 'IC/현장구매',
                image: '/images/airport/accesstrain.png',
            },
        ],
        '니시테츠 버스': [
            {
                id: 'fuk-nishitetsu-bus',
                brand: '현장구매',
                route: '후쿠오카 공항 출발',
                title: '니시테츠 공항/시내버스',
                price: '약 ¥270 ~',
                rating: '4.5',
                cancelLabel: 'IC/현장구매',
                image: '/images/airport/airportbus.png',
            },
        ],
    },
    taipei: {
        '공항 MRT': [
            {
                id: 'tpe-airport-mrt',
                brand: 'Klook',
                route: '타오위안 출발',
                title: '타오위안 공항 MRT(타이베이 메인역)',
                price: 'NT$160',
                rating: '4.8',
                cancelLabel: '즉시 사용',
                image: '/images/airport/accesstrain.png',
            },
        ],
        국광버스: [
            {
                id: 'tpe-kuokuang-1819',
                brand: '현장구매',
                route: '타오위안 출발',
                title: '국광버스 1819(타이베이 메인역)',
                price: '약 NT$140',
                rating: '4.5',
                cancelLabel: '현장구매',
                image: '/images/airport/airportbus.png',
            },
        ],
        '타이베이 MRT': [
            {
                id: 'tsa-taipei-mrt',
                brand: '현장구매',
                route: '쑹산 출발',
                title: '타이베이 MRT 원원후선(시내 이동)',
                price: 'NT$20 ~',
                rating: '4.7',
                cancelLabel: 'IC/현장구매',
                image: '/images/airport/accesstrain.png',
            },
        ],
    },
    bangkok: {
        공항철도: [
            {
                id: 'bkk-airport-rail-link',
                brand: '현장구매',
                route: '수완나품 출발',
                title: '방콕 Airport Rail Link(파야타이)',
                price: '฿45',
                rating: '4.7',
                cancelLabel: '현장구매',
                image: '/images/airport/accesstrain.png',
            },
        ],
        공항버스: [
            {
                id: 'bkk-airport-bus',
                brand: '현장구매',
                route: '공항 출발',
                title: '방콕 공항버스/시내버스',
                price: '฿60 ~',
                rating: '4.3',
                cancelLabel: '현장구매',
                image: '/images/airport/airportbus.png',
            },
        ],
        'A1 공항버스': [
            {
                id: 'dmk-a1-airport-bus',
                brand: '현장구매',
                route: '돈므앙 출발',
                title: '돈므앙 A1 공항버스(모칫/BTS)',
                price: '฿30',
                rating: '4.4',
                cancelLabel: '현장구매',
                image: '/images/airport/airportbus.png',
            },
        ],
        'SRT 레드라인': [
            {
                id: 'dmk-srt-red-line',
                brand: '현장구매',
                route: '돈므앙 출발',
                title: 'SRT 레드라인(방쓰/끄룽텝 아피왓)',
                price: '฿20 ~',
                rating: '4.5',
                cancelLabel: '현장구매',
                image: '/images/airport/accesstrain.png',
            },
        ],
    },
};

const packageCardsByCity: Record<string, TransportCard[]> = {
    tokyo: [
    {
        id: 'package-24',
        option: '패키지',
        brand: 'Klook',
        route: '나리타 ⇄ 우에노',
        title: '나리타 공항 스카이라이너 티켓(왕복) + 도쿄 메트로 패스 24시간',
        price: '¥6,160 ~',
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
        price: '¥6,660 ~',
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
        price: '¥7,160 ~',
        rating: '4.9',
        cancelLabel: '취소 불가',
        image: '/images/airport/skyliner_subway.png',
        href: KLOOK_SKYLINER_PACKAGE_72_URL,
    },
    ],
    osaka: [
        {
            id: 'osaka-package-amazing-pass-1day',
            option: '패키지',
            brand: 'Klook',
            route: '오사카 시내',
            title: '오사카 어메이징 패스 1일권',
            price: '¥3,500',
            rating: '4.7',
            cancelLabel: '상품 확인',
            image: '/images/airport/skyliner_subway.png',
        },
        {
            id: 'osaka-package-metro-bus-1day',
            option: '패키지',
            brand: 'Klook',
            route: '오사카 시내',
            title: '오사카 메트로·버스 1일 패스',
            price: '¥820 ~',
            rating: '4.6',
            cancelLabel: '상품 확인',
            image: '/images/airport/airportbus_subway.png',
        },
        {
            id: 'osaka-package-rapit-amazing',
            option: '패키지',
            brand: 'Klook',
            route: '간사이 ⇄ 난바',
            title: '난카이 라피트 + 오사카 시내 패스 묶음',
            price: '¥2,310 ~',
            rating: '4.8',
            cancelLabel: '상품 확인',
            image: '/images/airport/skyliner_subway.png',
        },
    ],
    fukuoka: [
        {
            id: 'fukuoka-package-tourist-city-pass',
            option: '패키지',
            brand: '현장구매',
            route: '후쿠오카 시내',
            title: '후쿠오카 투어리스트 시티 패스 1일권',
            price: '¥2,500',
            rating: '4.7',
            cancelLabel: '여권 필요',
            image: '/images/airport/airportbus_subway.png',
        },
        {
            id: 'fukuoka-package-tourist-dazaifu',
            option: '패키지',
            brand: '현장구매',
            route: '후쿠오카 + 다자이후',
            title: '후쿠오카 투어리스트 시티 패스 다자이후 포함',
            price: '¥2,800',
            rating: '4.7',
            cancelLabel: '여권 필요',
            image: '/images/airport/airportbus_subway.png',
        },
        {
            id: 'fukuoka-package-subway-day',
            option: '패키지',
            brand: '현장구매',
            route: '후쿠오카 지하철',
            title: '후쿠오카 시영 지하철 1일권',
            price: '¥640 ~',
            rating: '4.6',
            cancelLabel: '현장구매',
            image: '/images/airport/accesstrain.png',
        },
    ],
    taipei: [
        {
            id: 'taipei-package-fun-pass-1day',
            option: '패키지',
            brand: 'Klook',
            route: '타이베이 시내',
            title: '타이베이 펀패스 교통 1일권',
            price: 'NT$180 ~',
            rating: '4.6',
            cancelLabel: '상품 확인',
            image: '/images/airport/skyliner_subway.png',
        },
        {
            id: 'taipei-package-mrt-day',
            option: '패키지',
            brand: '현장구매',
            route: '타이베이 MRT',
            title: '타이베이 MRT 1일 패스',
            price: 'NT$150',
            rating: '4.6',
            cancelLabel: '현장구매',
            image: '/images/airport/accesstrain.png',
        },
        {
            id: 'taipei-package-airport-mrt-round',
            option: '패키지',
            brand: 'Klook',
            route: '타오위안 ⇄ 타이베이',
            title: '타오위안 공항 MRT 왕복 + 시내 교통권',
            price: 'NT$320 ~',
            rating: '4.8',
            cancelLabel: '상품 확인',
            image: '/images/airport/skyliner_subway.png',
        },
    ],
    bangkok: [
        {
            id: 'bangkok-package-bts-day',
            option: '패키지',
            brand: '현장구매',
            route: '방콕 BTS',
            title: '방콕 BTS 스카이트레인 1일 패스',
            price: '฿150',
            rating: '4.6',
            cancelLabel: '현장구매',
            image: '/images/airport/accesstrain.png',
        },
        {
            id: 'bangkok-package-rabbit-card',
            option: '패키지',
            brand: 'Klook',
            route: '방콕 시내',
            title: '방콕 Rabbit Card 교통카드',
            price: '฿200 ~',
            rating: '4.6',
            cancelLabel: '상품 확인',
            image: '/images/airport/airportbus_subway.png',
        },
        {
            id: 'bangkok-package-arl-bts',
            option: '패키지',
            brand: 'Klook',
            route: '수완나품 + 시내',
            title: 'Airport Rail Link + BTS 1일권 조합',
            price: '฿195 ~',
            rating: '4.6',
            cancelLabel: '상품 확인',
            image: '/images/airport/skyliner_subway.png',
        },
    ],
};

export function getTransportCardPresets(option: string, city: string): TransportCardPreset[] | undefined {
    return transportCardPresetsByCity[city]?.[option] ?? transportCardPresetsByOption[option];
}

const packageEnabledOptionsByCity: Record<string, string[]> = {
    tokyo: ['스카이라이너', '공항 리무진'],
    osaka: ['난카이 라피트', 'JR 하루카', '공항 리무진', '오사카 모노레일', '택시', '렌터카'],
    fukuoka: ['지하철 공항선', '니시테츠 버스', '택시', '렌터카', '공항버스', 'JR 고쿠라 연계'],
    taipei: ['공항 MRT', '국광버스', '타이베이 MRT', '시내버스', '택시', '공항 픽업'],
    bangkok: ['공항철도', '공항버스', 'A1 공항버스', 'SRT 레드라인', '택시', '프라이빗 픽업'],
};

export function getPackageCardsByTransport(option: string, city = 'tokyo'): TransportCard[] {
    const cityPackageCards = packageCardsByCity[city] ?? [];
    const enabledOptions = packageEnabledOptionsByCity[city] ?? [];

    if (!enabledOptions.includes(option)) {
        return [];
    }

    if (city === 'tokyo' && option === '공항 리무진') {
        return cityPackageCards.map((card) => ({
            ...card,
            id: card.id.replace('package-', 'airport-limousine-package-'),
            title: card.title.replace(
                '나리타 공항 스카이라이너 티켓(왕복)',
                '공항 리무진 버스 티켓(편도)'
            ),
            price: card.price
                .replace('¥6,160', '¥4,600')
                .replace('¥6,660', '¥5,100')
                .replace('¥7,160', '¥5,600'),
            image: '/images/airport/airportbus_subway.png',
        }));
    }

    return cityPackageCards;
}

function fallbackTransportPrice(option: string, airport: string, city: string) {
    if (option === '택시') {
        const taxiPriceByAirport: Record<string, string> = {
            나리타: '약 ¥25,000 ~',
            하네다: '약 ¥6,000 ~',
            간사이: '약 ¥18,000 ~',
            이타미: '약 ¥6,000 ~',
            고베: '약 ¥10,000 ~',
            후쿠오카: '약 ¥1,500 ~',
            기타큐슈: '약 ¥20,000 ~',
            타오위안: '약 NT$1,000 ~',
            쑹산: '약 NT$200 ~',
            수완나품: '약 ฿400 ~',
            돈므앙: '약 ฿350 ~',
        };

        return taxiPriceByAirport[airport] ?? '요금 확인';
    }

    if (option.includes('픽업') || option === '프라이빗 픽업') {
        const pickupPriceByCity: Record<string, string> = {
            tokyo: '약 ¥8,000 ~',
            osaka: '약 ¥8,000 ~',
            fukuoka: '약 ¥4,000 ~',
            taipei: '약 NT$900 ~',
            bangkok: '약 ฿700 ~',
        };

        return pickupPriceByCity[city] ?? '요금 확인';
    }

    if (option === '렌터카') {
        return city === 'fukuoka' || city === 'osaka' ? '¥6,000/일 ~' : '요금 확인';
    }

    return '요금 확인';
}

export function createFallbackTransportCard(option: string, airport: string, city = 'tokyo'): TransportCard {
    return {
        id: `${option}-${airport}`,
        option,
        brand: option === '렌터카' || option.includes('픽업') ? 'Klook' : '현장구매',
        route: `${airport} 출발`,
        title: `${airport} ${option} 티켓`,
        price: fallbackTransportPrice(option, airport, city),
        rating: '4.5',
        cancelLabel: option === '택시' ? '현장/앱 호출' : '요금 확인',
        image: option.includes('버스') ? '/images/airport/airportbus.png' : '/images/airport/accesstrain.png',
        href: KLOOK_AIRPORT_TRANSFER_URL,
    };
}
