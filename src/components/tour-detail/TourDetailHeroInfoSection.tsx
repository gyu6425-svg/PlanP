import { DetailHeroGallery } from '../detail/DetailHeroGallery';
import { DetailInfoPanel } from '../detail/DetailInfoPanel';
import type { TourPlaceDetail } from '../../data/tourPlaceDetails';
import { toDetailFavorite } from '../../lib/favoritePolicy';

export function TourDetailHeroInfoSection({
    detail,
    onOpenGallery,
}: {
    detail: TourPlaceDetail;
    onOpenGallery: () => void;
}) {
    return (
        <section className="mx-auto w-[1520px]">
            <DetailHeroGallery
                title={detail.name}
                images={detail.images}
                onOpenGallery={onOpenGallery}
            />
            <DetailInfoPanel
                detail={detail}
                saveTitle="명소 저장하기"
                accessLabel="공간"
                favorite={toDetailFavorite('tour', detail)}
            />
        </section>
    );
}
