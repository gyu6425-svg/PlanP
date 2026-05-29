import type { ResultImageCardData } from '../components/cards/ResultImageCard';
import type { TransportCard } from '../components/cards/TransportProductCard';
import type { FavoriteInput, FavoriteItemType } from '../services/favoritesApi';

const platformPolicyByBrand: Record<string, string> = {
    Klook: '상품별 무료 취소 기한 상이, 예약 전 Klook 취소 규정 확인',
    KKday: '상품별 취소 가능 기한 상이, 예약 전 KKday 취소 규정 확인',
    마이리얼트립: '상품별 여행일 기준 취소 수수료 상이, 예약 전 취소 규정 확인',
    하나투어: '상품 및 출발일 기준 취소 수수료 상이, 예약 전 약관 확인',
    Agoda: '객실 요금제별 무료 취소/취소불가 조건 상이',
    'Booking.com': '객실 요금제별 무료 취소/취소불가 조건 상이',
    'Trip.com': '예약 상품별 무료 취소/취소불가 조건 상이',
    'Hotels.com': '객실 요금제별 취소 가능 기한 및 수수료 상이',
};

export function getTransportPolicy(card: TransportCard) {
    if (card.cancelLabel.includes('무료')) {
        return '예약처 기준 무료 취소 가능, 최종 취소 가능 시점은 결제 전 확인';
    }

    if (card.cancelLabel.includes('취소불가')) {
        return '예약 확정 후 취소불가 또는 환불불가';
    }

    if (card.cancelLabel.includes('현장')) {
        return '현장 구매 상품으로 환불/변경은 운영사 현장 규정 적용';
    }

    return platformPolicyByBrand[card.brand] ?? `${card.cancelLabel}, 예약처 상세 규정 확인`;
}

export function getPlatformSearchHref(card: TransportCard) {
    const query = encodeURIComponent(card.title);

    if (card.brand === 'Agoda') {
        return `https://www.agoda.com/search?text=${query}`;
    }

    if (card.brand === 'Booking.com') {
        return `https://www.booking.com/searchresults.html?ss=${query}`;
    }

    if (card.brand === 'Trip.com') {
        return `https://kr.trip.com/search?keyword=${query}`;
    }

    if (card.brand === 'Hotels.com') {
        return `https://kr.hotels.com/Hotel-Search?destination=${query}`;
    }

    if (card.brand === 'Klook') {
        return `https://www.klook.com/ko/search/result/?query=${query}`;
    }

    if (card.brand === 'KKday') {
        return `https://www.kkday.com/ko/product/productlist?keyword=${query}`;
    }

    if (card.brand === '마이리얼트립') {
        return `https://www.myrealtrip.com/offers?keyword=${query}`;
    }

    if (card.brand === '하나투어') {
        return `https://www.hanatour.com/search?keyword=${query}`;
    }

    return undefined;
}

function isGenericProviderHref(href: string) {
    const genericProviderHrefs = [
        'https://www.agoda.com/',
        'https://kr.trip.com/',
        'https://www.trip.com/',
        'https://kr.hotels.com/',
        'https://www.booking.com/',
        'https://www.klook.com/',
        'https://www.kkday.com/',
        'https://www.myrealtrip.com/',
        'https://www.hanatour.com/',
    ];

    return genericProviderHrefs.includes(href);
}

export function getProductHref(card: TransportCard) {
    if (!card.href) {
        return getPlatformSearchHref(card);
    }

    if (isGenericProviderHref(card.href)) {
        return getPlatformSearchHref(card) ?? card.href;
    }

    return card.href;
}

