import { DetailHeroGallery } from '../detail/DetailHeroGallery';
import { DetailInfoPanel } from '../detail/DetailInfoPanel';
import type { FoodPlaceDetail } from '../../data/foodPlaceDetails';
import { toDetailFavorite } from '../../lib/favoritePolicy';

export function FoodDetailHeroInfoSection({
    detail,
    onOpenGallery,
}: {
    detail: FoodPlaceDetail;
    onOpenGallery: () => void;
}) {
    return (
        <section className="mx-auto w-[1520px]">
            <DetailHeroGallery
                title={detail.name}
                images={detail.images}
                onOpenGallery={onOpenGallery}
            />
            <DetailInfoPanel detail={detail} favorite={toDetailFavorite('food', detail)} />
        </section>
    );
}
