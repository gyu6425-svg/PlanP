import { DetailLocationSection } from '../detail/DetailLocationSection';
import type { TourPlaceDetail } from '../../data/tourPlaceDetails';

export function TourDetailLocationContent({ detail }: { detail: TourPlaceDetail }) {
    return <DetailLocationSection detail={detail} />;
}
