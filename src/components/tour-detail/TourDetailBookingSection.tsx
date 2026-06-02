import { BookingPlatformSection } from '../detail/BookingPlatformSection';
import type { TourPlaceDetail } from '../../data/tourPlaceDetails';

export function TourDetailBookingSection({ detail }: { detail: TourPlaceDetail }) {
    return (
        <BookingPlatformSection
            cards={detail.bookingCards}
            cityCode={detail.city}
            itemType="tour"
            sectionLabel="관광"
        />
    );
}
