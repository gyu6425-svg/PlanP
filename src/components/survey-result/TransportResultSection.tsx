import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TransportProductCard,
    type TransportCard,
} from '../cards/TransportProductCard';
import {
    createFallbackTransportCard,
    getPackageCardsByTransport,
    getTransportCardPresets,
} from '../../data/transportCards';
import { transportOptionsByAirport } from '../../data/surveyResultData';
import { toTransportFavorite } from '../../lib/favoritePolicy';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    deleteFavoriteThunk,
    isFavorite,
    saveFavoriteThunk,
} from '../../store/slices/favoritesSlice';

function getTransportOptions(airports: string[]) {
    const options = airports.flatMap((airport) => transportOptionsByAirport[airport] ?? []);
    const uniqueOptions = [...new Set(options)];

    if (uniqueOptions.length > 0) {
        return uniqueOptions.slice(0, 6);
    }

    return ['공항철도', '공항버스', '택시', '프라이빗 픽업'];
}

function getTransportCards(selectedOption: string, airports: string[], city: string): TransportCard[] {
    const baseOptions = selectedOption
        ? [selectedOption]
        : getTransportOptions(airports).slice(0, 2);

    return baseOptions.flatMap((option) => {
        const presets = getTransportCardPresets(option, city);

        if (!presets) {
            return [createFallbackTransportCard(option, airports[0] ?? '공항', city)];
        }

        return presets.map((card) => ({
            option,
            ...card,
        }));
    });
}

export function TransportResultSection({ airports, city }: { airports: string[]; city: string }) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector((state) => Boolean(state.auth.accessToken));
    const favorites = useAppSelector((state) => state.favorites.items);
    const transportOptions = useMemo(() => getTransportOptions(airports), [airports]);
    const [activeTransport, setActiveTransport] = useState(transportOptions[0] ?? '');
    const transportCards = useMemo(
        () => getTransportCards(activeTransport, airports, city),
        [activeTransport, airports, city]
    );
    const packageCards = useMemo(
        () => getPackageCardsByTransport(activeTransport, city),
        [activeTransport, city]
    );

    const handleToggleLike = useCallback(
        (card: TransportCard) => {
            if (!isAuthenticated) {
                navigate('/login', { state: { from: { pathname: window.location.pathname } } });
                return;
            }

            const favorite = toTransportFavorite(card);

            if (isFavorite(favorites, favorite)) {
                dispatch(deleteFavoriteThunk({ itemType: favorite.itemType, itemId: favorite.itemId }));
                return;
            }

            dispatch(saveFavoriteThunk(favorite));
        },
        [dispatch, favorites, isAuthenticated, navigate]
    );

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
                        liked={isFavorite(favorites, toTransportFavorite(card))}
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
                                liked={isFavorite(favorites, toTransportFavorite(card))}
                                onToggleLike={handleToggleLike}
                            />
                        ))}
                    </div>
                </>
            ) : null}
        </>
    );
}
