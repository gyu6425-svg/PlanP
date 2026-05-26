import { DetailHeroGallery } from '../detail/DetailHeroGallery';
import { DetailInfoPanel } from '../detail/DetailInfoPanel';
import type { StayPlaceDetail } from '../../data/stayPlaceDetails';

export function StayDetailHeroInfoSection({
    detail,
    onOpenGallery,
}: {
    detail: StayPlaceDetail;
    onOpenGallery: () => void;
}) {
    return (
        <section className="mx-auto w-[1520px]">
            <DetailHeroGallery
                title={detail.name}
                images={detail.images}
                onOpenGallery={onOpenGallery}
            />
            <DetailInfoPanel detail={detail} saveTitle="숙소 저장하기" accessLabel="객실" />
        </section>
    );
}
