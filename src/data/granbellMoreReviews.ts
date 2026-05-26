import type { ReviewCardData } from '../components/detail/ReviewSection';

const imageBase = '/images/stay/hotel/granbell';

const reviewImages = Array.from(
    { length: 8 },
    (_, index) => `${imageBase}/stayDetail_granbell_review${index + 1}.png`
);

export const granbellMoreReviews: ReviewCardData[] = [
    {
        id: 'granbell-review-5',
        title: '체크인과 응대가 빠른 편',
        description:
            '프런트 응대가 간결하고 빠른 편이라 도착 후 바로 짐을 정리하기 좋았습니다. 기본 안내도 이해하기 쉬웠습니다.',
        sourceLabel: 'GoogleMap 후기',
        images: reviewImages.slice(0, 4),
    },
    {
        id: 'granbell-review-6',
        title: '시부야 첫 방문자에게 무난한 선택',
        description:
            '도쿄를 처음 가는 사람에게 위치 설명이 쉽고 주변 편의시설이 많아 일정 짜기가 편했습니다.',
        sourceLabel: 'GoogleMap 후기',
        images: reviewImages.slice(4, 8),
    },
];
