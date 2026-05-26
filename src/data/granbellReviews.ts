import type { ReviewCardData } from '../components/detail/ReviewSection';

const imageBase = '/images/stay/hotel/granbell';

const reviewImages = Array.from(
    { length: 8 },
    (_, index) => `${imageBase}/stayDetail_granbell_review${index + 1}.png`
);

export const granbellInitialReviews: ReviewCardData[] = [
    {
        id: 'granbell-review-1',
        title: '시부야 이동이 정말 편한 위치',
        description:
            '역과 번화가가 가까워 짧은 도쿄 일정에 특히 편했습니다. 밤늦게 돌아와도 주변이 밝고 이동 동선이 단순했습니다.',
        sourceLabel: 'GoogleMap 후기',
        images: reviewImages.slice(0, 5),
    },
    {
        id: 'granbell-review-2',
        title: '객실은 아담하지만 깔끔함',
        description:
            '도쿄 호텔답게 방은 크지 않지만 정리가 잘 되어 있고 필요한 시설은 충분했습니다. 혼자 또는 커플 여행에 잘 맞습니다.',
        sourceLabel: 'GoogleMap 후기',
        images: reviewImages.slice(1, 4),
    },
    {
        id: 'granbell-review-3',
        title: '주변 맛집과 쇼핑 동선이 좋음',
        description:
            '호텔에서 나와 바로 식사와 쇼핑을 이어가기 좋았습니다. 시부야 중심 일정이면 택시나 지하철 이동을 많이 줄일 수 있습니다.',
        sourceLabel: 'GoogleMap 후기',
        images: reviewImages.slice(3, 8),
    },
    {
        id: 'granbell-review-4',
        title: '가격대비 만족스러운 시부야 숙소',
        description:
            '위치와 접근성을 생각하면 가격대비 만족도가 괜찮았습니다. 다음에도 시부야 중심으로 다닐 때 후보에 넣을 만합니다.',
        sourceLabel: 'GoogleMap 후기',
        images: reviewImages.slice(5, 7),
    },
];
