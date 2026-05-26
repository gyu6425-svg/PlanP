import { BookingPlatformSection } from '../detail/BookingPlatformSection';
import type { StayPlaceDetail } from '../../data/stayPlaceDetails';

export function StayDetailBookingSection({ detail }: { detail: StayPlaceDetail }) {
    return <BookingPlatformSection cards={detail.bookingCards} />;
}
