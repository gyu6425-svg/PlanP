import type { KeyboardEvent } from 'react';

export type TransportCard = {
    id: string;
    option: string;
    brand: string;
    route: string;
    title: string;
    price: string;
    rating: string;
    cancelLabel: string;
    image: string;
    href?: string;
};

function HeartIcon({ filled }: { filled: boolean }) {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path
                d="M16 27.2C9.2 21.4 5 17.5 5 12.3C5 8.8 7.7 6.2 11.1 6.2C13.1 6.2 14.9 7.1 16 8.6C17.1 7.1 18.9 6.2 20.9 6.2C24.3 6.2 27 8.8 27 12.3C27 17.5 22.8 21.4 16 27.2Z"
                fill={filled ? '#6B8A59' : 'rgba(0,0,0,0.12)'}
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function StarIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path
                d="M7.5 1.2L9.36 5.05L13.6 5.63L10.52 8.58L11.28 12.8L7.5 10.78L3.72 12.8L4.48 8.58L1.4 5.63L5.64 5.05L7.5 1.2Z"
                fill="#6B8A59"
            />
        </svg>
    );
}

function getBrandLogoImage(brand: string) {
    const brandLogoByName: Record<string, string> = {
        Agoda: '/images/coalition_logo/Agoda_logo.png',
        'Trip.com': '/images/coalition_logo/Trip.com_logo.png',
        'Hotels.com': '/images/coalition_logo/Hotels.com_logo.png',
        Klook: '/images/coalition_logo/klook_logo.png',
        KKday: '/images/coalition_logo/KKday_logo.png',
        마이리얼트립: '/images/coalition_logo/myrealtrip_logo.png',
        하나투어: '/images/coalition_logo/hanatour_logo.png',
    };

    return brandLogoByName[brand];
}

function getPlatformSearchHref(card: TransportCard) {
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

function getProductHref(card: TransportCard) {
    if (!card.href) {
        return getPlatformSearchHref(card);
    }

    if (isGenericProviderHref(card.href)) {
        return getPlatformSearchHref(card) ?? card.href;
    }

    return card.href;
}

function isBookingPlatformCard(option: string) {
    return option === 'hotel-booking' || option === 'tour-booking';
}

export function TransportProductCard({
    card,
    liked,
    onToggleLike,
}: {
    card: TransportCard;
    liked: boolean;
    onToggleLike: (card: TransportCard) => void;
}) {
    const productHref = getProductHref(card);
    const hasProductLink = Boolean(productHref);
    const brandLogoImage = getBrandLogoImage(card.brand);
    const usesBrandLogoLayout =
        (Boolean(brandLogoImage) || isBookingPlatformCard(card.option)) && card.option !== '패키지';

    const openProduct = () => {
        if (!productHref) {
            return;
        }

        window.open(productHref, '_blank', 'noopener,noreferrer');
    };

    const openProductFromKeyboard = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openProduct();
        }
    };

    return (
        <article
            role={hasProductLink ? 'link' : undefined}
            tabIndex={hasProductLink ? 0 : undefined}
            aria-label={`${card.title} 상품 보기`}
            onClick={hasProductLink ? openProduct : undefined}
            onKeyDown={hasProductLink ? openProductFromKeyboard : undefined}
            className={[
                'transport-card shrink-0 outline-none transition-transform duration-150 ease-out hover:scale-[1.03] focus-visible:scale-[1.03] focus-visible:ring-2 focus-visible:ring-[#6B8A59] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f5f5f5]',
                hasProductLink ? 'cursor-pointer' : 'cursor-default',
            ].join(' ')}
        >
            <div
                className={[
                    'relative h-[312px] overflow-hidden rounded-t-[50px]',
                    usesBrandLogoLayout ? 'bg-white' : '',
                ].join(' ')}
            >
                {usesBrandLogoLayout && brandLogoImage ? (
                    <img
                        src={brandLogoImage}
                        alt={`${card.brand} 로고`}
                        className="absolute left-1/2 top-1/2 h-[132px] w-[360px] -translate-x-1/2 -translate-y-1/2 object-contain px-[36px]"
                    />
                ) : usesBrandLogoLayout ? (
                    <p className="absolute left-1/2 top-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2 text-center text-[38px] font-[800] leading-tight text-[#202020]">
                        {card.brand}
                    </p>
                ) : (
                    <>
                        <img src={card.image} alt="" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/10" />
                        <p className="card-image-text-shadow absolute left-[30px] top-[29px] text-[28px] font-[700] leading-none text-white">
                            {card.brand}
                        </p>
                    </>
                )}
                <button
                    type="button"
                    aria-label="보관하기"
                    onClick={(event) => {
                        event.stopPropagation();
                        onToggleLike(card);
                    }}
                    onKeyDown={(event) => event.stopPropagation()}
                    className="absolute right-[24px] top-[25px] grid size-[44px] place-items-center"
                >
                    <HeartIcon filled={liked} />
                </button>
                <p
                    className={[
                        'absolute bottom-[22px] right-[28px] text-[28px] font-[700] leading-none',
                        usesBrandLogoLayout ? 'text-black' : 'card-image-text-shadow text-white',
                    ].join(' ')}
                >
                    {card.price}
                </p>
            </div>

            <div className="flex h-[188px] flex-col px-[30px] pb-[20px] pt-[18px]">
                <p className="text-[20px] font-[500] leading-none text-[#666666]">{card.route}</p>
                <h2 className="mt-[10px] min-h-[64px] text-[28px] font-[700] leading-[1.15] text-black">
                    {card.title}
                </h2>

                <div className="mt-auto flex items-center justify-between">
                    <span className="inline-flex h-[41px] min-w-[87px] items-center justify-center rounded-[50px] bg-[#f2f2f2] px-[12px] text-[18px] font-[400] text-[#777777]">
                        {card.cancelLabel}
                    </span>
                    <span className="inline-flex items-center gap-[5px] text-[18px] font-[500] text-[#6B8A59]">
                        <StarIcon />
                        {card.rating}
                    </span>
                </div>
            </div>
        </article>
    );
}
