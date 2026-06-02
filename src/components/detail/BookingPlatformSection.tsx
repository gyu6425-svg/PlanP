import {
    TransportProductCard,
    type TransportCard,
} from '../cards/TransportProductCard';
import { CardSlider } from '../cards/CardSlider';
import type { BookingItemType } from '../../services/bookingClicksApi';

export function BookingPlatformSection({
    cards,
    cityCode,
    itemType,
    sectionLabel,
}: {
    cards: TransportCard[];
    cityCode: string;
    itemType: BookingItemType;
    sectionLabel: string;
}) {
    return (
        <section className="mx-auto mt-[40px] w-[1520px]">
            <CardSlider
                items={cards.slice(0, 5)}
                itemsPerRow={5}
                renderItem={(card) => (
                    <TransportProductCard
                        key={card.id}
                        card={card}
                        bookingClickContext={{
                            cityCode,
                            itemType,
                            sectionLabel,
                        }}
                    />
                )}
            />
        </section>
    );
}
