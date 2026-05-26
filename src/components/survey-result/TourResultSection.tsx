import { useMemo, useState } from 'react';
import { CardSlider } from '../cards/CardSlider';
import { ResultImageCard } from '../cards/ResultImageCard';
import { tourPlaceDetailsById } from '../../data/tourPlaceDetails';
import { tourCategoryOptions, tourPlaceCardsByCategory } from '../../data/tourPlaces';
import { routes } from '../../lib/routes';

export function TourResultSection({ city }: { city: string }) {
    const categoryOptions = useMemo(
        () =>
            tourCategoryOptions.filter((category) =>
                (tourPlaceCardsByCategory[category] ?? []).some((card) => card.city === city)
            ),
        [city]
    );
    const [selectedTourCategory, setSelectedTourCategory] = useState('');
    const activeTourCategory = categoryOptions.includes(selectedTourCategory)
        ? selectedTourCategory
        : (categoryOptions[0] ?? '');
    const tourCards = (tourPlaceCardsByCategory[activeTourCategory] ?? []).filter(
        (card) => card.city === city
    );

    return (
        <>
            <div className="mt-[40px] flex flex-nowrap gap-[20px]">
                {categoryOptions.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedTourCategory(category)}
                        className={[
                            'result-filter-chip',
                            activeTourCategory === category ? 'result-filter-chip-active' : '',
                        ].join(' ')}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="mt-[38px]">
                <CardSlider
                    items={tourCards}
                    renderItem={(card) => {
                        const detailId =
                            card.city && card.slug
                                ? `${card.city}/${card.category}/${card.slug}`
                                : undefined;
                        const href =
                            card.href ??
                            (card.city && card.slug && detailId && tourPlaceDetailsById[detailId]
                                ? routes.tourDetail(card.city, card.category, card.slug)
                                : undefined);

                        return <ResultImageCard key={card.id} card={{ ...card, href }} />;
                    }}
                />
            </div>
        </>
    );
}
