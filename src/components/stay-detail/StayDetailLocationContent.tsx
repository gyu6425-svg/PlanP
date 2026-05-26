import { DetailLocationSection } from '../detail/DetailLocationSection';
import type { StayPlaceDetail } from '../../data/stayPlaceDetails';

export function StayDetailLocationContent({ detail }: { detail: StayPlaceDetail }) {
    return <DetailLocationSection detail={detail} />;
}
