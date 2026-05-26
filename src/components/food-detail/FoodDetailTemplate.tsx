import { useState } from 'react';
import { DetailBackButton } from '../detail/DetailBackButton';
import { DetailGalleryModal } from '../detail/DetailGalleryModal';
import type { FoodPlaceDetail } from '../../data/foodPlaceDetails';
import { FoodDetailHeroInfoSection } from './FoodDetailHeroInfoSection';
import { FoodDetailLocationContent } from './FoodDetailLocationContent';
import { FoodDetailReviewsSection } from './FoodDetailReviewsSection';

export function FoodDetailTemplate({
    city,
    detail,
}: {
    city: string;
    detail: FoodPlaceDetail;
}) {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    return (
        <div className="min-h-svh bg-[#f5f5f5] pb-[120px] pt-[190px]">
            <DetailBackButton city={city} section="맛집" />

            <FoodDetailHeroInfoSection
                detail={detail}
                onOpenGallery={() => setIsGalleryOpen(true)}
            />

            <FoodDetailLocationContent detail={detail} />

            <FoodDetailReviewsSection detail={detail} />

            {isGalleryOpen ? (
                <DetailGalleryModal
                    images={detail.images}
                    onClose={() => setIsGalleryOpen(false)}
                />
            ) : null}
        </div>
    );
}
