import {
    TransportProductCard,
    type TransportCard,
} from '../cards/TransportProductCard';
import { CardSlider } from '../cards/CardSlider';

export function BookingPlatformSection({ cards }: { cards: TransportCard[] }) {
    return (
        <section className="mx-auto mt-[40px] w-[1520px]">
            <CardSlider
                items={cards.slice(0, 5)}
                itemsPerRow={5}
                renderItem={(card) => (
                    <TransportProductCard
                        key={card.id}
                        card={card}
                    />
                )}
            />
        </section>
    );
}
