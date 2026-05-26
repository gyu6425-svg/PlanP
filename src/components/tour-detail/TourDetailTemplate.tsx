import { useState } from 'react';
import { DetailBackButton } from '../detail/DetailBackButton';
import { DetailGalleryModal } from '../detail/DetailGalleryModal';
import type { TourPlaceDetail } from '../../data/tourPlaceDetails';
import { TourDetailBookingSection } from './TourDetailBookingSection';
import { TourDetailHeroInfoSection } from './TourDetailHeroInfoSection';
import { TourDetailLocationContent } from './TourDetailLocationContent';
import { TourDetailReviewsSection } from './TourDetailReviewsSection';

export function TourDetailTemplate({
    city,
    detail,
}: {
    city: string;
    detail: TourPlaceDetail;
}) {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    return (
        <div className="min-h-svh bg-[#f5f5f5] pb-[120px] pt-[190px]">
            <DetailBackButton city={city} section="관광" />

            <TourDetailHeroInfoSection
                detail={detail}
                onOpenGallery={() => setIsGalleryOpen(true)}
            />

            <TourDetailBookingSection detail={detail} />

            <TourDetailLocationContent detail={detail} />

            <TourDetailReviewsSection detail={detail} />

            {isGalleryOpen ? (
                <DetailGalleryModal
                    images={detail.images}
                    onClose={() => setIsGalleryOpen(false)}
                />
            ) : null}
        </div>
    );
}