export function getBookingPolicyDisplay(cancelLabel: string) {
    if (cancelLabel.includes('전액') || cancelLabel.includes('무료')) {
        return {
            chip: '전액 환불 가능',
            note: '당일 전날 24시까지',
        };
    }

    if (cancelLabel.includes('취소 불가') || cancelLabel.includes('취소불가')) {
        return {
            chip: '취소 불가',
            note: '즉시 예약확정',
        };
    }

    if (cancelLabel.includes('현장') || cancelLabel.includes('온라인 예매 불가')) {
        return {
            chip: '현장 구매',
            note: '현장 규정 적용',
        };
    }

    if (cancelLabel.includes('공식')) {
        return {
            chip: '공식 예매',
            note: '예약처 조건 확인',
        };
    }

    if (cancelLabel.includes('즉시')) {
        return {
            chip: '예약 가능',
            note: '즉시 예약확정',
        };
    }

    return {
        chip: cancelLabel,
        note: '예약처 조건 확인',
    };
}

export function getPlacePolicy(type: FavoriteItemType, card: ResultImageCardData) {
    if (type === 'food') {
        return '매장 방문/예약처 정책 적용, 노쇼 및 당일 취소 조건은 예약처 확인';
    }

    if (type === 'stay') {
        return '객실 요금제별 무료 취소/취소불가 조건 상이, 예약처 결제 전 확인';
    }

    if (type === 'tour') {
        return '입장권/투어 상품별 무료 취소 기한 상이, 예약처 결제 전 확인';
    }

    return `${card.category} 예약처 환불/취소 규정 확인`;
}

export function toTransportFavorite(card: TransportCard): FavoriteInput {
    return {
        itemId: card.id,
        itemType: 'transport',
        categoryLabel: '이동수단',
        title: card.title,
        subtitle: card.route,
        price: card.price,
        policy: getTransportPolicy(card),
        image: card.image,
        brand: card.brand,
        href: getProductHref(card) ?? '',
        payload: card,
    };
}

export function toBookingFavorite(
    itemType: Extract<FavoriteItemType, 'tour' | 'stay'>,
    card: TransportCard
): FavoriteInput {
    return {
        itemId: card.id,
        itemType,
        categoryLabel: itemType === 'tour' ? '관광' : '숙소',
        title: card.title,
        subtitle: `${card.route} · ${card.brand}`,
        price: card.price,
        policy: getTransportPolicy(card),
        image: card.image,
        brand: card.brand,
        href: getProductHref(card) ?? '',
        payload: card,
    };
}

type DetailFavoritePlace = {
    id: string;
    name: string;
    category: string;
    area?: string;
    website?: string;
    images?: string[];
    price?: string;
    bookingCards?: TransportCard[];
};

export function toDetailFavorite(
    type: Exclude<FavoriteItemType, 'transport'>,
    detail: DetailFavoritePlace
): FavoriteInput {
    const labelByType = {
        food: '맛집',
        tour: '관광',
        stay: '숙소',
    };
    const price =
        detail.price ??
        detail.bookingCards?.find((card) => card.price)?.price ??
        (type === 'food' ? '가격 확인' : '상품 확인');

    return {
        itemId: detail.id,
        itemType: type,
        categoryLabel: labelByType[type],
        title: detail.name,
        subtitle: [detail.area, detail.category].filter(Boolean).join(' · '),
        price,
        policy: getPlacePolicy(type, {
            id: detail.id,
            category: detail.category,
            area: detail.area ?? '',
            name: detail.name,
            price,
            rating: '',
            image: detail.images?.[0] ?? '',
            href: detail.website,
        }),
        image: detail.images?.[0] ?? '',
        brand: detail.category,
        href: detail.website ?? '',
        payload: detail,
    };
}

export function toPlaceFavorite(
    type: Exclude<FavoriteItemType, 'transport'>,
    card: ResultImageCardData
): FavoriteInput {
    const labelByType = {
        food: '맛집',
        tour: '관광',
        stay: '숙소',
    };

    return {
        itemId: card.id,
        itemType: type,
        categoryLabel: labelByType[type],
        title: card.name,
        subtitle: `${card.area} · ${card.category}`,
        price: card.price,
        policy: getPlacePolicy(type, card),
        image: card.image,
        brand: card.category,
        href: card.href ?? '',
        payload: card,
    };
}
