import type { ReviewCardData } from '../components/detail/ReviewSection';

const imageBase = '/images/food/tokyo/ramen/ramen_ginzahachigo';

const reviewImages = Array.from(
    { length: 16 },
    (_, index) => `${imageBase}/ramen_ginzahachigo_${index + 2}.png`
);

export const ginzaHachigoMoreReviews: ReviewCardData[] = [
    {
        id: 'ginza-hachigo-review-5',
        title: '맑은 국물인데 감칠맛이 강함',
        description:
            '국물은 맑지만 맛은 전혀 가볍지 않았습니다. 첫맛보다 뒤로 갈수록 재료의 향과 감칠맛이 또렷하게 올라옵니다.',
        sourceLabel: 'GoogleMap 후기',
        images: reviewImages.slice(2, 7),
    },
    {
        id: 'ginza-hachigo-review-6',
        title: '예약하고 가는 편이 마음 편함',
        description:
            '인기가 많아서 무작정 방문하면 기다림이 길 수 있습니다. 일정에 넣을 계획이라면 예약 가능 여부를 먼저 확인하는 게 좋습니다.',
        sourceLabel: 'GoogleMap 후기',
        images: reviewImages.slice(6, 10),
    },
];
