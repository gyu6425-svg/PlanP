import { useMemo, useState } from 'react';
import {
    TransportProductCard,
    type TransportCard,
} from '../cards/TransportProductCard';
import {
    createFallbackTransportCard,
    getPackageCardsByTransport,
    transportCardPresetsByOption,
} from '../../data/transportCards';
import { transportOptionsByAirport } from '../../data/surveyResultData';

function getTransportOptions(airports: string[]) {
    const options = airports.flatMap((airport) => transportOptionsByAirport[airport] ?? []);
    const uniqueOptions = [...new Set(options)];

    if (uniqueOptions.length > 0) {
        return uniqueOptions.slice(0, 6);
    }

    return ['공항철도', '공항버스', '택시', '프라이빗 픽업'];
}

function getTransportCards(selectedOption: string, airports: string[]): TransportCard[] {
    const baseOptions = selectedOption
        ? [selectedOption]
        : getTransportOptions(airports).slice(0, 2);

    return baseOptions.flatMap((option) => {
        const presets = transportCardPresetsByOption[option];

        if (!presets) {
            return [createFallbackTransportCard(option, airports[0] ?? '공항')];
        }

        return presets.map((card) => ({
            option,
            ...card,
        }));
    });
}

export function TransportResultSection({ airports }: { airports: string[] }) {
    const transportOptions = useMemo(() => getTransportOptions(airports), [airports]);
    const [activeTransport, setActiveTransport] = useState(transportOptions[0] ?? '');
    const [likedCardIds, setLikedCardIds] = useState<string[]>([]);
    const transportCards = useMemo(
        () => getTransportCards(activeTransport, airports),
        [activeTransport, airports]
    );
    const packageCards = useMemo(
        () => getPackageCardsByTransport(activeTransport),
        [activeTransport]
    );

    const handleToggleLike = (card: TransportCard) => {
        setLikedCardIds((current) => {
            const next = current.includes(card.id)
                ? current.filter((id) => id !== card.id)
                : [...current, card.id];

            sessionStorage.setItem('planp.likedTransportCards', JSON.stringify(next));
            return next;
        });
    };

    return (
        <>
            <div className="mt-[40px] flex flex-nowrap gap-[12px]">
                {transportOptions.map((option, index) => (
                    <button
                        key={`${option}-${index}`}
                        type="button"
                        onClick={() => setActiveTransport(option)}
                        className={[
                            'result-filter-chip',
                            activeTransport === option ? 'result-filter-chip-active' : '',
                        ].join(' ')}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="mt-[28px] grid grid-cols-3 gap-[20px]">
                {transportCards.map((card) => (
                    <TransportProductCard
                        key={card.id}
                        card={card}
                        liked={likedCardIds.includes(card.id)}
                        onToggleLike={handleToggleLike}
                    />
                ))}
            </div>

            {packageCards.length > 0 ? (
                <>
                    <h2 className="mt-[150px] text-[48px] font-[700] leading-none text-black">
                        함께하면 더 저렴한 패키지
                    </h2>
                    <div className="mt-[40px] grid grid-cols-3 gap-[20px]">
                        {packageCards.map((card) => (
                            <TransportProductCard
                                key={card.id}
                                card={card}
                                liked={likedCardIds.includes(card.id)}
                                onToggleLike={handleToggleLike}
                            />
                        ))}
                    </div>
                </>
            ) : null}
        </>
    );
}
