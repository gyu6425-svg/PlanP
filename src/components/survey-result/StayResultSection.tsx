import { useMemo, useState } from 'react';
import { CardSlider } from '../cards/CardSlider';
import { ResultImageCard } from '../cards/ResultImageCard';
import { stayPlaceDetailsById } from '../../data/stayPlaceDetails';
import { stayCategoryOptions, stayPlaceCardsByCategory } from '../../data/stayPlaces';
import { routes } from '../../lib/routes';

export function StayResultSection({
    selectedStays,
    city,
}: {
    selectedStays: string[];
    city: string;
}) {
    const cityCategoryOptions = useMemo(
        () =>
            stayCategoryOptions.filter((category) =>
                (stayPlaceCardsByCategory[category] ?? []).some((card) => card.city === city)
            ),
        [city]
    );
    const selectedCityCategoryOptions = selectedStays.filter((category) =>
        cityCategoryOptions.includes(category)
    );
    const categoryOptions = useMemo(
        () =>
            selectedCityCategoryOptions.length > 0
                ? selectedCityCategoryOptions
                : cityCategoryOptions,
        [cityCategoryOptions, selectedCityCategoryOptions]
    );
    const [selectedStayCategory, setSelectedStayCategory] = useState('');
    const activeStayCategory = categoryOptions.includes(selectedStayCategory)
        ? selectedStayCategory
        : (categoryOptions[0] ?? '');
    const stayCards = (stayPlaceCardsByCategory[activeStayCategory] ?? []).filter(
        (card) => card.city === city
    );

    return (
        <>
            <div className="mt-[40px] flex flex-nowrap gap-[20px]">
                {categoryOptions.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedStayCategory(category)}
                        className={[
                            'result-filter-chip',
                            activeStayCategory === category ? 'result-filter-chip-active' : '',
                        ].join(' ')}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="mt-[38px]">
                <CardSlider
                    items={stayCards}
                    renderItem={(card) => {
                        const routeCategory = card.category === '호텔' ? 'hotel' : card.category;
                        const detailId =
                            card.city && card.slug
                                ? `${card.city}/${routeCategory}/${card.slug}`
                                : undefined;
                        const href =
                            card.href ??
                            (card.city && card.slug && detailId && stayPlaceDetailsById[detailId]
                                ? routes.stayDetail(card.city, routeCategory, card.slug)
                                : undefined);

                        const cardWithHref = { ...card, href };

                        return (
                            <ResultImageCard
                                key={card.id}
                                card={cardWithHref}
                            />
                        );
                    }}
                />
            </div>
        </>
    );
}
