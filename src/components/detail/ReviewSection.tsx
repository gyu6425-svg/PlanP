import { useState } from 'react';
import { useLoadableImages } from './useLoadableImages';

export type ReviewCardData = {
    id: string;
    title: string;
    description: string;
    sourceLabel: string;
    images: string[];
};

export function ReviewSection({
    title = '한국인 최신 후기 모아보기',
    initialReviews,
    loadMoreReviews,
}: {
    title?: string;
    initialReviews: ReviewCardData[];
    loadMoreReviews: () => Promise<ReviewCardData[]>;
}) {
    const [reviews, setReviews] = useState(initialReviews);
    const [hasLoadedMore, setHasLoadedMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadMore = async () => {
        if (hasLoadedMore || isLoading) {
            return;
        }

        setIsLoading(true);
        const moreReviews = await loadMoreReviews();
        setReviews((current) => [...current, ...moreReviews]);
        setHasLoadedMore(true);
        setIsLoading(false);
    };

    return (
        <section className="mx-auto mt-[180px] w-[1520px]">
            <h2 className="text-[48px] font-[700] leading-none text-black">{title}</h2>

            <div className="mt-[56px] grid grid-cols-2 gap-x-[20px] gap-y-[40px]">
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>

            {!hasLoadedMore ? (
                <div className="mt-[42px] flex justify-center">
                    <button
                        type="button"
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="h-[64px] w-[335px] rounded-full border border-[#6b8a59] text-[16px] font-[500] text-[#6b8a59] disabled:cursor-wait disabled:opacity-60"
                    >
                        {isLoading ? '불러오는 중' : '리뷰 더보기'}
                    </button>
                </div>
            ) : null}
        </section>
    );
}

function ReviewCard({ review }: { review: ReviewCardData }) {
    const loadableImages = useLoadableImages(review.images);
    const visibleImages = loadableImages.slice(0, 4);
    const hiddenImageCount = Math.max(loadableImages.length - 4, 0);

    return (
        <article className="h-[400px] w-[750px] rounded-[48px] bg-white px-[44px] pb-[30px] pt-[42px]">
            <h3 className="text-[36px] font-[700] leading-none text-[#6B8A59]">{review.title}</h3>
            <p className="mt-[40px] h-[58px] w-[604px] overflow-hidden text-ellipsis text-[22px] font-[400] leading-[29px] text-black [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                {review.description}
            </p>
            <button
                type="button"
                className="mt-[12px] text-[22px] font-[500] leading-none text-black underline underline-offset-4"
            >
                더보기
            </button>

            <div className="mt-[36px] flex items-end justify-between">
                <div className="flex gap-[8px]">
                    {visibleImages.map((image, index) => {
                        const isLastVisible = index === visibleImages.length - 1;

                        return (
                            <div
                                key={`${review.id}-${image}`}
                                className="relative size-[76px] overflow-hidden rounded-[12px]"
                            >
                                <img src={image} alt="" className="h-full w-full object-cover" />
                                {isLastVisible && hiddenImageCount > 0 ? (
                                    <div className="absolute inset-0 grid place-items-center bg-black/42 text-[20px] font-[700] leading-none text-white">
                                        +{hiddenImageCount}
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
                </div>

                <span className="pb-[3px] text-[18px] font-[700] leading-none text-black">
                    {review.sourceLabel}
                </span>
            </div>
        </article>
    );
}
