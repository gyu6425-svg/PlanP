import { useMemo, useState } from 'react';
import { CardSlider } from '../cards/CardSlider';
import { ResultImageCard } from '../cards/ResultImageCard';
import { foodPlaceDetailsById } from '../../data/foodPlaceDetails';
import { foodCategoryOptions, foodPlaceCardsByCategory } from '../../data/foodPlaces';
import { routes } from '../../lib/routes';

export function FoodResultSection({ city }: { city: string }) {
    const categoryOptions = useMemo(
        () =>
            foodCategoryOptions.filter((category) =>
                (foodPlaceCardsByCategory[category] ?? []).some((card) => card.city === city)
            ),
        [city]
    );
    const [selectedFoodCategory, setSelectedFoodCategory] = useState('');
    const activeFoodCategory = categoryOptions.includes(selectedFoodCategory)
        ? selectedFoodCategory
        : (categoryOptions[0] ?? '');
    const foodCards = (foodPlaceCardsByCategory[activeFoodCategory] ?? []).filter(
        (card) => card.city === city
    );

    return (
        <>
            <div className="mt-[40px] flex flex-nowrap gap-[20px]">
                {categoryOptions.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedFoodCategory(category)}
                        className={[
                            'result-filter-chip',
                            activeFoodCategory === category ? 'result-filter-chip-active' : '',
                        ].join(' ')}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="mt-[38px]">
                <CardSlider
                    items={foodCards}
                    renderItem={(card) => {
                        const routeCategory = card.category === '라멘' ? 'ramen' : card.category;
                        const detailId =
                            card.city && card.slug
                                ? `${card.city}/${routeCategory}/${card.slug}`
                                : undefined;
                        const href =
                            card.href ??
                            (card.city && card.slug && detailId && foodPlaceDetailsById[detailId]
                                ? routes.foodDetail(card.city, routeCategory, card.slug)
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
