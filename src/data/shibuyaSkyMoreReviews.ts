import type { ReviewCardData } from '../components/detail/ReviewSection';

const imageBase = '/images/tour/sns/sibuyaSky';

const reviewImages = Array.from(
    { length: 10 },
    (_, index) => `${imageBase}/tourDetail_sibuyaSky_review${index + 1}.png`
);

export const shibuyaSkyMoreReviews: ReviewCardData[] = [
    {
        id: 'shibuya-sky-review-5',
        title: '옥상 바람은 생각보다 강함',
        description:
            '전망은 정말 좋지만 옥상은 바람이 꽤 강했습니다. 사진을 오래 찍을 계획이면 겉옷을 챙기는 편이 좋습니다.',
        sourceLabel: 'GoogleMap 후기',
        images: reviewImages.slice(2, 7),
    },
    {
        id: 'shibuya-sky-review-6',
        title: '비싼 편이어도 한 번은 추천',
        description:
            '입장료가 저렴한 편은 아니지만 도쿄 여행 중 하루 정도는 넣어볼 만했습니다. 특히 첫 도쿄 여행이라면 만족도가 높습니다.',
        sourceLabel: 'GoogleMap 후기',
        images: reviewImages.slice(5, 10),
    },
];
