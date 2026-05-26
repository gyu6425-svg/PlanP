import type { ReviewCardData } from '../components/detail/ReviewSection';

const imageBase = '/images/tour/sns/sibuyaSky';

const reviewImages = Array.from(
    { length: 10 },
    (_, index) => `${imageBase}/tourDetail_sibuyaSky_review${index + 1}.png`
);

export const shibuyaSkyInitialReviews: ReviewCardData[] = [
    {
        id: 'shibuya-sky-review-1',
        title: '도쿄 야경을 한 번에 보기 좋은 곳',
        description:
            '시부야 중심에서 도쿄 시내가 넓게 보여서 사진 찍기 좋았습니다. 날씨가 좋은 날에는 일몰 시간대가 특히 인상적입니다.',
        sourceLabel: 'GoogleMap 후기',
        images: reviewImages.slice(0, 5),
    },
    {
        id: 'shibuya-sky-review-2',
        title: '일몰 시간 예약은 꼭 미리 해야 함',
        description:
            '해지는 시간대는 사람이 많고 티켓도 빨리 없어지는 편입니다. 원하는 시간대가 있으면 여행 전에 예약하는 게 좋습니다.',
        sourceLabel: 'GoogleMap 후기',
        images: reviewImages.slice(1, 4),
    },
    {
        id: 'shibuya-sky-review-3',
        title: '사진 찍을 포인트가 많음',
        description:
            '루프탑과 실내 전망 공간 모두 사진 찍기 좋았습니다. 바람이 강할 수 있어서 옷차림은 조금 신경 쓰는 게 좋습니다.',
        sourceLabel: 'GoogleMap 후기',
        images: reviewImages.slice(4, 10),
    },
    {
        id: 'shibuya-sky-review-4',
        title: '시부야 일정에 넣기 좋은 전망대',
        description:
            '시부야역과 바로 연결되는 동선이라 쇼핑이나 식사 전후로 들르기 좋았습니다. 접근성이 좋아 부담 없이 넣기 좋습니다.',
        sourceLabel: 'GoogleMap 후기',
        images: reviewImages.slice(6, 8),
    },
];
