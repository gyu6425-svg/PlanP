import { ReviewSection, type ReviewCardData } from '../detail/ReviewSection';
import { granbellInitialReviews } from '../../data/granbellReviews';
import type { StayPlaceDetail } from '../../data/stayPlaceDetails';

export function StayDetailReviewsSection({ detail }: { detail: StayPlaceDetail }) {
    const initialReviews =
        detail.slug === 'granbell' ? granbellInitialReviews : createStayReviews(detail, 'initial');

    return (
        <ReviewSection
            initialReviews={initialReviews}
            loadMoreReviews={async () => {
                if (detail.slug !== 'granbell') {
                    return createStayReviews(detail, 'more');
                }

                const module = await import('../../data/granbellMoreReviews');
                return module.granbellMoreReviews;
            }}
        />
    );
}

function createStayReviews(detail: StayPlaceDetail, group: 'initial' | 'more'): ReviewCardData[] {
    const imageOffset = group === 'initial' ? 0 : 2;
    const images = detail.images.slice(imageOffset, imageOffset + 4);
    const cityName = getCityName(detail.city);

    if (group === 'more') {
        return [
            {
                id: `${detail.id}-review-more-1`,
                title: '다음 일정에도 후보',
                description: `${detail.area} 이동이 편했고, 숙소 주변에 편의점과 식사할 곳이 있어 밤 늦게 돌아와도 부담이 적었습니다.`,
                sourceLabel: 'GoogleMap 후기',
                images,
            },
            {
                id: `${detail.id}-review-more-2`,
                title: '가격과 위치 균형이 좋음',
                description: `${detail.name}은 ${detail.category} 기준으로 위치와 가격의 균형이 괜찮았습니다. 짧은 ${cityName} 일정에 넣기 좋은 숙소였습니다.`,
                sourceLabel: 'GoogleMap 후기',
                images: images.slice(0, 2),
            },
        ];
    }

    return [
        {
            id: `${detail.id}-review-1`,
            title: `${detail.area} 이동이 편한 숙소`,
            description: `${detail.name}은 ${detail.area} 중심 동선과 잘 맞았습니다. 지하철 접근이 괜찮고 주변 편의시설도 있어 첫 ${cityName} 여행 숙소로도 무난했습니다.`,
            sourceLabel: 'GoogleMap 후기',
            images,
        },
        {
            id: `${detail.id}-review-2`,
            title: `${detail.category} 분위기가 잘 살아있음`,
            description: `객실과 공용 공간이 ${detail.category} 콘셉트에 맞게 정리되어 있었습니다. 화려하진 않아도 필요한 시설이 잘 갖춰진 편입니다.`,
            sourceLabel: 'GoogleMap 후기',
            images: [],
        },
        {
            id: `${detail.id}-review-3`,
            title: '주변 일정과 묶기 좋음',
            description: `체크인 전후로 ${detail.area} 주변 관광이나 식사를 이어가기 좋았습니다. 짐이 많다면 역 출구 동선을 먼저 확인하는 편이 좋습니다.`,
            sourceLabel: 'GoogleMap 후기',
            images: images.slice(1),
        },
        {
            id: `${detail.id}-review-4`,
            title: '짧은 일정에 실용적',
            description: `${cityName} 숙소 특성상 공간은 객실 타입마다 차이가 있지만, 위치와 관리 상태를 생각하면 만족도가 괜찮았습니다.`,
            sourceLabel: 'GoogleMap 후기',
            images: images.slice(0, 2),
        },
    ];
}

function getCityName(city: string) {
    const cityNameBySlug: Record<string, string> = {
        tokyo: '도쿄',
        osaka: '오사카',
        fukuoka: '후쿠오카',
        taipei: '타이베이',
        bangkok: '방콕',
    };

    return cityNameBySlug[city] ?? city;
}
