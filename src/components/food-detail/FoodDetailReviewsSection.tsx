import { ReviewSection, type ReviewCardData } from '../detail/ReviewSection';
import type { FoodPlaceDetail } from '../../data/foodPlaceDetails';
import { ginzaHachigoInitialReviews } from '../../data/ginzaHachigoReviews';

export function FoodDetailReviewsSection({ detail }: { detail: FoodPlaceDetail }) {
    const initialReviews =
        detail.slug === 'ginza-hachigo'
            ? ginzaHachigoInitialReviews
            : createFoodReviews(detail, 'initial');

    return (
        <ReviewSection
            initialReviews={initialReviews}
            loadMoreReviews={async () => {
                if (detail.slug !== 'ginza-hachigo') {
                    return createFoodReviews(detail, 'more');
                }

                const module = await import('../../data/ginzaHachigoMoreReviews');
                return module.ginzaHachigoMoreReviews;
            }}
        />
    );
}

function createFoodReviews(detail: FoodPlaceDetail, group: 'initial' | 'more'): ReviewCardData[] {
    const imageOffset = group === 'initial' ? 0 : 2;
    const images = detail.images.slice(imageOffset, imageOffset + 4);
    const cityName = getCityName(detail.city);

    if (group === 'more') {
        return [
            {
                id: `${detail.id}-review-more-1`,
                title: '동선에 넣기 좋았어요',
                description: `${detail.area} 일정 중 들르기 좋았고, 역에서 걸어가는 길도 크게 복잡하지 않았습니다. 피크 시간만 피하면 여행 중 한 끼로 넣기 좋은 곳이었어요.`,
                sourceLabel: 'GoogleMap 후기',
                images,
            },
            {
                id: `${detail.id}-review-more-2`,
                title: '재방문 후보',
                description: `${detail.name}은 맛도 안정적이고 사진으로 남기기에도 괜찮았습니다. ${detail.category}를 좋아한다면 ${cityName} 일정에서 후보로 넣어볼 만합니다.`,
                sourceLabel: 'GoogleMap 후기',
                images: images.slice(0, 2),
            },
        ];
    }

    return [
        {
            id: `${detail.id}-review-1`,
            title: `${detail.category} 먹으러 가기 좋은 곳`,
            description: `${detail.name}은 ${detail.area}에서 접근성이 괜찮고, 메뉴 구성이 여행자 입장에서도 고르기 쉬웠습니다. 웨이팅은 있을 수 있지만 분위기와 맛 모두 만족도가 높은 편입니다.`,
            sourceLabel: 'GoogleMap 후기',
            images,
        },
        {
            id: `${detail.id}-review-2`,
            title: '기다릴 만한 인기',
            description: `방문 시간에 따라 줄이 생길 수 있지만 회전은 생각보다 괜찮았습니다. ${detail.category} 특유의 맛을 ${cityName}에서 부담 없이 즐기기 좋았습니다.`,
            sourceLabel: 'GoogleMap 후기',
            images: [],
        },
        {
            id: `${detail.id}-review-3`,
            title: '주변 일정과 묶기 좋음',
            description: `${detail.area} 주변 쇼핑이나 관광 동선과 묶기 좋았습니다. 식사 후 근처 카페나 산책 코스로 이어가기에도 편했습니다.`,
            sourceLabel: 'GoogleMap 후기',
            images: images.slice(1),
        },
        {
            id: `${detail.id}-review-4`,
            title: '처음 가도 무난한 선택',
            description: `${cityName}에서 ${detail.category}를 처음 먹는 사람에게도 추천하기 쉬운 분위기였습니다. 메뉴 선택이 어렵다면 대표 메뉴 위주로 주문하면 실패 확률이 낮습니다.`,
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
