import type { KeyboardEvent } from 'react';
import { getBookingPolicyDisplay } from '../../lib/favoritePolicy';
import { routes } from '../../lib/routes';
import type { FavoriteItem } from '../../services/favoritesApi';

const brandLogoByName: Record<string, string> = {
    Agoda: '/images/coalition_logo/Agoda_logo.png',
    'Trip.com': '/images/coalition_logo/Trip.com_logo.png',
    'Hotels.com': '/images/coalition_logo/Hotels.com_logo.png',
    Klook: '/images/coalition_logo/klook_logo.png',
    KKday: '/images/coalition_logo/KKday_logo.png',
    마이리얼트립: '/images/coalition_logo/myrealtrip_logo.png',
    하나투어: '/images/coalition_logo/hanatour_logo.png',
};

function getPayloadString(item: FavoriteItem, key: string) {
    if (!item.payload || typeof item.payload !== 'object' || !(key in item.payload)) {
        return undefined;
    }

    const value = item.payload[key as keyof typeof item.payload];
    return typeof value === 'string' ? value : undefined;
}

function getFavoriteHref(item: FavoriteItem) {
    if (item.itemType === 'food') {
        return (
            getPayloadString(item, 'googleMapsHref') ??
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.title)}`
        );
    }

    if (item.itemType === 'tour' || item.itemType === 'stay') {
        const internalHref = getPayloadString(item, 'internalHref');
        const city = getPayloadString(item, 'city');
        const routeCategory = getPayloadString(item, 'routeCategory') ?? getPayloadString(item, 'category');
        const slug = getPayloadString(item, 'slug');

        if (internalHref) {
            return internalHref;
        }

        if (city && routeCategory && slug) {
            return item.itemType === 'tour'
                ? routes.tourDetail(city, routeCategory, slug)
                : routes.stayDetail(city, routeCategory, slug);
        }
    }

    return item.href;
}

export function FavoriteListCard({ item }: { item: FavoriteItem }) {
    const logo = brandLogoByName[item.brand];
    const media = logo || item.image;
    const payloadCancelLabel =
        item.payload &&
        typeof item.payload === 'object' &&
        'cancelLabel' in item.payload &&
        typeof item.payload.cancelLabel === 'string'
            ? item.payload.cancelLabel
            : item.policy;
    const policyDisplay =
        item.itemType === 'food'
            ? { chip: '현장 대기 가능', note: '예약처 확인' }
            : getBookingPolicyDisplay(payloadCancelLabel);
    const shouldHidePolicy =
        item.itemType === 'tour' &&
        (!item.price ||
            item.price.includes('무료') ||
            item.price.includes('상품 확인') ||
            item.price.includes('가격 확인'));
    const href = getFavoriteHref(item);
    const hasHref = Boolean(href);

    const openHref = () => {
        if (!href) {
            return;
        }

        if (href.startsWith('/')) {
            window.location.href = href;
            return;
        }

        window.open(href, '_blank', 'noopener,noreferrer');
    };

    const openHrefFromKeyboard = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openHref();
        }
    };

    return (
        <article
            role={hasHref ? 'link' : undefined}
            tabIndex={hasHref ? 0 : undefined}
            aria-label={hasHref ? `${item.title} 구매 페이지 열기` : undefined}
            onClick={hasHref ? openHref : undefined}
            onKeyDown={hasHref ? openHrefFromKeyboard : undefined}
            className={[
                'flex h-[320px] w-[493px] flex-col rounded-[50px] bg-[#f5f5f5] px-[32px] py-[28px] outline-none transition-transform duration-150 ease-out',
                hasHref ? 'cursor-pointer hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[#6B8A59] focus-visible:ring-offset-4 focus-visible:ring-offset-white' : '',
            ].join(' ')}
        >
            <div className="flex h-[84px] items-center justify-between gap-[18px]">
                {media ? (
                    <img
                        src={media}
                        alt=""
                        className={[
                            'shrink-0 object-contain',
                            logo ? 'h-[58px] w-[210px]' : 'h-[84px] w-[126px] rounded-[14px] object-cover',
                        ].join(' ')}
                    />
                ) : (
                    <div className="grid h-[84px] w-[126px] shrink-0 place-items-center rounded-[14px] bg-white text-[18px] font-bold text-[#6B8A59]">
                        {item.categoryLabel}
                    </div>
                )}

                <p className="max-w-[178px] text-right text-[28px] font-bold leading-[1.05] text-black">
                    {item.price}
                </p>
            </div>

            <div className="mt-[40px] min-h-[72px]">
                <h2 className="line-clamp-2 text-[30px] font-bold leading-[1.2] text-black">
                    {item.title}
                </h2>
            </div>

            {shouldHidePolicy ? null : (
                <div className="mt-auto flex items-center gap-[14px]">
                    <span className="inline-flex h-[41px] w-[123px] shrink-0 items-center justify-center rounded-[14px] bg-[#FFFFFF] text-[18px] font-[400] leading-none text-[#666666]">
                        {policyDisplay.chip}
                    </span>
                    <span className="truncate text-[14px] font-[400] leading-none text-[#6B8A59]">
                        {policyDisplay.note}
                    </span>
                </div>
            )}
        </article>
    );
}
