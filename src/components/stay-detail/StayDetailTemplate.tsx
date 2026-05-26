import { useState } from 'react';
import { DetailBackButton } from '../detail/DetailBackButton';
import { DetailGalleryModal } from '../detail/DetailGalleryModal';
import type { StayPlaceDetail } from '../../data/stayPlaceDetails';
import { StayDetailBookingSection } from './StayDetailBookingSection';
import { StayDetailHeroInfoSection } from './StayDetailHeroInfoSection';
import { StayDetailLocationContent } from './StayDetailLocationContent';
import { StayDetailReviewsSection } from './StayDetailReviewsSection';

export function StayDetailTemplate({
    city,
    detail,
}: {
    city: string;
    detail: StayPlaceDetail;
}) {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    return (
        <div className="min-h-svh bg-[#f5f5f5] pb-[120px] pt-[190px]">
            <DetailBackButton city={city} section="숙소" />

            <StayDetailHeroInfoSection
                detail={detail}
                onOpenGallery={() => setIsGalleryOpen(true)}
            />

            <StayDetailBookingSection detail={detail} />

            <StayDetailLocationContent detail={detail} />

            <StayDetailReviewsSection detail={detail} />

            {isGalleryOpen ? (
                <DetailGalleryModal
                    images={detail.images}
                    onClose={() => setIsGalleryOpen(false)}
                />
            ) : null}
        </div>
    );
}
