import { Camera, ShoppingBag, Store, TrainFront } from 'lucide-react';

export type DetailLocationData = {
    name: string;
    address: string;
    mapUrl: string;
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
};

export function DetailLocationSection({ detail }: { detail: DetailLocationData }) {
    const mapQuery = `${detail.name} ${detail.address}`;
    const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

    return (
        <section className="mx-auto mt-[280px] h-[960px] w-[1920px] rounded-[100px] bg-white">
            <div className="mx-auto w-[1776px] pt-[96px]">
                <h2 className="text-[48px] font-[700] leading-none text-black">위치</h2>
                <a
                    href={detail.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-[40px] inline-flex text-[20px] font-[400] leading-none text-[#777777] underline underline-offset-2"
                >
                    {detail.address}
                </a>

                <div className="mt-[12px] flex items-start">
                    <div className="flex shrink-0 gap-[18px]">
                        <iframe
                            src={mapEmbedUrl}
                            title={`${detail.name} 지도`}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="h-[636px] w-[677px] shrink-0 rounded-l-[50px] border-0"
                        />
                        <div className="flex shrink-0 flex-col gap-[18px]">
                            <img
                                src={detail.mapImages.sub1}
                                alt=""
                                className="h-[309px] w-[382px] shrink-0 rounded-tr-[50px] object-cover"
                            />
                            <img
                                src={detail.mapImages.sub2}
                                alt=""
                                className="h-[309px] w-[382px] shrink-0 rounded-br-[50px] object-cover"
                            />
                        </div>
                    </div>

                    <div className="mx-[30px] h-[636px] w-px shrink-0 bg-[#d0d0d0]" />

                    {detail.transitDirections ? (
                        <TransitDirections directions={detail.transitDirections} />
                    ) : (
                        <NearbyPlaces groups={detail.nearbyGroups} />
                    )}
                </div>
            </div>
        </section>
    );
}

function TransitDirections({
    directions,
}: {
    directions: NonNullable<DetailLocationData['transitDirections']>;
}) {
    return (
        <aside className="w-[620px] shrink-0 pt-[34px]">
            <h3 className="text-[40px] font-[700] leading-none text-black">
                도착하는 가장 쉬운 길
            </h3>
            <div className="mt-[62px] flex w-[620px] flex-col gap-[54px]">
                {directions.map((direction) => {
                    const lineColor = direction.color ?? getRailLineColor(direction.line);

                    return (
                        <div key={direction.line}>
                            <h4 className="flex items-center gap-[16px] text-[24px] font-[600] leading-none text-black">
                                <TrainFront
                                    className="size-[36px] shrink-0"
                                    color={lineColor}
                                    strokeWidth={2.2}
                                    aria-hidden="true"
                                />
                                {direction.line}
                            </h4>
                            <p className="mt-[12px] w-[620px] text-[20px] font-[400] leading-[1.45] text-[#555555]">
                                {direction.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}

function NearbyPlaces({ groups }: { groups: DetailLocationData['nearbyGroups'] }) {
    return (
        <aside className="w-[620px] shrink-0 pt-[34px]">
            <h3 className="text-[40px] font-[700] leading-none text-black">호텔 주변</h3>
            <div className="mt-[58px] flex w-[620px] flex-col gap-[100px]">
                {groups.map((group) => (
                    <div key={group.title} className="flex flex-col gap-[12px]">
                        {group.items.map((item) => (
                            <p
                                key={item}
                                className="flex items-center gap-[8px] text-[18px] font-[500] leading-none text-black"
                            >
                                <NearbyIcon type={group.icon} />
                                {item}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </aside>
    );
}

function getRailLineColor(line: string) {
    if (line.includes('한조몬')) {
        return '#8F76D6';
    }

    if (line.includes('긴자')) {
        return '#F39700';
    }

    if (line.includes('마루노우치')) {
        return '#E60012';
    }

    if (line.includes('히비야')) {
        return '#B5B5AC';
    }

    if (line.includes('도자이')) {
        return '#00A7DB';
    }

    if (line.includes('치요다')) {
        return '#009944';
    }

    if (line.includes('유라쿠초')) {
        return '#C7A500';
    }

    if (line.includes('난보쿠')) {
        return '#00ADA9';
    }

    if (line.includes('후쿠토신')) {
        return '#9C5E31';
    }

    return '#111111';
}

function NearbyIcon({ type }: { type: 'station' | 'camera' | 'store' | 'shopping' }) {
    const iconClassName = 'size-[30px] shrink-0 text-black';
    const strokeWidth = 1.9;

    if (type === 'station') {
        return <TrainFront className={iconClassName} strokeWidth={strokeWidth} aria-hidden="true" />;
    }

    if (type === 'camera') {
        return <Camera className={iconClassName} strokeWidth={strokeWidth} aria-hidden="true" />;
    }

    if (type === 'shopping') {
        return <ShoppingBag className={iconClassName} strokeWidth={strokeWidth} aria-hidden="true" />;
    }

    return <Store className={iconClassName} strokeWidth={strokeWidth} aria-hidden="true" />;
}
