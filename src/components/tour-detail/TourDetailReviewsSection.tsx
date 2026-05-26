import { ReviewSection, type ReviewCardData } from '../detail/ReviewSection';
import type { TourPlaceDetail } from '../../data/tourPlaceDetails';
import { shibuyaSkyInitialReviews } from '../../data/shibuyaSkyReviews';

export function TourDetailReviewsSection({ detail }: { detail: TourPlaceDetail }) {
    const initialReviews =
        detail.slug === 'shibuya-sky' ? shibuyaSkyInitialReviews : createTourReviews(detail, 'initial');

    return (
        <ReviewSection
            initialReviews={initialReviews}
            loadMoreReviews={async () => {
                if (detail.slug !== 'shibuya-sky') {
                    return createTourReviews(detail, 'more');
                }

                const module = await import('../../data/shibuyaSkyMoreReviews');
                return module.shibuyaSkyMoreReviews;
            }}
        />
    );
}

function getTourArea(detail: TourPlaceDetail) {
    return detail.area ?? detail.address.split(',')[0] ?? '주변';
}

function createTourReviews(detail: TourPlaceDetail, group: 'initial' | 'more'): ReviewCardData[] {
    const imageOffset = group === 'initial' ? 0 : 2;
    const images = detail.images.slice(imageOffset, imageOffset + 4);
    const area = getTourArea(detail);

    if (group === 'more') {
        return [
            {
                id: `${detail.id}-review-more-1`,
                title: `${area} 일정에 넣기 쉬운 동선`,
                description: `${detail.name}은 ${area} 주변 식사나 산책 코스와 함께 묶기 좋았습니다. 이동 전후로 여유 시간을 조금 두면 사진 찍고 쉬어가기 편합니다.`,
                sourceLabel: 'GoogleMap 후기',
                images,
            },
            {
                id: `${detail.id}-review-more-2`,
                title: '날씨와 시간대가 중요함',
                description: `실외 동선이 포함될 수 있어 날씨를 보고 방문 시간을 잡는 편이 좋습니다. ${detail.category} 명소답게 사람 없는 사진을 원하면 오전 시간대가 더 낫습니다.`,
                sourceLabel: 'GoogleMap 후기',
                images: images.slice(0, 2),
            },
        ];
    }

    return [
        {
            id: `${detail.id}-review-1`,
            title: `${area}에서 기억에 남는 포인트`,
            description: `${detail.name}은 ${area} 권역에서 사진과 산책 동선을 함께 잡기 좋은 곳입니다. 처음 방문해도 위치를 찾기 어렵지 않고, 주변 일정과 연결하기 좋았습니다.`,
            sourceLabel: 'GoogleMap 후기',
            images,
        },
        {
            id: `${detail.id}-review-2`,
            title: `${detail.category} 감성이 잘 살아있음`,
            description: `짧게 둘러봐도 분위기가 확실해서 여행 중 한 번쯤 넣기 좋습니다. 입장 정보나 운영 시간은 방문 전 지도에서 확인하면 일정이 더 안정적입니다.`,
            sourceLabel: 'GoogleMap 후기',
            images: [],
        },
        {
            id: `${detail.id}-review-3`,
            title: '사진 찍기 좋은 시간대',
            description: `사람이 몰리는 시간에는 대기가 생기거나 사진 구도가 제한될 수 있습니다. 오전이나 해 질 무렵을 노리면 ${detail.name} 분위기를 더 잘 담기 좋습니다.`,
            sourceLabel: 'GoogleMap 후기',
            images: images.slice(1),
        },
        {
            id: `${detail.id}-review-4`,
            title: '근처 식사와 함께 묶기 좋음',
            description: `${area} 주변에는 식사나 카페 후보를 같이 잡기 좋아서 단독 방문보다 반나절 동선으로 묶는 편이 효율적입니다.`,
            sourceLabel: 'GoogleMap 후기',
            images: images.slice(0, 2),
        },
    ];
}
