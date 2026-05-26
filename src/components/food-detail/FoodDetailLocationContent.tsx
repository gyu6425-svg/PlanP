import { DetailLocationSection } from '../detail/DetailLocationSection';
import type { FoodPlaceDetail } from '../../data/foodPlaceDetails';

export function FoodDetailLocationContent({ detail }: { detail: FoodPlaceDetail }) {
    return <DetailLocationSection detail={detail} />;
}
