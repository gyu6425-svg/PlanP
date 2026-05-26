import { useState } from 'react';
import {
    TransportProductCard,
    type TransportCard,
} from '../cards/TransportProductCard';
import { CardSlider } from '../cards/CardSlider';

export function BookingPlatformSection({ cards }: { cards: TransportCard[] }) {
    const [likedCardIds, setLikedCardIds] = useState<string[]>([]);

    const handleToggleLike = (card: TransportCard) => {
        setLikedCardIds((current) =>
            current.includes(card.id)
                ? current.filter((id) => id !== card.id)
                : [...current, card.id]
        );
    };

    return (
        <section className="mx-auto mt-[40px] w-[1520px]">
            <CardSlider
                items={cards.slice(0, 5)}
                itemsPerRow={5}
                renderItem={(card) => (
                    <TransportProductCard
                        key={card.id}
                        card={card}
                        liked={likedCardIds.includes(card.id)}
                        onToggleLike={handleToggleLike}
                    />
                )}
            />
        </section>
    );
}
